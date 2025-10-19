# Field Tools Module - Complete Implementation Specification

**Project:** HVAC Management System  
**Module:** Field Tools & Calculators  
**Version:** 1.0  
**Date:** October 19, 2025  

---

## 📋 Executive Summary

### Purpose
Create a dedicated Field Tools module containing HVAC calculators that can be:
1. Accessed as a standalone section in the application
2. Embedded within work orders for quick field use
3. Used to save calculations to work order notes, line items, and comments
4. Optimized for mobile use by field technicians

### Business Value
- Reduce manual calculation errors by field techs
- Speed up quote generation and work order completion
- Maintain calculation history for compliance and auditing
- Enable data-driven decision making in the field
- Improve technician productivity and accuracy

### Success Metrics
- 80%+ of field techs use calculators weekly
- 50% reduction in calculation-related errors
- 30% faster quote generation
- 100% of calculations stored for audit trail

---

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend:** React 18.2+ with TypeScript, Vite
- **Backend:** NestJS 10.x with TypeScript
- **Database:** PostgreSQL 16.x via Prisma ORM
- **API:** RESTful with `/api/v1` prefix
- **State Management:** Zustand (existing)
- **Mobile:** Responsive web design

### Module Structure
```
Backend:
└── backend/src/modules/field-tools/
    ├── field-tools.module.ts
    ├── field-tools.controller.ts
    ├── field-tools.service.ts
    ├── dto/
    ├── calculators/
    └── tests/

Frontend:
└── frontend/src/pages/FieldTools/
    ├── FieldToolsPage.tsx
    ├── FieldToolsDrawer.tsx
    ├── components/
    ├── hooks/
    └── utils/
```

---

## 🗄️ Database Schema

### New Table: `Calculation`

```prisma
model Calculation {
  id              String    @id @default(uuid())
  tenantId        String
  userId          String
  workOrderId     String?
  
  // Calculator metadata
  calculatorType  String    // "hvac_load", "refrigerant", "airflow", "electrical", "pricing"
  title           String    // User-friendly title
  
  // Calculation data
  inputs          Json      // All input parameters as JSON
  results         Json      // Calculation results as JSON
  formattedOutput String    @db.Text // Human-readable formatted result
  
  // Linkage to other entities
  savedToNote     Boolean   @default(false)
  noteId          String?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  tenant          Tenant    @relation(fields: [tenantId], references: [id])
  user            User      @relation(fields: [userId], references: [id])
  workOrder       WorkOrder? @relation(fields: [workOrderId], references: [id])
  note            Note?     @relation(fields: [noteId], references: [id])
  
  @@index([tenantId])
  @@index([userId])
  @@index([workOrderId])
  @@index([calculatorType])
  @@index([createdAt])
}
```

### Schema Updates Required

Add to existing models:

**User model:**
```prisma
calculations    Calculation[]
```

**Tenant model:**
```prisma
calculations    Calculation[]
```

**WorkOrder model:**
```prisma
calculations    Calculation[]
```

**Note model:**
```prisma
calculation     Calculation?
```

### Migration Instructions

```bash
# 1. Update schema file
# Add Calculation model to backend/prisma/schema.prisma

# 2. Validate schema
cd backend
npx prisma validate

# 3. Apply migration
npm run db:push

# 4. Verify table creation
npx prisma studio
# Check that Calculation table exists with all fields
```

---

## 🔌 API Specification

### Base URL
`/api/v1/field-tools`

### Endpoints

#### 1. HVAC Load Calculator
```
POST /api/v1/field-tools/hvac-load
```

**Request Body:**
```json
{
  "squareFootage": 2000,
  "ceilingHeight": 8,
  "insulation": "average",
  "windowArea": 200,
  "occupants": 4,
  "climate": "temperate",
  "orientation": "south",
  "existingHvac": false
}
```

**Response:**
```json
{
  "totalBtu": 48000,
  "tonnage": 4.0,
  "recommendedUnit": "4-ton central AC",
  "calculations": {
    "baseLoad": 50000,
    "heightAdjustment": 0,
    "insulationFactor": 1.0,
    "windowLoad": 4000,
    "occupantLoad": 1200
  },
  "formattedOutput": "Total Cooling Load: 48,000 BTU\nRecommended Tonnage: 4.0 tons\nUnit Recommendation: 4-ton central AC system"
}
```

#### 2. Refrigerant Charge Calculator
```
POST /api/v1/field-tools/refrigerant
```

**Request Body:**
```json
{
  "refrigerantType": "R-410A",
  "lineSetLength": 25,
  "lineSetDiameter": 0.75,
  "systemTonnage": 3.0,
  "ambientTemp": 85,
  "subcooling": 10
}
```

**Response:**
```json
{
  "totalCharge": 8.5,
  "unit": "lbs",
  "subcoolingCorrect": true,
  "recommendations": [
    "Charge level is optimal",
    "Monitor subcooling during operation"
  ],
  "formattedOutput": "Total Refrigerant Charge: 8.5 lbs\nSubcooling: 10°F (Optimal)\nStatus: System properly charged"
}
```

#### 3. Airflow Calculator
```
POST /api/v1/field-tools/airflow
```

**Request Body:**
```json
{
  "ductShape": "rectangular",
  "width": 12,
  "height": 8,
  "velocity": 800,
  "staticPressure": 0.5
}
```

**Response:**
```json
{
  "cfm": 640,
  "ductArea": 0.67,
  "velocityPressure": 0.04,
  "totalPressure": 0.54,
  "recommendations": [
    "Airflow within acceptable range",
    "Consider damper adjustment for optimization"
  ],
  "formattedOutput": "Airflow (CFM): 640\nDuct Area: 0.67 sq ft\nVelocity: 800 FPM"
}
```

#### 4. Electrical Calculator
```
POST /api/v1/field-tools/electrical
```

**Request Body:**
```json
{
  "calculationType": "power",
  "voltage": 240,
  "current": 20,
  "powerFactor": 0.9
}
```

**Response:**
```json
{
  "power": 4320,
  "unit": "watts",
  "kilowatts": 4.32,
  "formattedOutput": "Power: 4,320 watts (4.32 kW)\nVoltage: 240V\nCurrent: 20A\nPower Factor: 0.9"
}
```

#### 5. Pricing Calculator
```
POST /api/v1/field-tools/pricing
```

**Request Body:**
```json
{
  "items": [
    {
      "description": "3-ton AC Unit",
      "cost": 2000,
      "quantity": 1,
      "laborHours": 8
    }
  ],
  "laborRate": 85,
  "markupPercent": 30,
  "taxRate": 0.0825,
  "discountPercent": 0
}
```

**Response:**
```json
{
  "subtotal": 2680,
  "markup": 804,
  "tax": 287.43,
  "total": 3771.43,
  "items": [
    {
      "description": "3-ton AC Unit",
      "partsCost": 2000,
      "laborCost": 680,
      "itemTotal": 2680
    }
  ],
  "formattedOutput": "Parts: $2,000.00\nLabor (8 hrs @ $85/hr): $680.00\nSubtotal: $2,680.00\nMarkup (30%): $804.00\nTax (8.25%): $287.43\nTotal: $3,771.43"
}
```

#### 6. Save Calculation
```
POST /api/v1/field-tools/save
```

**Request Body:**
```json
{
  "tenantId": "tenant-uuid",
  "userId": "user-uuid",
  "workOrderId": "wo-uuid",
  "calculatorType": "hvac_load",
  "title": "Living Room AC Sizing",
  "inputs": { },
  "results": { },
  "formattedOutput": "...",
  "saveToNote": true,
  "createLineItems": false
}
```

**Response:**
```json
{
  "id": "calc-uuid",
  "savedToNote": true,
  "noteId": "note-uuid",
  "message": "Calculation saved successfully"
}
```

#### 7. Get Calculation History
```
GET /api/v1/field-tools/:tenantId/history?limit=50&offset=0&calculatorType=hvac_load
```

**Response:**
```json
{
  "calculations": [
    {
      "id": "calc-uuid",
      "title": "Living Room AC Sizing",
      "calculatorType": "hvac_load",
      "workOrderId": "wo-uuid",
      "createdAt": "2025-10-19T14:30:00Z",
      "user": {
        "id": "user-uuid",
        "name": "John Technician"
      }
    }
  ],
  "total": 127,
  "limit": 50,
  "offset": 0
}
```

#### 8. Get Work Order Calculations
```
GET /api/v1/field-tools/work-order/:workOrderId
```

**Response:**
```json
{
  "workOrderId": "wo-uuid",
  "calculations": [
    {
      "id": "calc-uuid",
      "title": "HVAC Load Calculation",
      "calculatorType": "hvac_load",
      "results": { },
      "createdAt": "2025-10-19T14:30:00Z"
    }
  ]
}
```

---

## 🎨 Frontend Specification

### Pages

#### 1. Field Tools Main Page (`/field-tools`)

**Layout:**
```
┌─────────────────────────────────────┐
│  Field Tools                    [?] │
├─────────────────────────────────────┤
│  Choose a calculator:               │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ 🏠 HVAC  │  │ ❄️ Refrig│       │
│  │  Load    │  │  erant   │       │
│  └──────────┘  └──────────┘       │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ 💨 Air   │  │ ⚡ Elect │       │
│  │  flow    │  │  rical   │       │
│  └──────────┘  └──────────┘       │
│                                     │
│  ┌──────────┐                      │
│  │ 💰 Pricing│                     │
│  │           │                     │
│  └──────────┘                      │
│                                     │
│  Recent Calculations:               │
│  • Living Room Load - 2 hrs ago    │
│  • R-410A Charge - 5 hrs ago       │
└─────────────────────────────────────┘
```

**Components:**
- `CalculatorGrid` - Grid of calculator cards
- `CalculatorCard` - Individual calculator selector
- `RecentCalculations` - List of recent calculations

#### 2. Calculator Detail View

**Layout:**
```
┌─────────────────────────────────────┐
│  ← Back  HVAC Load Calculator       │
├─────────────────────────────────────┤
│  Inputs:                            │
│  Square Footage: [____] sq ft      │
│  Ceiling Height: [____] ft         │
│  Insulation: [Average ▼]           │
│  Window Area: [____] sq ft         │
│  Occupants: [____]                 │
│                                     │
│  [Calculate]                        │
│                                     │
│  Results:                           │
│  ┌───────────────────────────────┐ │
│  │ Total BTU: 48,000            │ │
│  │ Tonnage: 4.0 tons            │ │
│  │ Recommended: 4-ton AC        │ │
│  └───────────────────────────────┘ │
│                                     │
│  [Save to Work Order] [Share]      │
└─────────────────────────────────────┘
```

#### 3. Field Tools Drawer (Embedded in Work Order)

**Layout:**
```
Work Order Page
┌─────────────────────────────────────┐
│  WO-20251019-001          [🧮 Tools]│
├─────────────────────────────────────┤
│  Customer: ABC Company              │
│  ...                                │
└─────────────────────────────────────┘

Drawer Opens from Right →
┌─────────────────────────────────────┐
│  Field Tools          [X]           │
├─────────────────────────────────────┤
│  Quick Calculators:                 │
│  • HVAC Load                        │
│  • Refrigerant Charge               │
│  • Pricing                          │
│                                     │
│  [Selected: HVAC Load]              │
│  [Calculator Interface]             │
│  [Save to This Work Order]          │
└─────────────────────────────────────┘
```

### Mobile Optimization

**Responsive Breakpoints:**
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

**Mobile-specific features:**
```css
/* Prevent iOS zoom on input focus */
input, select {
  font-size: 16px;
}

/* Touch-friendly buttons */
.calculator-button {
  min-height: 44px;
  min-width: 44px;
}

/* Bottom-fixed action buttons */
@media (max-width: 768px) {
  .save-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
```

---

## 💻 Implementation Details

### Backend Implementation

#### Field Tools Service

```typescript
// backend/src/modules/field-tools/field-tools.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HvacLoadCalculator } from './calculators/hvac-load.calculator';
import { RefrigerantCalculator } from './calculators/refrigerant.calculator';

@Injectable()
export class FieldToolsService {
  constructor(
    private prisma: PrismaService,
    private hvacLoadCalc: HvacLoadCalculator,
    private refrigerantCalc: RefrigerantCalculator,
  ) {}

  async calculateHvacLoad(dto: HvacLoadDto) {
    const results = this.hvacLoadCalc.calculate(dto);
    return results;
  }

  async saveCalculation(dto: SaveCalculationDto) {
    const calculation = await this.prisma.calculation.create({
      data: {
        tenantId: dto.tenantId,
        userId: dto.userId,
        workOrderId: dto.workOrderId,
        calculatorType: dto.calculatorType,
        title: dto.title,
        inputs: dto.inputs,
        results: dto.results,
        formattedOutput: dto.formattedOutput,
      },
    });

    // If saveToNote is true, create note
    if (dto.saveToNote && dto.workOrderId) {
      const note = await this.prisma.note.create({
        data: {
          tenantId: dto.tenantId,
          content: `[${dto.title}]\n\n${dto.formattedOutput}`,
          createdBy: dto.userId,
        },
      });

      await this.prisma.calculation.update({
        where: { id: calculation.id },
        data: { savedToNote: true, noteId: note.id },
      });
    }

    return calculation;
  }

  async getHistory(tenantId: string, options: {
    limit?: number;
    offset?: number;
    calculatorType?: string;
  }) {
    const where = {
      tenantId,
      ...(options.calculatorType && { calculatorType: options.calculatorType }),
    };

    const [calculations, total] = await Promise.all([
      this.prisma.calculation.findMany({
        where,
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: options.limit || 50,
        skip: options.offset || 0,
      }),
      this.prisma.calculation.count({ where }),
    ]);

    return { calculations, total, limit: options.limit, offset: options.offset };
  }
}
```

#### HVAC Load Calculator

```typescript
// backend/src/modules/field-tools/calculators/hvac-load.calculator.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class HvacLoadCalculator {
  private readonly BTU_PER_SQ_FT = 25;
  private readonly BTU_PER_OCCUPANT = 300;
  private readonly BTU_PER_SQ_FT_WINDOW = 20;

  calculate(inputs: {
    squareFootage: number;
    ceilingHeight: number;
    insulation: 'poor' | 'average' | 'good';
    windowArea: number;
    occupants: number;
    climate: string;
  }) {
    // Base load calculation
    const baseLoad = inputs.squareFootage * this.BTU_PER_SQ_FT;

    // Ceiling height adjustment
    const heightFactor = inputs.ceilingHeight / 8;
    const heightAdjustment = baseLoad * (heightFactor - 1);

    // Insulation factor
    const insulationFactors = { poor: 1.3, average: 1.0, good: 0.8 };
    const insulationFactor = insulationFactors[inputs.insulation];

    // Window load
    const windowLoad = inputs.windowArea * this.BTU_PER_SQ_FT_WINDOW;

    // Occupant load
    const occupantLoad = inputs.occupants * this.BTU_PER_OCCUPANT;

    // Total calculation
    const totalBtu = Math.round(
      (baseLoad + heightAdjustment) * insulationFactor + windowLoad + occupantLoad
    );

    const tonnage = Math.round((totalBtu / 12000) * 10) / 10;

    const recommendedUnit = this.getRecommendedUnit(tonnage);

    const formattedOutput = this.formatOutput({
      totalBtu,
      tonnage,
      recommendedUnit,
      baseLoad,
      heightAdjustment,
      windowLoad,
      occupantLoad,
    });

    return {
      totalBtu,
      tonnage,
      recommendedUnit,
      calculations: {
        baseLoad,
        heightAdjustment,
        insulationFactor,
        windowLoad,
        occupantLoad,
      },
      formattedOutput,
    };
  }

  private getRecommendedUnit(tonnage: number): string {
    if (tonnage <= 1.5) return '1.5-ton mini-split';
    if (tonnage <= 2) return '2-ton central AC';
    if (tonnage <= 2.5) return '2.5-ton central AC';
    if (tonnage <= 3) return '3-ton central AC';
    if (tonnage <= 3.5) return '3.5-ton central AC';
    if (tonnage <= 4) return '4-ton central AC';
    if (tonnage <= 5) return '5-ton central AC';
    return `${Math.ceil(tonnage)}-ton commercial unit`;
  }

  private formatOutput(data: any): string {
    return `HVAC LOAD CALCULATION
=====================
Total Cooling Load: ${data.totalBtu.toLocaleString()} BTU
Recommended Tonnage: ${data.tonnage} tons
Unit Recommendation: ${data.recommendedUnit}

BREAKDOWN:
- Base Load: ${data.baseLoad.toLocaleString()} BTU
- Height Adjustment: ${data.heightAdjustment.toLocaleString()} BTU
- Window Load: ${data.windowLoad.toLocaleString()} BTU
- Occupant Load: ${data.occupantLoad.toLocaleString()} BTU`;
  }
}
```

### Frontend Implementation

#### Main Field Tools Page

```typescript
// frontend/src/pages/FieldTools/FieldToolsPage.tsx

import React, { useState } from 'react';
import { CalculatorCard } from './components/CalculatorCard';
import { HvacLoadCalculator } from './components/HvacLoadCalculator';
import { RecentCalculations } from './components/RecentCalculations';

type CalculatorType = 'hvac_load' | 'refrigerant' | 'airflow' | 'electrical' | 'pricing';

export default function FieldToolsPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | null>(null);

  const calculators = [
    { id: 'hvac_load', name: 'HVAC Load', icon: '🏠', description: 'Size AC units' },
    { id: 'refrigerant', name: 'Refrigerant', icon: '❄️', description: 'Calculate charge' },
    { id: 'airflow', name: 'Airflow', icon: '💨', description: 'CFM calculations' },
    { id: 'electrical', name: 'Electrical', icon: '⚡', description: 'Power & voltage' },
    { id: 'pricing', name: 'Pricing', icon: '💰', description: 'Quote builder' },
  ];

  if (selectedCalculator) {
    return (
      <div className="calculator-view">
        <button onClick={() => setSelectedCalculator(null)}>← Back</button>
        {selectedCalculator === 'hvac_load' && <HvacLoadCalculator />}
        {/* Other calculators... */}
      </div>
    );
  }

  return (
    <div className="field-tools-page">
      <h1>Field Tools</h1>
      
      <div className="calculator-grid">
        {calculators.map(calc => (
          <CalculatorCard
            key={calc.id}
            {...calc}
            onClick={() => setSelectedCalculator(calc.id as CalculatorType)}
          />
        ))}
      </div>

      <RecentCalculations />
    </div>
  );
}
```

#### HVAC Load Calculator Component

```typescript
// frontend/src/pages/FieldTools/components/HvacLoadCalculator.tsx

import React, { useState } from 'react';
import axios from 'axios';

export function HvacLoadCalculator() {
  const [inputs, setInputs] = useState({
    squareFootage: 0,
    ceilingHeight: 8,
    insulation: 'average' as 'poor' | 'average' | 'good',
    windowArea: 0,
    occupants: 4,
    climate: 'temperate',
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/field-tools/hvac-load', inputs);
      setResult(response.data);
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Save to database
    await axios.post('/api/v1/field-tools/save', {
      calculatorType: 'hvac_load',
      title: 'HVAC Load Calculation',
      inputs,
      results: result,
      formattedOutput: result.formattedOutput,
    });
    alert('Calculation saved!');
  };

  return (
    <div className="hvac-load-calculator">
      <h2>HVAC Load Calculator</h2>

      <div className="input-grid">
        <div className="input-field">
          <label>Square Footage</label>
          <input
            type="number"
            value={inputs.squareFootage}
            onChange={(e) => setInputs({ ...inputs, squareFootage: Number(e.target.value) })}
          />
        </div>

        <div className="input-field">
          <label>Ceiling Height (ft)</label>
          <input
            type="number"
            value={inputs.ceilingHeight}
            onChange={(e) => setInputs({ ...inputs, ceilingHeight: Number(e.target.value) })}
          />
        </div>

        <div className="input-field">
          <label>Insulation Level</label>
          <select
            value={inputs.insulation}
            onChange={(e) => setInputs({ ...inputs, insulation: e.target.value as any })}
          >
            <option value="poor">Poor</option>
            <option value="average">Average</option>
            <option value="good">Good</option>
          </select>
        </div>

        <div className="input-field">
          <label>Window Area (sq ft)</label>
          <input
            type="number"
            value={inputs.windowArea}
            onChange={(e) => setInputs({ ...inputs, windowArea: Number(e.target.value) })}
          />
        </div>

        <div className="input-field">
          <label>Number of Occupants</label>
          <input
            type="number"
            value={inputs.occupants}
            onChange={(e) => setInputs({ ...inputs, occupants: Number(e.target.value) })}
          />
        </div>
      </div>

      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {result && (
        <div className="results-panel">
          <h3>Results</h3>
          <div className="result-item">
            <strong>Total BTU:</strong> {result.totalBtu.toLocaleString()}
          </div>
          <div className="result-item">
            <strong>Tonnage:</strong> {result.tonnage} tons
          </div>
          <div className="result-item">
            <strong>Recommended:</strong> {result.recommendedUnit}
          </div>

          <pre className="formatted-output">{result.formattedOutput}</pre>

          <button onClick={handleSave} className="save-button">
            Save Calculation
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## ✅ Testing Requirements

### Unit Tests

**Backend Calculator Tests:**
```typescript
// backend/src/modules/field-tools/calculators/hvac-load.calculator.spec.ts

describe('HvacLoadCalculator', () => {
  it('should calculate correct BTU for 2000 sq ft average home', () => {
    const result = calculator.calculate({
      squareFootage: 2000,
      ceilingHeight: 8,
      insulation: 'average',
      windowArea: 200,
      occupants: 4,
    });
    
    expect(result.totalBtu).toBeGreaterThan(40000);
    expect(result.tonnage).toBeCloseTo(4, 1);
  });

  it('should adjust for poor insulation', () => {
    const avgResult = calculator.calculate({ insulation: 'average', ... });
    const poorResult = calculator.calculate({ insulation: 'poor', ... });
    
    expect(poorResult.totalBtu).toBeGreaterThan(avgResult.totalBtu);
  });
});
```

**API Endpoint Tests:**
```typescript
// backend/src/modules/field-tools/field-tools.controller.spec.ts

describe('FieldToolsController', () => {
  it('/POST hvac-load should return calculation', () => {
    return request(app.getHttpServer())
      .post('/api/v1/field-tools/hvac-load')
      .send({ squareFootage: 2000, ... })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalBtu');
        expect(res.body).toHaveProperty('tonnage');
      });
  });
});
```

### Integration Tests

```typescript
describe('Field Tools Integration', () => {
  it('should save calculation and create note', async () => {
    // 1. Calculate
    const calcResult = await fieldToolsService.calculateHvacLoad(dto);
    
    // 2. Save
    const saved = await fieldToolsService.saveCalculation({
      ...calcResult,
      saveToNote: true,
      workOrderId: 'test-wo-id',
    });
    
    // 3. Verify note created
    const note = await prisma.note.findUnique({ where: { id: saved.noteId } });
    expect(note).toBeDefined();
    expect(note.content).toContain(calcResult.formattedOutput);
  });
});
```

### Frontend Tests

```typescript
// frontend/src/pages/FieldTools/components/HvacLoadCalculator.test.tsx

describe('HvacLoadCalculator', () => {
  it('should render input fields', () => {
    render(<HvacLoadCalculator />);
    expect(screen.getByLabelText('Square Footage')).toBeInTheDocument();
  });

  it('should call API and show results', async () => {
    const mockResponse = { totalBtu: 48000, tonnage: 4.0 };
    axios.post = jest.fn().mockResolvedValue({ data: mockResponse });

    render(<HvacLoadCalculator />);
    
    fireEvent.change(screen.getByLabelText('Square Footage'), { target: { value: '2000' } });
    fireEvent.click(screen.getByText('Calculate'));

    await waitFor(() => {
      expect(screen.getByText(/48,000/)).toBeInTheDocument();
    });
  });
});
```

---

## 📱 Mobile Testing Checklist

- [ ] Calculator inputs work on iOS Safari
- [ ] Calculator inputs work on Android Chrome
- [ ] No zoom on input focus (font-size >= 16px)
- [ ] Touch targets minimum 44x44px
- [ ] Drawer/modal scrolls properly on mobile
- [ ] Save button accessible (not hidden by keyboard)
- [ ] Results readable on small screens
- [ ] Works in portrait and landscape
- [ ] Network errors handled gracefully
- [ ] Loading states visible

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Database migration tested
- [ ] API documentation updated (Swagger)
- [ ] Frontend builds without errors
- [ ] TypeScript types generated
- [ ] No console errors in browser

### Deployment Steps
```bash
# 1. Database migration
cd backend
npm run db:push

# 2. Backend build
npm run build

# 3. Frontend build
cd ../frontend
npm run build

# 4. Test production build locally
cd ../backend
npm run start:prod

# 5. Deploy to production (Replit Autoscale)
# Click Deploy button in Replit
```

### Post-deployment
- [ ] Health check passes: `/api/v1/health`
- [ ] Field Tools page loads: `/field-tools`
- [ ] API endpoints accessible
- [ ] Calculations working correctly
- [ ] Save functionality working
- [ ] Mobile view working

---

## 📊 Acceptance Criteria

### Functional Requirements
- [ ] 5 calculators implemented (HVAC, Refrigerant, Airflow, Electrical, Pricing)
- [ ] Each calculator returns accurate results
- [ ] Standalone page accessible at `/field-tools`
- [ ] Embedded drawer works in work orders
- [ ] Calculations save to database
- [ ] Calculations save to notes when requested
- [ ] Calculation history retrievable
- [ ] Mobile-responsive on all screens

### Non-Functional Requirements
- [ ] Page load < 2 seconds
- [ ] Calculation response < 500ms
- [ ] Mobile-friendly (responsive design)
- [ ] Works offline (calculations)
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Error handling for all inputs
- [ ] Input validation on frontend & backend

### Business Requirements
- [ ] Field techs can use on mobile devices
- [ ] Calculations stored for audit trail
- [ ] Integration with work orders seamless
- [ ] Professional formatted output
- [ ] Easy to add new calculators in future

---

## 🎯 Success Metrics

### Phase 1 (Week 1-2)
- [ ] Database schema deployed
- [ ] Backend module structure created
- [ ] 2 calculators implemented (HVAC Load, Pricing)
- [ ] API endpoints tested

### Phase 2 (Week 3-4)
- [ ] All 5 calculators implemented
- [ ] Frontend standalone page complete
- [ ] Mobile optimization complete
- [ ] Unit tests at 80% coverage

### Phase 3 (Week 5-6)
- [ ] Work order integration complete
- [ ] Save functionality working
- [ ] Integration tests passing
- [ ] User acceptance testing complete

### Launch
- [ ] Production deployment successful
- [ ] No critical bugs
- [ ] User training materials ready
- [ ] 50+ calculations saved in first week

---

## 🧮 Calculator Formulas Reference

### HVAC Load Calculator
**Based on Manual J methodology (simplified)**

```
Base Load = Square Footage × 25 BTU/sq ft
Height Adjustment = Base Load × (Ceiling Height / 8 - 1)
Insulation Factor:
  - Poor: 1.3
  - Average: 1.0
  - Good: 0.8
Window Load = Window Area × 20 BTU/sq ft
Occupant Load = Occupants × 300 BTU

Total BTU = (Base Load + Height Adj) × Insulation Factor + Window Load + Occupant Load
Tonnage = Total BTU / 12,000
```

### Refrigerant Charge Calculator
```
Base Charge = System Tonnage × 2.5 lbs (for R-410A)
Line Set Adjustment = Line Set Length × 0.12 lbs/ft (for 3/8" liquid line)
Total Charge = Base Charge + Line Set Adjustment

Subcooling Check:
  Optimal: 8-12°F
  Low: < 8°F (undercharged)
  High: > 12°F (overcharged)
```

### Airflow Calculator
```
Duct Area (rectangular) = Width × Height / 144 (converts to sq ft)
Duct Area (round) = π × (Diameter/2)² / 144
CFM = Area × Velocity
Velocity Pressure = (Velocity / 4005)²
Total Pressure = Static Pressure + Velocity Pressure
```

### Electrical Calculator
```
Power (watts) = Voltage × Current × Power Factor
Kilowatts = Watts / 1000
Amperage = Watts / (Voltage × Power Factor)
```

### Pricing Calculator
```
Parts Cost = Sum of all item costs
Labor Cost = Labor Hours × Labor Rate
Subtotal = Parts Cost + Labor Cost
Markup = Subtotal × (Markup % / 100)
Subtotal with Markup = Subtotal + Markup
Tax = Subtotal with Markup × (Tax Rate / 100)
Total = Subtotal with Markup + Tax - Discount
```

---

## 📞 Support & Questions

**Technical Documentation:** This file (`docs/FIELD_TOOLS_MODULE_SPEC.md`)  
**Database Schema:** `backend/prisma/schema.prisma`  
**Existing Modules:** Reference Work Orders, Inventory modules for patterns  

---

## 📚 Additional Resources

### HVAC Standards
- **Manual J:** Load calculation methodology (ACCA)
- **AHRI Standards:** Refrigerant charge charts
- **ASHRAE Handbook:** Fundamentals of HVAC

### Technical Documentation
- **Prisma:** https://www.prisma.io/docs
- **NestJS:** https://docs.nestjs.com
- **React + TypeScript:** https://react-typescript-cheatsheet.netlify.app

### Testing
- **Jest:** https://jestjs.io/docs/getting-started
- **React Testing Library:** https://testing-library.com/docs/react-testing-library/intro

---

## 📝 Implementation Checklist

### Week 1-2: Foundation
- [ ] Create `Calculation` table in database
- [ ] Update existing model relations
- [ ] Run database migration
- [ ] Create backend module structure
- [ ] Implement HVAC Load calculator
- [ ] Implement Pricing calculator
- [ ] Create API endpoints
- [ ] Write unit tests

### Week 3-4: Complete Calculators
- [ ] Implement Refrigerant calculator
- [ ] Implement Airflow calculator
- [ ] Implement Electrical calculator
- [ ] Create frontend page structure
- [ ] Build calculator components
- [ ] Add mobile responsiveness
- [ ] Write frontend tests

### Week 5-6: Integration & Polish
- [ ] Integrate with Work Orders
- [ ] Implement save functionality
- [ ] Create calculation history view
- [ ] Add error handling
- [ ] Optimize performance
- [ ] User acceptance testing
- [ ] Deploy to production

---

**Document Version:** 1.0  
**Last Updated:** October 19, 2025  
**Status:** Ready for Development  
**Estimated Timeline:** 5-6 weeks  
**Developer Count:** 2-3 developers recommended
