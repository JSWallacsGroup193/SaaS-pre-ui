"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function VoltageDropPage() {
  const [wireLength, setWireLength] = useState("")
  const [current, setCurrent] = useState("")
  const [wireGauge, setWireGauge] = useState("12")
  const [voltage, setVoltage] = useState("240")
  const [result, setResult] = useState<{
    voltageDrop: number
    dropPercent: number
    status: string
    color: string
  } | null>(null)

  // Wire resistance in ohms per 1000 ft
  const wireResistance: Record<string, number> = {
    "14": 2.525,
    "12": 1.588,
    "10": 0.999,
    "8": 0.628,
    "6": 0.395,
    "4": 0.249,
    "2": 0.156,
  }

  const calculate = () => {
    const length = Number.parseFloat(wireLength)
    const amps = Number.parseFloat(current)
    const volts = Number.parseFloat(voltage)

    if (isNaN(length) || isNaN(amps) || isNaN(volts)) return

    const resistance = wireResistance[wireGauge]
    const totalResistance = (resistance * length * 2) / 1000 // *2 for round trip
    const voltageDrop = amps * totalResistance
    const dropPercent = (voltageDrop / volts) * 100

    let status = ""
    let color = ""

    if (dropPercent <= 3) {
      status = "Acceptable - Within NEC guidelines"
      color = "bg-emerald-500"
    } else if (dropPercent <= 5) {
      status = "Marginal - Consider larger wire"
      color = "bg-amber-500"
    } else {
      status = "Excessive - Use larger wire gauge"
      color = "bg-red-500"
    }

    setResult({
      voltageDrop,
      dropPercent,
      status,
      color,
    })
  }

  const clear = () => {
    setWireLength("")
    setCurrent("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Voltage Drop Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-slate-100 font-medium mb-2">Wire Gauge (AWG)</label>
              <select
                value={wireGauge}
                onChange={(e) => setWireGauge(e.target.value)}
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="14">14 AWG</option>
                <option value="12">12 AWG</option>
                <option value="10">10 AWG</option>
                <option value="8">8 AWG</option>
                <option value="6">6 AWG</option>
                <option value="4">4 AWG</option>
                <option value="2">2 AWG</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Wire Length (ft)</label>
            <input
              type="number"
              value={wireLength}
              onChange={(e) => setWireLength(e.target.value)}
              placeholder="One-way distance"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Current Draw (A)</label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter amperage"
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
                <div className="text-slate-400 text-sm mb-2">Voltage Drop</div>
                <div className="text-4xl font-bold text-slate-100">{result.voltageDrop.toFixed(2)}V</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Percentage</div>
                <div className="text-4xl font-bold text-slate-100">{result.dropPercent.toFixed(1)}%</div>
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
          <h3 className="text-slate-100 font-semibold mb-3">NEC Guidelines</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Maximum 3% drop for branch circuits</li>
            <li>• Maximum 5% total drop from service to load</li>
            <li>• Use larger wire for long runs</li>
            <li>• Consider voltage drop in wire sizing</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
