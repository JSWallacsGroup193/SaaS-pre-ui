import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/module';
import { WorkOrderModule } from './modules/workorder/module';
import { BarcodeModule } from './modules/barcode/barcode.module';
import { CrmModule } from './modules/crm/module';
import { DispatchModule } from './modules/dispatch/module';
import { InventoryModule } from './modules/inventory/module';
import { PurchasingModule } from './modules/purchasing/module';
import { ForecastModule } from './modules/forecast/module';
import { LabelModule } from './modules/labels/label.module';
import { ChatModule } from './modules/chat/module';

@Module({
  imports: [
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
})
export class AppModule {}
