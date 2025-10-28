import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const redirectTo = requestUrl.searchParams.get('redirect_to') || '/'

  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${requestUrl.origin}/api/auth/callback?redirect_to=${redirectTo}`,
        scopes: 'user:email'
      },
    })

    if (error) {
      console.error('GitHub auth error:', error)
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`
      )
    }

    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error('GitHub auth server error:', error)
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent('Authentication failed')}`
    )
  }
}