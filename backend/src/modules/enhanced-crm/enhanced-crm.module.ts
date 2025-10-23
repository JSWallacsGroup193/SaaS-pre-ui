import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { CustomerPerformanceModule } from './customer-performance/customer-performance.module';

@Module({
  imports: [PropertyModule, CustomerPerformanceModule],
  exports: [PropertyModule, CustomerPerformanceModule],
})
export class EnhancedCrmModule {}
