import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({ version: '1' })
export class HealthController {
  constructor(private healthCheckService: HealthCheckService) {}

  @ApiOperation({ summary: 'Check application health' })
  @Get('api/health')
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> => ({
        ['Pastel-backend']: { status: 'up' },
      }),
    ]);
  }
}
