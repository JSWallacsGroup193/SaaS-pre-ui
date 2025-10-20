import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Headers,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('api/v1/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Headers('x-tenant-id') tenantId: string,
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    return this.paymentService.createPaymentIntent(
      tenantId,
      createPaymentIntentDto,
    );
  }

  @Post('confirm')
  async confirmPayment(
    @Headers('x-tenant-id') tenantId: string,
    @Body() confirmPaymentDto: ConfirmPaymentDto,
  ) {
    return this.paymentService.confirmPayment(
      tenantId,
      confirmPaymentDto.paymentIntentId,
      confirmPaymentDto.workOrderId,
    );
  }

  @Get('work-order/:workOrderId')
  async getPaymentsByWorkOrder(
    @Headers('x-tenant-id') tenantId: string,
    @Param('workOrderId') workOrderId: string,
  ) {
    return this.paymentService.getPaymentsByWorkOrder(tenantId, workOrderId);
  }

  @Get(':paymentId')
  async getPaymentStatus(
    @Headers('x-tenant-id') tenantId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return this.paymentService.getPaymentStatus(tenantId, paymentId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    const event = (this.paymentService as any).stripeService.constructWebhookEvent(
      req.rawBody,
      signature,
      webhookSecret,
    );

    if (event.type === 'payment_intent.succeeded') {
      await this.paymentService.handleWebhook(event);
    }

    return { received: true };
  }
}
