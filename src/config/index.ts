import { Environment } from '../common/types/env.enums';

export const configuration = (): {
  nodeENV: Environment;
  appPort: number;
  username: string;
  db_name: string;
  password: string;
} => ({
  nodeENV: <Environment>process.env.NODE_ENV,
  appPort: Number(process.env.APP_PORT),
  username: String(process.env.USERNAME),
  db_name: String(process.env.DB_NAME),
  password: String(process.env.PASSWORD),
});
