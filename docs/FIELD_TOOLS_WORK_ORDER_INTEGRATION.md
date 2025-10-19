# Field Tools Work Order Integration

## Overview
This document describes the work order integration feature that allows technicians to save calculator results directly to work orders with full audit trails.

## Completed Components

### Backend (✅ Complete)
1. **Database Schema** (`backend/prisma/schema.prisma`)
   - `FieldCalculation` model with fields:
     - `id`, `tenantId`, `workOrderId`, `technicianId`
     - `calculatorType`, `category`
     - `inputs` (JSON), `results` (JSON)
     - `notes`, `isAttached`
     - Relations to `Tenant`, `WorkOrder`, and `User` (technician)

2. **API Endpoints** (`backend/src/modules/field-calculation/`)
   - `POST /api/v1/field-calculations` - Save a calculation
   - `GET /api/v1/field-calculations` - Get all calculations (with optional workOrderId filter)
   - `GET /api/v1/field-calculations/:id` - Get specific calculation
   - `GET /api/v1/field-calculations/technician/:technicianId` - Get by technician
   - `DELETE /api/v1/field-calculations/:id` - Delete calculation

### Frontend

#### SaveToWorkOrder Component (✅ Complete)
**Location:** `frontend/src/pages/FieldTools/components/SaveToWorkOrder.tsx`

**Features:**
- Modal dialog for saving calculations
- Work order selection dropdown
- Optional notes field
- Success/error messaging
- Displays calculator type and category
- Fully responsive design

**Props:**
```typescript
interface SaveToWorkOrderProps {
  calculatorType: string;  // e.g., "Ohm's Law", "Superheat"
  category: string;        // "electrical", "refrigeration", "airflow", "gas", "hydronic", "utility"
  inputs: any;            // Calculator input data (JSON)
  results: any;           // Calculator result data (JSON)
  onSaved?: () => void;   // Optional callback after successful save
}
```

#### Integrated Calculators (3/21 Complete)

✅ **OhmsLawCalculator** (Electrical)
- Calculator Type: "Ohm's Law"
- Category: "electrical"
- Inputs: `{ voltage, current, resistance }`
- Results: `{ V, I, R, P }`

✅ **SuperheatCalculator** (Refrigeration)
- Calculator Type: "Superheat"
- Category: "refrigeration"
- Inputs: `{ refrigerant, suctionTemp, suctionPressure, targetSH }`
- Results: `{ actualSH, satTemp, status, delta }`

✅ **CFMCalculator** (Airflow)
- Calculator Type: "CFM Calculator"
- Category: "airflow"
- Inputs: `{ btuh, deltaT }`
- Results: `{ cfm, tons, status }`

## Integration Pattern

### Step 1: Import the Component
```typescript
import { SaveToWorkOrder } from './SaveToWorkOrder';
```

### Step 2: Wrap Results Section
Wrap the existing results display in a Fragment (`<>...</>`) and add the SaveToWorkOrder component after it:

```typescript
{result && (
  <>
    <div className="...existing results div...">
      {/* Existing results display */}
    </div>

    <SaveToWorkOrder
      calculatorType="Your Calculator Name"
      category="category_name"
      inputs={{ /* your input state variables */ }}
      results={result}
    />
  </>
)}
```

### Step 3: Define Calculator Type and Category
Use these exact category names for consistency:
- **electrical** - Ohm's Law, Capacitor Test, Motor Amps, Voltage Drop
- **refrigeration** - Superheat, Subcooling, Target Superheat, PT Chart
- **airflow** - CFM, Duct Sizer, Static Pressure
- **gas** - Gas Pipe Sizer, Combustion Air, Combustion Analysis
- **hydronic** - Expansion Tank Sizer, Hydronic Flow Calculator, Radiant Floor Heating
- **utility** - Psychrometric Calculator, Tonnage Converter, Unit Converter, Heat Load/Manual J

## Remaining Calculators to Integrate (18)

### Electrical (3 remaining)
- [ ] CapacitorTestTool.tsx
- [ ] MotorAmpsChecker.tsx
- [ ] VoltageDropTool.tsx

### Refrigeration (3 remaining)
- [ ] SubcoolingCalculator.tsx
- [ ] TargetSuperheatTool.tsx
- [ ] PTChart.tsx

### Airflow (2 remaining)
- [ ] DuctSizer.tsx
- [ ] StaticPressureTool.tsx

### Gas/Combustion (3 remaining)
- [ ] GasPipeSizer.tsx
- [ ] CombustionAirCalculator.tsx
- [ ] CombustionAnalysisTool.tsx

### Hydronic/Boiler (3 remaining)
- [ ] ExpansionTankSizer.tsx
- [ ] HydronicFlowCalculator.tsx
- [ ] RadiantHeatingCalculator.tsx

### Utility (4 remaining)
- [ ] PsychrometricCalculator.tsx
- [ ] TonnageCalculator.tsx
- [ ] HVACUnitConverter.tsx
- [ ] HeatLoadCalculator.tsx

## Database Schema Reference

```prisma
model FieldCalculation {
  id              String   @id @default(uuid())
  tenantId        String
  workOrderId     String?
  technicianId    String
  
  calculatorType  String   // "superheat", "gas-pipe", "psychrometric", etc.
  category        String   // "electrical", "refrigeration", "airflow", "gas", "hydronic", "utility"
  
  inputs          Json     // All calculator inputs as JSON
  results         Json     // All calculator results as JSON
  
  notes           String?  // Optional technician notes
  isAttached      Boolean  @default(false) // Whether attached to work order
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt @default(now())
  
  tenant          Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  workOrder       WorkOrder? @relation(fields: [workOrderId], references: [id], onDelete: SetNull)
  technician      User      @relation(fields: [technicianId], references: [id])
  
  @@index([tenantId])
  @@index([workOrderId])
  @@index([technicianId])
  @@index([category])
  @@index([createdAt])
}
```

## Next Steps

1. **Complete Remaining Integrations** - Integrate SaveToWorkOrder into the remaining 18 calculators
2. **Calculation History View** - Create a view to display saved calculations per work order
3. **Work Order Details Integration** - Show calculation history on work order detail pages
4. **Testing** - Verify all 21 calculators can save and retrieve calculations
5. **Mobile Optimization** - Ensure all calculators work smoothly on mobile devices

## Benefits

- **Audit Trail:** Every calculation is saved with timestamp, technician, and work order
- **Documentation:** Automatically document field measurements and calculations
- **Consistency:** Standardized calculation storage across all tool types
- **Accessibility:** Technicians can review past calculations when needed
- **Reporting:** Enable analytics on which tools are used most frequently
- **Quality Control:** Supervisors can review technician calculations
