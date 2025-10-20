"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function WetBulbPage() {
  const [dryBulb, setDryBulb] = useState("")
  const [humidity, setHumidity] = useState("")
  const [pressure, setPressure] = useState("29.92")
  const [result, setResult] = useState<{
    wetBulb: number
    dewPoint: number
    enthalpy: number
  } | null>(null)

  const calculate = () => {
    const db = Number.parseFloat(dryBulb)
    const rh = Number.parseFloat(humidity)

    if (isNaN(db) || isNaN(rh)) return

    // Simplified wet bulb calculation
    const dewPoint = db - (100 - rh) / 5
    const wetBulb = db - (100 - rh) * 0.36

    // Approximate enthalpy (BTU/lb)
    const enthalpy = 0.24 * db + (rh / 100) * (1061 + 0.444 * db)

    setResult({
      wetBulb: Math.max(dewPoint, wetBulb),
      dewPoint,
      enthalpy,
    })
  }

  const clear = () => {
    setDryBulb("")
    setHumidity("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Wet Bulb Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Dry Bulb Temperature (°F)</label>
            <input
              type="number"
              value={dryBulb}
              onChange={(e) => setDryBulb(e.target.value)}
              placeholder="Enter dry bulb temp"
              step="0.1"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Relative Humidity (%)</label>
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              placeholder="Enter humidity"
              min="0"
              max="100"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Barometric Pressure (in. Hg)</label>
            <input
              type="number"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              placeholder="Enter pressure"
              step="0.01"
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
            <div className="text-center mb-4">
              <div className="text-slate-400 text-sm mb-2">Wet Bulb Temperature</div>
              <div className="text-5xl font-bold text-slate-100">{result.wetBulb.toFixed(1)}°F</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Dew Point</div>
                <div className="text-slate-100 font-semibold text-2xl">{result.dewPoint.toFixed(1)}°F</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Enthalpy</div>
                <div className="text-slate-100 font-semibold text-2xl">{result.enthalpy.toFixed(1)} BTU/lb</div>
              </div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">About Wet Bulb</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Temperature with 100% evaporative cooling</li>
            <li>• Always between dew point and dry bulb</li>
            <li>• Used for evaporative cooling calculations</li>
            <li>• Critical for cooling tower performance</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
