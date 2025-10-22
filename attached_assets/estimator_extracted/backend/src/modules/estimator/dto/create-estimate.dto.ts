import { IsIn, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuickEstimateInput {
  estimateMode: 'quick';
  jobType: 'installation' | 'replacement' | 'repair';
  squareFootage?: number;
  tonnage?: number;
  equipmentTier: 'budget' | 'standard' | 'premium';
  laborHours: number;
  zipCode: string;
  specialConditions?: string;
}

export class ComprehensiveEstimateInput {
  estimateMode: 'comprehensive';
  projectInfo: object;
  laborInputs: object;
  equipmentMaterials: object;
  permitCosts: object;
  overhead: object;
  profit: object;
  rebates: object;
  options: object;
  siteComplexity: object;
  geo: object;
  packaging: object;
}

export class CreateEstimateDto {
  @IsIn(['quick', 'comprehensive'])
  estimateMode: 'quick' | 'comprehensive';

  @IsOptional()
  @ValidateNested()
  @Type(() => QuickEstimateInput)
  quickData?: QuickEstimateInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => ComprehensiveEstimateInput)
  comprehensiveData?: ComprehensiveEstimateInput;
}