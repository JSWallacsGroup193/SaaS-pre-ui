import { useState, lazy, Suspense } from 'react';

const CapacitorTestTool = lazy(() => import('./components/CapacitorTestTool'));
const MotorAmpsChecker = lazy(() => import('./components/MotorAmpsChecker'));
const VoltageDropTool = lazy(() => import('./components/VoltageDropTool'));
const OhmsLawCalculator = lazy(() => import('./components/OhmsLawCalculator'));
const SuperheatCalculator = lazy(() => import('./components/SuperheatCalculator'));
const SubcoolingCalculator = lazy(() => import('./components/SubcoolingCalculator'));
const TargetSuperheatTool = lazy(() => import('./components/TargetSuperheatTool'));
const PTChart = lazy(() => import('./components/PTChart'));
const CFMCalculator = lazy(() => import('./components/CFMCalculator'));
const DuctSizer = lazy(() => import('./components/DuctSizer'));
const StaticPressureTool = lazy(() => import('./components/StaticPressureTool'));
const GasPipeSizer = lazy(() => import('./components/GasPipeSizer'));
const CombustionAirCalculator = lazy(() => import('./components/CombustionAirCalculator'));
const CombustionAnalysisTool = lazy(() => import('./components/CombustionAnalysisTool'));
const ExpansionTankSizer = lazy(() => import('./components/ExpansionTankSizer'));
const HydronicFlowCalculator = lazy(() => import('./components/HydronicFlowCalculator'));
const RadiantHeatingCalculator = lazy(() => import('./components/RadiantHeatingCalculator'));
const PsychrometricCalculator = lazy(() => import('./components/PsychrometricCalculator'));
const TonnageCalculator = lazy(() => import('./components/TonnageCalculator'));
const HVACUnitConverter = lazy(() => import('./components/HVACUnitConverter'));
const HeatLoadCalculator = lazy(() => import('./components/HeatLoadCalculator'));

type CalculatorType = 'capacitor' | 'motor' | 'voltage' | 'ohms' | 'superheat' | 'subcooling' | 'target-superheat' | 'pt-chart' | 'cfm' | 'duct-sizer' | 'static-pressure' | 'gas-pipe' | 'combustion-air' | 'combustion-analysis' | 'expansion-tank' | 'hydronic-flow' | 'radiant-heating' | 'psychrometric' | 'tonnage' | 'unit-converter' | 'heat-load' | null;

interface Calculator {
  id: CalculatorType;
  name: string;
  icon: string;
  description: string;
  component: React.ComponentType;
}

export default function FieldToolsPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>(null);

  const calculators: Calculator[] = [
    {
      id: 'ohms',
      name: "Ohm's Law",
      icon: '🔋',
      description: 'Calculate V, I, R, and Power',
      component: OhmsLawCalculator
    },
    {
      id: 'capacitor',
      name: 'Capacitor Test',
      icon: '⚡',
      description: 'Test capacitors with ±10% tolerance',
      component: CapacitorTestTool
    },
    {
      id: 'motor',
      name: 'Motor Amps Checker',
      icon: '🔌',
      description: 'Check motor load percentage',
      component: MotorAmpsChecker
    },
    {
      id: 'voltage',
      name: 'Voltage Drop',
      icon: '📊',
      description: 'Calculate voltage drop & wire sizing',
      component: VoltageDropTool
    },
    {
      id: 'superheat',
      name: 'Superheat Calculator',
      icon: '🌡️',
      description: 'Measure superheat for charge diagnosis',
      component: SuperheatCalculator
    },
    {
      id: 'subcooling',
      name: 'Subcooling Calculator',
      icon: '❄️',
      description: 'Measure subcooling for charge verification',
      component: SubcoolingCalculator
    },
    {
      id: 'target-superheat',
      name: 'Target Superheat',
      icon: '🎯',
      description: 'Calculate target superheat from conditions',
      component: TargetSuperheatTool
    },
    {
      id: 'pt-chart',
      name: 'PT Chart',
      icon: '📋',
      description: 'Pressure-Temperature reference chart',
      component: PTChart
    },
    {
      id: 'cfm',
      name: 'CFM Calculator',
      icon: '💨',
      description: 'Calculate airflow from BTU/hr and ΔT',
      component: CFMCalculator
    },
    {
      id: 'duct-sizer',
      name: 'Duct Sizer',
      icon: '🔧',
      description: 'Size ducts based on CFM and velocity',
      component: DuctSizer
    },
    {
      id: 'static-pressure',
      name: 'Static Pressure',
      icon: '📏',
      description: 'Calculate total external static pressure',
      component: StaticPressureTool
    },
    {
      id: 'gas-pipe',
      name: 'Gas Pipe Sizer',
      icon: '🔥',
      description: 'Size gas pipes for furnaces and appliances',
      component: GasPipeSizer
    },
    {
      id: 'combustion-air',
      name: 'Combustion Air',
      icon: '💨',
      description: 'Calculate combustion air requirements',
      component: CombustionAirCalculator
    },
    {
      id: 'combustion-analysis',
      name: 'Combustion Analysis',
      icon: '🔬',
      description: 'Reference values for combustion testing',
      component: CombustionAnalysisTool
    },
    {
      id: 'expansion-tank',
      name: 'Expansion Tank Sizer',
      icon: '💧',
      description: 'Size expansion tanks for closed systems',
      component: ExpansionTankSizer
    },
    {
      id: 'hydronic-flow',
      name: 'Hydronic Flow',
      icon: '🌊',
      description: 'Calculate GPM and pump sizing for hydronic systems',
      component: HydronicFlowCalculator
    },
    {
      id: 'radiant-heating',
      name: 'Radiant Floor',
      icon: '🏠',
      description: 'Design radiant floor heating systems',
      component: RadiantHeatingCalculator
    },
    {
      id: 'psychrometric',
      name: 'Psychrometric',
      icon: '🌡️',
      description: 'Dew point, wet bulb, humidity calculations',
      component: PsychrometricCalculator
    },
    {
      id: 'tonnage',
      name: 'Tonnage Converter',
      icon: '⚖️',
      description: 'Convert BTU/hr to tons and vice versa',
      component: TonnageCalculator
    },
    {
      id: 'unit-converter',
      name: 'Unit Converter',
      icon: '🔄',
      description: 'Convert between HVAC units',
      component: HVACUnitConverter
    },
    {
      id: 'heat-load',
      name: 'Heat Load (Manual J)',
      icon: '📐',
      description: 'Estimate heating and cooling requirements',
      component: HeatLoadCalculator
    }
  ];

  const selectedCalc = calculators.find(c => c.id === selectedCalculator);

  if (selectedCalculator && selectedCalc) {
    const SelectedComponent = selectedCalc.component;
    
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCalculator(null)}
            className="mb-4 flex items-center text-primary hover:text-primary/90 font-medium"
          >
            <span className="mr-2">←</span> Back to Field Tools
          </button>
          
          <Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }>
            <SelectedComponent />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Field Tools</h1>
          <p className="text-lg text-muted-foreground">
            Professional HVAC calculators and diagnostic tools for field technicians
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setSelectedCalculator(calc.id)}
              className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-left group border border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{calc.icon}</div>
                <svg
                  className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {calc.name}
              </h3>
              
              <p className="text-muted-foreground">
                {calc.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-primary/10 border border-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">About Field Tools</h2>
          <div className="text-muted-foreground space-y-2">
            <p>
              These professional-grade calculators help HVAC technicians make accurate measurements
              and diagnoses in the field.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All calculations follow industry standards and NEC guidelines</li>
              <li>Designed for mobile use on phones and tablets</li>
              <li>No internet connection required for calculations</li>
              <li>Results can be saved to work orders</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-card rounded-lg shadow p-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
            <div className="flex items-start">
              <span className="mr-2">🏠</span>
              <span>HVAC Load Calculator (Manual J)</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">⚙️</span>
              <span>Belt Drive Calculator</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">🌡️</span>
              <span>Psychrometric Calculator</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">💰</span>
              <span>Job Pricing & Quote Builder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
