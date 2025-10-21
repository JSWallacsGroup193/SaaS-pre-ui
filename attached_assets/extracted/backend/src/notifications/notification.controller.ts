import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../auth.guard';

@Controller('api/v1/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('test')
  @UseGuards(AuthGuard)
  async testNotification(@Body() body, @Req() req) {
    const { userId, message, type } = body;
    return this.notificationService.notify(userId, req.user.tenantId, message, type);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getNotifications(@Req() req) {
    return this.notificationService.getUserNotifications(req.user.id);
  }
}