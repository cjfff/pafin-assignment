import {
  HttpException as OriginHttpException,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_CODE, ERROR_MSG } from './error.helper';

export class BusinessError extends OriginHttpException {
  constructor(code: number, message?: string);
  constructor(message: string, code?: number);
  constructor(messageOrCode: string | number, codeOrMessage: number | string) {
    let statusCode: number = ERROR_CODE.FAIL;
    let message = 'unknown error';

    if (typeof messageOrCode === 'number') {
      statusCode = messageOrCode;
      message = codeOrMessage ?? ERROR_MSG[statusCode] ?? message;
    } else {
      message = messageOrCode;
      statusCode = (codeOrMessage as number) ?? statusCode;
    }

    super(
      {
        statusCode,
        message: [message],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
