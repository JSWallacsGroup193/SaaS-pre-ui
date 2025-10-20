import { Module } from '@nestjs/common';
import { PaymentService } from './service';
import { PaymentController } from './controller';
import { StripeService } from './stripe.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, StripeService],
  exports: [PaymentService],
})
export class PaymentModule {}
