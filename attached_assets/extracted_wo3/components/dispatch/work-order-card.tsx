"use client"

import type React from "react"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { AlertCircle, Wrench, Settings, ClipboardCheck, Search, GripVertical } from "lucide-react"
import type { ScheduledWorkOrder } from "@/types/dispatch"
import type { JobType } from "@/types/work-order"

interface WorkOrderCardProps {
  workOrder: ScheduledWorkOrder
  onClick: (id: string) => void
  isSelected?: boolean
  hasConflict?: boolean
}

const jobTypeIcons: Record<JobType, React.ReactNode> = {
  installation: <Settings className="h-3 w-3" />,
  repair: <Wrench className="h-3 w-3" />,
  maintenance: <ClipboardCheck className="h-3 w-3" />,
  inspection: <Search className="h-3 w-3" />,
}

const statusColors = {
  pending: "bg-gray-500",
  "in-progress": "bg-teal-500",
  completed: "bg-emerald-500",
  cancelled: "bg-slate-600",
}

export function WorkOrderCard({ workOrder, onClick, isSelected, hasConflict }: WorkOrderCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: workOrder.id,
    data: {
      workOrderId: workOrder.id,
      fromTechnicianId: workOrder.technicianId,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  const startTime = new Date(workOrder.scheduledStart)
  const endTime = new Date(workOrder.scheduledEnd)
  const timeLabel = `${startTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })} - ${endTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })}`

  const isEmergency = workOrder.priority === "urgent"

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onClick(workOrder.id)}
      className={`group relative rounded-lg p-2.5 cursor-pointer transition-all ${
        statusColors[workOrder.status]
      } hover:brightness-110 ${isSelected ? "ring-2 ring-teal-400" : ""} ${hasConflict ? "ring-2 ring-red-500" : ""}`}
    >
      <div
        {...listeners}
        {...attributes}
        className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-teal-300" />
      </div>

      <div className="pl-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-white font-semibold text-sm leading-tight line-clamp-1">{workOrder.customer.name}</p>
          {isEmergency && <AlertCircle className="h-4 w-4 text-red-300 flex-shrink-0" />}
        </div>

        <p className="text-white text-xs mb-1.5">{timeLabel}</p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-white/90">
            {jobTypeIcons[workOrder.jobType]}
            <span className="text-xs capitalize">{workOrder.jobType}</span>
          </div>
        </div>

        {hasConflict && (
          <div className="mt-1.5 flex items-center gap-1 text-red-300">
            <AlertCircle className="h-3 w-3" />
            <span className="text-xs">Conflict</span>
          </div>
        )}
      </div>
    </div>
  )
}
