"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function TargetSuperheatPage() {
  const [indoorTemp, setIndoorTemp] = useState("")
  const [outdoorTemp, setOutdoorTemp] = useState("")
  const [indoorHumidity, setIndoorHumidity] = useState("50")
  const [result, setResult] = useState<{ target: number; range: string } | null>(null)

  const calculate = () => {
    const indoor = Number.parseFloat(indoorTemp)
    const outdoor = Number.parseFloat(outdoorTemp)
    const humidity = Number.parseFloat(indoorHumidity)

    if (isNaN(indoor) || isNaN(outdoor) || isNaN(humidity)) return

    // Simplified target superheat formula
    const tempDiff = outdoor - indoor
    const humidityFactor = (humidity - 50) * 0.1
    const target = 10 + tempDiff * 0.05 - humidityFactor

    const min = target - 2
    const max = target + 2

    setResult({
      target: Math.max(5, Math.min(20, target)),
      range: `${min.toFixed(1)}°F - ${max.toFixed(1)}°F`,
    })
  }

  const clear = () => {
    setIndoorTemp("")
    setOutdoorTemp("")
    setIndoorHumidity("50")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Target Superheat Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Indoor Temperature (°F)</label>
            <input
              type="number"
              value={indoorTemp}
              onChange={(e) => setIndoorTemp(e.target.value)}
              placeholder="Enter indoor temp"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Outdoor Temperature (°F)</label>
            <input
              type="number"
              value={outdoorTemp}
              onChange={(e) => setOutdoorTemp(e.target.value)}
              placeholder="Enter outdoor temp"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Indoor Humidity (%)</label>
            <input
              type="number"
              value={indoorHumidity}
              onChange={(e) => setIndoorHumidity(e.target.value)}
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
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">Target Superheat</div>
              <div className="text-5xl font-bold text-slate-100">{result.target.toFixed(1)}°F</div>
            </div>

            <div className="bg-teal-500 rounded-lg p-4 text-center">
              <div className="text-white text-sm mb-1">Acceptable Range</div>
              <div className="text-white font-semibold text-lg">{result.range}</div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">About Target Superheat</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Target superheat varies based on operating conditions. This calculator determines the ideal superheat for
            fixed-orifice systems based on indoor/outdoor temperatures and humidity. Use this target when charging
            systems with TXV or piston metering devices.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
