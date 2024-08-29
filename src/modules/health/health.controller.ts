import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Controller({ version: '1' })
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
  ) {}

  @Get('api/health')
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> => ({
        ["Pastel-backend"]: { status: 'up' },
      }),
    ]);
  }
}
