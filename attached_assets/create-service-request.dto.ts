
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateServiceRequestDto {
  @IsString()
  customerId: string;

  @IsString()
  equipmentId: string;

  @IsString()
  requestType: string;

  @IsString()
  problemDescription: string;

  @IsDateString()
  preferredDateTime: string;

  @IsOptional()
  @IsString()
  technicianNotes?: string;

  @IsString()
  status: string;
}
