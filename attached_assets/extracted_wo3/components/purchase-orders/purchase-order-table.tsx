"use client"

import { useState } from "react"
import { MoreVertical, Eye, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PurchaseOrder } from "@/types/purchase-order"

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const statusColors = {
  draft: "bg-slate-600 text-slate-100",
  sent: "bg-blue-600 text-white",
  approved: "bg-green-600 text-white",
  received: "bg-teal-600 text-white",
  cancelled: "bg-red-600 text-white",
}

const statusLabels = {
  draft: "Draft",
  sent: "Sent",
  approved: "Approved",
  received: "Received",
  cancelled: "Cancelled",
}

export function PurchaseOrderTable({ purchaseOrders, onView, onEdit, onDelete }: PurchaseOrderTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-slate-800/50">
            <TableHead className="text-slate-300 cursor-pointer" onClick={() => handleSort("poNumber")}>
              <div className="flex items-center gap-2">
                PO#
                <SortIcon column="poNumber" />
              </div>
            </TableHead>
            <TableHead className="text-slate-300">Supplier</TableHead>
            <TableHead className="text-slate-300 cursor-pointer" onClick={() => handleSort("date")}>
              <div className="flex items-center gap-2">
                Date
                <SortIcon column="date" />
              </div>
            </TableHead>
            <TableHead className="text-slate-300">Expected Delivery</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-slate-300 cursor-pointer" onClick={() => handleSort("total")}>
              <div className="flex items-center gap-2">
                Total
                <SortIcon column="total" />
              </div>
            </TableHead>
            <TableHead className="text-slate-300 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.map((po) => (
            <TableRow
              key={po.id}
              className="border-slate-700 hover:bg-slate-800/50 cursor-pointer"
              onClick={() => onView(po.id)}
            >
              <TableCell className="font-medium text-slate-100">{po.poNumber}</TableCell>
              <TableCell className="text-slate-300">{po.supplierName}</TableCell>
              <TableCell className="text-slate-300">{new Date(po.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-slate-300">{new Date(po.expectedDelivery).toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[po.status]
                  }`}
                >
                  {statusLabels[po.status]}
                </span>
              </TableCell>
              <TableCell className="text-teal-500 font-semibold">${po.total.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onView(po.id)
                      }}
                      className="text-slate-100 focus:bg-slate-700 focus:text-slate-100"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(po.id)
                      }}
                      className="text-slate-100 focus:bg-slate-700 focus:text-slate-100"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(po.id)
                      }}
                      className="text-red-400 focus:bg-slate-700 focus:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
