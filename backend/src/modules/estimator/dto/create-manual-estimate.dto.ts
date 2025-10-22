export class CreateManualEstimateDto {
  estimateMode: 'quick' | 'comprehensive';
  title?: string;
  description?: string;
  projectType?: string;
  location?: string;
  workOrderId?: string;
  accountId?: string;
  
  laborHours?: number;
  laborCost?: number;
  materialsCost?: number;
  permitsCost?: number;
  overheadCost?: number;
  taxRate?: number;
  profitMargin?: number;
  
  internalNotes?: string;
  customerNotes?: string;
  expiresAt?: string;
  
  lineItems?: LineItemDto[];
}

export class LineItemDto {
  category: string;
  description: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}
