import {
  HttpException as OriginHttpException,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_CODE, ERROR_MSG } from './error.helper';

export class BusinessError extends OriginHttpException {
  constructor(code: number, message?: string);
  constructor(message: string, code?: number);
  constructor(messageOrCode: string | number, codeOrMessage: number | string) {
    let code: number = ERROR_CODE.FAIL;
    let message = 'unknown error';

    if (typeof messageOrCode === 'number') {
      code = messageOrCode;
      message = codeOrMessage ?? ERROR_MSG[code] ?? message;
    } else {
      message = messageOrCode;
      code = (codeOrMessage as number) ?? code;
    }

    super(
      {
        code,
        message,
      },
      HttpStatus.OK,
    );
  }
}
