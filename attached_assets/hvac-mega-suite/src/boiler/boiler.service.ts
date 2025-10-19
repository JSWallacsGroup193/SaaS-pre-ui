import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class BoilerService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.boilerLog.create({ data })
  }

  async bulkSync(entries: any[]) {
    return this.prisma.boilerLog.createMany({ data: entries })
  }

  async findAll() {
    return this.prisma.boilerLog.findMany({ orderBy: { timestamp: 'desc' } })
  }
}
