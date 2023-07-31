export const ERROR_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  EMPTY: -2,
  PARAM_ERR: -3,
  FAIL_AUTH: -4,
  OVER_LIMIT: -5,

  AUTH: {
    PASSWORD_WRONG: 1000,
    USER_INVALID: 1001,
  },
} as const;

export const ERROR_MSG = {
  0: 'success',
  '-1': 'failed',
  '-2': 'data empty',
  '-3': 'parameters error',
  '-4': 'please login',
  '-5': 'attempt too many times',

  1000: 'password error, please try again or retrieve password by registered email',
  1001: 'accounr invalid',
} as const;
