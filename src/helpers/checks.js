import { check } from 'k6';

export function checkLoginResponse(res) {
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response has token': (r) => {
      try {
        return JSON.parse(r.body).token !== undefined;
      } catch {
        return false;
      }
    },
  });
}
