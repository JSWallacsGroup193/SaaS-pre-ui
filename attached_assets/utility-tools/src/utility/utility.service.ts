import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UtilityService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.utilityLog.create({ data })
  }

  async bulkSync(entries: any[]) {
    return this.prisma.utilityLog.createMany({ data: entries })
  }

  async findAll() {
    return this.prisma.utilityLog.findMany({ orderBy: { timestamp: 'desc' } })
  }
}
