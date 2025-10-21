import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NotificationGateway } from './gateway';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {
  constructor(private readonly gateway: NotificationGateway) {}

  /**
   * Create and send a notification
   */
  async createNotification(params: {
    userId: string;
    tenantId: string;
    title: string;
    message: string;
    type?: string;
    category?: string;
    entityType?: string;
    entityId?: string;
    actionUrl?: string;
  }) {
    const {
      userId,
      tenantId,
      title,
      message,
      type = 'info',
      category,
      entityType,
      entityId,
      actionUrl,
    } = params;

    // Create notification in database
    const notification = await prisma.notification.create({
      data: {
        userId,
        tenantId,
        title,
        message,
        type,
        category,
        entityType,
        entityId,
        actionUrl,
      },
    });

    // Send via WebSocket if user is online
    this.gateway.emitToUser(userId, notification);

    // Check user preferences for email/SMS
    const prefs = await prisma.notificationPreference.findUnique({
      where: { userId },
    });

    // TODO: Send email if enabled
    if (prefs?.emailEnabled && this.shouldSendEmail(category, prefs)) {
      // await this.sendEmail(userId, notification);
      console.log(`[Email] Would send to user ${userId}: ${title}`);
    }

    // TODO: Send SMS if enabled
    if (prefs?.smsEnabled && this.shouldSendSMS(category, prefs)) {
      // await this.sendSMS(userId, notification);
      console.log(`[SMS] Would send to user ${userId}: ${title}`);
    }

    return notification;
  }

  /**
   * Get user's notifications
   */
  async getUserNotifications(userId: string, limit = 50) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string, userId: string) {
    return prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId, // Ensure user owns this notification
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string, userId: string) {
    return prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId, // Ensure user owns this notification
      },
    });
  }

  /**
   * Get or create user notification preferences
   */
  async getUserPreferences(userId: string) {
    let prefs = await prisma.notificationPreference.findUnique({
      where: { userId },
    });

    if (!prefs) {
      prefs = await prisma.notificationPreference.create({
        data: { userId },
      });
    }

    return prefs;
  }

  /**
   * Update user notification preferences
   */
  async updateUserPreferences(
    userId: string,
    data: {
      emailEnabled?: boolean;
      emailWorkOrders?: boolean;
      emailInvoices?: boolean;
      emailReports?: boolean;
      emailSystemAlerts?: boolean;
      inAppEnabled?: boolean;
      inAppWorkOrders?: boolean;
      inAppInvoices?: boolean;
      inAppReports?: boolean;
      inAppSystemAlerts?: boolean;
      smsEnabled?: boolean;
      smsWorkOrders?: boolean;
      smsInvoices?: boolean;
      smsSystemAlerts?: boolean;
      dailyDigest?: boolean;
      weeklyDigest?: boolean;
      digestTime?: string;
    }
  ) {
    // Get or create preferences first
    await this.getUserPreferences(userId);

    return prisma.notificationPreference.update({
      where: { userId },
      data,
    });
  }

  /**
   * Helper: Check if should send email based on category and preferences
   */
  private shouldSendEmail(category: string | null | undefined, prefs: any): boolean {
    if (!prefs?.emailEnabled) return false;
    
    switch (category) {
      case 'work_order':
        return prefs.emailWorkOrders;
      case 'invoice':
        return prefs.emailInvoices;
      case 'report':
        return prefs.emailReports;
      case 'system':
        return prefs.emailSystemAlerts;
      default:
        return false;
    }
  }

  /**
   * Helper: Check if should send SMS based on category and preferences
   */
  private shouldSendSMS(category: string | null | undefined, prefs: any): boolean {
    if (!prefs?.smsEnabled) return false;
    
    switch (category) {
      case 'work_order':
        return prefs.smsWorkOrders;
      case 'invoice':
        return prefs.smsInvoices;
      case 'system':
        return prefs.smsSystemAlerts;
      default:
        return false;
    }
  }
}
