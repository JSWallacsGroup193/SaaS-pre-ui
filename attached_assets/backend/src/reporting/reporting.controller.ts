import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { AuthGuard } from '../auth.guard';

@Controller('api/v1/reports')
@UseGuards(AuthGuard)
export class ReportingController {
  constructor(private readonly service: ReportingService) {}

  @Get('financial')
  async getFinancial(@Query() query, @Req() req) {
    return this.service.getFinancialReport(req.user.tenantId, query);
  }

  @Get('performance')
  async getPerformance(@Query() query, @Req() req) {
    return this.service.getPerformanceReport(req.user.tenantId, query);
  }
}
  @Get('custom')
  async getCustom(@Query() query, @Req() req) {
    return this.service.getCustomReport(req.user.tenantId, query);
  }
