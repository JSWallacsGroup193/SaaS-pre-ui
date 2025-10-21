import { Controller, Get, Post, Req, Param } from '@nestjs/common';
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

  @Get('sku/:skuId')
  getForSKU(@Param('skuId') skuId: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getForecastForSKU(skuId, String(tenantId));
  }
}
