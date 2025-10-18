import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service';
import { AuthController } from './controller';
import { MeController } from './me.controller';
import { PermissionsGuard } from './permissions.guard';

@Module({
  imports: [JwtModule.register({ secret: 'hvac-secret', signOptions: { expiresIn: '1h' } })],
  providers: [AuthService, PermissionsGuard],
  controllers: [AuthController, MeController],
})
export class AuthModule {}
