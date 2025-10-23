import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { WorkOrderCard } from "./work-order-card"
import { format, isSameDay } from "date-fns"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { WorkOrder, Technician } from "@/types/view-models/dispatch"

interface MobileDispatchViewProps {
  workOrders: WorkOrder[]
  technicians: Technician[]
  selectedDate: Date
}

export function MobileDispatchView({ workOrders, technicians, selectedDate }: MobileDispatchViewProps) {
  const [expandedTechs, setExpandedTechs] = useState<Set<string>>(new Set(technicians.map(t => t.id)))

  const toggleTech = (techId: string) => {
    setExpandedTechs(prev => {
      const next = new Set(prev)
      if (next.has(techId)) {
        next.delete(techId)
      } else {
        next.add(techId)
      }
      return next
    })
  }

  const dateStr = format(selectedDate, "yyyy-MM-dd")
  const isToday = isSameDay(selectedDate, new Date())

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Date Header */}
      <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400">{format(selectedDate, "EEEE")}</div>
            <div className={`text-lg font-bold ${isToday ? "text-teal-400" : "text-white"}`}>
              {format(selectedDate, "MMMM d, yyyy")}
            </div>
          </div>
          {isToday && (
            <div className="px-2 py-1 bg-teal-500 text-white text-xs font-semibold rounded">
              TODAY
            </div>
          )}
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Unassigned Work Orders */}
        <UnassignedSection
          workOrders={workOrders.filter(wo => !wo.technicianId && wo.date === dateStr)}
          dateStr={dateStr}
        />

        {/* Technicians */}
        {technicians.map((tech) => {
          const techWorkOrders = workOrders.filter(
            wo => wo.technicianId === tech.id && wo.date === dateStr
          )
          const isExpanded = expandedTechs.has(tech.id)

          return (
            <TechnicianCard
              key={tech.id}
              tech={tech}
              workOrders={techWorkOrders}
              dateStr={dateStr}
              isExpanded={isExpanded}
              onToggle={() => toggleTech(tech.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

interface UnassignedSectionProps {
  workOrders: WorkOrder[]
  dateStr: string
}

function UnassignedSection({ workOrders, dateStr }: UnassignedSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { setNodeRef, isOver } = useDroppable({
    id: `unassigned-${dateStr}`,
  })

  if (workOrders.length === 0) return null

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-slate-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Unassigned</div>
            <div className="text-xs text-muted-foreground">{workOrders.length} work order{workOrders.length !== 1 ? 's' : ''}</div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div
          ref={setNodeRef}
          className={`p-3 space-y-2 border-t border-border transition-colors ${
            isOver ? "bg-teal-500/10" : ""
          }`}
        >
          {workOrders.length === 0 ? (
            <div className="text-center py-6 text-sm text-muted-foreground">
              No unassigned work orders
            </div>
          ) : (
            workOrders.map((workOrder) => (
              <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

interface TechnicianCardProps {
  tech: Technician
  workOrders: WorkOrder[]
  dateStr: string
  isExpanded: boolean
  onToggle: () => void
}

function TechnicianCard({ tech, workOrders, dateStr, isExpanded, onToggle }: TechnicianCardProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${tech.id}-${dateStr}`,
  })

  // Check for conflicts
  const hasConflict = workOrders.some((wo1, i) =>
    workOrders.some((wo2, j) => {
      if (i >= j) return false
      const start1 = Number.parseInt(wo1.startTime.replace(":", ""))
      const end1 = Number.parseInt(wo1.endTime.replace(":", ""))
      const start2 = Number.parseInt(wo2.startTime.replace(":", ""))
      const end2 = Number.parseInt(wo2.endTime.replace(":", ""))
      return start1 < end2 && end1 > start2
    }),
  )

  const statusColors: Record<Technician["status"], string> = {
    available: "bg-emerald-500",
    "on-job": "bg-amber-500",
    off: "bg-slate-500",
  }

  const statusLabels: Record<Technician["status"], string> = {
    available: "Available",
    "on-job": "On Job",
    off: "Off Duty",
  }

  return (
    <div className={`bg-card border rounded-lg overflow-hidden ${hasConflict ? "border-red-500 border-2" : "border-border"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
            {tech.avatar}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{tech.name}</div>
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${statusColors[tech.status]}`} />
              <span className="text-xs text-muted-foreground">
                {statusLabels[tech.status]} • {workOrders.length} job{workOrders.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasConflict && (
            <div className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              CONFLICT
            </div>
          )}
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div
          ref={setNodeRef}
          className={`p-3 space-y-2 border-t border-border transition-colors ${
            isOver ? "bg-teal-500/10" : ""
          }`}
        >
          {workOrders.length === 0 ? (
            <div className="text-center py-6 text-sm text-muted-foreground">
              No assignments for this day
            </div>
          ) : (
            workOrders.map((workOrder) => (
              <div key={workOrder.id} className={hasConflict ? "ring-2 ring-red-500 ring-offset-2 rounded" : ""}>
                <WorkOrderCard workOrder={workOrder} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
