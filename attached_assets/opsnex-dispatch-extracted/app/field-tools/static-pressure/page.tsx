"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function StaticPressurePage() {
  const [supplyPressure, setSupplyPressure] = useState("")
  const [returnPressure, setReturnPressure] = useState("")
  const [systemType, setSystemType] = useState("residential")
  const [result, setResult] = useState<{
    totalESP: number
    supplyESP: number
    returnESP: number
    status: string
    color: string
  } | null>(null)

  const calculate = () => {
    const supply = Number.parseFloat(supplyPressure)
    const returnVal = Number.parseFloat(returnPressure)

    if (isNaN(supply) || isNaN(returnVal)) return

    const supplyESP = Math.abs(supply)
    const returnESP = Math.abs(returnVal)
    const totalESP = supplyESP + returnESP

    let status = ""
    let color = ""

    const maxESP = systemType === "residential" ? 0.5 : 1.0

    if (totalESP <= maxESP) {
      status = "Normal - Adequate airflow"
      color = "bg-emerald-500"
    } else if (totalESP <= maxESP * 1.2) {
      status = "Elevated - Check filters and coils"
      color = "bg-amber-500"
    } else {
      status = "High - Restriction present"
      color = "bg-red-500"
    }

    setResult({
      totalESP,
      supplyESP,
      returnESP,
      status,
      color,
    })
  }

  const clear = () => {
    setSupplyPressure("")
    setReturnPressure("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Static Pressure Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">System Type</label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Supply Pressure (in. w.c.)</label>
            <input
              type="number"
              value={supplyPressure}
              onChange={(e) => setSupplyPressure(e.target.value)}
              placeholder="Enter supply pressure"
              step="0.01"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Return Pressure (in. w.c.)</label>
            <input
              type="number"
              value={returnPressure}
              onChange={(e) => setReturnPressure(e.target.value)}
              placeholder="Enter return pressure"
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
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">Total External Static Pressure</div>
              <div className="text-5xl font-bold text-slate-100">{result.totalESP.toFixed(2)}"</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Supply ESP</div>
                <div className="text-slate-100 font-semibold text-2xl">{result.supplyESP.toFixed(2)}"</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Return ESP</div>
                <div className="text-slate-100 font-semibold text-2xl">{result.returnESP.toFixed(2)}"</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">Static Pressure Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Residential max: 0.5" w.c.</li>
            <li>• Commercial max: 1.0" w.c.</li>
            <li>• High pressure reduces airflow and efficiency</li>
            <li>• Check filters, coils, and ductwork for restrictions</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
