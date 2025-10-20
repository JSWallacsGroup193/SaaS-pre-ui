export type WorkOrderStatus = "pending" | "in-progress" | "completed" | "cancelled"
export type WorkOrderPriority = "low" | "medium" | "high" | "urgent"
export type JobType = "installation" | "repair" | "maintenance" | "inspection"

export interface WorkOrder {
  id: string
  woNumber: string
  customer: {
    name: string
    address: string
  }
  status: WorkOrderStatus
  technician: {
    id: string
    name: string
  } | null
  date: string
  jobType: JobType
  priority: WorkOrderPriority
  description: string
  createdAt: string
}

export interface FilterState {
  search: string
  status: WorkOrderStatus | "all"
  dateRange: {
    from: Date | null
    to: Date | null
  }
  technicianIds: string[]
  priority: WorkOrderPriority | "all"
}

export interface Customer {
  id: string
  name: string
  accountNumber: string
  phone: string
  email: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Technician {
  id: string
  name: string
  avatar?: string
  phone?: string
  email?: string
}

export interface Task {
  id: string
  name: string
  completed: boolean
  completedAt?: string
  completedBy?: string
}

export interface Part {
  id: string
  sku: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Note {
  id: string
  text: string
  author: {
    name: string
    avatar?: string
  }
  timestamp: string
  photos?: string[]
}

export interface TimelineEvent {
  id: string
  type: "created" | "assigned" | "status_changed" | "parts_added" | "completed" | "invoiced" | "note_added"
  description: string
  user: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface WorkOrderDetail extends WorkOrder {
  customer: Customer
  technician: Technician | null
  estimatedDuration: number // in minutes
  customerNotes?: string
  internalNotes?: string
  tasks: Task[]
  parts: Part[]
  notes: Note[]
  timeline: TimelineEvent[]
  statusHistory: Array<{
    status: WorkOrderStatus
    timestamp: string
    user: string
  }>
}

export interface WorkOrderFormAttachment {
  name: string
  url: string
  type: string
}
