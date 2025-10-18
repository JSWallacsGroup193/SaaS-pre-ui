
import { Controller, Get, Post, Body, Req, Query, ParseIntPipe } from '@nestjs/common';
import { AuthenticatedRequest } from '../../common/request.types';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { CreateBinDto } from './dto/create-bin.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
    @Req() req: AuthenticatedRequest,
    @Query('q') q?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize = 50,
  ) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getSKUs(String(tenantId), q, page, pageSize);
  }

  @Post('skus')
  createSKU(@Body() body: CreateSkuDto, @Req() req: AuthenticatedRequest) {
    const tenantId = body.tenantId || req.user?.tenantId;
    return this.service.createSKU({ ...body, tenantId: String(tenantId) });
  }

  @Get('warehouses')
  getWarehouses(@Req() req: AuthenticatedRequest) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getWarehouses(String(tenantId));
  }

  @Post('warehouses')
  createWarehouse(@Body() body: { tenantId?: string; name: string }, @Req() req: AuthenticatedRequest) {
    const tenantId = body.tenantId || req.user?.tenantId;
    return this.service.createWarehouse({ ...body, tenantId: String(tenantId) });
  }

  @Get('bins')
  getBins(@Req() req: AuthenticatedRequest) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getBins(String(tenantId));
  }

  @Post('bins')
  createBin(@Body() body: CreateBinDto) {
    return this.service.createBin(body);
  }
}
