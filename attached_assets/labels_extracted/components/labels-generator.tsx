"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Printer, Download, Package, Search } from "lucide-react"
import { LabelPreview } from "./label-preview"

// Mock SKU data
const mockSKUs = [
  { id: "1", sku: "HVAC-001", name: "Air Filter 16x20x1", category: "Filters" },
  { id: "2", sku: "HVAC-002", name: "Thermostat Digital", category: "Controls" },
  { id: "3", sku: "HVAC-003", name: "Condenser Coil 3-Ton", category: "Coils" },
  { id: "4", sku: "HVAC-004", name: "Refrigerant R-410A", category: "Refrigerants" },
  { id: "5", sku: "HVAC-005", name: "Duct Tape 2in x 60yd", category: "Supplies" },
]

const labelSizes = [
  { value: "2x1", label: '2" x 1"' },
  { value: "3x2", label: '3" x 2"' },
  { value: "4x2", label: '4" x 2"' },
  { value: "4x3", label: '4" x 3"' },
]

const labelFields = [
  { id: "sku", label: "SKU Number" },
  { id: "name", label: "Product Name" },
  { id: "category", label: "Category" },
  { id: "barcode", label: "Barcode" },
  { id: "price", label: "Price" },
  { id: "date", label: "Date" },
]

export function LabelsGenerator() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSKUs, setSelectedSKUs] = useState<string[]>([])
  const [labelSize, setLabelSize] = useState("3x2")
  const [selectedFields, setSelectedFields] = useState<string[]>(["sku", "name", "barcode"])
  const [quantity, setQuantity] = useState("1")

  const filteredSKUs = mockSKUs.filter(
    (item) =>
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleSKU = (skuId: string) => {
    setSelectedSKUs((prev) => (prev.includes(skuId) ? prev.filter((id) => id !== skuId) : [...prev, skuId]))
  }

  const toggleField = (fieldId: string) => {
    setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
  }

  const handlePrint = () => {
    console.log("Printing labels...", { selectedSKUs, labelSize, selectedFields, quantity })
  }

  const handleDownload = () => {
    console.log("Downloading PDF...", { selectedSKUs, labelSize, selectedFields, quantity })
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Labels Generator</h1>
        <p className="text-muted-foreground">Create and print custom labels for your HVAC inventory</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - SKU Selection & Settings */}
        <div className="space-y-6">
          {/* SKU Selection Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Select SKUs
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Search and select products for label generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by SKU or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* SKU List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredSKUs.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSKU(item.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSKUs.includes(item.id)
                        ? "bg-primary/10 border-primary"
                        : "bg-secondary border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-mono text-sm font-semibold text-foreground">{item.sku}</div>
                        <div className="text-sm text-muted-foreground">{item.name}</div>
                        <div className="text-xs text-primary mt-1">{item.category}</div>
                      </div>
                      <Checkbox
                        checked={selectedSKUs.includes(item.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {selectedSKUs.length > 0 && (
                <div className="text-sm text-primary font-medium">
                  {selectedSKUs.length} SKU{selectedSKUs.length > 1 ? "s" : ""} selected
                </div>
              )}
            </CardContent>
          </Card>

          {/* Label Settings Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Label Settings</CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure label size, fields, and quantity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Label Size */}
              <div className="space-y-2">
                <Label htmlFor="label-size" className="text-foreground">
                  Label Size
                </Label>
                <Select value={labelSize} onValueChange={setLabelSize}>
                  <SelectTrigger id="label-size" className="bg-secondary border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {labelSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value} className="text-popover-foreground">
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Label Fields */}
              <div className="space-y-3">
                <Label className="text-foreground">Label Fields</Label>
                <div className="space-y-2">
                  {labelFields.map((field) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={selectedFields.includes(field.id)}
                        onCheckedChange={() => toggleField(field.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label
                        htmlFor={field.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer"
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-foreground">
                  Quantity per SKU
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Label Preview & Actions */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Label Preview</CardTitle>
              <CardDescription className="text-muted-foreground">Preview how your labels will look</CardDescription>
            </CardHeader>
            <CardContent>
              <LabelPreview
                sku={selectedSKUs.length > 0 ? mockSKUs.find((s) => s.id === selectedSKUs[0]) : null}
                size={labelSize}
                fields={selectedFields}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handlePrint}
              disabled={selectedSKUs.length === 0}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Labels
            </Button>
            <Button
              onClick={handleDownload}
              disabled={selectedSKUs.length === 0}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
