import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { NotificationPreferenceService } from './notification-preference.service';
import { AuthGuard } from '../auth.guard';

@Controller('api/v1/users/me/prefs')
@UseGuards(AuthGuard)
export class NotificationPreferenceController {
  constructor(private readonly service: NotificationPreferenceService) {}

  @Get()
  getPrefs(@Req() req) {
    return this.service.getUserPreferences(req.user.id);
  }

  @Put()
  updatePrefs(@Req() req, @Body() body) {
    return this.service.updateUserPreferences(req.user.id, body);
  }
}