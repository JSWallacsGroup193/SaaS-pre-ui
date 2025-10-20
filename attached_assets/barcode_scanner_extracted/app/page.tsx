import Link from "next/link"
import { Camera, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-teal-400">OpsNex</h1>
          <p className="text-sm text-slate-400 mt-1">HVAC Field Service Assistant</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Barcode Scanner Card */}
          <Link href="/barcode-scanner">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-teal-500 transition-colors active:scale-[0.98] transition-transform">
              <div className="flex items-start gap-4">
                <div className="bg-teal-500/10 p-3 rounded-lg">
                  <Camera className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white mb-1">Barcode Scanner</h2>
                  <p className="text-sm text-slate-400">
                    Scan equipment barcodes to view SKU details, stock levels, and locations
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* AI Chat Assistant Card */}
          <Link href="/chat">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-teal-500 transition-colors active:scale-[0.98] transition-transform">
              <div className="flex items-start gap-4">
                <div className="bg-teal-500/10 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white mb-1">AI Chat Assistant</h2>
                  <p className="text-sm text-slate-400">
                    Get instant answers about HVAC systems, troubleshooting, and procedures
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
