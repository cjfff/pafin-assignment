import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TOKENS } from './response.helper';
import { Response } from 'src/types/common';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const isPass =
      this.reflector.get<boolean>(TOKENS.passFlag, context.getHandler()) ||
      false;

    return next.handle().pipe(
      map((data) => {
        const res: Response<T> = {
          data,
          statusCode: 0,
          message: 'success',
        };

        return isPass ? data : res;
      }),
    );
  }
}
