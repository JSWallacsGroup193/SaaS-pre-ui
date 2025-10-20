"use client"

import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { AlertCircle, UserPlus } from "lucide-react"
import type { ScheduledWorkOrder } from "@/types/dispatch"

interface UnassignedPanelProps {
  workOrders: ScheduledWorkOrder[]
  onAssign: (workOrderId: string) => void
  onWorkOrderClick: (id: string) => void
}

export function UnassignedPanel({ workOrders, onAssign, onWorkOrderClick }: UnassignedPanelProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "unassigned",
    data: {
      technicianId: null,
    },
  })

  const sortedWorkOrders = [...workOrders].sort((a, b) => {
    // Emergency first
    if (a.priority === "urgent" && b.priority !== "urgent") return -1
    if (a.priority !== "urgent" && b.priority === "urgent") return 1
    // Then by scheduled start time
    return new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime()
  })

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-600 flex flex-col">
      <div className="px-4 py-3 border-b border-slate-600">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-100 font-semibold">Unassigned</h3>
          <div className="bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{workOrders.length}</div>
        </div>
      </div>

      <div ref={setNodeRef} className={`flex-1 overflow-y-auto p-4 space-y-3 ${isOver ? "bg-teal-500/10" : ""}`}>
        {sortedWorkOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">No unassigned work orders</p>
          </div>
        ) : (
          sortedWorkOrders.map((wo) => (
            <UnassignedCard key={wo.id} workOrder={wo} onAssign={onAssign} onClick={onWorkOrderClick} />
          ))
        )}
      </div>
    </div>
  )
}

interface UnassignedCardProps {
  workOrder: ScheduledWorkOrder
  onAssign: (workOrderId: string) => void
  onClick: (id: string) => void
}

function UnassignedCard({ workOrder, onAssign, onClick }: UnassignedCardProps) {
  const isEmergency = workOrder.priority === "urgent"
  const startTime = new Date(workOrder.scheduledStart)
  const timeLabel = startTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
  const dateLabel = startTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div
      onClick={() => onClick(workOrder.id)}
      className={`bg-slate-700 rounded-lg p-3 cursor-pointer hover:bg-slate-600 transition-colors ${
        isEmergency ? "ring-2 ring-red-500" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-slate-100 font-medium text-sm leading-tight">{workOrder.customer.name}</p>
        {isEmergency && <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />}
      </div>

      <p className="text-slate-300 text-xs mb-2">
        {dateLabel} at {timeLabel}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-400 text-xs capitalize">{workOrder.jobType}</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400 text-xs">{workOrder.woNumber}</span>
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation()
          onAssign(workOrder.id)
        }}
        size="sm"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white"
      >
        <UserPlus className="h-3 w-3 mr-1.5" />
        Assign
      </Button>
    </div>
  )
}
