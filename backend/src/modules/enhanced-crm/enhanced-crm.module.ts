import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { ServiceRequestModule } from './service-request/service-request.module';
import { CustomerPerformanceModule } from './customer-performance/customer-performance.module';

@Module({
  imports: [PropertyModule, ServiceRequestModule, CustomerPerformanceModule],
  exports: [PropertyModule, ServiceRequestModule, CustomerPerformanceModule],
})
export class EnhancedCrmModule {}
