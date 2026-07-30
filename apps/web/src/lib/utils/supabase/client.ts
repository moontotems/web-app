import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient> | null = null

/**
 * Browser-side Supabase client (anon key). Used for public reads like the
 * `moontotems` metadata table; RLS makes this connection read-only.
 * Lazily created so importing this module has no side effects during SSR.
 */
export function getSupabaseBrowserClient() {
  if (client) return client

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing VITE_SUPABASE_URL environment variable')
  }
  if (!supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return client
}
