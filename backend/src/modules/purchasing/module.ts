import { Module } from '@nestjs/common';
import { PurchasingService } from './service';
import { PurchasingController } from './controller';

@Module({
  controllers: [PurchasingController],
  providers: [PurchasingService],
})
export class PurchasingModule {}
