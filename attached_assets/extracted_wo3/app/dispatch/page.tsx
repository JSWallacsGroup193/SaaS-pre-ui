"use client"

import { useState } from "react"
import { DispatchBoard } from "@/components/dispatch/dispatch-board"
import type { ScheduledWorkOrder, TechnicianStatus } from "@/types/dispatch"
import type { Technician } from "@/types/work-order"

// Mock data
const mockTechnicians: Technician[] = [
  { id: "1", name: "John Smith", avatar: "/man.jpg" },
  { id: "2", name: "Sarah Johnson", avatar: "/diverse-woman-portrait.png" },
  { id: "3", name: "Mike Davis" },
  { id: "4", name: "Emily Brown" },
]

const mockTechnicianStatuses: TechnicianStatus[] = [
  { id: "1", status: "on-job" },
  { id: "2", status: "available" },
  { id: "3", status: "available" },
  { id: "4", status: "off" },
]

const mockWorkOrders: ScheduledWorkOrder[] = [
  {
    id: "1",
    woNumber: "WO-2024-001",
    customer: { name: "Acme Corp", address: "123 Main St" },
    status: "in-progress",
    technician: { id: "1", name: "John Smith" },
    technicianId: "1",
    date: "2024-01-15",
    jobType: "repair",
    priority: "high",
    description: "AC unit not cooling",
    createdAt: "2024-01-14T10:00:00Z",
    scheduledStart: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    scheduledEnd: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
  },
  {
    id: "2",
    woNumber: "WO-2024-002",
    customer: { name: "Tech Solutions", address: "456 Oak Ave" },
    status: "pending",
    technician: { id: "2", name: "Sarah Johnson" },
    technicianId: "2",
    date: "2024-01-15",
    jobType: "maintenance",
    priority: "medium",
    description: "Routine maintenance",
    createdAt: "2024-01-14T11:00:00Z",
    scheduledStart: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
    scheduledEnd: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
  },
  {
    id: "3",
    woNumber: "WO-2024-003",
    customer: { name: "Global Industries", address: "789 Pine Rd" },
    status: "pending",
    technician: null,
    technicianId: null,
    date: "2024-01-15",
    jobType: "installation",
    priority: "urgent",
    description: "Emergency HVAC installation",
    createdAt: "2024-01-14T12:00:00Z",
    scheduledStart: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    scheduledEnd: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
  },
  {
    id: "4",
    woNumber: "WO-2024-004",
    customer: { name: "Retail Store", address: "321 Elm St" },
    status: "completed",
    technician: { id: "1", name: "John Smith" },
    technicianId: "1",
    date: "2024-01-15",
    jobType: "inspection",
    priority: "low",
    description: "Annual inspection",
    createdAt: "2024-01-14T13:00:00Z",
    scheduledStart: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    scheduledEnd: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
  },
]

export default function DispatchPage() {
  const [workOrders, setWorkOrders] = useState<ScheduledWorkOrder[]>(mockWorkOrders)

  const handleDrop = (workOrderId: string, technicianId: string | null, startTime: Date) => {
    setWorkOrders((prev) =>
      prev.map((wo) => {
        if (wo.id === workOrderId) {
          const duration = new Date(wo.scheduledEnd).getTime() - new Date(wo.scheduledStart).getTime()
          const endTime = new Date(startTime.getTime() + duration)

          return {
            ...wo,
            technicianId,
            technician: technicianId ? mockTechnicians.find((t) => t.id === technicianId) || null : null,
            scheduledStart: startTime.toISOString(),
            scheduledEnd: endTime.toISOString(),
          }
        }
        return wo
      }),
    )
  }

  const handleCreateNew = () => {
    console.log("Create new work order")
  }

  const handleWorkOrderClick = (id: string) => {
    console.log("Work order clicked:", id)
  }

  return (
    <DispatchBoard
      workOrders={workOrders}
      technicians={mockTechnicians}
      technicianStatuses={mockTechnicianStatuses}
      selectedDate={new Date()}
      viewMode="week"
      onDrop={handleDrop}
      onCreateNew={handleCreateNew}
      onWorkOrderClick={handleWorkOrderClick}
    />
  )
}
