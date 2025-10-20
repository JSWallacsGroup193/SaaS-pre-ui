"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function ChargingChartPage() {
  const [systemType, setSystemType] = useState("heat-pump")
  const [tonnage, setTonnage] = useState("")
  const [lineLength, setLineLength] = useState("")
  const [result, setResult] = useState<{
    charge: number
    superheat: string
    subcooling: string
  } | null>(null)

  const calculate = () => {
    const tons = Number.parseFloat(tonnage)
    const length = Number.parseFloat(lineLength)

    if (isNaN(tons) || isNaN(length)) return

    // Base charge calculation (simplified)
    const baseCharge = tons * 2.5 // lbs per ton

    // Add for line length
    const additionalCharge = Math.max(0, length - 15) * 0.6

    const totalCharge = baseCharge + additionalCharge

    setResult({
      charge: totalCharge,
      superheat: systemType === "heat-pump" ? "8-12°F" : "10-15°F",
      subcooling: "10-15°F",
    })
  }

  const clear = () => {
    setTonnage("")
    setLineLength("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Charging Chart">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">System Type</label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="heat-pump">Heat Pump</option>
              <option value="ac-only">AC Only</option>
              <option value="package">Package Unit</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">System Tonnage</label>
            <input
              type="number"
              value={tonnage}
              onChange={(e) => setTonnage(e.target.value)}
              placeholder="Enter tonnage"
              step="0.5"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Line Set Length (ft)</label>
            <input
              type="number"
              value={lineLength}
              onChange={(e) => setLineLength(e.target.value)}
              placeholder="Enter length"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
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
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">Recommended Charge</div>
              <div className="text-5xl font-bold text-slate-100">{result.charge.toFixed(1)} lbs</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Target Superheat</div>
                <div className="text-slate-100 font-semibold text-lg">{result.superheat}</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Target Subcooling</div>
                <div className="text-slate-100 font-semibold text-lg">{result.subcooling}</div>
              </div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Charging Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Always verify manufacturer specifications</li>
            <li>• Add 0.6 oz per foot over 15 ft line length</li>
            <li>• Check superheat and subcooling after charging</li>
            <li>• Allow system to stabilize for 15 minutes</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
