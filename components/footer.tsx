export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍌</span>
              <span className="text-lg font-bold">Big Banana</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              使用先进的 AI 技术通过简单的文本提示转换任何图像。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">产品</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#editor" className="hover:text-foreground transition-colors">
                  图像编辑器
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-foreground transition-colors">
                  展示
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  定价
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  文档
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  教程
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  支持
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">公司</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  博客
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  招聘
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Big Banana. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                服务条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
