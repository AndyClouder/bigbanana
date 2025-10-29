"use client"

import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // 智能导航函数
  const handleNavigation = (sectionId: string) => {
    // 关闭移动菜单
    setMobileMenuOpen(false)

    if (pathname === '/') {
      // 在首页时，使用锚点跳转
      const element = document.getElementById(sectionId.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // 在其他页面时，跳转到首页并带上锚点
      window.location.href = `/${sectionId}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <span className="text-xl font-bold text-foreground">Big Banana</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavigation('#editor')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            图像编辑器
          </button>
          <button
            onClick={() => handleNavigation('#showcase')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            作品展示
          </button>
          <a
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            价格方案
          </a>
          <button
            onClick={() => handleNavigation('#faq')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            常见问题
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <UserMenu />
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container flex flex-col gap-4 py-4">
            <button
              onClick={() => handleNavigation('#editor')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              图像编辑器
            </button>
            <button
              onClick={() => handleNavigation('#showcase')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              作品展示
            </button>
            <a
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              价格方案
            </a>
            <button
              onClick={() => handleNavigation('#faq')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              常见问题
            </button>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-center">
                <UserMenu />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
