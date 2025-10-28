import { createServerClient } from './supabase/server'
import { createClient } from './supabase/client'

export async function getUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getCurrentSession() {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export function createBrowserSupabaseClient() {
  return createClient()
}