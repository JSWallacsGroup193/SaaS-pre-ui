import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './dto';

@Controller('api/v1/service-requests')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateServiceRequestDto) {
    const tenantId = req.user.tenantId;
    return this.serviceRequestService.create(tenantId, dto);
  }

  @Get()
  findAll(
    @Request() req: any,
    @Query('accountId') accountId?: string,
    @Query('status') status?: string,
  ) {
    const tenantId = req.user.tenantId;
    return this.serviceRequestService.findAll(tenantId, accountId, status);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.user.tenantId;
    return this.serviceRequestService.findOne(tenantId, id);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateServiceRequestDto) {
    const tenantId = req.user.tenantId;
    return this.serviceRequestService.update(tenantId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.user.tenantId;
    return this.serviceRequestService.remove(tenantId, id);
  }
}
