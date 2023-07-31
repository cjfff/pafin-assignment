import { createConfig } from './utils';

export default createConfig({
  env: process.env.SERVER_ENV,

  secret: 'PgJtF8kcIR4eNtRZ',
  jwtSecret: 'd41d8cd98f00b204e9800998ecf8427e',

  database: {
    pafin: {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'pafin',
      charset: 'utf8mb4',
    },
  },
});
