import defaultConfig from './config.default';
import * as extend from 'extend2';
import { normalDatabase } from './utils';

function loadLocalConfig() {
  const { SERVER_ENV } = process.env;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`./config.${SERVER_ENV}`).default;
  } catch (_err) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`./config.default`).default;
  }
}

export default () => {
  const config: Config = extend(true, defaultConfig, loadLocalConfig());

  return {
    ...config,
    database: normalDatabase(config.database),
  };
};

export type Config = typeof defaultConfig;

export * from './envs';
