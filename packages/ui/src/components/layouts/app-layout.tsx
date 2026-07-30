import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { Toaster } from '../ui/sonner'
import { AppSidebar, type AppSidebarProps } from './app-sidebar'
import { SiteHeader, type SiteHeaderProps } from './site-header'

type ToasterPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface AppLayoutProps {
  children: ReactNode
  /** Override the entire sidebar. When provided, `sidebarProps` is ignored. */
  sidebar?: ReactNode
  /** Props forwarded to the default `<AppSidebar />` when no `sidebar` slot is given. */
  sidebarProps?: AppSidebarProps
  /** Override the entire header. When provided, `headerProps` is ignored. */
  header?: ReactNode
  /** Props forwarded to the default `<SiteHeader />` when no `header` slot is given. */
  headerProps?: SiteHeaderProps
  /** Hide the header altogether. */
  hideHeader?: boolean
  /** Hide the embedded `<Toaster />`. */
  hideToaster?: boolean
  /** Position passed to the embedded toaster. */
  toasterPosition?: ToasterPosition
  /** Default sidebar open state passed to `SidebarProvider`. */
  defaultSidebarOpen?: boolean
}

/**
 * Composed application shell: a `SidebarProvider`, configurable sidebar, header,
 * scrollable content area, and a toaster. Drop a route's `<Outlet />` (or any
 * children) inside it.
 */
export function AppLayout({
  children,
  sidebar,
  sidebarProps,
  header,
  headerProps,
  hideHeader,
  hideToaster,
  toasterPosition = 'top-right',
  defaultSidebarOpen,
}: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      {hideToaster ? null : <Toaster position={toasterPosition} />}
      {sidebar ?? <AppSidebar variant="inset" {...sidebarProps} />}
      <SidebarInset>
        {hideHeader ? null : (header ?? <SiteHeader {...headerProps} />)}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
