import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationPreferenceService {
  constructor(private prisma: PrismaService) {}

  getUserPreferences(userId: string) {
    return this.prisma.notificationPreference.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  updateUserPreferences(userId: string, data: Partial<{ email: boolean; sms: boolean; inApp: boolean }>) {
    return this.prisma.notificationPreference.update({
      where: { userId },
      data,
    });
  }
}