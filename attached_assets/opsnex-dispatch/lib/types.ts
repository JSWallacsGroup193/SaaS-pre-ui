export interface WorkOrder {
  id: string
  customerName: string
  startTime: string
  endTime: string
  status: "scheduled" | "in-progress" | "completed" | "emergency"
  jobType: string
  priority: "normal" | "emergency"
  technicianId: string | null
  date: string
}

export interface Technician {
  id: string
  name: string
  avatar: string
  status: "available" | "on-job" | "off"
}
