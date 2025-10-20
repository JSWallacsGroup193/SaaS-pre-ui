"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { PurchaseOrderFilters as PurchaseOrderFiltersType, PurchaseOrderStatus } from "@/types/purchase-order"

interface PurchaseOrderFiltersProps {
  filters: PurchaseOrderFiltersType
  onFiltersChange: (filters: PurchaseOrderFiltersType) => void
  suppliers: Array<{ id: string; name: string }>
}

const statusOptions: { value: PurchaseOrderStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "approved", label: "Approved" },
  { value: "received", label: "Received" },
  { value: "cancelled", label: "Cancelled" },
]

const sortOptions = [
  { value: "poNumber", label: "PO Number" },
  { value: "date", label: "Date" },
  { value: "total", label: "Amount" },
]

export function PurchaseOrderFilters({ filters, onFiltersChange, suppliers }: PurchaseOrderFiltersProps) {
  const handleClearFilters = () => {
    onFiltersChange({
      search: "",
      status: [],
      supplierId: "",
      dateRange: { from: "", to: "" },
      sortBy: "date",
      sortOrder: "desc",
    })
  }

  const hasActiveFilters =
    filters.status.length > 0 || filters.supplierId || filters.dateRange.from || filters.dateRange.to

  return (
    <Card className="bg-slate-800 border-slate-700 mx-6 mb-4 p-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Status Filter */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Status</label>
            <Select
              value={filters.status[0] || ""}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  status: value ? [value as PurchaseOrderStatus] : [],
                })
              }
            >
              <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all" className="text-slate-100">
                  All Statuses
                </SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-slate-100">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Supplier Filter */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Supplier</label>
            <Select
              value={filters.supplierId}
              onValueChange={(value) => onFiltersChange({ ...filters, supplierId: value === "all" ? "" : value })}
            >
              <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                <SelectValue placeholder="All Suppliers" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all" className="text-slate-100">
                  All Suppliers
                </SelectItem>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id} className="text-slate-100">
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">From Date</label>
            <Input
              type="date"
              value={filters.dateRange.from}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  dateRange: { ...filters.dateRange, from: e.target.value },
                })
              }
              className="bg-slate-900 border-slate-700 text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">To Date</label>
            <Input
              type="date"
              value={filters.dateRange.to}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  dateRange: { ...filters.dateRange, to: e.target.value },
                })
              }
              className="bg-slate-900 border-slate-700 text-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">Sort by:</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  sortBy: value as PurchaseOrderFiltersType["sortBy"],
                })
              }
            >
              <SelectTrigger className="w-40 bg-slate-900 border-slate-700 text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-slate-100">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="bg-slate-700 border-slate-600 text-teal-500 hover:bg-slate-600"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
