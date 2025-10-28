import { Card } from "@/components/ui/card"

const showcaseItems = [
  {
    title: "人像增强",
    description: "用自然光线和专业质量转换人像",
    image: "/professional-portrait-with-natural-lighting.jpg",
  },
  {
    title: "场景转换",
    description: "在保持主体一致性的同时改变环境",
    image: "/person-in-futuristic-city-scene.jpg",
  },
  {
    title: "风格转换",
    description: "在保持原始构图的同时应用艺术风格",
    image: "/artistic-style-transfer-painting.jpg",
  },
  {
    title: "对象编辑",
    description: "使用 AI 精度无缝添加或删除对象",
    image: "/seamless-object-editing-in-photo.jpg",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">展示画廊</h2>
          <p className="text-lg text-muted-foreground text-balance">
            看看 Big Banana 的 AI 驱动图像编辑能做什么
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
