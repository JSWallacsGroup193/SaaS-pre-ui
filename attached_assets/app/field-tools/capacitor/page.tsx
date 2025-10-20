"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function CapacitorPage() {
  const [voltage, setVoltage] = useState("240")
  const [motorHP, setMotorHP] = useState("")
  const [motorType, setMotorType] = useState("single-phase")
  const [result, setResult] = useState<{
    capacitance: number
    voltage: number
    status: string
    color: string
  } | null>(null)

  const calculate = () => {
    const hp = Number.parseFloat(motorHP)
    const v = Number.parseFloat(voltage)

    if (isNaN(hp) || isNaN(v)) return

    // Simplified capacitor sizing (actual sizing requires more factors)
    let capacitance = 0
    if (motorType === "single-phase") {
      capacitance = hp * 50 // Approximate: 50 µF per HP for single phase
    } else {
      capacitance = hp * 30 // Three phase uses smaller capacitors
    }

    const recommendedVoltage = v >= 230 ? 370 : 250

    let status = ""
    let color = ""

    if (capacitance >= 5 && capacitance <= 80) {
      status = "Normal Range - Standard capacitor size"
      color = "bg-emerald-500"
    } else if (capacitance > 80) {
      status = "Large Capacitor - Verify motor specifications"
      color = "bg-amber-500"
    } else {
      status = "Small Capacitor - Check motor nameplate"
      color = "bg-amber-500"
    }

    setResult({
      capacitance,
      voltage: recommendedVoltage,
      status,
      color,
    })
  }

  const clear = () => {
    setMotorHP("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Capacitor Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Motor Type</label>
            <select
              value={motorType}
              onChange={(e) => setMotorType(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="single-phase">Single Phase</option>
              <option value="three-phase">Three Phase</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">System Voltage</label>
            <select
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="120">120V</option>
              <option value="208">208V</option>
              <option value="240">240V</option>
              <option value="480">480V</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Motor Horsepower (HP)</label>
            <input
              type="number"
              value={motorHP}
              onChange={(e) => setMotorHP(e.target.value)}
              placeholder="Enter HP"
              step="0.25"
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
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Capacitance</div>
                <div className="text-4xl font-bold text-slate-100">{result.capacitance.toFixed(1)} µF</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Voltage Rating</div>
                <div className="text-4xl font-bold text-slate-100">{result.voltage}V</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">Capacitor Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Always match voltage rating to system voltage</li>
            <li>• Use 370V capacitors for 240V systems</li>
            <li>• Check motor nameplate for exact specifications</li>
            <li>• Replace with same or higher voltage rating</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
