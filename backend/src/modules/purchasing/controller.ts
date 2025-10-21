
import { Controller, Get, Post, Put, Param, Body, Req, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PurchasingService } from './service';
import { CreatePoDto } from './dto/create-po.dto';

@ApiTags('purchasing')
@ApiBearerAuth()
@Controller('purchasing')
export class PurchasingController {
  constructor(private readonly service: PurchasingService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, schema: { default: 1 } })
  @ApiQuery({ name: 'pageSize', required: false, schema: { default: 50 } })
  getAll(
    @Req() req: any,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize = 50,
  ) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getPOs(String(tenantId), page, pageSize);
  }

  @Post()
  create(@Body() body: CreatePoDto, @Req() req: any) {
    const tenantId = body.tenantId || req.user?.tenantId;
    return this.service.createPO({ ...body, tenantId: String(tenantId) });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getPO(id);
  }

  @Put(':id/receive')
  receive(@Param('id') id: string) {
    return this.service.receivePO(id);
  }

  @Put(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.service.cancelPO(id);
  }
}
