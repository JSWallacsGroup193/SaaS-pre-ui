import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationGateway } from './notification.gateway';
import { MailService } from '../mail.service';
import { SmsService } from '../sms.service';
import { SettingsService } from '../settings.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationGateway,
    private mailService: MailService,
    private smsService: SmsService,
    private settings: SettingsService,
  ) {}

  async notify(userId: string, tenantId: string, message: string, type: 'IN_APP' | 'EMAIL' | 'SMS') {
    const notification = await this.prisma.notification.create({
      data: { userId, tenantId, message, type },
    });

    if (type === 'IN_APP') {
      this.gateway.emitToTenant(tenantId, notification);
    }

    const prefs = await this.settings.getUserPreferences(userId);
    if (type === 'EMAIL' && prefs.email) await this.mailService.send(userId, message);
    if (type === 'SMS' && prefs.sms) await this.smsService.send(userId, message);

    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}