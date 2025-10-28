"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AuthGuard } from "@/components/auth-guard"
import { toast } from "sonner"

export function Editor() {
  const [prompt, setPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generatedText, setGeneratedText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast.error("请先上传图片")
      return
    }

    if (!prompt.trim()) {
      toast.error("请输入提示词")
      return
    }

    setIsLoading(true)
    setGeneratedImage(null)
    setGeneratedText(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          prompt: prompt,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成失败')
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
      }
      if (data.text) {
        setGeneratedText(data.text)
      }
      toast.success("生成成功！")
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : '生成失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard>
      <section id="editor" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">体验 AI 编辑器</h2>
          <p className="text-lg text-muted-foreground text-balance">
            体验 Big Banana 自然语言图像编辑的强大功能。用简单的文本命令转换任何照片
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 border-2 border-primary/20">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                提示引擎
              </h3>
              <p className="text-sm text-muted-foreground mb-4">使用 AI 驱动的编辑功能转换您的图像</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">参考图像</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                          className="h-8 w-8 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm text-muted-foreground">添加图像</span>
                        <span className="text-xs text-muted-foreground">最大 50MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">主要提示</label>
                <Textarea
                  placeholder="一个由纳米技术驱动的未来城市，黄金时刻的光线，极致细节..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    生成中...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    立即生成
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-2 border-border">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">输出画廊</h3>
              <p className="text-sm text-muted-foreground">您的超快 AI 创作会立即出现在这里</p>
            </div>

            <div className="flex items-center justify-center min-h-[400px] bg-muted/30 rounded-lg border-2 border-dashed border-border p-6">
              {isLoading ? (
                <div className="text-center">
                  <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <svg className="h-8 w-8 text-muted-foreground animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">正在生成中...</h4>
                  <p className="text-sm text-muted-foreground">AI 正在处理您的图片</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full space-y-4">
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="w-full h-auto rounded-lg border border-border"
                  />
                  {generatedText && (
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-sm whitespace-pre-wrap">{generatedText}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">准备好即时生成</h4>
                  <p className="text-sm text-muted-foreground">输入您的提示，释放强大力量</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
    </AuthGuard>
  )
}
