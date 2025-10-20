"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { DispatchBoardHeader } from "./dispatch-board-header"
import { TechnicianLane } from "./technician-lane"
import { CalendarGrid } from "./calendar-grid"
import { UnassignedPanel } from "./unassigned-panel"
import { WorkOrderCard } from "./work-order-card"
import type { DispatchBoardProps, CalendarDay, TimeSlot, DragData, DropData } from "@/types/dispatch"

export function DispatchBoard({
  workOrders,
  technicians,
  technicianStatuses,
  selectedDate,
  viewMode,
  onDrop,
  onCreateNew,
  onWorkOrderClick,
}: DispatchBoardProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate)
  const [currentViewMode, setCurrentViewMode] = useState(viewMode)
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<string | null>(null)
  const [draggedWorkOrderId, setDraggedWorkOrderId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  // Generate days for week view
  const getWeekDays = (date: Date): CalendarDay[] => {
    const days: CalendarDay[] = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust to Monday
    startOfWeek.setDate(diff)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek)
      currentDay.setDate(startOfWeek.getDate() + i)

      const dayDate = new Date(currentDay)
      dayDate.setHours(0, 0, 0, 0)

      days.push({
        date: currentDay,
        dayName: currentDay.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: currentDay.getDate(),
        isToday: dayDate.getTime() === today.getTime(),
      })
    }

    return days
  }

  // Generate time slots
  const timeSlots: TimeSlot[] = []
  for (let hour = 7; hour <= 19; hour++) {
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour
    timeSlots.push({
      hour,
      label: `${displayHour}:00 ${period}`,
    })
  }

  const days = getWeekDays(currentDate)
  const unassignedWorkOrders = workOrders.filter((wo) => !wo.technicianId)

  const handleDragStart = (event: any) => {
    setDraggedWorkOrderId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedWorkOrderId(null)

    const { active, over } = event

    if (!over) return

    const dragData = active.data.current as DragData
    const dropData = over.data.current as DropData

    if (!dragData || !dropData) return

    // Create the scheduled start time
    const startTime = new Date(dropData.date)
    startTime.setHours(dropData.hour, 0, 0, 0)

    onDrop(dragData.workOrderId, dropData.technicianId, startTime)
  }

  const handleAssign = (workOrderId: string) => {
    // Open assignment modal or dialog
    console.log("Assign work order:", workOrderId)
  }

  const draggedWorkOrder = draggedWorkOrderId ? workOrders.find((wo) => wo.id === draggedWorkOrderId) : null

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-slate-950">
        <DispatchBoardHeader
          selectedDate={currentDate}
          viewMode={currentViewMode}
          onDateChange={setCurrentDate}
          onViewModeChange={setCurrentViewMode}
          onCreateNew={onCreateNew}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Technician sidebar */}
          <div className="w-64 bg-slate-800 border-r border-slate-600 overflow-y-auto">
            <div className="px-4 py-3 border-b border-slate-600">
              <h3 className="text-slate-100 font-semibold">Technicians</h3>
            </div>
            <div>
              {technicians.map((tech) => {
                const status = technicianStatuses.find((s) => s.id === tech.id) || {
                  id: tech.id,
                  status: "available" as const,
                }
                return (
                  <TechnicianLane
                    key={tech.id}
                    technician={tech}
                    status={status}
                    isSelected={selectedTechnicianId === tech.id}
                    onClick={() => setSelectedTechnicianId(selectedTechnicianId === tech.id ? null : tech.id)}
                  />
                )
              })}
            </div>
          </div>

          {/* Calendar grid */}
          <CalendarGrid
            days={days}
            timeSlots={timeSlots}
            technicians={technicians}
            workOrders={workOrders}
            selectedTechnicianId={selectedTechnicianId}
            onWorkOrderClick={onWorkOrderClick}
          />

          {/* Unassigned panel */}
          <UnassignedPanel
            workOrders={unassignedWorkOrders}
            onAssign={handleAssign}
            onWorkOrderClick={onWorkOrderClick}
          />
        </div>
      </div>

      <DragOverlay>
        {draggedWorkOrder && (
          <div className="opacity-90">
            <WorkOrderCard workOrder={draggedWorkOrder} onClick={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
