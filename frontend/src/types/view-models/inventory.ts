export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export interface SKU {
  id: string
  sku: string
  description: string
  category: string
  onHand: number
  reorderPoint: number
  unitCost: number
  location: {
    warehouse: string
    bin: string
  }
  barcode?: string
  lastRestocked?: string
  supplier?: string
}

export interface InventoryStats {
  totalSKUs: number
  lowStockAlerts: number
  outOfStock: number
  totalInventoryValue: number
}

export interface InventoryFilters {
  search: string
  categories: string[]
  stockStatus: 'all' | StockStatus
  warehouse: string
  sortBy: 'sku' | 'description' | 'stock-level'
}

export function getStockStatus(onHand: number, reorderPoint: number): StockStatus {
  if (onHand === 0) {
    return 'out-of-stock'
  }
  if (onHand <= reorderPoint) {
    return 'low-stock'
  }
  return 'in-stock'
}

export function getStockStatusColor(status: StockStatus): {
  bg: string
  text: string
  label: string
} {
  switch (status) {
    case 'in-stock':
      return { bg: 'bg-emerald-500', text: 'text-white', label: 'In Stock' }
    case 'low-stock':
      return { bg: 'bg-amber-500', text: 'text-slate-900', label: 'Low Stock' }
    case 'out-of-stock':
      return { bg: 'bg-red-500', text: 'text-white', label: 'Out of Stock' }
  }
}
