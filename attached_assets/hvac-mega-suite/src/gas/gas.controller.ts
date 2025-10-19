import { Controller, Get, Post, Body } from '@nestjs/common'
import { GasService } from './gas.service'

@Controller('gas')
export class GasController {
  constructor(private readonly service: GasService) {}

  @Get()
  async all() {
    return this.service.findAll()
  }

  @Post()
  async create(@Body() body: any) {
    return this.service.create(body)
  }

  @Post('sync')
  async sync(@Body() entries: any[]) {
    return this.service.bulkSync(entries)
  }
}
