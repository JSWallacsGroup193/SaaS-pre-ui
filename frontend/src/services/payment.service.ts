import api from './api';
import type {
  Payment,
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
} from '../types';

export const paymentService = {
  async createPaymentIntent(
    data: CreatePaymentIntentRequest,
  ): Promise<CreatePaymentIntentResponse> {
    return await api.post<CreatePaymentIntentResponse>(
      '/payments/create-payment-intent',
      data,
    );
  },

  async confirmPayment(
    data: ConfirmPaymentRequest,
  ): Promise<ConfirmPaymentResponse> {
    return await api.post<ConfirmPaymentResponse>(
      '/payments/confirm',
      data,
    );
  },

  async getPaymentsByWorkOrder(workOrderId: string): Promise<Payment[]> {
    return await api.get<Payment[]>(
      `/payments/work-order/${workOrderId}`,
    );
  },

  async getPaymentStatus(paymentId: string): Promise<Payment> {
    return await api.get<Payment>(`/payments/${paymentId}`);
  },
};
