import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { WorkOrderService } from './service';
import { WorkOrderStatus } from '@prisma/client';

@Controller('work-orders')
export class WorkOrderController {
  constructor(private readonly service: WorkOrderService) {}

  @Get('by-tenant/:tenantId/stats')
  getStats(@Param('tenantId') tenantId: string) {
    return this.service.getStats(tenantId);
  }

  @Get('by-tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.service.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.findOne(id, String(tenantId));
  }

  @Post()
  create(@Body() body: { tenantId: string, title: string, description?: string }) {
    return this.service.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: WorkOrderStatus }, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.updateStatus(id, body.status, String(tenantId));
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.delete(id, String(tenantId));
  }
}
