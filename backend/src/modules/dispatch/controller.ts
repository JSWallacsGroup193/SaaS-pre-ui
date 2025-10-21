import { Controller, Post, Body, Get, Param, Put, Delete, Req } from '@nestjs/common';
import { DispatchService } from './service';

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly service: DispatchService) {}

  @Post()
  create(@Body() body: { workOrderId: string; technicianId: string; startTime: string; endTime: string }, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.createSlot({
      ...body,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    }, String(tenantId));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { technicianId?: string | null; startTime?: string; endTime?: string; status?: string },
    @Req() req: any
  ) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.updateSlot(id, {
      ...body,
      startTime: body.startTime ? new Date(body.startTime) : undefined,
      endTime: body.endTime ? new Date(body.endTime) : undefined,
    }, String(tenantId));
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.deleteSlot(id, String(tenantId));
  }

  @Get('technician/:id')
  getForTechnician(@Param('id') technicianId: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getTechnicianSlots(technicianId, String(tenantId));
  }

  @Get('all')
  getAll(@Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getAllSlots(String(tenantId));
  }
}
