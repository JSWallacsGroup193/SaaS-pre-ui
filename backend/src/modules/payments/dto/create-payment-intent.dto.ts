import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNumber()
  @Min(0.5)
  amount: number;

  @IsString()
  workOrderId: string;

  @IsString()
  @IsOptional()
  description?: string;
}
