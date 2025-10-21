"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"

interface RefrigerantData {
  name: string
  type: string
  gwp: number
  ozoneDepleting: boolean
  commonUse: string
  pressureAt70F: { low: number; high: number }
  replacement?: string
}

const refrigerants: Record<string, RefrigerantData> = {
  "R-410A": {
    name: "R-410A (Puron)",
    type: "HFC Blend",
    gwp: 2088,
    ozoneDepleting: false,
    commonUse: "Residential & light commercial AC/HP",
    pressureAt70F: { low: 118, high: 201 },
    replacement: "R-32, R-454B",
  },
  "R-22": {
    name: "R-22 (Freon)",
    type: "HCFC",
    gwp: 1810,
    ozoneDepleting: true,
    commonUse: "Legacy residential systems",
    pressureAt70F: { low: 70, high: 158 },
    replacement: "R-410A, R-407C",
  },
  "R-134A": {
    name: "R-134A",
    type: "HFC",
    gwp: 1430,
    ozoneDepleting: false,
    commonUse: "Automotive AC, chillers",
    pressureAt70F: { low: 35, high: 72 },
    replacement: "R-1234yf",
  },
  "R-32": {
    name: "R-32",
    type: "HFC",
    gwp: 675,
    ozoneDepleting: false,
    commonUse: "New residential systems",
    pressureAt70F: { low: 135, high: 220 },
  },
  "R-407C": {
    name: "R-407C",
    type: "HFC Blend",
    gwp: 1774,
    ozoneDepleting: false,
    commonUse: "R-22 retrofit",
    pressureAt70F: { low: 73, high: 162 },
  },
}

export default function RefrigerantPage() {
  const [selectedRef, setSelectedRef] = useState("R-410A")
  const data = refrigerants[selectedRef]

  return (
    <CalculatorLayout title="Refrigerant Properties">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6">
          <label className="block text-slate-100 font-medium mb-3">Select Refrigerant</label>
          <select
            value={selectedRef}
            onChange={(e) => setSelectedRef(e.target.value)}
            className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {Object.keys(refrigerants).map((key) => (
              <option key={key} value={key}>
                {refrigerants[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <div className="text-slate-400 text-sm mb-1">Full Name</div>
            <div className="text-slate-100 font-semibold text-xl">{data.name}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-slate-400 text-sm mb-1">Type</div>
              <div className="text-slate-100 font-medium">{data.type}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">GWP</div>
              <div className="text-slate-100 font-medium">{data.gwp}</div>
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-sm mb-1">Ozone Depleting</div>
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                data.ozoneDepleting ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
              }`}
            >
              {data.ozoneDepleting ? "Yes - Phased Out" : "No"}
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-sm mb-1">Common Use</div>
            <div className="text-slate-100">{data.commonUse}</div>
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-4">Pressure at 70°F</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-600 rounded-lg p-4 text-center">
              <div className="text-slate-400 text-sm mb-2">Low Side (Suction)</div>
              <div className="text-slate-100 font-bold text-3xl">{data.pressureAt70F.low}</div>
              <div className="text-slate-400 text-sm mt-1">PSIG</div>
            </div>
            <div className="bg-slate-600 rounded-lg p-4 text-center">
              <div className="text-slate-400 text-sm mb-2">High Side (Discharge)</div>
              <div className="text-slate-100 font-bold text-3xl">{data.pressureAt70F.high}</div>
              <div className="text-slate-400 text-sm mt-1">PSIG</div>
            </div>
          </div>
        </div>

        {data.replacement && (
          <div className="bg-teal-500 rounded-lg p-4">
            <div className="text-white text-sm mb-1">Recommended Replacement</div>
            <div className="text-white font-semibold text-lg">{data.replacement}</div>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Important Notes</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Always recover refrigerant properly</li>
            <li>• Use EPA-certified equipment</li>
            <li>• Never mix refrigerant types</li>
            <li>• Check local regulations for handling</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
