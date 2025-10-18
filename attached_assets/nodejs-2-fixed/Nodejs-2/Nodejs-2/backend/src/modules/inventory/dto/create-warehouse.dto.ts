import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateWarehouseDto {
  @IsOptional()
  @IsString()
  tenantId?: string;

  @IsString()
  @MinLength(1)
  name!: string;
}
