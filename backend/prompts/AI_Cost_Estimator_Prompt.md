# AI Cost Estimation Prompt - HVAC SaaS Integration

## System Role

You are a cost estimation engine inside an HVAC contractor SaaS platform.
Use the structured input data provided to calculate an accurate HVAC installation estimate.

## Context

This AI cost estimator is being **added to the existing Field Tools module**, which currently contains 21 professional HVAC calculators across various categories. This new estimator will appear alongside tools like Airflow Calculator, BTU Calculator, Refrigerant Charge Calculator, etc.

The estimator has **two modes** to serve different field scenarios:

### **Quick Estimator** (5-Minute Version)
- Minimal inputs (6-8 essential fields)
- Job type, square footage, equipment tier, labor hours, zip code
- Fast ballpark estimate for on-site quotes
- Single recommended price point
- Mobile-optimized for quick field use

### **Comprehensive Estimator** (Full Version)
- Complete 10-category input form
- Detailed calculations with all cost breakdowns
- Three-tier pricing (Good / Better / Best)
- Profitability analysis and customer-facing summary
- Used for formal proposals and complex projects

Both versions use the same AI engine but with different prompt complexity and input requirements.

The inputs are submitted from a form-based user interface used by HVAC professionals.
You must parse all fields and return a detailed, itemized estimate along with tiered options (Good / Better / Best for comprehensive mode), profitability, and a customer-facing summary.

## Instructions

### MODE DETECTION
First, detect which mode is being used based on the `estimateMode` field:
- `"quick"` = Quick Estimator (minimal inputs, single price)
- `"comprehensive"` = Comprehensive Estimator (full form, three tiers)

### 1. READ AND PARSE

**For Quick Mode** - Parse these essential fields:
- Job type (installation, replacement, repair)
- Square footage or tonnage
- Equipment tier preference (budget, standard, premium)
- Labor hours estimate
- Zip code (for regional pricing)
- Any special conditions (urgency, accessibility)

**For Comprehensive Mode** - Parse all provided input fields across these 10 categories:
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

### 3. GENERATE ESTIMATE TIERS

**For Quick Mode** - Generate single recommended tier:
- **Recommended**: Best-fit equipment based on input tier preference (budget/standard/premium)
- Include essential features for the job type
- Clear single price point for fast quoting

**For Comprehensive Mode** - Generate three estimate tiers:
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
- **Database**: PostgreSQL with **Prisma ORM**
- **AI**: OpenAI API (GPT-4 or similar)
- **Authentication**: JWT-based with multi-tenant architecture
- **UI**: shadcn/ui components + Tailwind CSS (OpsNex dark theme)
- **Secrets Management**: .env files (DATABASE_URL, OPENAI_API_KEY)

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
- Save to database via **Prisma ORM**
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

### Module Integration
**Add to existing Field Tools module** (`/frontend/src/pages/FieldTools.tsx`)
- Create two new calculator cards: "Quick Cost Estimator" and "Comprehensive Cost Estimator"
- Place alongside existing 21 calculators (Airflow, BTU, Refrigerant Charge, etc.)
- Use existing calculator card component pattern
- Both cards link to `/field-tools/estimator?mode=quick` and `/field-tools/estimator?mode=comprehensive`

### Page Location
`/frontend/src/pages/FieldToolsEstimator.tsx` (new page)

### Form Structure

**Quick Mode Form** (simplified):
- Single-page compact form with 6-8 fields
- Inline inputs (no collapsible sections)
- Large "Calculate" button
- Mobile-first responsive design
- Results show immediately below form

**Comprehensive Mode Form** (full):
- Use React Hook Form + Zod validation (existing pattern)
- Create 10 collapsible/accordion sections matching input categories
- Use shadcn/ui Form components (Input, Select, Checkbox, etc.)
- Apply OpsNex dark theme: `bg-slate-950`, `text-slate-100`, `accent-teal-500`
- Mode toggle button to switch between Quick/Comprehensive

### API Client Pattern

```typescript
import api from '../utils/axiosClient'

const response = await api.post('/estimator/calculate', formData)
```

### Results Display

**Quick Mode Results**:
- Single large price card with recommended estimate
- Simplified breakdown (labor + materials + total)
- "Save to Work Order" button
- Option to "Switch to Comprehensive Mode" for detailed analysis

**Comprehensive Mode Results**:
- Three-tier pricing cards (Good / Better / Best) side-by-side
- Use Recharts for cost breakdown visualization
- Display profitability metrics for internal use
- Provide customer-facing summary view
- Export options (PDF, Email)
- Toast notifications via react-hot-toast

### Navigation

- Add route in `/frontend/src/router.tsx`: `/field-tools/estimator`
- **Add two calculator cards in Field Tools page** (main integration point)
- Quick Estimator card: "Get a fast quote in 5 minutes"
- Comprehensive Estimator card: "Detailed proposal with 3 pricing tiers"
- Link from Work Orders page ("Generate Estimate" button)

---

## Database Schema (Prisma ORM)

### Add to `/backend/prisma/schema.prisma`

```prisma
model Estimate {
  id            String   @id @default(uuid())
  tenantId      String   @map("tenant_id")
  workOrderId   String?  @map("work_order_id")
  estimateMode  String   @map("estimate_mode") // 'quick' or 'comprehensive'
  inputData     Json     @map("input_data")    // Store inputs (6-8 fields for quick, 10 categories for comprehensive)
  outputData    Json     @map("output_data")   // Store AI response
  totalEstimate Decimal? @map("total_estimate") @db.Decimal(10, 2)
  finalPrice    Decimal? @map("final_price")    @db.Decimal(10, 2)
  profitMargin  Decimal? @map("profit_margin")  @db.Decimal(5, 2)
  createdBy     String?  @map("created_by")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  tenant     Tenant     @relation(fields: [tenantId], references: [id])
  workOrder  WorkOrder? @relation(fields: [workOrderId], references: [id])
  creator    User?      @relation(fields: [createdBy], references: [id])

  @@map("estimates")
}
```

### Add Relations to Existing Models

```prisma
// In Tenant model
model Tenant {
  // ... existing fields
  estimates  Estimate[]
}

// In WorkOrder model
model WorkOrder {
  // ... existing fields
  estimates  Estimate[]
}

// In User model
model User {
  // ... existing fields
  estimates  Estimate[]
}
```

### Run Migration

```bash
npx prisma generate
npm run db:push
```

Or if you encounter data-loss warnings:

```bash
npm run db:push --force
```

---

## TypeScript Interfaces

### Response Format

```typescript
interface EstimateResponseDto {
  estimateMode: 'quick' | 'comprehensive';
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
    recommended?: TierDetails; // Only for Quick mode
    good?: TierDetails;         // Only for Comprehensive mode
    better?: TierDetails;        // Only for Comprehensive mode
    best?: TierDetails;          // Only for Comprehensive mode
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
  efficiency?: string;
}

// Input DTO examples
interface QuickEstimateInput {
  estimateMode: 'quick';
  jobType: 'installation' | 'replacement' | 'repair';
  squareFootage?: number;
  tonnage?: number;
  equipmentTier: 'budget' | 'standard' | 'premium';
  laborHours: number;
  zipCode: string;
  specialConditions?: string;
}

interface ComprehensiveEstimateInput {
  estimateMode: 'comprehensive';
  // ... full 10-category input fields
  projectInfo: { /* ... */ };
  laborInputs: { /* ... */ };
  equipmentMaterials: { /* ... */ };
  // etc.
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

## Example JSON Responses

### Quick Mode Response Example

```json
{
  "estimateMode": "quick",
  "internal_calculations": {
    "laborCost": 1200.00,
    "materialsCost": 800.00,
    "equipmentCost": 4500.00,
    "overheadCost": 650.00,
    "profitMargin": 1425.00,
    "totalCost": 8575.00
  },
  "customer_summary": {
    "totalBeforeIncentives": 8575.00,
    "incentivesApplied": 500.00,
    "finalPrice": 8075.00,
    "savingsAmount": 500.00
  },
  "estimate_tiers": {
    "recommended": {
      "name": "Recommended",
      "price": 8075.00,
      "equipment": "Trane 16 SEER 2.5-Ton AC Unit",
      "features": ["Standard installation", "Smart thermostat", "2-year warranty"],
      "warranty": "2 Year Parts & Labor",
      "efficiency": "16 SEER"
    }
  },
  "recommendations": [
    "Customer qualifies for $500 utility rebate",
    "Installation can be completed in 1 day"
  ],
  "estimateId": "est_quick_x1y2z3",
  "createdAt": "2025-10-22T18:30:00Z"
}
```

### Comprehensive Mode Response Example

```json
{
  "estimateMode": "comprehensive",
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
  "estimateId": "est_comp_a1b2c3d4",
  "createdAt": "2025-10-22T18:30:00Z"
}
```

---

**Document Version**: 1.0  
**Last Updated**: October 22, 2025  
**System**: HVAC Management SaaS Platform
