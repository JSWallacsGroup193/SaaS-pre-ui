import { Module } from '@nestjs/common';
import { NotificationService } from './notifications/notification.service';
import { NotificationGateway } from './notifications/notification.gateway';
import { NotificationController } from './notifications/notification.controller';
import { NotificationPreferenceService } from './notification-preference/notification-preference.service';
import { NotificationPreferenceController } from './notification-preference/notification-preference.controller';
import { PrismaService } from './prisma.service';
import { MailService } from './mail.service';
import { SmsService } from './sms.service';
import { SettingsService } from './settings.service';

@Module({
  controllers: [NotificationController, NotificationPreferenceController],
  providers: [
    NotificationService,
    NotificationGateway,
    NotificationPreferenceService,
    PrismaService,
    MailService,
    SmsService,
    SettingsService,
  ],
})
export class AppModule {}