import { Module } from '@nestjs/common'
import { BoilerService } from './boiler.service'
import { BoilerController } from './boiler.controller'
import { PrismaService } from '../prisma.service'

@Module({
  controllers: [BoilerController],
  providers: [BoilerService, PrismaService],
})
export class BoilerModule {}
