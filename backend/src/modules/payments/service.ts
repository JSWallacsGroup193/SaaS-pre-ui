import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeService } from './stripe.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

const prisma = new PrismaClient();

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  async createPaymentIntent(
    tenantId: string,
    createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    const { amount, workOrderId, description } = createPaymentIntentDto;

    const workOrder = await prisma.workOrder.findFirst({
      where: {
        id: workOrderId,
        tenantId,
      },
      include: {
        customer: true,
      },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      'usd',
      {
        workOrderId,
        workOrderNumber: workOrder.number,
        tenantId,
      },
    );

    const payment = await prisma.payment.create({
      data: {
        tenantId,
        workOrderId,
        accountId: workOrder.customerId,
        amount,
        paymentMethod: 'stripe',
        stripePaymentIntentId: paymentIntent.id,
        stripeClientSecret: paymentIntent.client_secret,
        stripeStatus: paymentIntent.status,
        notes: description,
      },
    });

    return {
      paymentId: payment.id,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async confirmPayment(
    tenantId: string,
    paymentIntentId: string,
    workOrderId: string,
  ) {
    const paymentIntent =
      await this.stripeService.retrievePaymentIntent(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new BadRequestException('Payment has not been completed');
    }

    const payment = await prisma.payment.findFirst({
      where: {
        stripePaymentIntentId: paymentIntentId,
        tenantId,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        stripeStatus: paymentIntent.status,
        paymentDate: new Date(),
      },
    });

    return {
      success: true,
      paymentId: payment.id,
      status: paymentIntent.status,
    };
  }

  async getPaymentsByWorkOrder(tenantId: string, workOrderId: string) {
    return prisma.payment.findMany({
      where: {
        tenantId,
        workOrderId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPaymentStatus(tenantId: string, paymentId: string) {
    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        tenantId,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.stripePaymentIntentId) {
      const paymentIntent = await this.stripeService.retrievePaymentIntent(
        payment.stripePaymentIntentId,
      );

      if (paymentIntent.status !== payment.stripeStatus) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            stripeStatus: paymentIntent.status,
          },
        });
      }

      return {
        ...payment,
        stripeStatus: paymentIntent.status,
      };
    }

    return payment;
  }

  async handleWebhook(event: any) {
    const paymentIntent = event.data.object;

    const payment = await prisma.payment.findFirst({
      where: {
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    if (!payment) {
      console.error('Payment not found for webhook event');
      return;
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        stripeStatus: paymentIntent.status,
        paymentDate:
          paymentIntent.status === 'succeeded' ? new Date() : payment.paymentDate,
      },
    });

    console.log(
      `Payment ${payment.id} updated to status: ${paymentIntent.status}`,
    );
  }
}
