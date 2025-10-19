import { useState } from 'react';
import CapacitorTestTool from './components/CapacitorTestTool';
import MotorAmpsChecker from './components/MotorAmpsChecker';
import VoltageDropTool from './components/VoltageDropTool';
import OhmsLawCalculator from './components/OhmsLawCalculator';

type CalculatorType = 'capacitor' | 'motor' | 'voltage' | 'ohms' | null;

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
    }
  ];

  const selectedCalc = calculators.find(c => c.id === selectedCalculator);

  if (selectedCalculator && selectedCalc) {
    const SelectedComponent = selectedCalc.component;
    
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCalculator(null)}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <span className="mr-2">←</span> Back to Field Tools
          </button>
          
          <SelectedComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Field Tools</h1>
          <p className="text-lg text-gray-600">
            Professional HVAC calculators and diagnostic tools for field technicians
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setSelectedCalculator(calc.id)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{calc.icon}</div>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors"
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
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {calc.name}
              </h3>
              
              <p className="text-gray-600">
                {calc.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">About Field Tools</h2>
          <div className="text-blue-800 space-y-2">
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

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-start">
              <span className="mr-2">🏠</span>
              <span>HVAC Load Calculator</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">❄️</span>
              <span>Refrigerant Charge Calculator</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">💨</span>
              <span>Airflow / CFM Calculator</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">💰</span>
              <span>Pricing & Quote Builder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
