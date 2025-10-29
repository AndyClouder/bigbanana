"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Crown, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context-provider'
import { toast } from 'sonner'

interface PricingPlan {
  id: string
  name: string
  price: {
    monthly: number
    yearly: number
  }
  credits: number
  features: string[]
  icon: React.ReactNode
  popular?: boolean
  color: string
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: '基础版',
    price: {
      monthly: 12,
      yearly: 6
    },
    credits: 100,
    features: [
      '100个图像生成积分',
      '标准AI模型',
      '基础编辑工具',
      'PNG格式下载',
      '邮件支持'
    ],
    icon: <Sparkles className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'pro',
    name: '专业版',
    price: {
      monthly: 19.5,
      yearly: 9.75
    },
    credits: 500,
    features: [
      '500个图像生成积分',
      '高级AI模型',
      '高级编辑工具',
      'PNG/JPEG格式下载',
      '优先支持',
      '批量处理',
      '自定义风格'
    ],
    icon: <Zap className="h-6 w-6" />,
    popular: true,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'max',
    name: '旗舰版',
    price: {
      monthly: 80,
      yearly: 40
    },
    credits: 2000,
    features: [
      '2000个图像生成积分',
      '所有AI模型',
      '所有编辑工具',
      '所有格式下载',
      '24/7专属支持',
      '无限批量处理',
      '自定义风格',
      'API访问',
      '团队协作',
      '商业使用权'
    ],
    icon: <Crown className="h-6 w-6" />,
    color: 'from-yellow-500 to-orange-500'
  }
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const { user } = useAuth()

  const handleSubscribe = async (planId: string, priceId: string) => {
    if (!user) {
      toast.error('请先登录后再订阅')
      return
    }

    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '创建支付会话失败')
      }

      // 重定向到Creem支付页面
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(error instanceof Error ? error.message : '支付失败，请重试')
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            选择适合您的
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {" "}价格方案
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            解锁强大的AI图像编辑功能，无论您是个人创作者还是专业团队，我们都有适合您的方案
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              月付
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isYearly ? 'bg-yellow-400' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              年付
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                节省50%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${
                plan.popular
                  ? 'border-2 border-yellow-400 shadow-2xl scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-2 text-sm font-bold rounded-bl-lg">
                  最受欢迎
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-gray-900 mt-4">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                  <span className="text-lg font-normal text-gray-500">/{isYearly ? '月' : '月'}</span>
                </CardDescription>
                <p className="text-sm text-gray-500 mt-2">
                  {plan.credits}个图像生成积分
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                  onClick={() => handleSubscribe(plan.id, isYearly ? 'yearly' : 'monthly')}
                >
                  {user ? '立即订阅' : '登录后订阅'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">常见问题</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">积分如何使用？</h3>
                <p className="text-gray-600">每次图像生成消耗1个积分，编辑操作免费。积分不会过期。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">可以随时升级或降级吗？</h3>
                <p className="text-gray-600">可以，您可以随时更改订阅计划，差价按比例计算。</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">支持哪些支付方式？</h3>
                <p className="text-gray-600">我们支持信用卡、借记卡以及Creem平台的所有支付方式。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">有退款政策吗？</h3>
                <p className="text-gray-600">我们提供7天无理由退款，确保您的满意。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}