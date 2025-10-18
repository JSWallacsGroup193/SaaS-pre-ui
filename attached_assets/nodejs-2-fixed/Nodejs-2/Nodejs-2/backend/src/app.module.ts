
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
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
import { PrismaService } from './common/prisma.service';
import { JwtAttachMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      { ttl: 60_000, limit: 120 },
    ]),
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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAttachMiddleware).forRoutes('*');
  }
}
