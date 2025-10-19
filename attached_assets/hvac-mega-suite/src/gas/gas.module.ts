import { Module } from '@nestjs/common'
import { GasService } from './gas.service'
import { GasController } from './gas.controller'
import { PrismaService } from '../prisma.service'

@Module({
  controllers: [GasController],
  providers: [GasService, PrismaService],
})
export class GasModule {}
