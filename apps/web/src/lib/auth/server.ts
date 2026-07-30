import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { getSupabaseServerClient } from '~/lib/utils/supabase/server'

/**
 * Absolute URL to send Supabase magic-link / OAuth redirects to. Derived from
 * the live request so it works in dev, prod, preview deploys, and `127.0.0.1`
 * vs `localhost` without any env-var juggling.
 *
 * IMPORTANT: every host returned here must be in
 * `apps/supabase/config.toml`'s `additional_redirect_urls`, or Supabase will
 * silently fall back to `site_url`.
 */
function authCallbackUrl(): string {
  const url = new URL(getRequest().url)
  return new URL('/auth/callback', `${url.protocol}//${url.host}`).toString()
}

/**
 * Shape of the authenticated user available to the rest of the app. The
 * Supabase `User` type contains nested fields that aren't safe to round-trip
 * through TanStack Start's server-fn serializer, so we project only the
 * fields the UI actually needs.
 */
export type CurrentUser = {
  id: string
  email: string | null
  // Supabase exposes these as loose key/value bags. TanStack Start's server-fn
  // serializer is happy with `object` (anything non-primitive) but rejects
  // `unknown`, so we pin the type accordingly.
  user_metadata: object
  app_metadata: object
  created_at: string
}

export const getCurrentUser = createServerFn({ method: 'GET' }).handler(
  async (): Promise<CurrentUser | null> => {
    // NFT public routes should still boot without a local Supabase stack.
    if (!process.env.SUPABASE_API_URL || !process.env.SUPABASE_ANON_KEY) {
      return null
    }

    try {
      const supabase = getSupabaseServerClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return null

      // Round-trip through JSON so we (a) hand TanStack Start's server-fn
      // serializer something it can fully validate, and (b) strip any
      // function-valued props Supabase might attach to metadata.
      return {
        id: user.id,
        email: user.email ?? null,
        user_metadata: JSON.parse(JSON.stringify(user.user_metadata ?? {})) as object,
        app_metadata: JSON.parse(JSON.stringify(user.app_metadata ?? {})) as object,
        created_at: user.created_at,
      }
    } catch {
      return null
    }
  },
)

export const loginFn = createServerFn()
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: authCallbackUrl(),
      },
    })

    if (error) throw new Error(error.message)
    return { success: true }
  })

export const verifyCodeFn = createServerFn()
  .inputValidator((data: { email: string; code: string }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.verifyOtp({
      token: data.code,
      email: data.email,
      type: 'email',
    })

    if (error) throw new Error(error.message)
    return { success: true }
  })

export const oauthFn = createServerFn()
  .inputValidator((data: { provider: 'github' }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { data: result, error } = await supabase.auth.signInWithOAuth({
      provider: data.provider,
      options: {
        redirectTo: authCallbackUrl(),
      },
    })

    if (error) throw new Error(error.message)
    return { url: result.url }
  })

/**
 * PKCE code exchange — Supabase's magic-link / OAuth redirect lands the
 * browser on `/auth/callback?code=<>`. We swap the code for a session here;
 * `@supabase/ssr` writes the resulting cookies onto the redirect response.
 */
export const exchangeCodeFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { code: string }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(data.code)
    if (error) throw new Error(error.message)
    return { success: true }
  })

export const logoutFn = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)

  throw redirect({ href: '/auth/login' })
})
