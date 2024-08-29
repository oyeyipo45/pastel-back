import { Environment } from '../common/types/env.enums';

export const configuration = (): {
  nodeENV: Environment;
  appPort: number;
} => ({
  nodeENV: <Environment>process.env.NODE_ENV,
  appPort: Number(process.env.APP_PORT),
});
