"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PurchaseOrderList } from "@/components/purchase-orders/purchase-order-list"
import type { PurchaseOrder, PurchaseOrderFilters } from "@/types/purchase-order"

// Mock data
const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    supplierId: "1",
    supplierName: "HVAC Supply Co.",
    date: "2024-01-15",
    expectedDelivery: "2024-01-25",
    status: "approved",
    items: [],
    subtotal: 5400,
    tax: 432,
    total: 5832,
    createdBy: "John Doe",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    supplierId: "2",
    supplierName: "Climate Control Parts",
    date: "2024-01-18",
    expectedDelivery: "2024-01-28",
    status: "sent",
    items: [],
    subtotal: 3200,
    tax: 256,
    total: 3456,
    createdBy: "Jane Smith",
    createdAt: "2024-01-18T14:30:00Z",
    updatedAt: "2024-01-18T14:30:00Z",
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    supplierId: "3",
    supplierName: "Air Systems Direct",
    date: "2024-01-20",
    expectedDelivery: "2024-01-30",
    status: "draft",
    items: [],
    subtotal: 7800,
    tax: 624,
    total: 8424,
    createdBy: "Mike Johnson",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
  },
  {
    id: "4",
    poNumber: "PO-2024-004",
    supplierId: "1",
    supplierName: "HVAC Supply Co.",
    date: "2024-01-10",
    expectedDelivery: "2024-01-20",
    status: "received",
    items: [],
    subtotal: 4500,
    tax: 360,
    total: 4860,
    createdBy: "Sarah Williams",
    createdAt: "2024-01-10T11:00:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
  },
]

export default function PurchaseOrdersPage() {
  const router = useRouter()
  const [purchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders)

  const handleFilterChange = (filters: PurchaseOrderFilters) => {
    console.log("[v0] Filters changed:", filters)
    // Implement filtering logic here
  }

  const handleCreate = () => {
    router.push("/purchase-orders/create")
  }

  const handleView = (id: string) => {
    router.push(`/purchase-orders/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/purchase-orders/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Delete PO:", id)
    // Implement delete logic here
  }

  return (
    <PurchaseOrderList
      purchaseOrders={purchaseOrders}
      totalCount={purchaseOrders.length}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
