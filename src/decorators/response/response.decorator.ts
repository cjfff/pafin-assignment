import { SetMetadata } from '@nestjs/common';
import { TOKENS } from './response.helper';

/**
 * Response transformer decorator
 *
 * @param cancel skip the response formation
 */
export const ResponseTransformer = (cancel: boolean) =>
  SetMetadata(TOKENS.passFlag, cancel);
