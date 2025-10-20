"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function SubcoolingPage() {
  const [liquidTemp, setLiquidTemp] = useState("")
  const [dischargePressure, setDischargePressure] = useState("")
  const [refrigerant, setRefrigerant] = useState("R-410A")
  const [result, setResult] = useState<{ subcooling: number; status: string; color: string } | null>(null)

  const getSaturationTemp = (pressure: number, refrig: string): number => {
    if (refrig === "R-410A") {
      return pressure * 0.4 + 50
    }
    return pressure * 0.35 + 45
  }

  const calculate = () => {
    const liquid = Number.parseFloat(liquidTemp)
    const pressure = Number.parseFloat(dischargePressure)

    if (isNaN(liquid) || isNaN(pressure)) return

    const satTemp = getSaturationTemp(pressure, refrigerant)
    const subcooling = satTemp - liquid

    let status = ""
    let color = ""

    if (subcooling >= 10 && subcooling <= 15) {
      status = "Normal - System is properly charged"
      color = "bg-emerald-500"
    } else if (subcooling < 10) {
      status = "Low - Possible undercharge"
      color = "bg-amber-500"
    } else {
      status = "High - Possible overcharge or restriction"
      color = "bg-red-500"
    }

    setResult({ subcooling, status, color })
  }

  const clear = () => {
    setLiquidTemp("")
    setDischargePressure("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Subcooling Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Refrigerant Type</label>
            <select
              value={refrigerant}
              onChange={(e) => setRefrigerant(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="R-410A">R-410A</option>
              <option value="R-22">R-22</option>
              <option value="R-134A">R-134A</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Liquid Line Temperature (°F)</label>
            <input
              type="number"
              value={liquidTemp}
              onChange={(e) => setLiquidTemp(e.target.value)}
              placeholder="Enter temperature"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Discharge Pressure (PSIG)</label>
            <input
              type="number"
              value={dischargePressure}
              onChange={(e) => setDischargePressure(e.target.value)}
              placeholder="Enter pressure"
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
              <div className="text-slate-400 text-sm mb-2">Subcooling</div>
              <div className="text-5xl font-bold text-slate-100">{result.subcooling.toFixed(1)}°F</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">About Subcooling</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Subcooling is the temperature decrease of liquid refrigerant below its saturation temperature. Normal
            subcooling ranges from 10-15°F for most systems. Low subcooling indicates undercharge, while high subcooling
            suggests overcharge or liquid line restriction.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
