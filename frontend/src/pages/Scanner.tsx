import { BarcodeScanner } from "@/components/barcode-scanner/barcode-scanner"
import type { SKUData } from "@/types/view-models/barcode"

export default function Scanner() {
  const handleScan = (barcode: string) => {
    console.log("Barcode scanned:", barcode)
    // In real app, this could trigger an API call to verify the barcode
  }

  const handleSKUFound = (sku: SKUData) => {
    console.log("SKU found:", sku)
    // In real app, this could:
    // 1. Update inventory state
    // 2. Show toast notification
    // 3. Navigate to SKU detail page
    // 4. Add to work order parts list
  }

  return (
    <div className="h-screen w-full">
      <BarcodeScanner onScan={handleScan} onSKUFound={handleSKUFound} />
    </div>
  )
}