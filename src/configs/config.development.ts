import { createConfig } from './utils';

export default createConfig({
  env: process.env.SERVER_ENV,

  secret: process.env.secret,

  database: {
    pafin: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
  },
});
