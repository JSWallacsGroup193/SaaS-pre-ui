"use client"

import { useEffect } from "react"
import { ErrorPage } from "@/components/error-page"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <ErrorPage
      errorCode={500}
      onRetry={reset}
      errorDetails={{
        code: error.digest,
        timestamp: new Date().toISOString(),
        requestId: error.digest,
        stackTrace: error.stack,
      }}
      isAdmin={false} // Set to true for admin users
    />
  )
}
