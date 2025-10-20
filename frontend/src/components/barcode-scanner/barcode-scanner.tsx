import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Flashlight, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SKUData } from "@/types/view-models/barcode"

interface BarcodeScannerProps {
  onScan: (barcode: string) => void
  onSKUFound: (sku: SKUData) => void
}

export function BarcodeScanner({ onScan, onSKUFound }: BarcodeScannerProps) {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(true)
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null)
  const [skuData, setSkuData] = useState<SKUData | null>(null)
  const [flashlightOn, setFlashlightOn] = useState(false)
  const [hasFlashlight, setHasFlashlight] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanningRef = useRef(true)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }

      // Check if flashlight is available
      const track = stream.getVideoTracks()[0]
      const capabilities = track.getCapabilities() as any
      setHasFlashlight("torch" in capabilities)
    } catch (error) {
      console.error("Camera access error:", error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const toggleFlashlight = async () => {
    if (!streamRef.current) return

    const track = streamRef.current.getVideoTracks()[0]
    try {
      await track.applyConstraints({
        // @ts-ignore
        advanced: [{ torch: !flashlightOn }],
      })
      setFlashlightOn(!flashlightOn)
    } catch (error) {
      console.error("Flashlight toggle error:", error)
    }
  }

  const simulateScan = (barcode: string) => {
    if (!scanningRef.current) return

    // Vibrate on scan
    if ("vibrate" in navigator) {
      navigator.vibrate(200)
    }

    setScannedBarcode(barcode)
    setScanning(false)
    scanningRef.current = false
    onScan(barcode)

    // Simulate SKU lookup
    setTimeout(() => {
      const mockSKU = mockSKULookup(barcode)
      setSkuData(mockSKU)
      if (mockSKU) {
        onSKUFound(mockSKU)
      }
    }, 500)
  }

  const mockSKULookup = (barcode: string): SKUData | null => {
    // Mock data - in real app, this would be an API call
    const mockDatabase: Record<string, SKUData> = {
      "123456789012": {
        barcode: "123456789012",
        description: "HVAC Filter 16x20x1 MERV 13",
        category: "Filters",
        stock: 24,
        location: "Warehouse A - Bin 12",
      },
      "987654321098": {
        barcode: "987654321098",
        description: "Refrigerant R-410A 25lb Cylinder",
        category: "Refrigerants",
        stock: 8,
        location: "Warehouse B - Cage 3",
      },
    }

    return mockDatabase[barcode] || null
  }

  const handleScanAnother = () => {
    setScannedBarcode(null)
    setSkuData(null)
    setScanning(true)
    scanningRef.current = true
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleViewDetails = () => {
    console.log("View details:", skuData)
    alert("View Details - would navigate to SKU detail page")
  }

  const handleAddToWorkOrder = () => {
    console.log("Add to work order:", skuData)
    alert("Add to Work Order - would open work order selection modal")
  }

  const handleSearchManually = () => {
    console.log("Search manually")
    navigate("/inventory")
  }

  // Simulate barcode detection (in real app, use a barcode scanning library)
  useEffect(() => {
    if (!scanning) return

    const timer = setTimeout(() => {
      // Simulate scanning a barcode after 3 seconds for demo
      simulateScan("123456789012")
    }, 3000)

    return () => clearTimeout(timer)
  }, [scanning])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0f172a]">
      {/* Camera View */}
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 h-full w-full object-cover" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0f172a]/40" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-[#0f172a] to-transparent p-4 pb-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-teal-400 hover:bg-teal-400/10 hover:text-teal-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-slate-100">Scan Barcode</h1>
          {hasFlashlight ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFlashlight}
              className={`${
                flashlightOn ? "bg-teal-400/20 text-teal-300" : "text-teal-400 hover:bg-teal-400/10 hover:text-teal-300"
              }`}
            >
              <Flashlight className="h-6 w-6" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {/* Scanning Guide */}
      {scanning && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative">
            {/* Scanning Frame */}
            <div className="relative h-48 w-64 rounded-lg border-[3px] border-teal-400">
              {/* Animated Corners */}
              <div className="absolute -top-1 -left-1 h-8 w-8 animate-pulse rounded-tl-lg border-l-4 border-t-4 border-teal-400" />
              <div className="absolute -top-1 -right-1 h-8 w-8 animate-pulse rounded-tr-lg border-r-4 border-t-4 border-teal-400" />
              <div className="absolute -bottom-1 -left-1 h-8 w-8 animate-pulse rounded-bl-lg border-b-4 border-l-4 border-teal-400" />
              <div className="absolute -bottom-1 -right-1 h-8 w-8 animate-pulse rounded-br-lg border-b-4 border-r-4 border-teal-400" />
            </div>
            <p className="mt-4 text-center text-sm text-slate-100">Position barcode within frame</p>
          </div>
        </div>
      )}

      {/* Bottom Sheet - Result */}
      {scannedBarcode && (
        <div className="absolute bottom-0 left-0 right-0 z-20 animate-slide-up rounded-t-2xl bg-[#334155] p-6 shadow-2xl">
          {skuData ? (
            // Success State
            <div className="space-y-4">
              {/* Success Header */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Barcode Scanned!</h2>
                  <p className="font-mono text-2xl text-teal-400">{scannedBarcode}</p>
                </div>
              </div>

              {/* SKU Information */}
              <Card className="border-slate-600 bg-[#1e293b] p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-100">{skuData.description}</h3>
                    <Badge className="bg-teal-500 text-white hover:bg-teal-600">{skuData.category}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${skuData.stock > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      On Hand: {skuData.stock} units
                    </p>
                    <p className="text-sm text-slate-400">{skuData.location}</p>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button onClick={handleViewDetails} className="w-full bg-teal-500 text-white hover:bg-teal-600">
                  View Full Details
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToWorkOrder}
                  className="w-full border-teal-500 text-teal-400 hover:bg-teal-500/10 bg-transparent"
                >
                  Add to Work Order
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleScanAnother}
                  className="w-full bg-slate-600 text-slate-100 hover:bg-slate-700"
                >
                  Scan Another
                </Button>
              </div>
            </div>
          ) : (
            // Not Found State
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Barcode not found in inventory</h2>
                  <p className="font-mono text-xl text-slate-400">{scannedBarcode}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="link" onClick={handleSearchManually} className="w-full text-teal-400 hover:text-teal-300">
                  Search manually
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleScanAnother}
                  className="w-full bg-slate-600 text-slate-100 hover:bg-slate-700"
                >
                  Scan Another
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
