"use client"

import { Calculator, Zap, Wind, Droplets, TrendingUp, Wrench } from "lucide-react"
import Link from "next/link"

const toolCategories = [
  {
    name: "Refrigeration",
    icon: Droplets,
    color: "bg-blue-500",
    tools: [
      { name: "Superheat Calculator", path: "/field-tools/superheat" },
      { name: "Subcooling Calculator", path: "/field-tools/subcooling" },
      { name: "Target Superheat", path: "/field-tools/target-superheat" },
      { name: "Charging Chart", path: "/field-tools/charging-chart" },
    ],
  },
  {
    name: "Electrical",
    icon: Zap,
    color: "bg-yellow-500",
    tools: [
      { name: "Ohm's Law Calculator", path: "/field-tools/ohms-law" },
      { name: "Capacitor Calculator", path: "/field-tools/capacitor" },
      { name: "Motor Analysis", path: "/field-tools/motor-analysis" },
      { name: "Voltage Drop", path: "/field-tools/voltage-drop" },
    ],
  },
  {
    name: "Airflow",
    icon: Wind,
    color: "bg-cyan-500",
    tools: [
      { name: "CFM Calculator", path: "/field-tools/cfm" },
      { name: "Static Pressure", path: "/field-tools/static-pressure" },
      { name: "Duct Sizing", path: "/field-tools/duct-sizing" },
      { name: "Fan Laws", path: "/field-tools/fan-laws" },
    ],
  },
  {
    name: "Psychrometric",
    icon: TrendingUp,
    color: "bg-purple-500",
    tools: [
      { name: "Temperature Conversion", path: "/field-tools/temp-conversion" },
      { name: "Humidity Calculator", path: "/field-tools/humidity" },
      { name: "Dew Point", path: "/field-tools/dew-point" },
      { name: "Wet Bulb", path: "/field-tools/wet-bulb" },
    ],
  },
  {
    name: "Efficiency",
    icon: TrendingUp,
    color: "bg-green-500",
    tools: [
      { name: "SEER/EER Calculator", path: "/field-tools/seer-eer" },
      { name: "Heat Load", path: "/field-tools/heat-load" },
      { name: "BTU Calculator", path: "/field-tools/btu" },
      { name: "Delta T", path: "/field-tools/delta-t" },
    ],
  },
  {
    name: "Diagnostic",
    icon: Wrench,
    color: "bg-red-500",
    tools: [
      { name: "Troubleshooting Guide", path: "/field-tools/troubleshooting" },
      { name: "Refrigerant Properties", path: "/field-tools/refrigerant" },
      { name: "Unit Converter", path: "/field-tools/converter" },
    ],
  },
]

export default function FieldToolsPage() {
  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-teal-500" />
            <h1 className="text-2xl font-bold text-slate-100">Field Tools</h1>
          </div>
          <p className="text-slate-400 mt-2">Professional HVAC calculators and diagnostic tools</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {toolCategories.map((category) => (
            <div key={category.name} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${category.color} p-2 rounded-lg`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-100">{category.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className="bg-slate-600 hover:bg-slate-500 transition-colors rounded-lg p-4 text-slate-100 font-medium text-center"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
