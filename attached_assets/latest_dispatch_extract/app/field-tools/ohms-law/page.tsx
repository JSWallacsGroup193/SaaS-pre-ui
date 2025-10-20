"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function OhmsLawPage() {
  const [voltage, setVoltage] = useState("")
  const [current, setCurrent] = useState("")
  const [resistance, setResistance] = useState("")
  const [power, setPower] = useState("")
  const [solveFor, setSolveFor] = useState<"voltage" | "current" | "resistance" | "power">("voltage")

  const calculate = () => {
    const v = Number.parseFloat(voltage)
    const i = Number.parseFloat(current)
    const r = Number.parseFloat(resistance)
    const p = Number.parseFloat(power)

    switch (solveFor) {
      case "voltage":
        if (!isNaN(i) && !isNaN(r)) {
          setVoltage((i * r).toFixed(2))
          setPower((i * i * r).toFixed(2))
        } else if (!isNaN(p) && !isNaN(i)) {
          setVoltage((p / i).toFixed(2))
          setResistance((p / (i * i)).toFixed(2))
        }
        break
      case "current":
        if (!isNaN(v) && !isNaN(r)) {
          setCurrent((v / r).toFixed(2))
          setPower(((v * v) / r).toFixed(2))
        } else if (!isNaN(p) && !isNaN(v)) {
          setCurrent((p / v).toFixed(2))
          setResistance(((v * v) / p).toFixed(2))
        }
        break
      case "resistance":
        if (!isNaN(v) && !isNaN(i)) {
          setResistance((v / i).toFixed(2))
          setPower((v * i).toFixed(2))
        } else if (!isNaN(p) && !isNaN(i)) {
          setResistance((p / (i * i)).toFixed(2))
          setVoltage((p / i).toFixed(2))
        }
        break
      case "power":
        if (!isNaN(v) && !isNaN(i)) {
          setPower((v * i).toFixed(2))
        } else if (!isNaN(i) && !isNaN(r)) {
          setPower((i * i * r).toFixed(2))
        } else if (!isNaN(v) && !isNaN(r)) {
          setPower(((v * v) / r).toFixed(2))
        }
        break
    }
  }

  const clear = () => {
    setVoltage("")
    setCurrent("")
    setResistance("")
    setPower("")
  }

  return (
    <CalculatorLayout title="Ohm's Law Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Solve For</label>
            <select
              value={solveFor}
              onChange={(e) => setSolveFor(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="voltage">Voltage (V)</option>
              <option value="current">Current (A)</option>
              <option value="resistance">Resistance (Ω)</option>
              <option value="power">Power (W)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Voltage (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="Enter voltage"
              disabled={solveFor === "voltage"}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Current (A)</label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter current"
              disabled={solveFor === "current"}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Resistance (Ω)</label>
            <input
              type="number"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              placeholder="Enter resistance"
              disabled={solveFor === "resistance"}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Power (W)</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder="Enter power"
              disabled={solveFor === "power"}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
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

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Ohm's Law Formulas</h3>
          <div className="space-y-2 text-slate-400 text-sm">
            <div>V = I × R (Voltage = Current × Resistance)</div>
            <div>I = V ÷ R (Current = Voltage ÷ Resistance)</div>
            <div>R = V ÷ I (Resistance = Voltage ÷ Current)</div>
            <div>P = V × I (Power = Voltage × Current)</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
