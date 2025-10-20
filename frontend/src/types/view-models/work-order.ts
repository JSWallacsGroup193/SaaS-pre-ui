/**
 * Work Order View Model
 * Lightweight UI-friendly representation of WorkOrder for v0 components
 * Maps from comprehensive backend WorkOrder type to simplified display format
 */

export type WorkOrderStatusView = "pending" | "in-progress" | "completed" | "cancelled"
export type WorkOrderPriorityView = "low" | "medium" | "high" | "urgent"
export type JobTypeView = "installation" | "repair" | "maintenance" | "inspection"

export interface WorkOrderView {
  id: string
  woNumber: string
  customer: {
    name: string
    address: string
  }
  status: WorkOrderStatusView
  technician: {
    id: string
    name: string
  } | null
  date: string
  jobType: JobTypeView
  priority: WorkOrderPriorityView
  description: string
  createdAt: string
}

export interface FilterState {
  search: string
  status: WorkOrderStatusView | "all"
  dateRange: {
    from: Date | null
    to: Date | null
  }
  technicianIds: string[]
  priority: WorkOrderPriorityView | "all"
}
