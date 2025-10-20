"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function DuctSizingPage() {
  const [cfm, setCfm] = useState("")
  const [velocity, setVelocity] = useState("700")
  const [ductShape, setDuctShape] = useState<"round" | "rectangular">("round")
  const [result, setResult] = useState<{
    diameter?: number
    width?: number
    height?: number
    area: number
    actualVelocity: number
  } | null>(null)

  const calculate = () => {
    const airflow = Number.parseFloat(cfm)
    const vel = Number.parseFloat(velocity)

    if (isNaN(airflow) || isNaN(vel)) return

    const area = airflow / vel // sq ft
    const areaInches = area * 144 // sq in

    if (ductShape === "round") {
      const diameter = Math.sqrt((areaInches * 4) / Math.PI)
      const roundedDiameter = Math.ceil(diameter)
      const actualArea = (Math.PI * roundedDiameter * roundedDiameter) / 4 / 144
      const actualVelocity = airflow / actualArea

      setResult({
        diameter: roundedDiameter,
        area: actualArea,
        actualVelocity,
      })
    } else {
      // Rectangular - use common aspect ratios
      const width = Math.ceil(Math.sqrt(areaInches * 2))
      const height = Math.ceil(areaInches / width)
      const actualArea = (width * height) / 144
      const actualVelocity = airflow / actualArea

      setResult({
        width,
        height,
        area: actualArea,
        actualVelocity,
      })
    }
  }

  const clear = () => {
    setCfm("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Duct Sizing Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Duct Shape</label>
            <select
              value={ductShape}
              onChange={(e) => setDuctShape(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="round">Round</option>
              <option value="rectangular">Rectangular</option>
            </select>
          </div>

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
            <label className="block text-slate-100 font-medium mb-2">Target Velocity (FPM)</label>
            <input
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              placeholder="Enter velocity"
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
            {ductShape === "round" ? (
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Recommended Diameter</div>
                <div className="text-5xl font-bold text-slate-100">{result.diameter}"</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-slate-400 text-sm mb-2">Width</div>
                  <div className="text-4xl font-bold text-slate-100">{result.width}"</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm mb-2">Height</div>
                  <div className="text-4xl font-bold text-slate-100">{result.height}"</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Area</div>
                <div className="text-slate-100 font-semibold text-lg">{result.area.toFixed(2)} sq ft</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Actual Velocity</div>
                <div className="text-slate-100 font-semibold text-lg">{result.actualVelocity.toFixed(0)} FPM</div>
              </div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Velocity Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Supply trunk: 700-900 FPM</li>
            <li>• Branch ducts: 500-700 FPM</li>
            <li>• Return ducts: 500-600 FPM</li>
            <li>• Lower velocity = quieter operation</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
