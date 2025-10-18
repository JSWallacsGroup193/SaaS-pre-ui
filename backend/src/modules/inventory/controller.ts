import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InventoryService } from './service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get('skus/:tenantId')
  getSKUs(@Param('tenantId') tenantId: string) {
    return this.service.getSKUs(tenantId);
  }

  @Post('skus')
  createSKU(@Body() body: { tenantId: string; name: string; description?: string; barcode?: string }) {
    return this.service.createSKU(body);
  }

  @Get('ledger/:tenantId')
  getLedger(@Param('tenantId') tenantId: string) {
    return this.service.getStockLedger(tenantId);
  }

  @Post('ledger')
  createLedger(@Body() body: { tenantId: string; skuId: string; binId: string; quantity: number; direction: 'IN' | 'OUT'; note?: string }) {
    return this.service.createLedgerEntry(body);
  }

  @Get('warehouses/:tenantId')
  getWarehouses(@Param('tenantId') tenantId: string) {
    return this.service.getWarehouses(tenantId);
  }

  @Post('warehouses')
  createWarehouse(@Body() body: { tenantId: string; name: string }) {
    return this.service.createWarehouse(body);
  }

  @Get('bins/:tenantId')
  getBins(@Param('tenantId') tenantId: string) {
    return this.service.getBins(tenantId);
  }

  @Post('bins')
  createBin(@Body() body: { warehouseId: string; name: string }) {
    return this.service.createBin(body);
  }
}
