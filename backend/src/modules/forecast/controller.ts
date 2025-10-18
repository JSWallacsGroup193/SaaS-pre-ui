import { Controller, Get, Post, Req } from '@nestjs/common';
import { ForecastService } from './service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly service: ForecastService) {}

  @Post()
  run(@Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.runForecastJob(String(tenantId));
  }

  @Get()
  get(@Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getForecasts(String(tenantId));
  }
}
