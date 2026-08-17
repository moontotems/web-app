import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  HeadContent,
  Outlet,
  ScriptOnce,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

import { type CurrentUser, getCurrentUser } from '~/lib/auth/server'
import { ASSETS } from '~/lib/constants'
import appCss from '~/lib/styles/app.css?url'
import { Web3Providers } from '~/lib/web3/Web3Providers'

const RootComponent = () => {
  const { queryClient } = Route.useRouteContext()

  return (
    <RootDocument>
      <Web3Providers queryClient={queryClient}>
        <Outlet />
      </Web3Providers>
    </RootDocument>
  )
}

const RootDocument = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    // suppress since we're updating the "dark" class in a custom script below
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        {children}

        <Toaster richColors position="top-right" />

        {process.env.NODE_ENV === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}

        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: CurrentUser | null
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: () => getCurrentUser(),
      staleTime: 30_000,
    })
    return { user }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'MoonTotems',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
      },
      { rel: 'icon', href: ASSETS.logos.favicon },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  component: RootComponent,
})
