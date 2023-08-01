export const getValidateCode = (n: number) => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let ret = '';

  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * 62);

    ret += s.charAt(index);
  }

  return ret;
};
