import { Throttle } from '@nestjs/throttler';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle(5, 60)
  @Post('register')
  register(@Body() body: { email: string; password: string; tenantId: string }) {
    return this.authService.register(body.email, body.password, body.tenantId);
  }

  @Throttle(10, 60)
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.service.refresh(body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: { refreshToken: string }) {
    return this.service.revoke(body.refreshToken);
  }
}
