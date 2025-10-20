"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface CalculatorLayoutProps {
  title: string
  children: ReactNode
}

export function CalculatorLayout({ title, children }: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/field-tools" className="text-teal-500 hover:text-teal-400 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-slate-100">{title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
