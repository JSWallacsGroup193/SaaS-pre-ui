"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function SuperheatPage() {
  const [suctionTemp, setSuctionTemp] = useState("")
  const [suctionPressure, setSuctionPressure] = useState("")
  const [refrigerant, setRefrigerant] = useState("R-410A")
  const [result, setResult] = useState<{ superheat: number; status: string; color: string } | null>(null)

  // Simplified saturation temp lookup (in real app, use proper PT chart)
  const getSaturationTemp = (pressure: number, refrig: string): number => {
    // Approximate values for R-410A
    if (refrig === "R-410A") {
      return pressure * 0.5 + 20 // Simplified formula
    }
    return pressure * 0.45 + 15 // R-22 approximation
  }

  const calculate = () => {
    const suction = Number.parseFloat(suctionTemp)
    const pressure = Number.parseFloat(suctionPressure)

    if (isNaN(suction) || isNaN(pressure)) return

    const satTemp = getSaturationTemp(pressure, refrigerant)
    const superheat = suction - satTemp

    let status = ""
    let color = ""

    if (superheat >= 8 && superheat <= 12) {
      status = "Normal - System is properly charged"
      color = "bg-emerald-500"
    } else if (superheat < 8) {
      status = "Low - Possible overcharge or restriction"
      color = "bg-amber-500"
    } else {
      status = "High - Possible undercharge or airflow issue"
      color = "bg-red-500"
    }

    setResult({ superheat, status, color })
  }

  const clear = () => {
    setSuctionTemp("")
    setSuctionPressure("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Superheat Calculator">
      <div className="space-y-6">
        {/* Input Card */}
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
            <label className="block text-slate-100 font-medium mb-2">Suction Line Temperature (°F)</label>
            <input
              type="number"
              value={suctionTemp}
              onChange={(e) => setSuctionTemp(e.target.value)}
              placeholder="Enter temperature"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Suction Pressure (PSIG)</label>
            <input
              type="number"
              value={suctionPressure}
              onChange={(e) => setSuctionPressure(e.target.value)}
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

        {/* Result Card */}
        {result && (
          <div className="bg-slate-700 rounded-lg p-6 space-y-4">
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">Superheat</div>
              <div className="text-5xl font-bold text-slate-100">{result.superheat.toFixed(1)}°F</div>
            </div>

            <div className={`${result.color} rounded-lg p-4 text-center`}>
              <div className="text-white font-semibold">{result.status}</div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">About Superheat</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Superheat is the temperature increase of refrigerant vapor above its saturation temperature. Normal
            superheat ranges from 8-12°F for most systems. Low superheat indicates overcharge, while high superheat
            suggests undercharge or airflow problems.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
