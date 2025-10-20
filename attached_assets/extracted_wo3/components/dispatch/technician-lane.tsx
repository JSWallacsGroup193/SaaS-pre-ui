"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Technician } from "@/types/work-order"
import type { TechnicianStatus } from "@/types/dispatch"

interface TechnicianLaneProps {
  technician: Technician
  status: TechnicianStatus
  isSelected?: boolean
  onClick: () => void
}

const statusColors = {
  available: "bg-emerald-500",
  "on-job": "bg-amber-500",
  off: "bg-slate-500",
}

const statusLabels = {
  available: "Available",
  "on-job": "On Job",
  off: "Off Duty",
}

export function TechnicianLane({ technician, status, isSelected, onClick }: TechnicianLaneProps) {
  const initials = technician.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left w-full ${
        isSelected ? "bg-slate-700 border-l-2 border-teal-500" : ""
      }`}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={technician.avatar || "/placeholder.svg"} alt={technician.name} />
          <AvatarFallback className="bg-slate-600 text-slate-100">{initials}</AvatarFallback>
        </Avatar>
        <div
          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-800 ${
            statusColors[status.status]
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-slate-100 font-medium text-sm truncate">{technician.name}</p>
        <p className="text-slate-400 text-xs">{statusLabels[status.status]}</p>
      </div>
    </button>
  )
}
