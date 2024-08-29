import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  validateSync,
} from 'class-validator';
import { Environment } from '../common/types/env.enums';
import { Config } from '../common/types/config.type';

export class EnvironmentVariables implements Config {
  @IsNumber()
  @IsDefined()
  APP_PORT!: number;

  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV!: Environment;
}

export function configValidator(
  configuration: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfiguration = plainToClass(
    EnvironmentVariables,
    configuration,
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validatedConfiguration, {
    skipMissingProperties: false,
  });

  // Throw error for environment variables failed validation
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfiguration;
}
