"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function CFMPage() {
  const [calculationType, setCalculationType] = useState<"tonnage" | "velocity" | "btu">("tonnage")
  const [tonnage, setTonnage] = useState("")
  const [ductSize, setDuctSize] = useState("")
  const [velocity, setVelocity] = useState("")
  const [btu, setBtu] = useState("")
  const [deltaT, setDeltaT] = useState("20")
  const [result, setResult] = useState<{ cfm: number; status: string; color: string } | null>(null)

  const calculate = () => {
    let cfm = 0

    switch (calculationType) {
      case "tonnage": {
        const tons = Number.parseFloat(tonnage)
        if (!isNaN(tons)) {
          cfm = tons * 400 // Standard 400 CFM per ton
        }
        break
      }
      case "velocity": {
        const size = Number.parseFloat(ductSize)
        const vel = Number.parseFloat(velocity)
        if (!isNaN(size) && !isNaN(vel)) {
          const area = (size * size) / 144 // Convert sq in to sq ft
          cfm = area * vel
        }
        break
      }
      case "btu": {
        const btuValue = Number.parseFloat(btu)
        const dt = Number.parseFloat(deltaT)
        if (!isNaN(btuValue) && !isNaN(dt)) {
          cfm = btuValue / (1.08 * dt)
        }
        break
      }
    }

    let status = ""
    let color = ""

    const cfmPerTon = cfm / (Number.parseFloat(tonnage) || 1)
    if (cfmPerTon >= 350 && cfmPerTon <= 450) {
      status = "Normal - Adequate airflow"
      color = "bg-emerald-500"
    } else if (cfmPerTon < 350) {
      status = "Low - Check for restrictions"
      color = "bg-red-500"
    } else {
      status = "High - Verify system sizing"
      color = "bg-amber-500"
    }

    setResult({ cfm, status, color })
  }

  const clear = () => {
    setTonnage("")
    setDuctSize("")
    setVelocity("")
    setBtu("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="CFM Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Calculation Method</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="tonnage">By Tonnage</option>
              <option value="velocity">By Velocity</option>
              <option value="btu">By BTU</option>
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

          {calculationType === "velocity" && (
            <>
              <div>
                <label className="block text-slate-100 font-medium mb-2">Duct Size (inches, one side if square)</label>
                <input
                  type="number"
                  value={ductSize}
                  onChange={(e) => setDuctSize(e.target.value)}
                  placeholder="Enter duct size"
                  className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-100 font-medium mb-2">Air Velocity (FPM)</label>
                <input
                  type="number"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  placeholder="Enter velocity"
                  className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </>
          )}

          {calculationType === "btu" && (
            <>
              <div>
                <label className="block text-slate-100 font-medium mb-2">BTU/hr</label>
                <input
                  type="number"
                  value={btu}
                  onChange={(e) => setBtu(e.target.value)}
                  placeholder="Enter BTU"
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
              <div className="text-slate-400 text-sm mb-2">Airflow</div>
              <div className="text-5xl font-bold text-slate-100">{result.cfm.toFixed(0)} CFM</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">CFM Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Standard: 400 CFM per ton of cooling</li>
            <li>• Minimum: 350 CFM per ton</li>
            <li>• High efficiency: 450 CFM per ton</li>
            <li>• Formula: CFM = (BTU/hr) ÷ (1.08 × ΔT)</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
