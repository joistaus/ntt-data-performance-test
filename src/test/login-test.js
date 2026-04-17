import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BASE_URL, LOGIN_ENDPOINT, CONTENT_TYPE, P95_THRESHOLD_MS, ERROR_RATE_THRESHOLD } from '../config/constants.js';

const users = new SharedArray('users', function () {
  return open('../data/users.csv')
    .split('\n')
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => {
      const [user, passwd] = line.split(',');
      return { user: user.trim(), passwd: passwd.trim() };
    });
});

export const options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '1m',  target: 30 },
    { duration: '15s', target: 0  },
  ],
  thresholds: {
    http_req_duration: [`p(95)<${P95_THRESHOLD_MS}`],
    http_req_failed:   [`rate<${ERROR_RATE_THRESHOLD}`],
  },
};

export default function () {
  const user = users[__VU % users.length];

  const payload = JSON.stringify({ username: user.user, password: user.passwd });
  const headers = { 'Content-Type': CONTENT_TYPE };

  const res = http.post(`${BASE_URL}${LOGIN_ENDPOINT}`, payload, { headers });

  check(res, {
    'status is 200':        (r) => r.status === 200,
    'response has token':   (r) => {
      try {
        return JSON.parse(r.body).token !== undefined;
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
