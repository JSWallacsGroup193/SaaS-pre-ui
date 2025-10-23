
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCustomerPreferenceDto {
  @IsString()
  customerId: string;

  @IsString()
  preferredServiceTime: string;

  @IsOptional()
  @IsString()
  techRequest?: string;

  @IsBoolean()
  petNoticeRequired: boolean;

  @IsOptional()
  @IsString()
  parkingInstructions?: string;

  @IsOptional()
  @IsString()
  gateAccessCode?: string;

  @IsBoolean()
  shoesOffRequired: boolean;

  @IsOptional()
  @IsString()
  airQualitySensitivity?: string;

  @IsOptional()
  @IsString()
  communicationNotes?: string;
}
