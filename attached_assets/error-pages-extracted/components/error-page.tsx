"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface ErrorPageProps {
  errorCode: 404 | 500
  message?: string
  onRetry?: () => void
  errorDetails?: {
    code?: string
    timestamp?: string
    requestId?: string
    stackTrace?: string
  }
  isAdmin?: boolean
}

const WrenchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
)

export function ErrorPage({ errorCode, message, onRetry, errorDetails, isAdmin = false }: ErrorPageProps) {
  const [countdown, setCountdown] = useState(10)
  const [showDetails, setShowDetails] = useState(false)

  const is404 = errorCode === 404
  const defaultMessage = is404
    ? "Sorry, we couldn't find the page you're looking for."
    : "We're experiencing technical difficulties. Our team has been notified."

  useEffect(() => {
    if (is404) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            window.location.href = "/"
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [is404])

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-2">
          <WrenchIcon className="h-8 w-8 text-teal-500" />
          <span className="text-2xl font-bold text-slate-100">OpsNex</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Error Code */}
        <div className="text-center mb-8">
          <h1 className="text-[120px] font-bold text-slate-100 leading-none mb-4">{errorCode}</h1>
          <div className={`h-1 w-32 mx-auto mb-8 ${is404 ? "bg-teal-500" : "bg-red-500"}`} />

          {/* Icon */}
          <div className="mb-6">
            {is404 ? (
              <WrenchIcon className="h-20 w-20 text-teal-500 mx-auto" />
            ) : (
              <AlertTriangleIcon className="h-20 w-20 text-red-500 mx-auto" />
            )}
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-slate-100 mb-4">
            {is404 ? "Page not found" : "Something went wrong"}
          </h2>

          {/* Message */}
          <p className="text-lg text-slate-400 max-w-md mx-auto">{message || defaultMessage}</p>
        </div>

        {/* 404 Quick Links */}
        {is404 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link href="/" className="block">
              <Card className="bg-teal-500 hover:bg-teal-600 transition-colors p-6 text-center border-0 cursor-pointer">
                <HomeIcon className="h-6 w-6 text-white mx-auto mb-2" />
                <span className="text-white font-semibold">Go to Dashboard</span>
              </Card>
            </Link>

            <Link href="/work-orders" className="block">
              <Card className="bg-slate-700 hover:bg-slate-600 transition-colors p-6 text-center border-0 cursor-pointer">
                <FileTextIcon className="h-6 w-6 text-slate-100 mx-auto mb-2" />
                <span className="text-slate-100 font-semibold">View Work Orders</span>
              </Card>
            </Link>

            <Link href="/support" className="block">
              <Card className="bg-slate-700 hover:bg-slate-600 transition-colors p-6 text-center border-0 cursor-pointer">
                <MailIcon className="h-6 w-6 text-slate-100 mx-auto mb-2" />
                <span className="text-slate-100 font-semibold">Contact Support</span>
              </Card>
            </Link>
          </div>
        )}

        {/* 500 Error Details (Admin Only) */}
        {!is404 && isAdmin && errorDetails && (
          <Card className="bg-slate-700 border-slate-600 mb-8 overflow-hidden">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full p-4 flex items-center justify-between text-slate-100 hover:bg-slate-600 transition-colors"
            >
              <span className="font-semibold">Error Details</span>
              {showDetails ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
            </button>

            {showDetails && (
              <div className="p-4 pt-0 space-y-3">
                {errorDetails.code && (
                  <div>
                    <span className="text-slate-400 text-sm">Error Code:</span>
                    <code className="block mt-1 text-red-400 font-mono text-sm bg-slate-800 p-2 rounded">
                      {errorDetails.code}
                    </code>
                  </div>
                )}

                {errorDetails.timestamp && (
                  <div>
                    <span className="text-slate-400 text-sm">Timestamp:</span>
                    <p className="text-slate-100 text-sm mt-1">{errorDetails.timestamp}</p>
                  </div>
                )}

                {errorDetails.requestId && (
                  <div>
                    <span className="text-slate-400 text-sm">Request ID:</span>
                    <p className="text-slate-100 text-sm mt-1 font-mono">{errorDetails.requestId}</p>
                  </div>
                )}

                {errorDetails.stackTrace && (
                  <div>
                    <span className="text-slate-400 text-sm">Stack Trace:</span>
                    <pre className="mt-1 text-slate-300 text-xs bg-slate-800 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto">
                      {errorDetails.stackTrace}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!is404 && onRetry && (
            <Button onClick={onRetry} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg">
              Try Again
            </Button>
          )}

          <Link href="/">
            <Button
              variant="secondary"
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-8 py-6 text-lg w-full sm:w-auto"
            >
              Go to Dashboard
            </Button>
          </Link>

          {!is404 && (
            <Link href="/support">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-6 text-lg w-full sm:w-auto bg-transparent"
              >
                Report Issue
              </Button>
            </Link>
          )}
        </div>

        {/* Footer */}
        {is404 && (
          <div className="text-center mt-8 space-y-2">
            <Link href="/" className="text-teal-500 hover:text-teal-400 font-semibold">
              Take me back
            </Link>
            <p className="text-slate-400 text-sm">Redirecting in {countdown} seconds...</p>
          </div>
        )}
      </div>
    </div>
  )
}
