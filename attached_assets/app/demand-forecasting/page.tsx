"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DemandForecastChart } from "@/components/demand-forecast-chart"
import { ReorderRecommendations } from "@/components/reorder-recommendations"
import { TopMoversTable } from "@/components/top-movers-table"
import { TrendingUp, AlertTriangle, Package, Target } from "lucide-react"

interface ForecastData {
  date: string
  historical: number
  forecasted: number
}

interface ReorderRecommendation {
  sku: string
  description: string
  currentStock: number
  reorderPoint: number
  suggestedQuantity: number
  priority: "high" | "medium" | "low"
}

interface TopMover {
  sku: string
  description: string
  avgDemand: number
  trend: "up" | "down" | "stable"
  forecast: number
}

interface DemandForecastingProps {
  forecastData?: ForecastData[]
  reorderRecommendations?: ReorderRecommendation[]
  topMovers?: TopMover[]
  onGenerateForecast?: (period: string) => void
  onCreatePO?: (sku: string) => void
}

export default function DemandForecasting({
  forecastData = generateMockForecastData(),
  reorderRecommendations = generateMockRecommendations(),
  topMovers = generateMockTopMovers(),
  onGenerateForecast = () => {},
  onCreatePO = () => {},
}: DemandForecastingProps) {
  const [timePeriod, setTimePeriod] = useState("30")

  const handleGenerateForecast = () => {
    onGenerateForecast(timePeriod)
  }

  // Calculate KPIs
  const forecastedDemand = forecastData.filter((d) => d.forecasted > 0).reduce((sum, d) => sum + d.forecasted, 0)
  const stockoutRisk = reorderRecommendations.filter((r) => r.priority === "high").length
  const overstockItems = 3 // Mock value
  const forecastAccuracy = 94.2 // Mock value

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 rounded-lg bg-[#1e293b] p-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">Demand Forecasting</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-full border-[#475569] bg-[#334155] text-slate-100 sm:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="border-[#475569] bg-[#1e293b] text-slate-100">
              <SelectItem value="7">Next 7 days</SelectItem>
              <SelectItem value="30">Next 30 days</SelectItem>
              <SelectItem value="60">Next 60 days</SelectItem>
              <SelectItem value="90">Next 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateForecast} className="bg-[#14b8a6] text-[#0f172a] hover:bg-[#0d9488]">
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#475569] bg-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Forecasted Demand</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#14b8a6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{forecastedDemand.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Next {timePeriod} days</p>
          </CardContent>
        </Card>

        <Card className="border-[#475569] bg-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Stockout Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-[#14b8a6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{stockoutRisk}</div>
            <p className="text-xs text-slate-400">Items at risk</p>
          </CardContent>
        </Card>

        <Card className="border-[#475569] bg-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Overstock Items</CardTitle>
            <Package className="h-4 w-4 text-[#14b8a6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{overstockItems}</div>
            <p className="text-xs text-slate-400">Excess inventory</p>
          </CardContent>
        </Card>

        <Card className="border-[#475569] bg-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Forecast Accuracy</CardTitle>
            <Target className="h-4 w-4 text-[#14b8a6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{forecastAccuracy}%</div>
            <p className="text-xs text-slate-400">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart and Recommendations */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DemandForecastChart data={forecastData} />
        </div>
        <div>
          <ReorderRecommendations recommendations={reorderRecommendations} onCreatePO={onCreatePO} />
        </div>
      </div>

      {/* Top Movers Table */}
      <TopMoversTable movers={topMovers} />
    </div>
  )
}

// Mock data generators
function generateMockForecastData(): ForecastData[] {
  const data: ForecastData[] = []
  const today = new Date()

  // Historical data (30 days)
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      historical: Math.floor(Math.random() * 50 + 100),
      forecasted: 0,
    })
  }

  // Forecasted data (30 days)
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    data.push({
      date: date.toISOString().split("T")[0],
      historical: 0,
      forecasted: Math.floor(Math.random() * 40 + 110),
    })
  }

  return data
}

function generateMockRecommendations(): ReorderRecommendation[] {
  return [
    {
      sku: "HVAC-001",
      description: "Air Filter 16x20x1",
      currentStock: 15,
      reorderPoint: 50,
      suggestedQuantity: 100,
      priority: "high",
    },
    {
      sku: "HVAC-045",
      description: "Thermostat Digital",
      currentStock: 8,
      reorderPoint: 20,
      suggestedQuantity: 50,
      priority: "high",
    },
    {
      sku: "HVAC-089",
      description: "Refrigerant R-410A",
      currentStock: 25,
      reorderPoint: 30,
      suggestedQuantity: 40,
      priority: "medium",
    },
    {
      sku: "HVAC-112",
      description: "Condenser Coil",
      currentStock: 12,
      reorderPoint: 15,
      suggestedQuantity: 25,
      priority: "medium",
    },
  ]
}

function generateMockTopMovers(): TopMover[] {
  return [
    {
      sku: "HVAC-001",
      description: "Air Filter 16x20x1",
      avgDemand: 45,
      trend: "up",
      forecast: 52,
    },
    {
      sku: "HVAC-045",
      description: "Thermostat Digital",
      avgDemand: 28,
      trend: "up",
      forecast: 35,
    },
    {
      sku: "HVAC-089",
      description: "Refrigerant R-410A",
      avgDemand: 22,
      trend: "stable",
      forecast: 23,
    },
    {
      sku: "HVAC-112",
      description: "Condenser Coil",
      avgDemand: 18,
      trend: "down",
      forecast: 15,
    },
    {
      sku: "HVAC-156",
      description: "Blower Motor 1/2 HP",
      avgDemand: 15,
      trend: "stable",
      forecast: 16,
    },
  ]
}
