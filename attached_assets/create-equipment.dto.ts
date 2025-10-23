
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  propertyId: string;

  @IsString()
  systemType: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsOptional()
  @IsDateString()
  installDate?: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  maintenanceHistory?: string;

  @IsOptional()
  @IsString()
  warrantyStatus?: string;
}
