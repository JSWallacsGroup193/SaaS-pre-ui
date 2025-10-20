"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function BTUPage() {
  const [calculationType, setCalculationType] = useState<"tonnage" | "watts" | "cfm">("tonnage")
  const [tonnage, setTonnage] = useState("")
  const [watts, setWatts] = useState("")
  const [cfm, setCfm] = useState("")
  const [deltaT, setDeltaT] = useState("20")
  const [result, setResult] = useState<{ btu: number; description: string } | null>(null)

  const calculate = () => {
    let btu = 0
    let description = ""

    switch (calculationType) {
      case "tonnage": {
        const tons = Number.parseFloat(tonnage)
        if (!isNaN(tons)) {
          btu = tons * 12000
          description = `${tons} ton system capacity`
        }
        break
      }
      case "watts": {
        const w = Number.parseFloat(watts)
        if (!isNaN(w)) {
          btu = w * 3.412
          description = "Electrical heat output"
        }
        break
      }
      case "cfm": {
        const airflow = Number.parseFloat(cfm)
        const dt = Number.parseFloat(deltaT)
        if (!isNaN(airflow) && !isNaN(dt)) {
          btu = airflow * dt * 1.08
          description = "Sensible cooling capacity"
        }
        break
      }
    }

    if (btu > 0) {
      setResult({ btu, description })
    }
  }

  const clear = () => {
    setTonnage("")
    setWatts("")
    setCfm("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="BTU Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Calculation Method</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="tonnage">From Tonnage</option>
              <option value="watts">From Watts</option>
              <option value="cfm">From CFM & Delta T</option>
            </select>
          </div>

          {calculationType === "tonnage" && (
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
          )}

          {calculationType === "watts" && (
            <div>
              <label className="block text-slate-100 font-medium mb-2">Watts</label>
              <input
                type="number"
                value={watts}
                onChange={(e) => setWatts(e.target.value)}
                placeholder="Enter watts"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          {calculationType === "cfm" && (
            <>
              <div>
                <label className="block text-slate-100 font-medium mb-2">Airflow (CFM)</label>
                <input
                  type="number"
                  value={cfm}
                  onChange={(e) => setCfm(e.target.value)}
                  placeholder="Enter CFM"
                  className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-100 font-medium mb-2">Temperature Difference (°F)</label>
                <input
                  type="number"
                  value={deltaT}
                  onChange={(e) => setDeltaT(e.target.value)}
                  placeholder="Delta T"
                  className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </>
          )}

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
              <div className="text-slate-400 text-sm mb-2">BTU/hr</div>
              <div className="text-5xl font-bold text-slate-100">{result.btu.toFixed(0)}</div>
            </div>

            <div className="bg-teal-500 rounded-lg p-4 text-center">
              <div className="text-white font-semibold">{result.description}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Tons</div>
                <div className="text-slate-100 font-semibold text-xl">{(result.btu / 12000).toFixed(2)}</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Watts</div>
                <div className="text-slate-100 font-semibold text-xl">{(result.btu / 3.412).toFixed(0)}</div>
              </div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">BTU Conversions</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• 1 ton = 12,000 BTU/hr</li>
            <li>• 1 watt = 3.412 BTU/hr</li>
            <li>• BTU = CFM × ΔT × 1.08</li>
            <li>• 1 kW = 3,412 BTU/hr</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
