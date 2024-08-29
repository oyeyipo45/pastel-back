import { Environment } from './env.enums';

export interface Config {
  APP_PORT: number;
  NODE_ENV: Environment;
}
