"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function MotorAnalysisPage() {
  const [voltage, setVoltage] = useState("")
  const [current, setCurrent] = useState("")
  const [ratedVoltage, setRatedVoltage] = useState("240")
  const [ratedCurrent, setRatedCurrent] = useState("")
  const [result, setResult] = useState<{
    voltageVariance: number
    currentVariance: number
    power: number
    status: string
    color: string
  } | null>(null)

  const calculate = () => {
    const v = Number.parseFloat(voltage)
    const i = Number.parseFloat(current)
    const rv = Number.parseFloat(ratedVoltage)
    const ri = Number.parseFloat(ratedCurrent)

    if (isNaN(v) || isNaN(i) || isNaN(rv) || isNaN(ri)) return

    const voltageVariance = ((v - rv) / rv) * 100
    const currentVariance = ((i - ri) / ri) * 100
    const power = (v * i * Math.sqrt(3)) / 1000 // kW for 3-phase

    let status = ""
    let color = ""

    if (Math.abs(voltageVariance) <= 10 && Math.abs(currentVariance) <= 15) {
      status = "Normal - Motor operating within specifications"
      color = "bg-emerald-500"
    } else if (Math.abs(voltageVariance) > 10) {
      status = "Voltage Issue - Check power supply"
      color = "bg-red-500"
    } else {
      status = "Current Issue - Possible overload or mechanical problem"
      color = "bg-amber-500"
    }

    setResult({
      voltageVariance,
      currentVariance,
      power,
      status,
      color,
    })
  }

  const clear = () => {
    setVoltage("")
    setCurrent("")
    setRatedCurrent("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Motor Analysis">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-100 font-medium mb-2">Rated Voltage</label>
              <select
                value={ratedVoltage}
                onChange={(e) => setRatedVoltage(e.target.value)}
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="120">120V</option>
                <option value="208">208V</option>
                <option value="240">240V</option>
                <option value="480">480V</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-100 font-medium mb-2">Rated Current (A)</label>
              <input
                type="number"
                value={ratedCurrent}
                onChange={(e) => setRatedCurrent(e.target.value)}
                placeholder="FLA"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Measured Voltage (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="Enter measured voltage"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Measured Current (A)</label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter measured current"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 h-14 bg-teal-500 hover:bg-teal-600 text-white font-semibold">
              Analyze
            </Button>
            <Button onClick={clear} className="h-14 bg-slate-600 hover:bg-slate-500 text-white">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-700 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Voltage Var.</div>
                <div className="text-3xl font-bold text-slate-100">{result.voltageVariance.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Current Var.</div>
                <div className="text-3xl font-bold text-slate-100">{result.currentVariance.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Power</div>
                <div className="text-3xl font-bold text-slate-100">{result.power.toFixed(2)} kW</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">Analysis Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Voltage should be within ±10% of rated</li>
            <li>• Current should be within ±15% of FLA</li>
            <li>• High current indicates overload or mechanical issue</li>
            <li>• Low voltage can cause motor overheating</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
