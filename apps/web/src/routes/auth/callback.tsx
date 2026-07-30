import { createFileRoute, redirect } from '@tanstack/react-router'

import { exchangeCodeFn } from '~/lib/auth/server'

type CallbackSearch = {
  code?: string
  error?: string
  error_description?: string
}

export const Route = createFileRoute('/auth/callback')({
  validateSearch: (search: Record<string, unknown>): CallbackSearch => ({
    code: typeof search.code === 'string' ? search.code : undefined,
    error: typeof search.error === 'string' ? search.error : undefined,
    error_description:
      typeof search.error_description === 'string' ? search.error_description : undefined,
  }),
  beforeLoad: async ({ search, context }) => {
    // Supabase reports auth errors via `?error=...` on the redirect.
    if (search.error) {
      console.error('Auth callback error:', search.error, search.error_description)
      throw redirect({ to: '/auth/login' })
    }

    if (!search.code) {
      throw redirect({ to: '/auth/login' })
    }

    try {
      await exchangeCodeFn({ data: { code: search.code } })
    } catch (e) {
      console.error('Auth callback exchange failed:', e)
      throw redirect({ to: '/auth/login' })
    }

    // The new session cookies were set on this very response, but the cached
    // `['user']` query still holds `null` from the unauthenticated load.
    await context.queryClient.invalidateQueries({ queryKey: ['user'] })

    throw redirect({ to: '/' })
  },
})
