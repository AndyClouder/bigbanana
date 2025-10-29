'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context-provider'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading, signInWithGitHub } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/login')
  //   }
  // }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">需要登录</h1>
          <p className="text-gray-600 mb-6">
            请登录以访问 AI 图像编辑器
          </p>
          <Button onClick={signInWithGitHub} size="lg">
            <Github className="w-5 h-5 mr-2" />
            使用 GitHub 登录
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}