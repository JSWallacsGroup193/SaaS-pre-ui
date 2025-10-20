"use client"

import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PurchaseOrderListHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onCreateClick: () => void
}

export function PurchaseOrderListHeader({ searchQuery, onSearchChange, onCreateClick }: PurchaseOrderListHeaderProps) {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-100">Purchase Orders</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search purchase orders..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <Button onClick={onCreateClick} className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create PO
          </Button>
        </div>
      </div>
    </div>
  )
}
