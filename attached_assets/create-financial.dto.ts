
import { IsString, IsNumber } from 'class-validator';

export class CreateFinancialDto {
  @IsString()
  serviceRequestId: string;

  @IsNumber()
  estimateAmount: number;

  @IsNumber()
  invoiceTotal: number;

  @IsString()
  paymentStatus: string;

  @IsString()
  paymentMethod: string;
}
