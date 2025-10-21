import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getUserPreferences(userId: string) {
    return this.prisma.notificationPreference.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }
}