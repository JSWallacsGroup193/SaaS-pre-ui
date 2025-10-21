import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async send(userId: string, message: string) {
    console.log(`[EMAIL] Sent to ${userId}: ${message}`);
  }
}