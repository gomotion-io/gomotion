"use client"

import * as Icons from "lucide-react"
import type { LucideProps } from "lucide-react"
import React from "react"

function toPascalCase(input: string) {
  return input
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(^|\s)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase())
    .replace(/\s+/g, "")
}

type IconFromNameProps = {
  name?: string | null
  className?: string
} & Omit<LucideProps, "ref" | "className">

// Renders a Lucide icon by name (e.g., "Zap", "users", "dollar-sign").
// Falls back to rendering the raw string (emoji/text) or HelpCircle.
export default function IconFromName({ name, className, ...props }: IconFromNameProps) {
  const raw = (name ?? "").trim()
  const candidates = [
    raw,
    toPascalCase(raw),
    raw.toLowerCase(),
    toPascalCase(raw.toLowerCase()),
  ].filter(Boolean) as string[]

  const IconsMap = Icons as unknown as Record<string, React.ComponentType<LucideProps>>

  for (const key of candidates) {
    if (key && IconsMap[key]) {
      const Comp = IconsMap[key]
      return <Comp className={className} {...props} />
    }
  }

  // If no lucide match, show the raw string (works for emoji from CSV)
  if (raw) {
    return (
      <span className={className} aria-label={raw} title={raw}>
        {raw}
      </span>
    )
  }

  const Fallback = Icons.HelpCircle
  return <Fallback className={className} {...props} />
}

