import { useState } from "react"
import type { Technician } from "@/types/view-models/dispatch"

interface TechnicianSidebarProps {
  technicians: Technician[]
}

export function TechnicianSidebar({ technicians }: TechnicianSidebarProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  return (
    <div className="w-64 border-r border-slate-600 bg-slate-800">
      <div className="border-b border-slate-600 p-4">
        <h2 className="text-lg font-semibold text-slate-100">Technicians</h2>
      </div>

      <div className="divide-y divide-slate-600">
        {technicians.map((tech) => (
          <button
            key={tech.id}
            onClick={() => setSelectedTech(tech.id)}
            className={`w-full p-4 text-left transition-colors hover:bg-slate-700 ${
              selectedTech === tech.id ? "bg-teal-500/20 ring-2 ring-inset ring-teal-500" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-600 text-sm font-semibold text-slate-100">
                  {tech.avatar}
                </div>
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-800 ${
                    tech.status === "available"
                      ? "bg-emerald-500"
                      : tech.status === "on-job"
                        ? "bg-amber-500"
                        : "bg-slate-500"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="font-medium text-slate-100">{tech.name}</div>
                <div className="text-xs text-slate-400">
                  {tech.status === "available" ? "Available" : tech.status === "on-job" ? "On Job" : "Off Duty"}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
