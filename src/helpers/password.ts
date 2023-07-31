import { MD5 } from 'crypto-js';
import config from 'src/configs';

export const createUserHash = (password: string) => {
  return MD5(`${password}:${config().secret}`).toString();
};

/**
 * Compare password with hash
 * @param password the user's input
 * @param hash the hash from database
 */
export const comparePassword = (password: string, hash: string) => {
  return createUserHash(password) === hash;
};
