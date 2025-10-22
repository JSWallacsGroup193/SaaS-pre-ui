# AI Cost Estimation Prompt - HVAC SaaS Integration

## System Role

You are a cost estimation engine inside an HVAC contractor SaaS platform.
Use the structured input data provided to calculate an accurate HVAC installation estimate.

## Context

The inputs are submitted from a form-based user interface used by HVAC professionals.
You must parse all fields and return a detailed, itemized estimate along with tiered options (Good / Better / Best), profitability, and a customer-facing summary.

## Instructions

### 1. READ AND PARSE

All provided input fields across these 10 categories:
- Project & System Info
- Labor & Crew Inputs
- Equipment & Materials
- Permit & Compliance Costs
- Financial & Overhead Factors
- Rebates & Incentives
- Customer Options / Add-Ons
- Site & Job Complexity
- Geographic / Regional Inputs
- Output / Estimate Packaging

### 2. PERFORM CALCULATIONS

- Total labor cost = Labor Hours × Rate × Crew Size (+ overtime if flagged)
- Equipment + materials subtotal, with markup
- Add overhead (based on %)
- Apply profit margin (markup after all costs)
- Subtract incentives / rebates to show final estimate

### 3. GENERATE THREE ESTIMATE TIERS

- **Good**: Base model, minimal add-ons
- **Better**: Mid-grade efficiency, smart thermostat, standard IAQ
- **Best**: High-efficiency equipment, extended warranty, advanced IAQ, smart home options

### 4. OUTPUT REQUIREMENTS

- Estimate Total (before incentives)
- Incentives Applied
- Final Price
- Profit Margin
- Key Estimate Notes
- Clean breakdown for PDF / email quote

### 5. FORMAT OUTPUT

Structured JSON with labeled sections for:
- internal_calculations
- customer_summary
- estimate_tiers
- recommendations

### INPUT FORMAT

Expect inputs in structured JSON format from front-end. Use default estimates if any fields are missing.

---

## TECHNICAL INTEGRATION REQUIREMENTS FOR DEVELOPMENT TEAM

### Tech Stack

- **Backend**: NestJS + TypeScript
- **Frontend**: React + Vite + Zustand
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI API (GPT-4 or similar)
- **Authentication**: JWT-based with multi-tenant architecture
- **UI**: shadcn/ui components + Tailwind CSS (OpsNex dark theme)

---

## Backend Implementation (NestJS)

### Module Location
`/backend/src/modules/estimator/`

### Files to Create

1. `estimator.module.ts` - Register controller, service, dependencies
2. `estimator.controller.ts` - API endpoint with JWT guard
3. `estimator.service.ts` - Business logic + OpenAI integration
4. `dto/create-estimate.dto.ts` - Input validation with class-validator
5. `dto/estimate-response.dto.ts` - Output typing

### API Endpoint

```
POST /api/v1/estimator/calculate
```

Requirements:
- Require JWT authentication (`@UseGuards(JwtAuthGuard)`)
- Apply tenant isolation (extract tenantId from JWT token)
- Validate input with CreateEstimateDto
- Call OpenAI API with this prompt + user inputs
- Parse OpenAI response as JSON
- Save to database via Drizzle ORM
- Return typed EstimateResponseDto

### Code Pattern (Follow Existing Modules)

```typescript
@Post('calculate')
@UseGuards(JwtAuthGuard)
async calculateEstimate(
  @Request() req,
  @Body() dto: CreateEstimateDto
): Promise<EstimateResponseDto> {
  const tenantId = req.user.tenantId;
  return this.estimatorService.calculate(tenantId, dto);
}
```

### OpenAI Integration Pattern

- Reuse existing OpenAI service from `/backend/src/modules/ai-chat/`
- Send this prompt + user inputs as system + user messages
- Parse response as JSON (use JSON mode or structured outputs)
- Handle rate limits and errors gracefully

---

## Frontend Implementation (React)

### Page Location
`/frontend/src/pages/Estimator.tsx`

### Form Structure

- Use React Hook Form + Zod validation (existing pattern)
- Create 10 collapsible sections matching input categories
- Use shadcn/ui Form components (Input, Select, Checkbox, etc.)
- Apply OpsNex dark theme: `bg-slate-950`, `text-slate-100`, `accent-teal-500`

### API Client Pattern

```typescript
import api from '../utils/axiosClient'

const response = await api.post('/estimator/calculate', formData)
```

### Results Display

- Show three-tier pricing cards (Good / Better / Best)
- Use Recharts for cost breakdown visualization
- Display profitability metrics for internal use
- Provide customer-facing summary view
- Toast notifications via react-hot-toast

### Navigation

- Add route in `/frontend/src/router.tsx`
- Add menu item to sidebar navigation
- Link from Work Orders or Field Tools module

---

## Database Schema (Drizzle ORM)

### Add to `/shared/schema.ts`

```typescript
export const estimates = pgTable('estimates', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar('tenant_id').notNull().references(() => tenants.id),
  workOrderId: varchar('work_order_id').references(() => workOrders.id),
  inputData: jsonb('input_data').notNull(), // Store 10-category inputs
  outputData: jsonb('output_data').notNull(), // Store AI response
  totalEstimate: numeric('total_estimate', { precision: 10, scale: 2 }),
  finalPrice: numeric('final_price', { precision: 10, scale: 2 }),
  profitMargin: numeric('profit_margin', { precision: 5, scale: 2 }),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### Run Migration

```bash
npm run db:push
```

---

## TypeScript Interfaces

### Response Format

```typescript
interface EstimateResponseDto {
  internal_calculations: {
    laborCost: number;
    materialsCost: number;
    equipmentCost: number;
    overheadCost: number;
    profitMargin: number;
    totalCost: number;
  };
  customer_summary: {
    totalBeforeIncentives: number;
    incentivesApplied: number;
    finalPrice: number;
    savingsAmount: number;
    paymentTerms?: string;
  };
  estimate_tiers: {
    good: TierDetails;
    better: TierDetails;
    best: TierDetails;
  };
  recommendations: string[];
  estimateId: string;
  createdAt: string;
}

interface TierDetails {
  name: string;
  price: number;
  equipment: string;
  features: string[];
  warranty: string;
  efficiency: string;
}
```

---

## Security & Validation

- Require JWT authentication on all endpoints
- Apply tenant isolation (`WHERE tenantId = user.tenantId`)
- Validate all inputs with class-validator decorators
- Rate-limit OpenAI calls (max 10/minute per tenant)
- Sanitize user inputs before sending to OpenAI
- Never expose OpenAI API key in frontend

---

## Integration Points

1. **Work Orders**: Optional link estimates to work orders via workOrderId
2. **CRM**: Track which accounts received estimates
3. **Notifications**: Send estimate via email (use existing notification system)
4. **Labels**: Export estimate as PDF (future: reuse label generator pattern)
5. **Dashboard**: Add "Estimates Created" KPI widget

---

## UI/UX Requirements

- Match existing OpsNex dark theme throughout
- Responsive design (mobile + desktop)
- Loading states during AI calculation (show spinner)
- Error handling with user-friendly messages
- Auto-save form inputs to localStorage (prevent data loss)
- Print-friendly estimate output

---

## Testing Checklist

- [ ] Verify multi-tenant isolation (User A cannot see User B's estimates)
- [ ] Test with missing/invalid inputs (use defaults gracefully)
- [ ] Confirm calculations match manual spreadsheet
- [ ] Check PDF export formatting
- [ ] Validate OpenAI response parsing
- [ ] Test rate limiting behavior

---

## Example JSON Response

```json
{
  "internal_calculations": {
    "laborCost": 2400.00,
    "materialsCost": 3500.00,
    "equipmentCost": 8000.00,
    "overheadCost": 1395.00,
    "profitMargin": 3059.00,
    "totalCost": 18354.00
  },
  "customer_summary": {
    "totalBeforeIncentives": 18354.00,
    "incentivesApplied": 1500.00,
    "finalPrice": 16854.00,
    "savingsAmount": 1500.00,
    "paymentTerms": "Net 30"
  },
  "estimate_tiers": {
    "good": {
      "name": "Good",
      "price": 14500.00,
      "equipment": "Goodman 14 SEER AC Unit",
      "features": ["Standard installation", "Basic thermostat", "1-year warranty"],
      "warranty": "1 Year Parts & Labor",
      "efficiency": "14 SEER"
    },
    "better": {
      "name": "Better",
      "price": 16854.00,
      "equipment": "Trane 16 SEER AC Unit",
      "features": ["Standard installation", "Smart thermostat", "UV air purifier", "5-year warranty"],
      "warranty": "5 Year Parts & Labor",
      "efficiency": "16 SEER"
    },
    "best": {
      "name": "Best",
      "price": 22500.00,
      "equipment": "Carrier 20 SEER AC Unit",
      "features": ["Premium installation", "Ecobee smart thermostat", "Advanced IAQ system", "10-year warranty", "Smart home integration"],
      "warranty": "10 Year Parts & Labor",
      "efficiency": "20 SEER"
    }
  },
  "recommendations": [
    "Customer qualifies for $1,500 federal tax credit",
    "Recommend scheduling installation in off-season for 10% discount",
    "Annual maintenance plan available for $299/year"
  ],
  "estimateId": "est_a1b2c3d4",
  "createdAt": "2025-10-22T18:30:00Z"
}
```

---

**Document Version**: 1.0  
**Last Updated**: October 22, 2025  
**System**: HVAC Management SaaS Platform
