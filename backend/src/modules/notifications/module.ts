import { Module } from '@nestjs/common';
import { NotificationController } from './controller';
import { NotificationService } from './service';
import { NotificationGateway } from './gateway';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
