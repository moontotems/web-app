import { cn } from '@moontotems/ui'
import type { ReactNode } from 'react'

/** Shared section title used across the project overview. */
export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <h2 className={cn('p-[25px] text-xl', className)}>{children}</h2>
}
