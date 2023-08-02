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
    OPERATION_FAILED: 1003,
    PASSWORD_NOT_MATCH: 1004,
  },

  ACOUNT_EXISTED: 1002,
  USER_NOT_FOUND: 1005,
} as const;

export const ERROR_MSG = {
  0: 'success',
  '-1': 'failed',
  '-2': 'data empty',
  '-3': 'parameters error',
  '-4': 'please login',
  '-5': 'attempt too many times',

  1000: 'password error, please try again or retrieve password by registered email',
  1001: 'account invalid',
  1002: 'account existed',
  1003: 'You are not allowed to take this operation',
  1004: 'password not matched',
  1005: 'User not found',
} as const;
