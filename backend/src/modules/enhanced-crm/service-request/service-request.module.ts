import { Module } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { PrismaService } from '../../../common/prisma.service';

@Module({
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService, PrismaService],
  exports: [ServiceRequestService],
})
export class ServiceRequestModule {}
