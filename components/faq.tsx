import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "什么是 Big Banana？",
    answer:
      "Big Banana 是一个先进的 AI 驱动图像编辑平台，允许您使用简单的文本提示转换任何图像。我们的模型提供一致的角色编辑和场景保护，超越其他解决方案。",
  },
  {
    question: "AI 图像编辑如何工作？",
    answer:
      "只需上传您的图像并用自然语言描述您想要的更改。我们的 AI 模型能理解上下文，保持一致性，并在几秒钟内生成高质量的编辑结果。",
  },
  {
    question: "支持哪些文件格式？",
    answer:
      "我们支持所有常见的图像格式，包括 JPG、PNG、WebP 等。每个图像的最大文件大小为 50MB。",
  },
  {
    question: "我可以一次编辑多个图像吗？",
    answer:
      "是的！我们的批处理功能允许您同时编辑多个图像，同时保持所有图像的一致性。",
  },
  {
    question: "有免费试用吗？",
    answer:
      "是的，我们提供有限额度的免费试用，让您在承诺付费计划之前体验 Big Banana 的强大功能。",
  },
  {
    question: "处理图像需要多长时间？",
    answer:
      "大多数图像只需几秒钟即可处理完成。复杂的编辑可能需要稍长时间，但我们优化的处理流程确保快速的结果。",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">常见问题</h2>
          <p className="text-lg text-muted-foreground text-balance">关于 Big Banana 您需要了解的一切</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
