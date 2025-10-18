
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './service';
import { AuthController } from './controller';
import { MeController } from './me.controller';
import { PermissionsGuard } from './permissions.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET', 'hvac-secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, PermissionsGuard],
  controllers: [AuthController, MeController],
  exports: [JwtModule],
})
export class AuthModule {}
