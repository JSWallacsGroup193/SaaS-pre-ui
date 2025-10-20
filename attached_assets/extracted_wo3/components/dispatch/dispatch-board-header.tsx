"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import type { ViewMode } from "@/types/dispatch"

interface DispatchBoardHeaderProps {
  selectedDate: Date
  viewMode: ViewMode
  onDateChange: (date: Date) => void
  onViewModeChange: (mode: ViewMode) => void
  onCreateNew: () => void
}

export function DispatchBoardHeader({
  selectedDate,
  viewMode,
  onDateChange,
  onViewModeChange,
  onCreateNew,
}: DispatchBoardHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const handlePrevious = () => {
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

  const handleNext = () => {
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

  const handleToday = () => {
    onDateChange(new Date())
  }

  return (
    <div className="bg-slate-800 border-b border-slate-600 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-slate-100">Dispatch & Scheduling</h1>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="h-8 w-8 text-teal-500 hover:text-teal-400 hover:bg-slate-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              onClick={handleToday}
              className="h-8 px-3 text-teal-500 hover:text-teal-400 hover:bg-slate-700 font-medium"
            >
              Today
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8 text-teal-500 hover:text-teal-400 hover:bg-slate-700"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <span className="ml-2 text-slate-100 font-medium">{formatDate(selectedDate)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-700 rounded-lg p-1">
            {(["day", "week", "month"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                  viewMode === mode ? "bg-teal-500 text-white" : "text-slate-300 hover:text-slate-100"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <Button onClick={onCreateNew} className="bg-teal-500 hover:bg-teal-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Work Order
          </Button>
        </div>
      </div>
    </div>
  )
}
