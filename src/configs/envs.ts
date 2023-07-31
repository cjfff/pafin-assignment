/*
 * @Author: minfive
 * @Date: 2021-01-27 19:04:34
 * @LastEditors: minfive
 * @LastEditTime: 2021-03-23 12:09:44
 */

import { EnumServerEnv } from '../types/enum';

const { SERVER_ENV, DEBUG_MODE, NODE_ENV } = process.env;

export const isLocalEnv = SERVER_ENV === EnumServerEnv.Local;

export const isDevEnv = SERVER_ENV === EnumServerEnv.Development;

export const isPreEnv = SERVER_ENV === EnumServerEnv.PreRelease;

export const isProdEnv = SERVER_ENV === EnumServerEnv.Production;

export const isDebugMode = DEBUG_MODE === 'yes';

export const isDevelopment = NODE_ENV === 'development';
