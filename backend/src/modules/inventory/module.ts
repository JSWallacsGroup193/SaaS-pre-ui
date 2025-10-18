import { Module } from '@nestjs/common';
import { InventoryService } from './service';
import { InventoryController } from './controller';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
