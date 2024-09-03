import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Enviroment {
    LOCAL = 'local',
    DEV = 'dev',
    PROD = 'production'
}

class EnvironmentVariables {
    @IsEnum(Enviroment)
    NODE_ENV: Enviroment;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(
      EnvironmentVariables,
      config,
      { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }