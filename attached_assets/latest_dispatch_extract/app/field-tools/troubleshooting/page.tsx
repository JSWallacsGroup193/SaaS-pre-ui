"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Issue {
  symptom: string
  causes: string[]
  solutions: string[]
}

const troubleshootingData: Record<string, Issue[]> = {
  cooling: [
    {
      symptom: "No Cooling",
      causes: ["Thermostat issue", "Power supply problem", "Compressor failure", "Low refrigerant"],
      solutions: [
        "Check thermostat settings and batteries",
        "Verify power at disconnect and breaker",
        "Test compressor with multimeter",
        "Check superheat and subcooling",
      ],
    },
    {
      symptom: "Insufficient Cooling",
      causes: ["Dirty filters", "Low refrigerant", "Dirty coils", "Undersized system"],
      solutions: [
        "Replace air filters",
        "Check for leaks and recharge",
        "Clean evaporator and condenser coils",
        "Verify proper system sizing",
      ],
    },
    {
      symptom: "Short Cycling",
      causes: ["Oversized system", "Dirty coils", "Low refrigerant", "Thermostat location"],
      solutions: [
        "Consider system replacement if severely oversized",
        "Clean coils thoroughly",
        "Check charge and repair leaks",
        "Relocate thermostat away from heat sources",
      ],
    },
  ],
  heating: [
    {
      symptom: "No Heat",
      causes: ["Thermostat issue", "Pilot light out", "Ignition failure", "Gas supply problem"],
      solutions: [
        "Check thermostat mode and temperature",
        "Relight pilot following instructions",
        "Test igniter and flame sensor",
        "Verify gas valve is open",
      ],
    },
    {
      symptom: "Insufficient Heat",
      causes: ["Dirty filters", "Blocked vents", "Undersized system", "Ductwork leaks"],
      solutions: [
        "Replace air filters",
        "Clear all supply and return vents",
        "Verify proper system sizing",
        "Seal ductwork leaks",
      ],
    },
  ],
  airflow: [
    {
      symptom: "Weak Airflow",
      causes: ["Dirty filters", "Blower motor issue", "Ductwork problems", "Closed dampers"],
      solutions: [
        "Replace filters immediately",
        "Test blower motor and capacitor",
        "Inspect ductwork for restrictions",
        "Open all dampers fully",
      ],
    },
    {
      symptom: "Noisy Operation",
      causes: ["Loose parts", "Belt issues", "Bearing wear", "Ductwork vibration"],
      solutions: [
        "Tighten all mounting hardware",
        "Adjust or replace blower belt",
        "Lubricate or replace bearings",
        "Secure loose ductwork",
      ],
    },
  ],
}

export default function TroubleshootingPage() {
  const [category, setCategory] = useState("cooling")
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <CalculatorLayout title="Troubleshooting Guide">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6">
          <label className="block text-slate-100 font-medium mb-3">System Category</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setCategory("cooling")}
              className={`h-14 rounded-lg font-medium transition-colors ${
                category === "cooling" ? "bg-teal-500 text-white" : "bg-slate-600 text-slate-100 hover:bg-slate-500"
              }`}
            >
              Cooling
            </button>
            <button
              onClick={() => setCategory("heating")}
              className={`h-14 rounded-lg font-medium transition-colors ${
                category === "heating" ? "bg-teal-500 text-white" : "bg-slate-600 text-slate-100 hover:bg-slate-500"
              }`}
            >
              Heating
            </button>
            <button
              onClick={() => setCategory("airflow")}
              className={`h-14 rounded-lg font-medium transition-colors ${
                category === "airflow" ? "bg-teal-500 text-white" : "bg-slate-600 text-slate-100 hover:bg-slate-500"
              }`}
            >
              Airflow
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {troubleshootingData[category].map((issue, index) => (
            <div key={index} className="bg-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-600 transition-colors"
              >
                <span className="text-slate-100 font-semibold">{issue.symptom}</span>
                {expandedIndex === index ? (
                  <ChevronDown className="w-5 h-5 text-teal-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedIndex === index && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <h4 className="text-slate-100 font-medium mb-2">Possible Causes:</h4>
                    <ul className="space-y-1">
                      {issue.causes.map((cause, i) => (
                        <li key={i} className="text-slate-400 text-sm">
                          • {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-slate-100 font-medium mb-2">Solutions:</h4>
                    <ol className="space-y-1">
                      {issue.solutions.map((solution, i) => (
                        <li key={i} className="text-slate-400 text-sm">
                          {i + 1}. {solution}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Safety Reminders</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Always turn off power before servicing</li>
            <li>• Use proper safety equipment and tools</li>
            <li>• Follow manufacturer guidelines</li>
            <li>• Call for backup on complex issues</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
