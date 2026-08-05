import type { ReactNode } from 'react'

import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'
import { ThemeToggle } from '../ui/theme-toggle'

export interface SiteHeaderProps {
  /** Title rendered next to the sidebar trigger. */
  title?: ReactNode
  /** Optional content rendered between title and the right-side actions. */
  children?: ReactNode
  /** Right-side actions. Defaults to a theme toggle. */
  actions?: ReactNode
  /** Hide the default theme toggle when true. */
  hideThemeToggle?: boolean
}

export function SiteHeader({ title, children, actions, hideThemeToggle }: SiteHeaderProps) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        {title ? <h1 className="text-base font-medium">{title}</h1> : null}
        {children}
        <div className="ml-auto flex items-center gap-2">
          {actions}
          {hideThemeToggle ? null : <ThemeToggle />}
        </div>
      </div>
    </header>
  )
}
