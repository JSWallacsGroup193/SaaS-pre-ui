
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.validation';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { MetricsController } from './metrics.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/module';
import { WorkOrderModule } from './modules/workorder/module';
import { BarcodeModule } from './modules/barcode/module';
import { CrmModule } from './modules/crm/module';
import { DispatchModule } from './modules/dispatch/module';
import { InventoryModule } from './modules/inventory/module';
import { PurchasingModule } from './modules/purchasing/module';
import { ForecastModule } from './modules/forecast/module';
import { LabelModule } from './modules/labels/label.module';
import { ChatModule } from './modules/chat/module';
import { QueueModule } from './queue/queue.module';
import { ScannerModule } from './modules/scanner/module';
import { PrismaService } from './common/prisma.service';
import { JwtAttachMiddleware } from './middleware/jwt.middleware';
import { RequestIdMiddleware } from './middleware/request-id.middleware';

@Module({
  imports: [
    QueueModule,
    ConfigModule.forRoot({ isGlobal: true, validationSchema: configValidationSchema }),
    ThrottlerModule.forRoot([
      { ttl: 60_000, limit: 120 },
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'hvac-secret', signOptions: { expiresIn: '1h' } }),
    AuthModule,
    WorkOrderModule,
    BarcodeModule,
    CrmModule,
    DispatchModule,
    InventoryModule,
    PurchasingModule,
    ForecastModule,
    LabelModule,
    ChatModule,
    ScannerModule,
  ],
  controllers: [AppController, HealthController, MetricsController],
  providers: [AppService, PrismaService, { provide: APP_GUARD, useClass: ThrottlerGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, JwtAttachMiddleware).forRoutes('*');
  }
}
