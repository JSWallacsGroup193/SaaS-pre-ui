import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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

const FileQuestionIcon = ({ className }: { className?: string }) => (
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
    <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
    <path d="M12 17h.01" />
  </svg>
)

export default function Page() {
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
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-100 mb-4">Error Pages Demo</h1>
          <p className="text-lg text-slate-400">Preview the custom error pages for OpsNex</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 404 Preview */}
          <Link href="/this-page-does-not-exist">
            <Card className="bg-slate-700 hover:bg-slate-600 transition-all p-8 text-center border-0 cursor-pointer group">
              <FileQuestionIcon className="h-16 w-16 text-teal-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-slate-100 mb-2">404 Error</h2>
              <p className="text-slate-400 mb-4">Page Not Found</p>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">View Demo</Button>
            </Card>
          </Link>

          {/* 500 Preview */}
          <Link href="/demo-500">
            <Card className="bg-slate-700 hover:bg-slate-600 transition-all p-8 text-center border-0 cursor-pointer group">
              <AlertTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-slate-100 mb-2">500 Error</h2>
              <p className="text-slate-400 mb-4">Server Error</p>
              <Button className="bg-red-500 hover:bg-red-600 text-white">View Demo</Button>
            </Card>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">Click on either card to preview the error page design</p>
        </div>
      </div>
    </div>
  )
}
