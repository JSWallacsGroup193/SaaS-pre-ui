import { Module } from '@nestjs/common';
import { EstimatorService } from './estimator.service';
import { EstimatorController } from './estimator.controller';
import { OpenAiService } from '../ai-chat/openai.service';
import { PrismaService } from '@/common/prisma/prisma.service';

@Module({
  controllers: [EstimatorController],
  providers: [EstimatorService, OpenAiService, PrismaService],
})
export class EstimatorModule {}