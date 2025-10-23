import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceRequestDto } from './create-service-request.dto';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateServiceRequestDto extends PartialType(CreateServiceRequestDto) {
  @IsOptional()
  @IsString()
  status?: string; // "new", "scheduled", "in_progress", "completed", "cancelled"

  @IsOptional()
  @IsString()
  technicianNotes?: string;

  @IsOptional()
  @IsDateString()
  scheduledDateTime?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsString()
  workOrderId?: string; // Link to created WorkOrder
}
