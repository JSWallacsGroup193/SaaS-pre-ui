import { Controller, Get, Post, Body } from '@nestjs/common'
import { UtilityService } from './utility.service'

@Controller('utility')
export class UtilityController {
  constructor(private readonly service: UtilityService) {}

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
