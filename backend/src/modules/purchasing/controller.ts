import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { PurchasingService } from './service';

@Controller('purchasing')
export class PurchasingController {
  constructor(private readonly service: PurchasingService) {}

  @Get(':tenantId')
  getAll(@Param('tenantId') tenantId: string) {
    return this.service.getPOs(tenantId);
  }

  @Post()
  create(@Body() body: { tenantId: string; skuId: string; quantity: number }) {
    return this.service.createPO(body);
  }

  @Put(':id/receive')
  receive(@Param('id') id: string) {
    return this.service.receivePO(id);
  }
}
