"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { AlertCircle, Clock, GripVertical, Wrench } from "lucide-react"
import type { WorkOrder } from "@/lib/types"

interface WorkOrderCardProps {
  workOrder: WorkOrder
  isDragging?: boolean
}

export function WorkOrderCard({ workOrder, isDragging = false }: WorkOrderCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: workOrder.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const statusColors = {
    scheduled: "bg-gray-500 hover:bg-gray-600",
    "in-progress": "bg-teal-500 hover:bg-teal-600",
    completed: "bg-emerald-500 hover:bg-emerald-600",
    emergency: "bg-red-500 hover:bg-red-600",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative cursor-move rounded-lg p-3 text-white shadow-lg transition-all ${
        statusColors[workOrder.status]
      } ${isDragging ? "opacity-50" : ""}`}
      {...listeners}
      {...attributes}
    >
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <GripVertical className="h-4 w-4 text-teal-300" />
      </div>

      <div className="pl-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="font-semibold">{workOrder.customerName}</div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>
                {workOrder.startTime} - {workOrder.endTime}
              </span>
            </div>
          </div>

          {workOrder.priority === "emergency" && <AlertCircle className="h-4 w-4 text-red-200" />}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-xs">
            <Wrench className="h-3 w-3" />
            <span>{workOrder.jobType}</span>
          </div>
          <div className="rounded bg-white/20 px-2 py-0.5 text-xs capitalize">{workOrder.status.replace("-", " ")}</div>
        </div>
      </div>
    </div>
  )
}
