"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"

type ConversionCategory = "temperature" | "pressure" | "length" | "area" | "volume" | "power"

interface ConversionUnit {
  name: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

const conversions: Record<ConversionCategory, Record<string, ConversionUnit>> = {
  temperature: {
    F: {
      name: "Fahrenheit",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    C: {
      name: "Celsius",
      toBase: (v) => (v * 9) / 5 + 32,
      fromBase: (v) => ((v - 32) * 5) / 9,
    },
    K: {
      name: "Kelvin",
      toBase: (v) => ((v - 273.15) * 9) / 5 + 32,
      fromBase: (v) => ((v - 32) * 5) / 9 + 273.15,
    },
  },
  pressure: {
    PSIG: {
      name: "PSIG",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    kPa: {
      name: "kPa",
      toBase: (v) => v * 0.145038,
      fromBase: (v) => v / 0.145038,
    },
    bar: {
      name: "Bar",
      toBase: (v) => v * 14.5038,
      fromBase: (v) => v / 14.5038,
    },
    "in Hg": {
      name: "in Hg",
      toBase: (v) => v * 0.491154,
      fromBase: (v) => v / 0.491154,
    },
  },
  length: {
    ft: {
      name: "Feet",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    in: {
      name: "Inches",
      toBase: (v) => v / 12,
      fromBase: (v) => v * 12,
    },
    m: {
      name: "Meters",
      toBase: (v) => v * 3.28084,
      fromBase: (v) => v / 3.28084,
    },
    cm: {
      name: "Centimeters",
      toBase: (v) => v * 0.0328084,
      fromBase: (v) => v / 0.0328084,
    },
  },
  area: {
    "sq ft": {
      name: "Square Feet",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    "sq in": {
      name: "Square Inches",
      toBase: (v) => v / 144,
      fromBase: (v) => v * 144,
    },
    "sq m": {
      name: "Square Meters",
      toBase: (v) => v * 10.7639,
      fromBase: (v) => v / 10.7639,
    },
  },
  volume: {
    "cu ft": {
      name: "Cubic Feet",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    gal: {
      name: "Gallons",
      toBase: (v) => v * 0.133681,
      fromBase: (v) => v / 0.133681,
    },
    L: {
      name: "Liters",
      toBase: (v) => v * 0.0353147,
      fromBase: (v) => v / 0.0353147,
    },
  },
  power: {
    BTU: {
      name: "BTU/hr",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    W: {
      name: "Watts",
      toBase: (v) => v * 3.412,
      fromBase: (v) => v / 3.412,
    },
    kW: {
      name: "Kilowatts",
      toBase: (v) => v * 3412,
      fromBase: (v) => v / 3412,
    },
    tons: {
      name: "Tons",
      toBase: (v) => v * 12000,
      fromBase: (v) => v / 12000,
    },
  },
}

export default function ConverterPage() {
  const [category, setCategory] = useState<ConversionCategory>("temperature")
  const [fromUnit, setFromUnit] = useState("F")
  const [toUnit, setToUnit] = useState("C")
  const [value, setValue] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const units = Object.keys(conversions[category])

  const convert = () => {
    const val = Number.parseFloat(value)
    if (isNaN(val)) return

    const baseValue = conversions[category][fromUnit].toBase(val)
    const converted = conversions[category][toUnit].fromBase(baseValue)
    setResult(converted)
  }

  const clear = () => {
    setValue("")
    setResult(null)
  }

  return (
    <CalculatorLayout title="Unit Converter">
      <div className="space-y-6">
        <div className="bg-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-slate-100 font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as ConversionCategory)
                const newUnits = Object.keys(conversions[e.target.value as ConversionCategory])
                setFromUnit(newUnits[0])
                setToUnit(newUnits[1] || newUnits[0])
                setResult(null)
              }}
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="temperature">Temperature</option>
              <option value="pressure">Pressure</option>
              <option value="length">Length</option>
              <option value="area">Area</option>
              <option value="volume">Volume</option>
              <option value="power">Power</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-100 font-medium mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              step="0.01"
              className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-100 font-medium mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {conversions[category][unit].name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-100 font-medium mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full h-14 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {conversions[category][unit].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={convert} className="flex-1 h-14 bg-teal-500 hover:bg-teal-600 text-white font-semibold">
              Convert
            </Button>
            <Button onClick={clear} className="h-14 bg-slate-600 hover:bg-slate-500 text-white">
              Clear
            </Button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-slate-700 rounded-lg p-6">
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">Result</div>
              <div className="text-5xl font-bold text-slate-100 mb-2">{result.toFixed(4)}</div>
              <div className="text-slate-400">{conversions[category][toUnit].name}</div>
            </div>

            <div className="mt-6 bg-slate-600 rounded-lg p-4 text-center">
              <div className="text-slate-100">
                {value} {conversions[category][fromUnit].name} = {result.toFixed(4)}{" "}
                {conversions[category][toUnit].name}
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-slate-100 font-semibold mb-3">Quick Reference</h3>
          <ul className="text-slate-400 text-sm space-y-2 leading-relaxed">
            <li>• 1 ton = 12,000 BTU/hr</li>
            <li>• 1 kW = 3,412 BTU/hr</li>
            <li>• 1 PSI = 6.895 kPa</li>
            <li>• 1 ft = 0.3048 m</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
