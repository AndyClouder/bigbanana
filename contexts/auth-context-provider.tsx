'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGitHub: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase] = useState(() => {
    // Only initialize Supabase if environment variables are available
    if (typeof window !== 'undefined' &&
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return createClient()
    }
    return null
  })

  useEffect(() => {
    // Skip if Supabase is not initialized
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signInWithGitHub = async () => {
    console.log('GitHub登录按钮被点击')
    console.log('Supabase客户端状态:', !!supabase)
    console.log('环境变量状态:', {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

    if (!supabase) {
      console.error('Supabase 未配置')
      toast.error('Supabase 未配置')
      return
    }

    // 显示加载状态
    toast.loading('正在连接GitHub...')

    try {
      console.log('开始GitHub OAuth登录流程...')

      // 添加超时处理
      const loginPromise = supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('连接超时，请重试')), 10000)
      })

      const { error } = await Promise.race([loginPromise, timeoutPromise]) as any

      // 清除加载状态
      toast.dismiss()

      if (error) {
        console.error('GitHub登录错误:', error)
        toast.error('登录失败：' + error.message)
      } else {
        console.log('GitHub登录流程已启动')
        toast.success('正在跳转到GitHub授权...')
      }
    } catch (error: any) {
      console.error('GitHub登录异常:', error)
      toast.dismiss()

      if (error.message.includes('超时')) {
        toast.error('网络连接超时，请检查网络后重试')
      } else {
        toast.error('登录失败：' + error.message)
      }
    }
  }

  const signOut = async () => {
    if (!supabase) {
      toast.error('Supabase 未配置')
      return
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error('登出失败：' + error.message)
      } else {
        toast.success('已成功登出')
      }
    } catch (error) {
      toast.error('登出失败：' + (error as Error).message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithGitHub,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}