"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function DeltaTPage() {
  const [supplyTemp, setSupplyTemp] = useState("")
  const [returnTemp, setReturnTemp] = useState("")
  const [systemType, setSystemType] = useState<"cooling" | "heating">("cooling")
  const [result, setResult] = useState<{
    deltaT: number
    status: string
    color: string
    recommendation: string
  } | null>(null)

  const calculate = () => {
    const supply = Number.parseFloat(supplyTemp)
    const returnVal = Number.parseFloat(returnTemp)

    if (isNaN(supply) || isNaN(returnVal)) return

    const deltaT = Math.abs(returnVal - supply)

    let status = ""
    let color = ""
    let recommendation = ""

    if (systemType === "cooling") {
      if (deltaT >= 18 && deltaT <= 22) {
        status = "Normal - System operating properly"
        color = "bg-emerald-500"
        recommendation = "Continue normal operation"
      } else if (deltaT < 18) {
        status = "Low - Possible airflow or charge issue"
        color = "bg-amber-500"
        recommendation = "Check airflow, filters, and refrigerant charge"
      } else {
        status = "High - Possible low airflow"
        color = "bg-red-500"
        recommendation = "Check for restricted airflow or dirty coils"
      }
    } else {
      if (deltaT >= 35 && deltaT <= 50) {
        status = "Normal - System operating properly"
        color = "bg-emerald-500"
        recommendation = "Continue normal operation"
      } else if (deltaT < 35) {
        status = "Low - Check heat source"
        color = "bg-amber-500"
        recommendation = "Verify heat strips or heat pump operation"
      } else {
        status = "High - Possible airflow restriction"
        color = "bg-red-500"
        recommendation = "Check blower speed and ductwork"
      }
    }

    setResult({
      deltaT,
      status,
      color,
      recommendation,
    })
  }

  const clear = () => {
    setSupplyTemp("")
    setReturnTemp("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Delta T Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">System Mode</label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="cooling">Cooling</option>
              <option value="heating">Heating</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Supply Air Temperature (°F)</label>
            <input
              type="number"
              value={supplyTemp}
              onChange={(e) => setSupplyTemp(e.target.value)}
              placeholder="Enter supply temp"
              step="0.1"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Return Air Temperature (°F)</label>
            <input
              type="number"
              value={returnTemp}
              onChange={(e) => setReturnTemp(e.target.value)}
              placeholder="Enter return temp"
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
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">Temperature Split (ΔT)</div>
              <div className="text-5xl font-bold text-slate-100">{result.deltaT.toFixed(1)}°F</div>
            </div>

            <div className={`${result.color} rounded-lg p-4 text-center`}>
              <div className="text-white font-semibold">{result.status}</div>
            </div>

            <div className="bg-slate-600 rounded-lg p-4">
              <div className="text-slate-400 text-sm mb-2">Recommendation</div>
              <div className="text-slate-100">{result.recommendation}</div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Delta T Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Cooling: 18-22°F is normal</li>
            <li>• Heating: 35-50°F is normal</li>
            <li>• Low ΔT: Check airflow and charge</li>
            <li>• High ΔT: Check for restrictions</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
