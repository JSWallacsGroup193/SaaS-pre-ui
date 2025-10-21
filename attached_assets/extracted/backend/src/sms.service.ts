import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async send(userId: string, message: string) {
    console.log(`[SMS] Sent to ${userId}: ${message}`);
  }
}