import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class MeController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('me')
  async getMe(@Req() req: any) {
    return req.user || { message: 'Not authenticated' };
  }
}
