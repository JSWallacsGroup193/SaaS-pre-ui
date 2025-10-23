import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateServiceRequestDto {
  @IsString()
  accountId: string;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsString()
  equipmentId?: string;

  @IsString()
  requestType: string; // "repair", "maintenance", "installation", "inspection", "consultation"

  @IsString()
  problemDescription: string;

  @IsOptional()
  @IsDateString()
  preferredDateTime?: string;

  @IsOptional()
  @IsString()
  assignedTechId?: string;

  @IsOptional()
  @IsString()
  priority?: string; // "low", "normal", "high", "emergency"
}
