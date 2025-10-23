
import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateCustomerPerformanceDto {
  @IsString()
  customerId: string;

  @IsNumber()
  totalJobsCompleted: number;

  @IsNumber()
  averageTicketValue: number;

  @IsNumber()
  serviceCallFrequency: number;

  @IsOptional()
  @IsDateString()
  lastServiceDate?: string;

  @IsNumber()
  averagePaymentTime: number;

  @IsNumber()
  latePayments: number;

  @IsBoolean()
  activePaymentPlan: boolean;

  @IsNumber()
  totalRevenueYTD: number;

  @IsNumber()
  totalCostToServe: number;

  @IsNumber()
  grossMarginPercent: number;

  @IsBoolean()
  discountsGiven: boolean;

  @IsBoolean()
  maintenancePlanEnrolled: boolean;

  @IsBoolean()
  respondsToUpsell: boolean;

  @IsBoolean()
  reviewLeft: boolean;

  @IsNumber()
  referralsCount: number;

  @IsNumber()
  cancellationRate: number;

  @IsNumber()
  disputesCount: number;

  @IsBoolean()
  specialHandlingRequired: boolean;
}
