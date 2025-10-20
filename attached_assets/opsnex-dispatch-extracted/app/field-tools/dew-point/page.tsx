"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function DewPointPage() {
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [result, setResult] = useState<{
    dewPoint: number
    spread: number
    status: string
    color: string
  } | null>(null)

  const calculate = () => {
    const temp = Number.parseFloat(temperature)
    const rh = Number.parseFloat(humidity)

    if (isNaN(temp) || isNaN(rh)) return

    // Magnus formula for dew point
    const a = 17.27
    const b = 237.7
    const alpha = (a * temp) / (b + temp) + Math.log(rh / 100)
    const dewPoint = (b * alpha) / (a - alpha)

    const spread = temp - dewPoint

    let status = ""
    let color = ""

    if (spread >= 5) {
      status = "Normal - Low condensation risk"
      color = "bg-emerald-500"
    } else if (spread >= 3) {
      status = "Caution - Monitor for condensation"
      color = "bg-amber-500"
    } else {
      status = "High Risk - Condensation likely"
      color = "bg-red-500"
    }

    setResult({
      dewPoint,
      spread,
      status,
      color,
    })
  }

  const clear = () => {
    setTemperature("")
    setHumidity("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Dew Point Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Air Temperature (°F)</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter temperature"
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
                <div className="text-slate-400 text-sm mb-2">Dew Point</div>
                <div className="text-5xl font-bold text-slate-100">{result.dewPoint.toFixed(1)}°F</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Spread</div>
                <div className="text-5xl font-bold text-slate-100">{result.spread.toFixed(1)}°F</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">About Dew Point</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Temperature at which air becomes saturated</li>
            <li>• Condensation occurs when surface temp ≤ dew point</li>
            <li>• Spread = Air Temp - Dew Point</li>
            <li>• Small spread = high condensation risk</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
