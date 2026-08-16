import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { DefaultCatchBoundary } from '~/lib/sharedComponents/DefaultCatchBoundary'
import { NotFound } from '~/lib/sharedComponents/NotFound'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient, user: null },
    defaultPreload: 'intent',
    // react-query handles data fetching & caching
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    defaultStructuralSharing: true,
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}
