import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface CreateSessionRequest {
  planId: string
  priceId: string
  successUrl: string
  cancelUrl: string
}

const CREEM_API_KEY = process.env.CREEM_API_KEY
const CREEM_API_BASE_URL = 'https://api.creem.io/v1'

const PLAN_PRICES = {
  basic: {
    monthly: 12,
    yearly: 6
  },
  pro: {
    monthly: 19.5,
    yearly: 9.75
  },
  max: {
    monthly: 80,
    yearly: 40
  }
}

export async function POST(request: NextRequest) {
  try {
    // 验证Creem API密钥
    if (!CREEM_API_KEY) {
      console.error('Creem API key not configured')
      return NextResponse.json(
        { error: '支付服务配置错误' },
        { status: 500 }
      )
    }

    // 验证用户身份
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: '用户未认证' },
        { status: 401 }
      )
    }

    // 解析请求体
    const body: CreateSessionRequest = await request.json()
    const { planId, priceId, successUrl, cancelUrl } = body

    // 验证请求数据
    if (!planId || !priceId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: '缺少必需参数' },
        { status: 400 }
      )
    }

    // 验证计划ID和价格ID
    if (!PLAN_PRICES[planId as keyof typeof PLAN_PRICES]) {
      return NextResponse.json(
        { error: '无效的计划ID' },
        { status: 400 }
      )
    }

    if (!['monthly', 'yearly'].includes(priceId)) {
      return NextResponse.json(
        { error: '无效的价格ID' },
        { status: 400 }
      )
    }

    // 获取价格
    const amount = PLAN_PRICES[planId as keyof typeof PLAN_PRICES][priceId as keyof typeof PLAN_PRICES.basic]

    // 创建Creem支付会话
    const sessionData = {
      amount: amount * 100, // 转换为分
      currency: 'USD',
      customer_email: user.email,
      metadata: {
        userId: user.id,
        planId: planId,
        billingCycle: priceId,
        successUrl: successUrl,
        cancelUrl: cancelUrl
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      // 添加订阅相关配置
      subscription: {
        interval: priceId === 'yearly' ? 'year' : 'month',
        trial_period_days: 7 // 7天免费试用
      }
    }

    const response = await fetch(`${CREEM_API_BASE_URL}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CREEM_API_KEY
      },
      body: JSON.stringify(sessionData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Creem API error:', errorData)
      return NextResponse.json(
        { error: '创建支付会话失败' },
        { status: response.status }
      )
    }

    const session = await response.json()

    return NextResponse.json({
      sessionId: session.id,
      checkoutUrl: session.url
    })

  } catch (error) {
    console.error('Payment session creation error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}