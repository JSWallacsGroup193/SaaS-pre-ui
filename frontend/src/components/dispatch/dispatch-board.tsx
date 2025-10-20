import { useState } from "react"
import { DispatchHeader } from "./dispatch-header"
import { WeekView } from "./week-view"
import { TechnicianSidebar } from "./technician-sidebar"
import { UnassignedPanel } from "./unassigned-panel"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { WorkOrderCard } from "./work-order-card"
import type { WorkOrder, Technician } from "@/types/view-models/dispatch"

// Mock data
const mockTechnicians: Technician[] = [
  { id: "1", name: "John Smith", avatar: "JS", status: "available" },
  { id: "2", name: "Sarah Johnson", avatar: "SJ", status: "on-job" },
  { id: "3", name: "Mike Davis", avatar: "MD", status: "available" },
  { id: "4", name: "Emily Brown", avatar: "EB", status: "off" },
]

const mockWorkOrders: WorkOrder[] = [
  {
    id: "1",
    customerName: "Acme Corp",
    startTime: "09:00",
    endTime: "11:00",
    status: "in-progress",
    jobType: "Installation",
    priority: "normal",
    technicianId: "1",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "2",
    customerName: "Tech Solutions",
    startTime: "13:00",
    endTime: "15:00",
    status: "scheduled",
    jobType: "Maintenance",
    priority: "normal",
    technicianId: "2",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "3",
    customerName: "Global Industries",
    startTime: "10:00",
    endTime: "12:00",
    status: "emergency",
    jobType: "Repair",
    priority: "emergency",
    technicianId: null,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "4",
    customerName: "City Mall",
    startTime: "14:00",
    endTime: "16:00",
    status: "scheduled",
    jobType: "Inspection",
    priority: "normal",
    technicianId: null,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "5",
    customerName: "Downtown Office",
    startTime: "08:00",
    endTime: "10:00",
    status: "completed",
    jobType: "Maintenance",
    priority: "normal",
    technicianId: "3",
    date: new Date().toISOString().split("T")[0],
  },
]

export function DispatchBoard() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders)
  const [technicians] = useState<Technician[]>(mockTechnicians)
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setWorkOrders((orders) =>
        orders.map((order) => {
          if (order.id === active.id) {
            const [techId, timeSlot, date] = (over.id as string).split("-")
            return {
              ...order,
              technicianId: techId === "unassigned" ? null : techId,
              startTime: timeSlot || order.startTime,
              date: date || order.date,
            }
          }
          return order
        }),
      )
    }

    setActiveId(null)
  }

  const handleCreateWorkOrder = () => {
    console.log("[v0] Create work order clicked")
    // Implementation for creating new work order
  }

  const activeWorkOrder = workOrders.find((wo) => wo.id === activeId)

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen flex-col bg-slate-950">
        <DispatchHeader
          selectedDate={selectedDate}
          viewMode={viewMode}
          onDateChange={setSelectedDate}
          onViewModeChange={setViewMode}
          onCreateWorkOrder={handleCreateWorkOrder}
        />

        <div className="flex flex-1 overflow-hidden">
          <TechnicianSidebar technicians={technicians} />

          <div className="flex-1 overflow-auto">
            <WeekView
              workOrders={workOrders}
              technicians={technicians}
              selectedDate={selectedDate}
              viewMode={viewMode}
            />
          </div>

          <UnassignedPanel workOrders={workOrders.filter((wo) => !wo.technicianId)} />
        </div>
      </div>

      <DragOverlay>{activeWorkOrder ? <WorkOrderCard workOrder={activeWorkOrder} isDragging /> : null}</DragOverlay>
    </DndContext>
  )
}
