import { SharedArray } from 'k6/data';

export const users = new SharedArray('users', function () {
  return open('../data/users.csv')
    .split('\n')
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => {
      const [user, passwd] = line.split(',');
      return { user: user.trim(), passwd: passwd.trim() };
    });
});
