import { Module } from '@nestjs/common';
import { EstimatorService } from './estimator.service';
import { EstimatorController } from './estimator.controller';

@Module({
  controllers: [EstimatorController],
  providers: [EstimatorService],
})
export class EstimatorModule {}
