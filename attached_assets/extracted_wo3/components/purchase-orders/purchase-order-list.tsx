"use client"

import { useState } from "react"
import { PurchaseOrderListHeader } from "./purchase-order-list-header"
import { PurchaseOrderStats } from "./purchase-order-stats"
import { PurchaseOrderFilters } from "./purchase-order-filters"
import { PurchaseOrderTable } from "./purchase-order-table"
import { PurchaseOrderCard } from "./purchase-order-card"
import type { PurchaseOrder, PurchaseOrderFilters as PurchaseOrderFiltersType } from "@/types/purchase-order"

interface PurchaseOrderListProps {
  purchaseOrders: PurchaseOrder[]
  totalCount: number
  onFilterChange: (filters: PurchaseOrderFiltersType) => void
  onCreate: () => void
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function PurchaseOrderList({
  purchaseOrders,
  totalCount,
  onFilterChange,
  onCreate,
  onView,
  onEdit,
  onDelete,
}: PurchaseOrderListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<PurchaseOrderFiltersType>({
    search: "",
    status: [],
    supplierId: "",
    dateRange: { from: "", to: "" },
    sortBy: "date",
    sortOrder: "desc",
  })

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    const newFilters = { ...filters, search: query }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleFiltersChange = (newFilters: PurchaseOrderFiltersType) => {
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Mock suppliers for filter
  const suppliers = [
    { id: "1", name: "HVAC Supply Co." },
    { id: "2", name: "Climate Control Parts" },
    { id: "3", name: "Air Systems Direct" },
  ]

  // Calculate stats
  const totalPOs = totalCount
  const pending = purchaseOrders.filter((po) => po.status === "sent" || po.status === "approved").length
  const totalAmount = purchaseOrders.reduce((sum, po) => sum + po.total, 0)
  const overdue = purchaseOrders.filter(
    (po) => new Date(po.expectedDelivery) < new Date() && po.status !== "received",
  ).length

  return (
    <div className="min-h-screen bg-slate-900">
      <PurchaseOrderListHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} onCreateClick={onCreate} />

      <PurchaseOrderStats totalPOs={totalPOs} pending={pending} totalAmount={totalAmount} overdue={overdue} />

      <PurchaseOrderFilters filters={filters} onFiltersChange={handleFiltersChange} suppliers={suppliers} />

      {/* Desktop Table View */}
      <div className="hidden md:block px-6 pb-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <PurchaseOrderTable purchaseOrders={purchaseOrders} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden px-6 pb-6">
        <div className="grid gap-4">
          {purchaseOrders.map((po) => (
            <PurchaseOrderCard key={po.id} purchaseOrder={po} onView={onView} />
          ))}
        </div>
      </div>
    </div>
  )
}
