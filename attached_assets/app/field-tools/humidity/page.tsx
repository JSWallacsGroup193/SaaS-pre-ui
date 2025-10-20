"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function HumidityPage() {
  const [dryBulb, setDryBulb] = useState("")
  const [wetBulb, setWetBulb] = useState("")
  const [result, setResult] = useState<{
    relativeHumidity: number
    dewPoint: number
    status: string
    color: string
  } | null>(null)

  const calculate = () => {
    const db = Number.parseFloat(dryBulb)
    const wb = Number.parseFloat(wetBulb)

    if (isNaN(db) || isNaN(wb)) return

    // Simplified psychrometric calculations
    const depression = db - wb
    const relativeHumidity = 100 - 5 * depression // Simplified formula

    // Approximate dew point
    const dewPoint = db - (100 - relativeHumidity) / 5

    let status = ""
    let color = ""

    if (relativeHumidity >= 30 && relativeHumidity <= 60) {
      status = "Comfortable - Ideal humidity range"
      color = "bg-emerald-500"
    } else if (relativeHumidity < 30) {
      status = "Dry - May cause discomfort"
      color = "bg-amber-500"
    } else {
      status = "Humid - May feel uncomfortable"
      color = "bg-amber-500"
    }

    setResult({
      relativeHumidity: Math.max(0, Math.min(100, relativeHumidity)),
      dewPoint,
      status,
      color,
    })
  }

  const clear = () => {
    setDryBulb("")
    setWetBulb("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Humidity Calculator">
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
            <label className="block text-slate-100 font-medium mb-2">Wet Bulb Temperature (°F)</label>
            <input
              type="number"
              value={wetBulb}
              onChange={(e) => setWetBulb(e.target.value)}
              placeholder="Enter wet bulb temp"
              step="0.1"
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
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Relative Humidity</div>
                <div className="text-5xl font-bold text-slate-100">{result.relativeHumidity.toFixed(0)}%</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Dew Point</div>
                <div className="text-5xl font-bold text-slate-100">{result.dewPoint.toFixed(1)}°F</div>
              </div>
            </div>

            <div className={`${result.color} rounded-lg p-4 text-center`}>
              <div className="text-white font-semibold">{result.status}</div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Humidity Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Ideal range: 30-60% RH</li>
            <li>• Below 30%: Dry air, static electricity</li>
            <li>• Above 60%: Mold growth risk</li>
            <li>• Wet bulb is always ≤ dry bulb</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
