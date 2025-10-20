"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function HeatLoadPage() {
  const [squareFeet, setSquareFeet] = useState("")
  const [ceilingHeight, setCeilingHeight] = useState("8")
  const [insulation, setInsulation] = useState("average")
  const [windows, setWindows] = useState("average")
  const [occupants, setOccupants] = useState("2")
  const [climate, setClimate] = useState("moderate")
  const [result, setResult] = useState<{
    coolingLoad: number
    heatingLoad: number
    recommendedTonnage: number
  } | null>(null)

  const calculate = () => {
    const sqft = Number.parseFloat(squareFeet)
    const height = Number.parseFloat(ceilingHeight)
    const people = Number.parseFloat(occupants)

    if (isNaN(sqft)) return

    // Base load calculation
    let coolingBTU = sqft * 25 // Base 25 BTU per sq ft

    // Insulation factor
    const insulationFactor = insulation === "poor" ? 1.3 : insulation === "good" ? 0.8 : 1.0
    coolingBTU *= insulationFactor

    // Window factor
    const windowFactor = windows === "many" ? 1.2 : windows === "few" ? 0.9 : 1.0
    coolingBTU *= windowFactor

    // Climate factor
    const climateFactor = climate === "hot" ? 1.3 : climate === "cold" ? 0.8 : 1.0
    coolingBTU *= climateFactor

    // Add for occupants (600 BTU per person)
    coolingBTU += people * 600

    // Ceiling height adjustment
    if (height > 8) {
      coolingBTU *= 1 + (height - 8) * 0.05
    }

    const heatingBTU = coolingBTU * 0.8 // Heating typically 80% of cooling
    const tonnage = coolingBTU / 12000

    setResult({
      coolingLoad: coolingBTU,
      heatingLoad: heatingBTU,
      recommendedTonnage: Math.ceil(tonnage * 2) / 2, // Round to nearest 0.5 ton
    })
  }

  const clear = () => {
    setSquareFeet("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Heat Load Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Square Footage</label>
            <input
              type="number"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              placeholder="Enter square feet"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-100 font-medium mb-2">Ceiling Height (ft)</label>
              <input
                type="number"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(e.target.value)}
                placeholder="Height"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-100 font-medium mb-2">Occupants</label>
              <input
                type="number"
                value={occupants}
                onChange={(e) => setOccupants(e.target.value)}
                placeholder="People"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Insulation Quality</label>
            <select
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Window Coverage</label>
            <select
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="few">Few Windows</option>
              <option value="average">Average</option>
              <option value="many">Many Windows</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Climate</label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="cold">Cold</option>
              <option value="moderate">Moderate</option>
              <option value="hot">Hot</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 h-14 bg-teal-500 hover:bg-teal-600 text-white font-semibold">
              Calculate
            </Button>
            <Button onClick={clear} className="h-14 bg-slate-600 hover:bg-slate-500 text-white">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-700 rounded-lg p-6 space-y-4">
            <div className="text-center mb-4">
              <div className="text-slate-400 text-sm mb-2">Recommended System Size</div>
              <div className="text-5xl font-bold text-slate-100">{result.recommendedTonnage} Tons</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Cooling Load</div>
                <div className="text-slate-100 font-semibold text-lg">{result.coolingLoad.toFixed(0)} BTU/hr</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Heating Load</div>
                <div className="text-slate-100 font-semibold text-lg">{result.heatingLoad.toFixed(0)} BTU/hr</div>
              </div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Load Calculation Notes</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• This is a simplified estimate</li>
            <li>• Manual J calculation recommended for accuracy</li>
            <li>• Consider orientation, shade, and local climate</li>
            <li>• Oversizing reduces efficiency and comfort</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
