import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "@/app/globals.css"

const spaceGrotesk = DM_Sans({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})

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
      <div className={`max-w-[85rem] mx-auto pt-5 px-5 lg:px-12 font-sans ${spaceGrotesk.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </div>
  )
}
