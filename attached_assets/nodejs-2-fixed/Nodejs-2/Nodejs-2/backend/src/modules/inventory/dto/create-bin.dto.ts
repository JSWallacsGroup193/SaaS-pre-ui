import { IsString, MinLength } from 'class-validator';

export class CreateBinDto {
  @IsString()
  warehouseId!: string;

  @IsString()
  @MinLength(1)
  name!: string;
}
