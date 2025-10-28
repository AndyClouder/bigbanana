'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Github } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context-provider'
import { toast } from 'sonner'

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')
  const { user, loading, signInWithGitHub } = useAuth()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  useEffect(() => {
    if (user && !loading) {
      router.push('/')
    }
  }, [user, loading, router])

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Big Banana</h1>
          <p className="text-gray-600">使用 GitHub 账号登录</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">登录</CardTitle>
            <CardDescription className="text-center">
              使用您的 GitHub 账号登录以访问 AI 图像编辑器
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={signInWithGitHub}
              className="w-full"
              size="lg"
            >
              <Github className="w-5 h-5 mr-2" />
              使用 GitHub 登录
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>登录即表示您同意我们的服务条款和隐私政策。</p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}