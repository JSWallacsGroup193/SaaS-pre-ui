import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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

  @Get('technician/:id')
  getForTechnician(@Param('id') technicianId: string) {
    return this.service.getTechnicianSlots(technicianId);
  }

  @Get('all')
  getAll() {
    return this.service.getAllSlots();
  }
}
