import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect_to') || '/'

  if (code) {
    try {
      const supabase = await createServerClient()

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error) {
        return NextResponse.redirect(`${requestUrl.origin}${next}`)
      }

      console.error('Auth callback error:', error)
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent('Authentication failed')}`
      )
    } catch (error) {
      console.error('Auth callback server error:', error)
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent('Server error')}`
      )
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(
    `${requestUrl.origin}/login?error=${encodeURIComponent('Missing authentication code')}`
  )
}