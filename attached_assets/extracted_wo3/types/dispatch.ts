import type { WorkOrder, Technician } from "./work-order"

export type ViewMode = "day" | "week" | "month"

export interface TechnicianStatus {
  id: string
  status: "available" | "on-job" | "off"
}

export interface ScheduledWorkOrder extends WorkOrder {
  scheduledStart: string // ISO datetime
  scheduledEnd: string // ISO datetime
  technicianId: string | null
}

export interface TimeSlot {
  hour: number
  label: string
}

export interface CalendarDay {
  date: Date
  dayName: string
  dayNumber: number
  isToday: boolean
}

export interface DispatchBoardProps {
  workOrders: ScheduledWorkOrder[]
  technicians: Technician[]
  technicianStatuses: TechnicianStatus[]
  selectedDate: Date
  viewMode: ViewMode
  onDrop: (workOrderId: string, technicianId: string | null, startTime: Date) => void
  onCreateNew: () => void
  onWorkOrderClick: (workOrderId: string) => void
}

export interface DragData {
  workOrderId: string
  fromTechnicianId: string | null
}

export interface DropData {
  technicianId: string | null
  date: Date
  hour: number
}
