
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  customerId: string;

  @IsString()
  address: string;

  @IsString()
  propertyType: string;

  @IsInt()
  squareFootage: number;

  @IsInt()
  hvacUnits: number;

  @IsOptional()
  @IsString()
  accessNotes?: string;
}
