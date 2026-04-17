import http from 'k6/http';
import { BASE_URL, LOGIN_ENDPOINT, CONTENT_TYPE, P95_THRESHOLD_MS, ERROR_RATE_THRESHOLD } from '../config/constants.js';
import { handleSummary } from '../config/reporter.js';
import { users } from '../helpers/users.js';
import { checkLoginResponse } from '../helpers/checks.js';

export { handleSummary };

export const options = {
  scenarios: {
    ramping_login: {
      executor: 'ramping-arrival-rate',
      startRate: 20,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 200,
      stages: [
        { target: 20,  duration: '5s' },
        { target: 30,  duration: '5s' },
        { target: 40,  duration: '5s' },
        { target: 50,  duration: '5s' },
        { target: 60,  duration: '5s' },
        { target: 70,  duration: '5s' },
        { target: 80,  duration: '5s' },
        { target: 90,  duration: '5s' },
        { target: 100, duration: '5s' },
        { target: 110, duration: '5s' },
        { target: 120, duration: '5s' },
        { target: 130, duration: '5s' },
      ],
    },
  },
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

  checkLoginResponse(res);
}
