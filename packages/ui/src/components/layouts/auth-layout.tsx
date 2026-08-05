import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

export interface AuthLayoutQuote {
  text: string
  author?: string
}

export interface AuthLayoutProps {
  /** Main content of the right column (heading, form, etc.). */
  children: ReactNode
  /** Optional logo node rendered top-left of the right column. */
  logo?: ReactNode
  /** Optional element rendered top-right of the right column (e.g. a sign-in/sign-up link). */
  topRightAction?: ReactNode
  /** Optional quote rendered over the left-side artwork. */
  quote?: AuthLayoutQuote
  /** Optional small footer text under the right column (terms, privacy, etc.). */
  footer?: ReactNode
  /**
   * Background image url for the left column. When omitted, a subtle CSS
   * gradient mesh is rendered instead so the layout works out of the box.
   */
  imageSrc?: string
  /** Override the className of the outermost container. */
  className?: string
}

/**
 * Two-column authentication layout. The left column displays decorative
 * artwork with an optional quote; the right column houses the form content.
 *
 * The layout is fully responsive: on small screens the artwork is hidden and
 * the form takes the full viewport.
 */
export function AuthLayout({
  children,
  logo,
  topRightAction,
  quote,
  footer,
  imageSrc,
  className,
}: AuthLayoutProps) {
  return (
    <main className={cn('bg-background', className)}>
      <div className="grid min-h-dvh lg:grid-cols-5">
        <aside className="fixed inset-y-0 col-span-2 hidden w-2/5 lg:block">
          {imageSrc ? (
            <img alt="" src={imageSrc} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(at_18%_8%,oklch(0.55_0.22_252)_0%,transparent_55%),radial-gradient(at_82%_92%,oklch(0.55_0.22_305)_0%,transparent_55%),radial-gradient(at_55%_45%,oklch(0.45_0.18_200)_0%,transparent_60%),oklch(0.16_0.02_252)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 backdrop-blur-[2px]" />
          <div className="absolute inset-0 border-r border-white/10" />
          {quote ? (
            <div className="absolute right-12 bottom-12 left-12">
              <blockquote className="space-y-3">
                <p className="text-balance text-xl font-medium text-white">
                  &ldquo;{quote.text}&rdquo;
                </p>
                {quote.author ? (
                  <footer className="text-sm text-white/75">— {quote.author}</footer>
                ) : null}
              </blockquote>
            </div>
          ) : null}
        </aside>

        <section className="flex flex-col p-6 lg:col-span-3 lg:col-start-3 lg:p-12">
          {logo || topRightAction ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">{logo}</div>
              <div className="flex items-center">{topRightAction}</div>
            </div>
          ) : null}

          <div className="m-auto w-full max-w-sm">{children}</div>

          {footer ? (
            <div className="text-muted-foreground mt-auto text-center text-xs">{footer}</div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
