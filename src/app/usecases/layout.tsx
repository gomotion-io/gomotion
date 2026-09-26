import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <div className="max-w-[85rem] mx-auto pt-5 px-5 lg:px-12 font-sans">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
  )
}
