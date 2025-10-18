import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { WorkOrderService } from './service';
import { WorkOrderStatus } from '@prisma/client';

@Controller('work-orders')
export class WorkOrderController {
  constructor(private readonly service: WorkOrderService) {}

  @Get(':tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.service.findAll(tenantId);
  }

  @Post()
  create(@Body() body: { tenantId: string, title: string, description?: string }) {
    return this.service.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: WorkOrderStatus }) {
    return this.service.updateStatus(id, body.status);
  }
}
