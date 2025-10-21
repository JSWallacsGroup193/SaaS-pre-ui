"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function TempConversionPage() {
  const [temperature, setTemperature] = useState("")
  const [fromUnit, setFromUnit] = useState<"F" | "C" | "K">("F")
  const [result, setResult] = useState<{
    fahrenheit: number
    celsius: number
    kelvin: number
  } | null>(null)

  const calculate = () => {
    const temp = Number.parseFloat(temperature)
    if (isNaN(temp)) return

    let fahrenheit = 0
    let celsius = 0
    let kelvin = 0

    switch (fromUnit) {
      case "F":
        fahrenheit = temp
        celsius = ((temp - 32) * 5) / 9
        kelvin = celsius + 273.15
        break
      case "C":
        celsius = temp
        fahrenheit = (temp * 9) / 5 + 32
        kelvin = temp + 273.15
        break
      case "K":
        kelvin = temp
        celsius = temp - 273.15
        fahrenheit = (celsius * 9) / 5 + 32
        break
    }

    setResult({ fahrenheit, celsius, kelvin })
  }

  const clear = () => {
    setTemperature("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Temperature Conversion">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="F">Fahrenheit (°F)</option>
              <option value="C">Celsius (°C)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Temperature</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter temperature"
              step="0.1"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 h-14 bg-teal-500 hover:bg-teal-600 text-white font-semibold">
              Convert
            </Button>
            <Button onClick={clear} className="h-14 bg-slate-600 hover:bg-slate-500 text-white">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-700 rounded-lg p-6 space-y-4">
            <div className="space-y-3">
              <div className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Fahrenheit</span>
                <span className="text-slate-100 font-bold text-2xl">{result.fahrenheit.toFixed(1)}°F</span>
              </div>

              <div className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Celsius</span>
                <span className="text-slate-100 font-bold text-2xl">{result.celsius.toFixed(1)}°C</span>
              </div>

              <div className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Kelvin</span>
                <span className="text-slate-100 font-bold text-2xl">{result.kelvin.toFixed(2)} K</span>
              </div>
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Conversion Formulas</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• °F = (°C × 9/5) + 32</li>
            <li>• °C = (°F - 32) × 5/9</li>
            <li>• K = °C + 273.15</li>
            <li>• Absolute zero: -459.67°F / -273.15°C / 0 K</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
