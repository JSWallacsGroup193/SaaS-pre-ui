"use client"

import { useState, useEffect } from "react"
import { BarcodeScanner } from "@/components/barcode-scanner"
import type { SKUData } from "@/types/barcode"

export default function BarcodeScannerPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScan = (barcode: string) => {
    console.log("[v0] Barcode scanned:", barcode)
  }

  const handleSKUFound = (sku: SKUData) => {
    console.log("[v0] SKU found:", sku)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="h-screen w-full">
      <BarcodeScanner onScan={handleScan} onSKUFound={handleSKUFound} />
    </div>
  )
}
