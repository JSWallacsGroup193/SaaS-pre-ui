"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

export default function FanLawsPage() {
  const [originalRPM, setOriginalRPM] = useState("")
  const [newRPM, setNewRPM] = useState("")
  const [originalCFM, setOriginalCFM] = useState("")
  const [originalSP, setOriginalSP] = useState("")
  const [originalHP, setOriginalHP] = useState("")
  const [result, setResult] = useState<{
    newCFM: number
    newSP: number
    newHP: number
    rpmChange: number
  } | null>(null)

  const calculate = () => {
    const rpm1 = Number.parseFloat(originalRPM)
    const rpm2 = Number.parseFloat(newRPM)
    const cfm1 = Number.parseFloat(originalCFM)
    const sp1 = Number.parseFloat(originalSP)
    const hp1 = Number.parseFloat(originalHP)

    if (isNaN(rpm1) || isNaN(rpm2) || isNaN(cfm1)) return

    const ratio = rpm2 / rpm1

    // Fan Law 1: CFM varies directly with RPM
    const newCFM = cfm1 * ratio

    // Fan Law 2: Static Pressure varies with square of RPM
    const newSP = !isNaN(sp1) ? sp1 * ratio * ratio : 0

    // Fan Law 3: Horsepower varies with cube of RPM
    const newHP = !isNaN(hp1) ? hp1 * ratio * ratio * ratio : 0

    const rpmChange = ((rpm2 - rpm1) / rpm1) * 100

    setResult({
      newCFM,
      newSP,
      newHP,
      rpmChange,
    })
  }

  const clear = () => {
    setOriginalRPM("")
    setNewRPM("")
    setOriginalCFM("")
    setOriginalSP("")
    setOriginalHP("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Fan Laws Calculator">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Original Conditions</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-100 font-medium mb-2">Original RPM</label>
              <input
                type="number"
                value={originalRPM}
                onChange={(e) => setOriginalRPM(e.target.value)}
                placeholder="RPM"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-100 font-medium mb-2">New RPM</label>
              <input
                type="number"
                value={newRPM}
                onChange={(e) => setNewRPM(e.target.value)}
                placeholder="RPM"
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Original CFM</label>
            <input
              type="number"
              value={originalCFM}
              onChange={(e) => setOriginalCFM(e.target.value)}
              placeholder="Enter CFM"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Original Static Pressure (optional)</label>
            <input
              type="number"
              value={originalSP}
              onChange={(e) => setOriginalSP(e.target.value)}
              placeholder="in. w.c."
              step="0.01"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Original Horsepower (optional)</label>
            <input
              type="number"
              value={originalHP}
              onChange={(e) => setOriginalHP(e.target.value)}
              placeholder="HP"
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
            <h3 className="text-slate-100 font-semibold text-center mb-4">New Conditions</h3>

            <div className="bg-teal-500 rounded-lg p-4 text-center mb-4">
              <div className="text-white text-sm mb-1">RPM Change</div>
              <div className="text-white font-semibold text-2xl">{result.rpmChange.toFixed(1)}%</div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                <span className="text-slate-400">New CFM</span>
                <span className="text-slate-100 font-semibold text-xl">{result.newCFM.toFixed(0)}</span>
              </div>

              {result.newSP > 0 && (
                <div className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-slate-400">New Static Pressure</span>
                  <span className="text-slate-100 font-semibold text-xl">{result.newSP.toFixed(2)}"</span>
                </div>
              )}

              {result.newHP > 0 && (
                <div className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-slate-400">New Horsepower</span>
                  <span className="text-slate-100 font-semibold text-xl">{result.newHP.toFixed(2)} HP</span>
                </div>
              )}
            </div>

            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Save to Work Order
            </Button>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Fan Laws</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• Law 1: CFM ∝ RPM (direct proportion)</li>
            <li>• Law 2: Static Pressure ∝ RPM² (square)</li>
            <li>• Law 3: Horsepower ∝ RPM³ (cube)</li>
            <li>• Small RPM changes have large power impacts</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
