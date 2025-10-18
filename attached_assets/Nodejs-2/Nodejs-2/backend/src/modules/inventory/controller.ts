
import { Controller, Get, Post, Body, Req, Query, ParseIntPipe, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { InventoryService } from './service';
import { CreateSkuDto } from './dto/create-sku.dto';

@ApiTags('inventory')
@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get('skus')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'page', required: false, schema: { default: 1 } })
  @ApiQuery({ name: 'pageSize', required: false, schema: { default: 50 } })
  getSKUs(
    @Req() req: any,
    @Query('q') q?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize = 50,
  ) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getSKUs(String(tenantId), q, page, pageSize);
  }

  @Post('skus')
  createSKU(@Body() body: CreateSkuDto, @Req() req: any) {
    const tenantId = body.tenantId || req.user?.tenantId;
    return this.service.createSKU({ ...body, tenantId: String(tenantId) });
  }

  @Get('warehouses')
  getWarehouses(@Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getWarehouses(String(tenantId));
  }

  @Post('warehouses')
  createWarehouse(@Body() body: { tenantId?: string; name: string }, @Req() req: any) {
    const tenantId = body.tenantId || req.user?.tenantId;
    return this.service.createWarehouse({ ...body, tenantId: String(tenantId) });
  }

  @Get('bins')
  getBins(@Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getBins(String(tenantId));
  }

  @Post('bins')
  createBin(@Body() body: { warehouseId: string; name: string }) {
    return this.service.createBin(body);
  }
  @Get('skus/:id/onhand')
  @ApiOkResponse({ schema: { example: { onHand: 42 } } })
  getOnHand(@Param('id') skuId: string, @Req() req: AuthenticatedRequest) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getOnHand(String(tenantId), skuId);
  }


@Get('low-stock')
@ApiQuery({ name: 'threshold', required: false, schema: { default: 5 } })
@ApiQuery({ name: 'limit', required: false, schema: { default: 20 } })
@ApiOkResponse({ schema: { example: [{ id: 'sku1', name: 'Filter', onHand: 2 }] } })
getLowStock(
  @Req() req: AuthenticatedRequest,
  @Query('threshold', new ParseIntPipe({ optional: true })) threshold = 5,
  @Query('limit', new ParseIntPipe({ optional: true })) limit = 20,
) {
  const tenantId = req.user?.tenantId || req.query?.tenantId;
  return this.service.getLowStock(String(tenantId), threshold, limit);
}
@Get('skus/:id')
@ApiOkResponse({ schema: { example: { id: 'sku1', name: 'Filter', barcode: '123', onHand: 5 } } })
async getSkuById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
  const tenantId = req.user?.tenantId || req.query?.tenantId;
  const base = await this.service.getSKUById(String(tenantId), id);
  const oh = await this.service.getOnHand(String(tenantId), id);
  return { ...base, ...oh };
}

}
