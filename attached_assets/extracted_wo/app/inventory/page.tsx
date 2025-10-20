"use client"

import { InventoryList } from "@/components/inventory/inventory-list"
import type { SKU, InventoryStats } from "@/types/inventory"

// Mock data
const mockSKUs: SKU[] = [
  {
    id: "1",
    sku: "HVAC-001",
    description: "Air Filter 16x20x1",
    category: "Filters",
    onHand: 150,
    reorderPoint: 50,
    unitCost: 12.99,
    location: { warehouse: "Warehouse A", bin: "A-12" },
    barcode: "123456789012",
    lastRestocked: "2024-01-15",
  },
  {
    id: "2",
    sku: "HVAC-002",
    description: "Thermostat Digital Programmable",
    category: "Controls",
    onHand: 25,
    reorderPoint: 20,
    unitCost: 89.99,
    location: { warehouse: "Warehouse A", bin: "B-05" },
    barcode: "123456789013",
    lastRestocked: "2024-01-18",
  },
  {
    id: "3",
    sku: "HVAC-003",
    description: "Refrigerant R-410A 25lb",
    category: "Refrigerants",
    onHand: 0,
    reorderPoint: 10,
    unitCost: 245.0,
    location: { warehouse: "Warehouse B", bin: "C-08" },
    barcode: "123456789014",
    lastRestocked: "2024-01-10",
  },
  {
    id: "4",
    sku: "HVAC-004",
    description: "Condenser Fan Motor 1/4 HP",
    category: "Motors",
    onHand: 8,
    reorderPoint: 5,
    unitCost: 156.5,
    location: { warehouse: "Warehouse A", bin: "D-15" },
    barcode: "123456789015",
    lastRestocked: "2024-01-20",
  },
  {
    id: "5",
    sku: "HVAC-005",
    description: 'Copper Tubing 3/4" x 50ft',
    category: "Piping",
    onHand: 45,
    reorderPoint: 30,
    unitCost: 78.25,
    location: { warehouse: "Warehouse B", bin: "E-22" },
    barcode: "123456789016",
    lastRestocked: "2024-01-12",
  },
]

const mockStats: InventoryStats = {
  totalSKUs: 247,
  lowStockAlerts: 12,
  outOfStock: 5,
  totalInventoryValue: 125840,
}

const mockCategories = ["Filters", "Controls", "Refrigerants", "Motors", "Piping", "Tools", "Parts"]
const mockWarehouses = ["Warehouse A", "Warehouse B", "Warehouse C"]

export default function InventoryPage() {
  const handleCreateSKU = () => {
    console.log("[v0] Create SKU clicked")
  }

  const handleView = (id: string) => {
    console.log("[v0] View SKU:", id)
  }

  const handleEdit = (id: string) => {
    console.log("[v0] Edit SKU:", id)
  }

  const handlePrintLabel = (id: string) => {
    console.log("[v0] Print label for SKU:", id)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Delete SKU:", id)
  }

  const handleScanBarcode = () => {
    console.log("[v0] Scan barcode clicked")
  }

  const handleImportSKUs = () => {
    console.log("[v0] Import SKUs clicked")
  }

  const handleExportCSV = () => {
    console.log("[v0] Export CSV clicked")
  }

  return (
    <InventoryList
      skus={mockSKUs}
      stats={mockStats}
      categories={mockCategories}
      warehouses={mockWarehouses}
      onCreateSKU={handleCreateSKU}
      onView={handleView}
      onEdit={handleEdit}
      onPrintLabel={handlePrintLabel}
      onDelete={handleDelete}
      onScanBarcode={handleScanBarcode}
      onImportSKUs={handleImportSKUs}
      onExportCSV={handleExportCSV}
    />
  )
}
