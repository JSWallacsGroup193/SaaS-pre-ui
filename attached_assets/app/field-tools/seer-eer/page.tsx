"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function SEEREERPage() {
  const [calculationType, setCalculationType] = useState<"seer-to-eer" | "eer-to-seer" | "cost">("seer-to-eer")
  const [seer, setSeer] = useState("")
  const [eer, setEer] = useState("")
  const [tonnage, setTonnage] = useState("")
  const [hoursPerYear, setHoursPerYear] = useState("1000")
  const [costPerKwh, setCostPerKwh] = useState("0.12")
  const [result, setResult] = useState<{
    convertedValue?: number
    annualCost?: number
    annualKwh?: number
    efficiency?: string
  } | null>(null)

  const calculate = () => {
    if (calculationType === "seer-to-eer") {
      const seerValue = Number.parseFloat(seer)
      if (!isNaN(seerValue)) {
        const eerValue = seerValue * 0.875 // Approximate conversion
        setResult({
          convertedValue: eerValue,
          efficiency: seerValue >= 16 ? "High Efficiency" : seerValue >= 14 ? "Standard" : "Low Efficiency",
        })
      }
    } else if (calculationType === "eer-to-seer") {
      const eerValue = Number.parseFloat(eer)
      if (!isNaN(eerValue)) {
        const seerValue = eerValue / 0.875
        setResult({
          convertedValue: seerValue,
          efficiency: seerValue >= 16 ? "High Efficiency" : seerValue >= 14 ? "Standard" : "Low Efficiency",
        })
      }
    } else {
      const seerValue = Number.parseFloat(seer)
      const tons = Number.parseFloat(tonnage)
      const hours = Number.parseFloat(hoursPerYear)
      const cost = Number.parseFloat(costPerKwh)

      if (!isNaN(seerValue) && !isNaN(tons) && !isNaN(hours) && !isNaN(cost)) {
        const btuPerYear = tons * 12000 * hours
        const kwhPerYear = btuPerYear / (seerValue * 1000)
        const annualCost = kwhPerYear * cost

        setResult({
          annualKwh: kwhPerYear,
          annualCost,
          efficiency: seerValue >= 16 ? "High Efficiency" : seerValue >= 14 ? "Standard" : "Low Efficiency",
        })
      }
    }
  }

  const clear = () => {
    setSeer("")
    setEer("")
    setTonnage("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="SEER/EER Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Calculation Type</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as any)}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="seer-to-eer">SEER to EER</option>
              <option value="eer-to-seer">EER to SEER</option>
              <option value="cost">Operating Cost</option>
            </select>
          </div>

          {calculationType === "seer-to-eer" && (
            <div>
              <label className="block text-slate-100 font-medium mb-2">SEER Rating</label>
              <input
                type="number"
                value={seer}
                onChange={(e) => setSeer(e.target.value)}
                placeholder="Enter SEER"
                step="0.1"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          {calculationType === "eer-to-seer" && (
            <div>
              <label className="block text-slate-100 font-medium mb-2">EER Rating</label>
              <input
                type="number"
                value={eer}
                onChange={(e) => setEer(e.target.value)}
                placeholder="Enter EER"
                step="0.1"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          {calculationType === "cost" && (
            <>
              <div>
                <label className="block text-slate-100 font-medium mb-2">SEER Rating</label>
                <input
                  type="number"
                  value={seer}
                  onChange={(e) => setSeer(e.target.value)}
                  placeholder="Enter SEER"
                  step="0.1"
                  className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
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
              <div>
                <label className="block text-slate-100 font-medium mb-2">Operating Hours/Year</label>
                <input
                  type="number"
                  value={hoursPerYear}
                  onChange={(e) => setHoursPerYear(e.target.value)}
                  placeholder="Hours"
                  className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-100 font-medium mb-2">Cost per kWh ($)</label>
                <input
                  type="number"
                  value={costPerKwh}
                  onChange={(e) => setCostPerKwh(e.target.value)}
                  placeholder="$/kWh"
                  step="0.01"
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
            {result.convertedValue && (
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">
                  {calculationType === "seer-to-eer" ? "EER Rating" : "SEER Rating"}
                </div>
                <div className="text-5xl font-bold text-slate-100">{result.convertedValue.toFixed(1)}</div>
              </div>
            )}

            {result.annualCost && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-slate-400 text-sm mb-2">Annual Cost</div>
                  <div className="text-4xl font-bold text-slate-100">${result.annualCost.toFixed(0)}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm mb-2">Annual kWh</div>
                  <div className="text-4xl font-bold text-slate-100">{result.annualKwh?.toFixed(0)}</div>
                </div>
              </div>
            )}

            {result.efficiency && (
              <div className="bg-teal-500 rounded-lg p-4 text-center">
                <div className="text-white font-semibold">{result.efficiency}</div>
              </div>
            )}

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Efficiency Ratings</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• SEER: Seasonal Energy Efficiency Ratio</li>
            <li>• EER: Energy Efficiency Ratio</li>
            <li>• Minimum SEER: 14 (residential)</li>
            <li>• High efficiency: SEER 16+</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
