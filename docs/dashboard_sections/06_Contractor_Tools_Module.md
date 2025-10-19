## Contractor Tools Module

### Overview

The Contractor Tools module provides field technicians and contractors with instant access to essential HVAC calculation tools. These tools eliminate the need for separate apps, physical slide rules, or manual chart lookups, enabling faster and more accurate on-site work.

**Key Benefits**:
- Instant calculations without internet (offline-capable)
- Save calculation history for job records
- Attach calculations to work orders
- Mobile-optimized for field use
- No ads or subscriptions (unlike third-party apps)

---

### Tool Categories

#### 1. Electrical Calculations

##### Ohm's Law Calculator
**Purpose**: Calculate voltage, current, resistance, or power

**Formulas**:
```typescript
// V = I × R (Voltage = Current × Resistance)
// P = V × I (Power = Voltage × Current)
// P = I² × R (Power = Current² × Resistance)
// P = V² / R (Power = Voltage² / Resistance)

interface OhmsLawInput {
  voltage?: number;     // Volts (V)
  current?: number;     // Amps (A)
  resistance?: number;  // Ohms (Ω)
  power?: number;       // Watts (W)
}

function calculateOhmsLaw(input: OhmsLawInput): OhmsLawResult {
  // Calculate missing values based on provided inputs
  // Must provide at least 2 values
  
  if (input.voltage && input.current) {
    return {
      voltage: input.voltage,
      current: input.current,
      resistance: input.voltage / input.current,
      power: input.voltage * input.current
    };
  }
  
  // ... other combinations
}
```

**UI Features**:
- Interactive input fields (enter any 2 values)
- Real-time calculation as you type
- Color-coded results
- Copy to clipboard
- Save to work order

---

##### Wire Size Calculator
**Purpose**: Determine proper electrical wire gauge for HVAC equipment

**Inputs**:
- Load (Amps or Watts)
- Voltage (120V, 208V, 240V, 480V)
- Wire run length (feet)
- Temperature rating (60°C, 75°C, 90°C)
- Conduit type (metal, PVC, none)
- Number of conductors

**Outputs**:
- Recommended wire gauge (14 AWG, 12 AWG, 10 AWG, etc.)
- Voltage drop (%)
- Max safe ampacity
- Conduit fill percentage

**Formula**:
```typescript
function calculateWireSize(
  load: number,       // Amps
  voltage: number,    // Volts
  distance: number,   // One-way distance in feet
  maxVoltageDrop: number = 3  // Percentage
): WireSizeResult {
  // Voltage drop formula: VD = (2 × K × I × L) / CM
  // K = resistance constant (12.9 for copper)
  // I = current in amps
  // L = one-way length in feet
  // CM = circular mils
  
  const allowedDrop = voltage * (maxVoltageDrop / 100);
  const minCircularMils = (2 * 12.9 * load * distance) / allowedDrop;
  
  // AWG circular mil table
  const wireGauges = [
    { awg: 14, circularMils: 4110, ampacity60C: 15, ampacity75C: 20 },
    { awg: 12, circularMils: 6530, ampacity60C: 20, ampacity75C: 25 },
    { awg: 10, circularMils: 10380, ampacity60C: 30, ampacity75C: 35 },
    { awg: 8, circularMils: 16510, ampacity60C: 40, ampacity75C: 50 },
    { awg: 6, circularMils: 26240, ampacity60C: 55, ampacity75C: 65 },
    // ... more gauges
  ];
  
  const recommendedWire = wireGauges.find(w => w.circularMils >= minCircularMils);
  
  return {
    wireGauge: recommendedWire.awg,
    actualVoltageDrop: calculateActualDrop(recommendedWire, load, distance),
    ampacity: recommendedWire.ampacity75C,
    notes: checkNECCompliance(recommendedWire, load)
  };
}
```

---

#### 2. Airflow & Ductwork

##### Ductulator (Duct Sizing Calculator)
**Purpose**: Calculate proper duct size for airflow and pressure requirements

**Inputs**:
- Airflow (CFM)
- Friction rate (inches of water per 100 ft)
- Duct shape (round, rectangular)
- For rectangular: aspect ratio preference

**Outputs**:
- Duct diameter (round) or dimensions (rectangular)
- Velocity (FPM - feet per minute)
- Pressure drop per 100 ft
- Equivalent diameter (for rectangular)

**Formulas**:
```typescript
interface DuctulatorInput {
  cfm: number;              // Cubic feet per minute
  frictionRate: number;     // Inches of water per 100 ft
  ductShape: 'round' | 'rectangular';
  aspectRatio?: number;     // For rectangular (width/height)
}

function calculateDuctSize(input: DuctulatorInput): DuctSizeResult {
  if (input.ductShape === 'round') {
    // Round duct formula: D = 1.3 × (CFM × P)^0.2
    // D = diameter in inches
    // CFM = airflow
    // P = friction rate
    
    const diameter = 1.3 * Math.pow(input.cfm * input.frictionRate, 0.2);
    const area = Math.PI * Math.pow(diameter / 24, 2); // sq ft
    const velocity = input.cfm / area;
    
    return {
      diameter: Math.ceil(diameter),
      velocity,
      pressureDrop: input.frictionRate,
      standardSize: getNearestStandardSize(diameter)  // 6", 8", 10", etc.
    };
  } else {
    // Rectangular duct calculation
    // Use equivalent diameter: De = 1.30 × [(a × b)^0.625] / [(a + b)^0.25]
    
    const targetArea = input.cfm / 600; // Target velocity ~600 FPM for mains
    const aspectRatio = input.aspectRatio || 2;
    
    const height = Math.sqrt(targetArea / aspectRatio);
    const width = aspectRatio * height;
    
    return {
      width: roundToStandard(width * 12),    // Convert to inches
      height: roundToStandard(height * 12),
      equivalentDiameter: calculateEquivalentDiameter(width * 12, height * 12),
      velocity: input.cfm / targetArea
    };
  }
}
```

---

##### CFM Calculator
**Purpose**: Calculate airflow requirements and measurements

**Calculation Types**:

1. **CFM from Tonnage**
   ```typescript
   // Rule of thumb: 400 CFM per ton of cooling
   function cfmFromTons(tons: number): number {
     return tons * 400;
   }
   ```

2. **CFM from Temperature Rise/Drop**
   ```typescript
   // CFM = (BTU/hr) / (1.08 × ΔT)
   // 1.08 = constant for air (0.24 BTU/lb/°F × 4.5 lb/CFM)
   function cfmFromDeltaT(btuPerHour: number, deltaT: number): number {
     return btuPerHour / (1.08 * deltaT);
   }
   ```

3. **CFM from Velocity & Area**
   ```typescript
   // CFM = Velocity (FPM) × Area (sq ft)
   function cfmFromVelocity(velocity: number, area: number): number {
     return velocity * area;
   }
   ```

4. **CFM from Anemometer Reading**
   ```typescript
   interface AnemometerReading {
     velocity: number;  // FPM
     grillArea: number; // Square inches
     multiplier: number; // Grill correction factor (0.75-0.90)
   }
   
   function cfmFromAnemometer(reading: AnemometerReading): number {
     const areaInFeet = reading.grillArea / 144;
     return reading.velocity * areaInFeet * reading.multiplier;
   }
   ```

**UI Features**:
- Tabbed interface for different calculation types
- Preset values for common scenarios
- Visual diagram showing what's being calculated

---

##### Static Pressure Calculator
**Purpose**: Calculate total external static pressure (TESP)

**Inputs**:
- Supply plenum pressure (inches H₂O)
- Return plenum pressure (inches H₂O)
- Optional: Individual component pressures (filter, coil, etc.)

**Formula**:
```typescript
interface StaticPressureInput {
  supplyPressure: number;   // Positive pressure
  returnPressure: number;   // Negative pressure (enter as negative)
  filterDrop?: number;
  coilDrop?: number;
  ductworkDrop?: number;
}

function calculateTESP(input: StaticPressureInput): number {
  // TESP = Supply Static - Return Static
  const baseTE SP = input.supplyPressure - input.returnPressure;
  
  // Add component drops if provided
  const componentTotal = (input.filterDrop || 0) + 
                        (input.coilDrop || 0) + 
                        (input.ductworkDrop || 0);
  
  return {
    tesp: baseTESP,
    totalWithComponents: baseTESP + componentTotal,
    recommendation: getTESPRecommendation(baseTESP)
  };
}

function getTESPRecommendation(tesp: number): string {
  if (tesp < 0.3) return 'Low - Check for oversized ductwork';
  if (tesp < 0.8) return 'Optimal range';
  if (tesp < 1.2) return 'Acceptable but high end';
  return 'Too high - Restrict airflow, check for blockages';
}
```

---

#### 3. Refrigerant & Charging

##### Refrigerant Charging Calculator
**Purpose**: Calculate proper subcooling and superheat

**Inputs**:
- Refrigerant type (R-22, R-410A, R-32, R-134a, etc.)
- Outdoor temperature
- Indoor wet bulb temperature (for TXV systems)
- Liquid line temperature
- Suction line temperature
- Liquid line pressure (PSI)
- Suction line pressure (PSI)

**Formulas**:
```typescript
interface ChargingInput {
  refrigerantType: string;
  outdoorTemp: number;
  indoorWetBulb?: number;
  liquidLineTemp: number;
  suctionLineTemp: number;
  liquidLinePressure: number;
  suctionLinePressure: number;
  meteringDevice: 'TXV' | 'piston' | 'capillary';
}

function calculateCharge(input: ChargingInput): ChargingResult {
  // Get saturation temps from PT chart
  const liquidSatTemp = getSaturationTemp(input.refrigerantType, input.liquidLinePressure);
  const suctionSatTemp = getSaturationTemp(input.refrigerantType, input.suctionLinePressure);
  
  // Subcooling = Liquid Sat Temp - Liquid Line Temp
  const subcooling = liquidSatTemp - input.liquidLineTemp;
  
  // Superheat = Suction Line Temp - Suction Sat Temp
  const superheat = input.suctionLineTemp - suctionSatTemp;
  
  // Target ranges based on metering device
  const targets = getTargetRanges(input.meteringDevice, input.outdoorTemp, input.indoorWetBulb);
  
  return {
    subcooling,
    superheat,
    targetSubcooling: targets.subcooling,
    targetSuperheat: targets.superheat,
    diagnosis: diagnoseCharge(subcooling, superheat, targets),
    recommendation: getChargingRecommendation(subcooling, superheat, targets)
  };
}

function diagnoseCharge(actual: any, target: any): string {
  const subcoolDiff = actual.subcooling - target.subcooling.ideal;
  const superheatDiff = actual.superheat - target.superheat.ideal;
  
  if (subcoolDiff < -5 && superheatDiff > 5) {
    return 'System is undercharged';
  } else if (subcoolDiff > 5 && superheatDiff < -5) {
    return 'System is overcharged';
  } else if (superheatDiff > 10) {
    return 'Check for restriction or low airflow';
  }
  
  return 'Charge appears normal';
}
```

---

##### Refrigerant PT Chart (Pressure-Temperature)
**Purpose**: Quick lookup of saturation temperature for given pressure

**Features**:
- Support for all common refrigerants
- Interpolation for values between chart points
- Pressure ↔ Temperature conversion
- Visual chart display
- Offline data storage

**Data Structure**:
```typescript
const REFRIGERANT_PT_DATA = {
  'R-410A': [
    { tempF: -50, pressurePSI: 13.7 },
    { tempF: -40, pressurePSI: 21.9 },
    { tempF: -30, pressurePSI: 32.7 },
    { tempF: -20, pressurePSI: 46.6 },
    { tempF: 0, pressurePSI: 83.2 },
    { tempF: 20, pressurePSI: 134.6 },
    { tempF: 40, pressurePSI: 206.5 },
    { tempF: 60, pressurePSI: 304.2 },
    { tempF: 80, pressurePSI: 434.0 },
    { tempF: 100, pressurePSI: 602.2 },
    { tempF: 120, pressurePSI: 816.5 },
    // ... complete table
  ],
  'R-22': [
    // ... complete table
  ],
  'R-32': [
    // ... complete table
  ]
};

function getPressureFromTemp(refrigerant: string, tempF: number): number {
  const data = REFRIGERANT_PT_DATA[refrigerant];
  // Linear interpolation between data points
  return interpolate(data, 'tempF', 'pressurePSI', tempF);
}
```

---

##### Refrigerant Charge Weight Calculator
**Purpose**: Calculate total refrigerant charge needed

**Inputs**:
- System tonnage
- Line set length
- Line set diameter (liquid and suction)
- Factory charge included (lbs)
- Refrigerant type

**Formula**:
```typescript
interface ChargeWeightInput {
  tonnage: number;
  lineSetLength: number;    // feet
  liquidLineDiameter: number;  // inches (3/8", 1/2", etc.)
  suctionLineDiameter: number; // inches (3/4", 7/8", etc.)
  factoryCharge: number;    // lbs
  refrigerantType: string;
}

function calculateChargeWeight(input: ChargeWeightInput): ChargeWeightResult {
  // Refrigerant volume per foot of line (oz/ft)
  const liquidLineVolume = getLineVolume(input.liquidLineDiameter, input.refrigerantType);
  const suctionLineVolume = getLineVolume(input.suctionLineDiameter, input.refrigerantType);
  
  // Total additional charge needed
  const liquidLineCharge = (liquidLineVolume * input.lineSetLength) / 16; // Convert oz to lbs
  const suctionLineCharge = (suctionLineVolume * input.lineSetLength) / 16;
  
  const totalFieldCharge = liquidLineCharge + suctionLineCharge;
  const totalSystemCharge = input.factoryCharge + totalFieldCharge;
  
  return {
    factoryCharge: input.factoryCharge,
    fieldCharge: totalFieldCharge,
    totalCharge: totalSystemCharge,
    liquidLineCharge,
    suctionLineCharge,
    recommendation: `Add ${totalFieldCharge.toFixed(2)} lbs to factory charge`
  };
}
```

---

#### 4. Load Calculations

##### Quick Manual J Calculator
**Purpose**: Simplified heating/cooling load calculation

**Inputs**:
- Building dimensions (length, width, ceiling height)
- Number of windows and sizes
- Insulation levels (walls, ceiling, floor)
- Geographic location (for design temps)
- Number of occupants
- Orientation (N, S, E, W)

**Simplified Formula**:
```typescript
interface ManualJInput {
  squareFootage: number;
  ceilingHeight: number;
  windowArea: number;      // Total sq ft of windows
  insulation: {
    walls: 'poor' | 'average' | 'good' | 'excellent';
    ceiling: 'poor' | 'average' | 'good' | 'excellent';
    floor: 'slab' | 'crawlspace' | 'basement';
  };
  location: string;  // Zip code or city
  orientation: 'N' | 'S' | 'E' | 'W';
  occupants: number;
}

function calculateQuickManualJ(input: ManualJInput): ManualJResult {
  // Get design temperatures for location
  const designTemps = getDesignTemperatures(input.location);
  
  // Base load from square footage
  // Rule of thumb: 20-30 BTU/sq ft depending on climate
  const baseLoadPerSqFt = getBaseLoad(input.location);
  let totalCoolingLoad = input.squareFootage * baseLoadPerSqFt;
  
  // Window heat gain (cooling)
  const windowMultiplier = getWindowMultiplier(input.orientation);
  const windowLoad = input.windowArea * windowMultiplier * 40; // BTU/hr per sq ft
  totalCoolingLoad += windowLoad;
  
  // Insulation adjustments
  const insulationFactor = getInsulationFactor(input.insulation);
  totalCoolingLoad *= insulationFactor;
  
  // Occupant load (250 BTU/hr per person)
  totalCoolingLoad += input.occupants * 250;
  
  // Ceiling height adjustment
  if (input.ceilingHeight > 8) {
    const heightFactor = input.ceilingHeight / 8;
    totalCoolingLoad *= heightFactor;
  }
  
  // Convert to tons (1 ton = 12,000 BTU/hr)
  const tons = totalCoolingLoad / 12000;
  
  // Heating load (simplified)
  const heatingLoad = calculateHeatingLoad(input, designTemps);
  
  return {
    coolingLoadBTU: Math.round(totalCoolingLoad),
    coolingTons: Math.round(tons * 2) / 2,  // Round to nearest 0.5 ton
    heatingLoadBTU: Math.round(heatingLoad),
    recommendedUnit: getUnitRecommendation(tons),
    notes: [
      'This is a simplified calculation',
      'Full Manual J recommended for new construction',
      `Based on ${designTemps.coolingDesignTemp}°F outdoor design temp`
    ]
  };
}
```

**UI Features**:
- Interactive floor plan input
- Room-by-room breakdown option
- Climate zone auto-detection from zip code
- Export PDF report
- Save to work order

---

##### BTU Calculator & Converter
**Purpose**: Convert between heating/cooling units

**Conversions**:
```typescript
// BTU ↔ Tons
function btuToTons(btu: number): number {
  return btu / 12000;
}

function tonsToBTU(tons: number): number {
  return tons * 12000;
}

// BTU ↔ Watts
function btuToWatts(btu: number): number {
  return btu * 0.293071;
}

function wattsToBTU(watts: number): number {
  return watts / 0.293071;
}

// BTU ↔ Kilowatts
function btuToKW(btu: number): number {
  return btu * 0.000293071;
}

// CFM ↔ BTU (with temperature difference)
function cfmToBTU(cfm: number, deltaT: number): number {
  return cfm * deltaT * 1.08;
}
```

---

#### 5. Efficiency & Performance

##### Delta T Calculator
**Purpose**: Calculate temperature difference across system components

**Calculation Types**:

1. **System Delta T** (Supply - Return)
   - Cooling: Target 18-22°F
   - Heating: Target 35-45°F

2. **Coil Delta T** (Entering - Leaving)

3. **Condenser Split** (Outdoor - Condensing Temp)

```typescript
interface DeltaTInput {
  supplyTemp: number;
  returnTemp: number;
  mode: 'cooling' | 'heating';
}

function calculateDeltaT(input: DeltaTInput): DeltaTResult {
  const deltaT = input.returnTemp - input.supplyTemp;
  
  const targets = input.mode === 'cooling' 
    ? { min: 18, ideal: 20, max: 22 }
    : { min: 35, ideal: 40, max: 45 };
  
  let diagnosis = '';
  if (deltaT < targets.min) {
    diagnosis = input.mode === 'cooling' 
      ? 'Low Delta T - Check for airflow issues, dirty filter, or oversized unit'
      : 'Low Delta T - Check gas pressure, heat exchanger, or burner';
  } else if (deltaT > targets.max) {
    diagnosis = input.mode === 'cooling'
      ? 'High Delta T - Check for low airflow, dirty coil, or low refrigerant'
      : 'High Delta T - Check for restricted airflow or oversized furnace';
  } else {
    diagnosis = 'Delta T is within normal range';
  }
  
  return {
    deltaT,
    target: targets,
    status: getDeltaTStatus(deltaT, targets),
    diagnosis
  };
}
```

---

##### SEER/EER/COP Calculator
**Purpose**: Calculate efficiency ratings

**Formulas**:
```typescript
// SEER (Seasonal Energy Efficiency Ratio)
// SEER = Total Cooling Output (BTU) / Total Energy Input (Watt-hours)
function calculateSEER(coolingBTU: number, energyWh: number): number {
  return coolingBTU / energyWh;
}

// EER (Energy Efficiency Ratio)
// EER = Cooling Capacity (BTU/hr) / Power Input (Watts)
function calculateEER(capacityBTU: number, powerWatts: number): number {
  return capacityBTU / powerWatts;
}

// COP (Coefficient of Performance)
// COP = Heat Output / Energy Input (same units)
function calculateCOP(heatOutput: number, energyInput: number): number {
  return heatOutput / energyInput;
}

// Convert SEER to EER (approximate)
function seerToEER(seer: number): number {
  return seer / 1.1;  // Approximation factor
}

// Annual energy cost
function calculateAnnualCost(
  tons: number,
  seer: number,
  annualHours: number,
  costPerKWh: number
): number {
  const btuPerYear = tons * 12000 * annualHours;
  const kwhPerYear = btuPerYear / seer / 1000;
  return kwhPerYear * costPerKWh;
}
```

---

#### 6. Plumbing & Gas

##### Gas Pipe Sizing Calculator
**Purpose**: Determine proper gas pipe size for appliances

**Inputs**:
- Total BTU load
- Pipe length
- Gas type (natural gas or propane)
- Pipe material (black iron, CSST)
- Number of elbows/fittings

**Formula**:
```typescript
interface GasPipeInput {
  totalBTU: number;
  pipeLength: number;  // feet
  gasType: 'natural' | 'propane';
  pipeMaterial: 'black_iron' | 'csst';
  elbows: number;
}

function calculateGasPipeSize(input: GasPipeInput): GasPipeSizeResult {
  // Add equivalent length for fittings
  const equivalentLength = input.pipeLength + (input.elbows * 5);
  
  // CFH (Cubic feet per hour) from BTU
  const cfh = input.gasType === 'natural' 
    ? input.totalBTU / 1000  // Natural gas ~1000 BTU/cf
    : input.totalBTU / 2500; // Propane ~2500 BTU/cf
  
  // Lookup table for pipe sizes (NFPA 54 / ANSI Z223.1)
  const pipeSizes = getPipeSizeTable(input.gasType, input.pipeMaterial);
  
  // Find smallest pipe that can handle the CFH at this length
  const recommendedPipe = pipeSizes.find(pipe => 
    pipe.capacityAtLength[equivalentLength] >= cfh
  );
  
  return {
    recommendedSize: recommendedPipe.size,  // "3/4 inch", "1 inch", etc.
    cfh,
    pressureDrop: calculatePressureDrop(cfh, equivalentLength, recommendedPipe.size),
    velocityFPS: calculateGasVelocity(cfh, recommendedPipe.size)
  };
}
```

---

##### Condensate Drain Sizing
**Purpose**: Calculate proper condensate drain size

**Formula**:
```typescript
interface CondensateInput {
  tons: number;
  humidityLevel: 'low' | 'medium' | 'high';
}

function calculateCondensateDrain(input: CondensateInput): CondensateDrainResult {
  // Condensate production: ~0.5-2 gallons per hour per ton
  const productionRate = input.humidityLevel === 'high' ? 2 :
                        input.humidityLevel === 'medium' ? 1.25 : 0.5;
  
  const gallonsPerHour = input.tons * productionRate;
  
  // Minimum 3/4" PVC for up to 5 tons
  // 1" PVC for 5-10 tons
  const recommendedSize = input.tons <= 5 ? '3/4"' : '1"';
  
  return {
    condensateGPH: gallonsPerHour,
    recommendedPipeSize: recommendedSize,
    trapRequired: true,
    trapDepth: '2-3 inches',
    slope: '1/4 inch per foot minimum'
  };
}
```

---

#### 7. Psychrometric Calculations

##### Psychrometric Calculator
**Purpose**: Calculate air properties and humidity

**Inputs**:
- Dry bulb temperature
- Wet bulb temperature (or relative humidity)
- Barometric pressure (altitude adjustment)

**Outputs**:
- Relative humidity (%)
- Dew point temperature
- Enthalpy (BTU/lb)
- Specific volume (cu ft/lb)
- Humidity ratio (grains/lb)

**Formulas**:
```typescript
interface PsychrometricInput {
  dryBulb: number;    // °F
  wetBulb?: number;   // °F
  relativeHumidity?: number;  // %
  pressure: number;   // inches Hg (default 29.92 at sea level)
}

function calculatePsychrometrics(input: PsychrometricInput): PsychrometricResult {
  // Convert to absolute units
  const dryBulbR = input.dryBulb + 459.67;  // °R (Rankine)
  
  // Calculate saturation pressure
  const pws = calculateSaturationPressure(input.dryBulb);
  
  // If wet bulb provided, calculate RH
  let rh: number;
  if (input.wetBulb) {
    const pwsWet = calculateSaturationPressure(input.wetBulb);
    const pw = pwsWet - ((input.pressure - pwsWet) * (input.dryBulb - input.wetBulb) / 1800);
    rh = (pw / pws) * 100;
  } else {
    rh = input.relativeHumidity;
  }
  
  // Partial pressure of water vapor
  const pw = pws * (rh / 100);
  
  // Humidity ratio (W) in lb water / lb dry air
  const W = 0.622 * (pw / (input.pressure - pw));
  
  // Dew point temperature
  const dewPoint = calculateDewPoint(pw);
  
  // Enthalpy (h) in BTU/lb dry air
  const h = 0.240 * input.dryBulb + W * (1061 + 0.444 * input.dryBulb);
  
  // Specific volume (v) in cu ft/lb dry air
  const v = (0.754 * dryBulbR) / input.pressure;
  
  return {
    relativeHumidity: rh,
    humidityRatio: W * 7000,  // Convert to grains/lb
    dewPoint,
    enthalpy: h,
    specificVolume: v,
    wetBulb: input.wetBulb || calculateWetBulb(input.dryBulb, rh)
  };
}
```

---

### Database Schema

```sql
CREATE TABLE contractor_tool_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  work_order_id UUID REFERENCES work_orders(id),
  tool_name VARCHAR(50) NOT NULL,  -- 'ohms_law', 'ductulator', 'manual_j', etc.
  inputs JSONB NOT NULL,
  results JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_tool (user_id, tool_name, created_at),
  INDEX idx_work_order (work_order_id)
);

CREATE TABLE tool_presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  tool_name VARCHAR(50) NOT NULL,
  preset_name VARCHAR(100) NOT NULL,
  preset_values JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, tool_name, preset_name)
);

CREATE TABLE refrigerant_pt_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  refrigerant_type VARCHAR(20) NOT NULL,  -- 'R-410A', 'R-22', etc.
  temperature_f INTEGER NOT NULL,
  pressure_psi DECIMAL(10, 2) NOT NULL,
  UNIQUE(refrigerant_type, temperature_f)
);
```

---

### API Endpoints

```typescript
// Perform calculation
POST /api/v1/contractor-tools/calculate
Body: {
  toolName: string,
  inputs: any,
  workOrderId?: string
}
Response: {
  results: any,
  calculationId: string
}

// Get calculation history
GET /api/v1/contractor-tools/history
Query: { toolName?, workOrderId?, limit, offset }

// Save preset
POST /api/v1/contractor-tools/presets
Body: {
  toolName: string,
  presetName: string,
  values: any
}

// Get PT chart data
GET /api/v1/contractor-tools/pt-chart/:refrigerantType
Query: { minTemp?, maxTemp? }

// Unit conversion
POST /api/v1/contractor-tools/convert
Body: {
  value: number,
  fromUnit: string,
  toUnit: string
}
```

---

### UI Design

#### Tool Launcher
```typescript
function ContractorToolsLauncher() {
  const tools = [
    {
      category: 'Electrical',
      tools: [
        { id: 'ohms-law', name: 'Ohm\'s Law', icon: '⚡' },
        { id: 'wire-size', name: 'Wire Sizing', icon: '🔌' }
      ]
    },
    {
      category: 'Airflow',
      tools: [
        { id: 'ductulator', name: 'Ductulator', icon: '🌬️' },
        { id: 'cfm', name: 'CFM Calculator', icon: '💨' },
        { id: 'static-pressure', name: 'Static Pressure', icon: '📊' }
      ]
    },
    {
      category: 'Refrigerant',
      tools: [
        { id: 'charging', name: 'Charging Calc', icon: '🧊' },
        { id: 'pt-chart', name: 'PT Chart', icon: '📈' },
        { id: 'charge-weight', name: 'Charge Weight', icon: '⚖️' }
      ]
    },
    {
      category: 'Load Calc',
      tools: [
        { id: 'manual-j', name: 'Quick Manual J', icon: '🏠' },
        { id: 'btu', name: 'BTU Calculator', icon: '🔥' }
      ]
    }
  ];
  
  return (
    <div className="contractor-tools">
      <h1>Contractor Tools</h1>
      {tools.map(category => (
        <ToolCategory key={category.category} {...category} />
      ))}
    </div>
  );
}
```

#### Tool Interface Template
```typescript
function ToolInterface({ toolId }: { toolId: string }) {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  
  const calculate = async () => {
    const response = await api.post('/api/v1/contractor-tools/calculate', {
      toolName: toolId,
      inputs
    });
    setResults(response.results);
  };
  
  return (
    <div className="tool-interface">
      <ToolHeader toolId={toolId} />
      
      <div className="tool-inputs">
        <InputSection inputs={inputs} onChange={setInputs} />
        <button onClick={calculate}>Calculate</button>
      </div>
      
      {results && (
        <div className="tool-results">
          <ResultsDisplay results={results} />
          <ActionButtons
            onSaveToWorkOrder={() => saveToWorkOrder(results)}
            onCopy={() => copyToClipboard(results)}
            onPrint={() => printResults(results)}
          />
        </div>
      )}
      
      <CalculationHistory history={history} />
    </div>
  );
}
```

---

### Mobile Optimization

- **Offline First**: All calculations work without internet
- **Large Touch Targets**: Buttons minimum 44×44px
- **Quick Access**: Favorite tools pinned to home screen
- **Voice Input**: Speak values instead of typing
- **Camera OCR**: Scan equipment nameplate for data input
- **Saved Calculations**: Auto-sync when back online

---

### Benefits

1. **Time Savings**: Instant calculations vs manual charts
2. **Accuracy**: Eliminate calculation errors
3. **Professional**: Generate PDF reports for customers
4. **Integration**: Attach calcs directly to work orders
5. **Offline**: No internet required in basements/attics
6. **No Ads**: Unlike third-party calculator apps
7. **Compliance**: Ensure code-compliant installations

---

