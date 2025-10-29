import { Metadata } from 'next'
import { PricingSection } from '@/components/pricing-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: '价格方案 - Big Banana AI 图像编辑器',
  description: '选择适合您需求的价格方案，享受强大的AI图像编辑功能',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <Header />
      <main className="pt-20">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}