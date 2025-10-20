"use client"

import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { PurchaseOrder } from "@/types/purchase-order"

interface PurchaseOrderCardProps {
  purchaseOrder: PurchaseOrder
  onView: (id: string) => void
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

export function PurchaseOrderCard({ purchaseOrder, onView }: PurchaseOrderCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100">{purchaseOrder.poNumber}</h3>
            <p className="text-sm text-slate-400 mt-1">{purchaseOrder.supplierName}</p>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[purchaseOrder.status]
            }`}
          >
            {statusLabels[purchaseOrder.status]}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-teal-500">${purchaseOrder.total.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">{new Date(purchaseOrder.date).toLocaleDateString()}</p>
          </div>
        </div>

        <Button
          onClick={() => onView(purchaseOrder.id)}
          variant="outline"
          className="w-full border-teal-600 text-teal-500 hover:bg-teal-600 hover:text-white"
        >
          <Eye className="h-4 w-4 mr-2" />
          View PO
        </Button>
      </div>
    </Card>
  )
}
