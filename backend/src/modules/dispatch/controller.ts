import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DispatchService } from './service';

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly service: DispatchService) {}

  @Post()
  create(@Body() body: { workOrderId: string; technicianId: string; startTime: string; endTime: string }) {
    return this.service.createSlot({
      ...body,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { technicianId?: string | null; startTime?: string; endTime?: string; status?: string }
  ) {
    return this.service.updateSlot(id, {
      ...body,
      startTime: body.startTime ? new Date(body.startTime) : undefined,
      endTime: body.endTime ? new Date(body.endTime) : undefined,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteSlot(id);
  }

  @Get('technician/:id')
  getForTechnician(@Param('id') technicianId: string) {
    return this.service.getTechnicianSlots(technicianId);
  }

  @Get('all')
  getAll() {
    return this.service.getAllSlots();
  }
}
