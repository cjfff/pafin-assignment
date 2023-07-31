import { MD5 } from 'crypto-js';
import config from 'src/configs';

export const createUserHash = (password: string) => {
  return MD5(`${password}:${config().secret}`).toString();
};

export const comparePassword = (password: string, hash: string) => {
  return createUserHash(password) === hash;
};
