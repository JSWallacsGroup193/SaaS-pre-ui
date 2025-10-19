import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class GasService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.gasLog.create({ data })
  }

  async bulkSync(entries: any[]) {
    return this.prisma.gasLog.createMany({ data: entries })
  }

  async findAll() {
    return this.prisma.gasLog.findMany({ orderBy: { timestamp: 'desc' } })
  }
}
