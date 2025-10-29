import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '支付成功 - Big Banana AI 图像编辑器',
  description: '感谢您的订阅！您现在可以开始使用Big Banana的强大功能了。',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                支付成功！
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                感谢您的订阅！您的账户已经升级，现在可以开始使用Big Banana的所有强大功能了。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">接下来您可以：</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">立即开始使用AI图像编辑器</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">上传并编辑您的第一张图片</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">探索所有高级功能和工具</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">在账户设置中管理您的订阅</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/#editor">
                  开始编辑
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">
                  查看订阅详情
                </Link>
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>如有任何问题，请联系我们的客服团队</p>
              <p>我们已向您的邮箱发送了确认邮件</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}