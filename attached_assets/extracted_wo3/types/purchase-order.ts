export type PurchaseOrderStatus = "draft" | "sent" | "approved" | "received" | "cancelled"

export interface PurchaseOrderItem {
  id: string
  skuId: string
  skuName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  supplierId: string
  supplierName: string
  date: string
  expectedDelivery: string
  status: PurchaseOrderStatus
  items: PurchaseOrderItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrderFilters {
  search: string
  status: PurchaseOrderStatus[]
  supplierId: string
  dateRange: {
    from: string
    to: string
  }
  sortBy: "poNumber" | "date" | "total"
  sortOrder: "asc" | "desc"
}
