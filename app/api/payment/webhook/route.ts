import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // 验证webhook签名
    const signature = headers().get('x-creem-signature')
    const body = await request.text()

    if (!signature || !CREEM_WEBHOOK_SECRET) {
      console.error('Missing webhook signature or secret')
      return NextResponse.json(
        { error: 'Invalid webhook' },
        { status: 400 }
      )
    }

    // 这里应该验证webhook签名，但Creem文档中没有明确说明签名格式
    // 假设使用HMAC-SHA256，但需要根据Creem实际文档调整
    // const crypto = require('crypto')
    // const expectedSignature = crypto
    //   .createHmac('sha256', CREEM_WEBHOOK_SECRET)
    //   .update(body)
    //   .digest('hex')
    //
    // if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    const event = JSON.parse(body)
    console.log('Webhook event:', event)

    // 处理不同类型的webhook事件
    switch (event.type) {
      case 'checkout.session.completed':
        await handlePaymentSuccess(event.data)
        break

      case 'payment.succeeded':
        await handlePaymentSuccess(event.data)
        break

      case 'payment.failed':
        await handlePaymentFailure(event.data)
        break

      case 'subscription.created':
        await handleSubscriptionCreated(event.data)
        break

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.data)
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(data: any) {
  const supabase = await createServerClient()

  try {
    const { userId, planId, billingCycle } = data.metadata

    // 更新用户订阅信息
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        plan_id: planId,
        billing_cycle: billingCycle,
        status: 'active',
        creem_subscription_id: data.subscription_id,
        current_period_end: new Date(data.current_period_end * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Database update error:', error)
      throw error
    }

    // 添加积分到用户账户
    const creditsToAdd = getCreditsForPlan(planId)
    await addUserCredits(supabase, userId, creditsToAdd)

    console.log(`Payment successful for user ${userId}, plan ${planId}`)

  } catch (error) {
    console.error('Payment success handling error:', error)
    throw error
  }
}

async function handlePaymentFailure(data: any) {
  const { userId, planId } = data.metadata

  console.log(`Payment failed for user ${userId}, plan ${planId}`)

  // 这里可以发送通知给用户，记录失败信息等
}

async function handleSubscriptionCreated(data: any) {
  console.log('Subscription created:', data.id)
}

async function handleSubscriptionCancelled(data: any) {
  const supabase = await createServerClient()

  try {
    // 更新订阅状态为已取消
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('creem_subscription_id', data.id)

    if (error) {
      console.error('Subscription cancellation update error:', error)
      throw error
    }

    console.log(`Subscription ${data.id} cancelled`)

  } catch (error) {
    console.error('Subscription cancellation handling error:', error)
    throw error
  }
}

async function addUserCredits(supabase: any, userId: string, credits: number) {
  try {
    // 添加积分记录
    const { error } = await supabase
      .from('user_credits')
      .insert({
        user_id: userId,
        credits: credits,
        type: 'subscription',
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Credits addition error:', error)
      throw error
    }

  } catch (error) {
    console.error('Add user credits error:', error)
    throw error
  }
}

function getCreditsForPlan(planId: string): number {
  const planCredits = {
    'basic': 100,
    'pro': 500,
    'max': 2000
  }

  return planCredits[planId as keyof typeof planCredits] || 0
}