import { Module } from '@nestjs/common';
import { ForecastService } from './service';
import { ForecastController } from './controller';

@Module({
  providers: [ForecastService],
  controllers: [ForecastController],
})
export class ForecastModule {}
