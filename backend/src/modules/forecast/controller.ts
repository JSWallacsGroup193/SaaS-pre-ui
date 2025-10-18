import { Controller, Post, Get, Param } from '@nestjs/common';
import { ForecastService } from './service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly service: ForecastService) {}

  @Post(':tenantId')
  run(@Param('tenantId') tenantId: string) {
    return this.service.runForecastJob(tenantId);
  }

  @Get(':tenantId')
  get(@Param('tenantId') tenantId: string) {
    return this.service.getForecasts(tenantId);
  }
}
