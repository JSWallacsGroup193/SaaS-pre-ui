import { Controller, Get, Post, Body } from '@nestjs/common'
import { BoilerService } from './boiler.service'

@Controller('boiler')
export class BoilerController {
  constructor(private readonly service: BoilerService) {}

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
