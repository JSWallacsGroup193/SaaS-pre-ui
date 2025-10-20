"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { format } from "date-fns"

interface DispatchHeaderProps {
  selectedDate: Date
  viewMode: "day" | "week" | "month"
  onDateChange: (date: Date) => void
  onViewModeChange: (mode: "day" | "week" | "month") => void
  onCreateWorkOrder: () => void
}

export function DispatchHeader({
  selectedDate,
  viewMode,
  onDateChange,
  onViewModeChange,
  onCreateWorkOrder,
}: DispatchHeaderProps) {
  const goToPrevious = () => {
    const newDate = new Date(selectedDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    onDateChange(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(selectedDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    onDateChange(newDate)
  }

  const goToToday = () => {
    onDateChange(new Date())
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-600 bg-slate-800 px-6 py-4">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-slate-100">Dispatch & Scheduling</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="h-8 w-8 text-teal-500 hover:bg-slate-700 hover:text-teal-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="ghost" onClick={goToToday} className="h-8 px-3 text-sm text-slate-100 hover:bg-slate-700">
            Today
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="h-8 w-8 text-teal-500 hover:bg-slate-700 hover:text-teal-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <span className="ml-2 text-sm text-slate-100">{format(selectedDate, "MMMM d, yyyy")}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex rounded-lg bg-slate-900 p-1">
          {(["day", "week", "month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                viewMode === mode ? "bg-teal-500 text-white" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        <Button onClick={onCreateWorkOrder} className="bg-teal-500 text-white hover:bg-teal-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Work Order
        </Button>
      </div>
    </header>
  )
}
