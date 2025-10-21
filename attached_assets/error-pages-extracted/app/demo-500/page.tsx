import { ErrorPage } from "@/components/error-page"

export default function Demo500Page() {
  return (
    <ErrorPage
      errorCode={500}
      message="This is a demo of the 500 error page."
      errorDetails={{
        code: "INTERNAL_SERVER_ERROR",
        timestamp: new Date().toISOString(),
        requestId: "demo-request-" + Math.random().toString(36).substring(7),
        stackTrace: `Error: Something went wrong
    at handleRequest (/app/api/route.ts:42:15)
    at processRequest (/app/lib/processor.ts:128:9)
    at async POST (/app/api/route.ts:18:3)`,
      }}
      isAdmin={true}
    />
  )
}
