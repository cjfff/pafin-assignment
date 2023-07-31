import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export interface IConfig {
  database: Record<string, TypeOrmModuleOptions>;
}

export function normalDatabase(database: IConfig['database']) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { isDevelopment } = require('./envs');
  const res = { ...database };

  Object.entries(res).forEach(([name, config]) => {
    res[name as keyof IConfig['database']] = {
      name,
      type: 'postgres',
      entities: [path.join(__dirname, '..', 'entities', '*.entity.js')],
      synchronize: isDevelopment,
      logging: isDevelopment ? true : ['error'],
      charset: 'utf8mb4',
      // bigNumberStrings: false,
      // maxQueryExecutionTime: 1000,
      ...config,
    } as any;
  });

  return res;
}

export function createConfig<T extends Partial<IConfig> & Record<string, any>>(
  config: T,
) {
  return config;
}
