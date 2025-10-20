"use client"

import { useState } from "react"
import { WorkOrderList } from "@/components/work-orders/work-order-list"
import type { WorkOrder, FilterState } from "@/types/work-order"

// Mock data for demonstration
const mockWorkOrders: WorkOrder[] = [
  {
    id: "1",
    woNumber: "WO-2024-001",
    customer: {
      name: "John Smith",
      address: "123 Main St, Springfield",
    },
    status: "in-progress",
    technician: {
      id: "t1",
      name: "Mike Johnson",
    },
    date: "2024-01-15",
    jobType: "repair",
    priority: "high",
    description: "AC unit not cooling properly",
    createdAt: "2024-01-14",
  },
  {
    id: "2",
    woNumber: "WO-2024-002",
    customer: {
      name: "Sarah Williams",
      address: "456 Oak Ave, Springfield",
    },
    status: "pending",
    technician: null,
    date: "2024-01-16",
    jobType: "installation",
    priority: "medium",
    description: "New HVAC system installation",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    woNumber: "WO-2024-003",
    customer: {
      name: "Robert Brown",
      address: "789 Pine Rd, Springfield",
    },
    status: "completed",
    technician: {
      id: "t2",
      name: "David Lee",
    },
    date: "2024-01-14",
    jobType: "maintenance",
    priority: "low",
    description: "Routine maintenance check",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    woNumber: "WO-2024-004",
    customer: {
      name: "Emily Davis",
      address: "321 Elm St, Springfield",
    },
    status: "in-progress",
    technician: {
      id: "t1",
      name: "Mike Johnson",
    },
    date: "2024-01-15",
    jobType: "inspection",
    priority: "urgent",
    description: "Emergency heating system failure",
    createdAt: "2024-01-15",
  },
]

export default function WorkOrdersPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    dateRange: {
      from: null,
      to: null,
    },
    technicianIds: [],
    priority: "all",
  })

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleCreate = () => {
    console.log("Create work order")
    // Navigate to create page or open modal
  }

  const handleView = (id: string) => {
    console.log("View work order:", id)
    // Navigate to detail page
  }

  const handleEdit = (id: string) => {
    console.log("Edit work order:", id)
    // Navigate to edit page or open modal
  }

  const handleDelete = (id: string) => {
    console.log("Delete work order:", id)
    // Show confirmation dialog and delete
  }

  // Filter work orders based on current filters
  const filteredWorkOrders = mockWorkOrders.filter((wo) => {
    if (
      filters.search &&
      !wo.woNumber.toLowerCase().includes(filters.search.toLowerCase()) &&
      !wo.customer.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }
    if (filters.status !== "all" && wo.status !== filters.status) {
      return false
    }
    if (filters.priority !== "all" && wo.priority !== filters.priority) {
      return false
    }
    if (filters.dateRange.from && new Date(wo.date) < filters.dateRange.from) {
      return false
    }
    if (filters.dateRange.to && new Date(wo.date) > filters.dateRange.to) {
      return false
    }
    if (filters.technicianIds.length > 0 && (!wo.technician || !filters.technicianIds.includes(wo.technician.id))) {
      return false
    }
    return true
  })

  return (
    <WorkOrderList
      workOrders={filteredWorkOrders}
      totalCount={mockWorkOrders.length}
      filters={filters}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
