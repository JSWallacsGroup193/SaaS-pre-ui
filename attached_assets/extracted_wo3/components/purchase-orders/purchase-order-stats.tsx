"use client"

import { FileText, Clock, DollarSign, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface PurchaseOrderStatsProps {
  totalPOs: number
  pending: number
  totalAmount: number
  overdue: number
}

export function PurchaseOrderStats({ totalPOs, pending, totalAmount, overdue }: PurchaseOrderStatsProps) {
  const stats = [
    {
      label: "Total POs This Month",
      value: totalPOs.toString(),
      icon: FileText,
      iconColor: "text-slate-400",
    },
    {
      label: "Pending",
      value: pending.toString(),
      icon: Clock,
      iconColor: "text-amber-500",
      badge: "amber",
    },
    {
      label: "Total Amount",
      value: `$${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      iconColor: "text-teal-500",
      valueColor: "text-teal-500",
    },
    {
      label: "Overdue",
      value: overdue.toString(),
      icon: AlertTriangle,
      iconColor: "text-red-500",
      badge: "red",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 px-6 py-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-slate-800 border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className={`text-2xl font-semibold mt-1 ${stat.valueColor || "text-slate-100"}`}>{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
          </div>
        </Card>
      ))}
    </div>
  )
}
