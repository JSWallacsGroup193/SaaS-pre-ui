"use client"

import { useDroppable } from "@dnd-kit/core"
import { WorkOrderCard } from "./work-order-card"
import type { ScheduledWorkOrder, TimeSlot, CalendarDay } from "@/types/dispatch"
import type { Technician } from "@/types/work-order"

interface CalendarGridProps {
  days: CalendarDay[]
  timeSlots: TimeSlot[]
  technicians: Technician[]
  workOrders: ScheduledWorkOrder[]
  selectedTechnicianId: string | null
  onWorkOrderClick: (id: string) => void
}

export function CalendarGrid({
  days,
  timeSlots,
  technicians,
  workOrders,
  selectedTechnicianId,
  onWorkOrderClick,
}: CalendarGridProps) {
  const filteredTechnicians = selectedTechnicianId
    ? technicians.filter((t) => t.id === selectedTechnicianId)
    : technicians

  const getWorkOrdersForSlot = (technicianId: string, day: Date, hour: number) => {
    return workOrders.filter((wo) => {
      if (wo.technicianId !== technicianId) return false

      const woStart = new Date(wo.scheduledStart)
      const woHour = woStart.getHours()
      const woDay = woStart.toDateString()

      return woDay === day.toDateString() && woHour === hour
    })
  }

  const hasConflict = (workOrder: ScheduledWorkOrder) => {
    const start = new Date(workOrder.scheduledStart)
    const end = new Date(workOrder.scheduledEnd)

    return workOrders.some((wo) => {
      if (wo.id === workOrder.id || wo.technicianId !== workOrder.technicianId) return false

      const woStart = new Date(wo.scheduledStart)
      const woEnd = new Date(wo.scheduledEnd)

      return start < woEnd && end > woStart
    })
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-[1200px]">
        {/* Day headers */}
        <div className="sticky top-0 z-20 bg-slate-800 border-b border-slate-600">
          <div className="flex">
            <div className="w-48 flex-shrink-0 border-r border-slate-600" />
            {days.map((day) => (
              <div
                key={day.date.toISOString()}
                className={`flex-1 px-4 py-3 text-center border-r border-slate-600 ${
                  day.isToday ? "border-t-2 border-t-teal-500" : ""
                }`}
              >
                <div className="text-slate-400 text-xs font-medium uppercase">{day.dayName}</div>
                <div className={`text-lg font-semibold mt-1 ${day.isToday ? "text-teal-400" : "text-slate-100"}`}>
                  {day.dayNumber}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar grid */}
        <div className="relative">
          {filteredTechnicians.map((technician, techIndex) => (
            <div key={technician.id} className={techIndex % 2 === 0 ? "bg-slate-800/50" : ""}>
              {timeSlots.map((slot) => (
                <div key={`${technician.id}-${slot.hour}`} className="flex border-b border-slate-600">
                  {/* Time label */}
                  <div className="w-48 flex-shrink-0 border-r border-slate-600 px-4 py-3">
                    <div className="text-slate-400 text-sm">{slot.label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{technician.name}</div>
                  </div>

                  {/* Day cells */}
                  {days.map((day) => (
                    <CalendarCell
                      key={`${technician.id}-${day.date.toISOString()}-${slot.hour}`}
                      technicianId={technician.id}
                      date={day.date}
                      hour={slot.hour}
                      workOrders={getWorkOrdersForSlot(technician.id, day.date, slot.hour)}
                      onWorkOrderClick={onWorkOrderClick}
                      hasConflict={hasConflict}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CalendarCellProps {
  technicianId: string
  date: Date
  hour: number
  workOrders: ScheduledWorkOrder[]
  onWorkOrderClick: (id: string) => void
  hasConflict: (wo: ScheduledWorkOrder) => boolean
}

function CalendarCell({ technicianId, date, hour, workOrders, onWorkOrderClick, hasConflict }: CalendarCellProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${technicianId}-${date.toISOString()}-${hour}`,
    data: {
      technicianId,
      date,
      hour,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 border-r border-slate-600 p-2 min-h-[80px] transition-colors ${
        isOver ? "bg-teal-500/20 ring-2 ring-inset ring-teal-500" : "hover:bg-slate-600/30"
      }`}
    >
      <div className="space-y-2">
        {workOrders.map((wo) => (
          <WorkOrderCard key={wo.id} workOrder={wo} onClick={onWorkOrderClick} hasConflict={hasConflict(wo)} />
        ))}
      </div>
    </div>
  )
}
