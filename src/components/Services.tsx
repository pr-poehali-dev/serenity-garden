import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

const services = [
  {
    title: "Звонки от «банка»",
    description: "Мошенники представляются сотрудниками банка или службы безопасности. Требуют срочно перевести деньги на «безопасный счёт» или назвать код из СМС. Настоящий банк никогда не просит это по телефону.",
    iconName: "Phone",
  },
  {
    title: "Фишинг и поддельные сайты",
    description: "Письма и сообщения с ссылками на сайты-двойники банков, госпорталов, магазинов. Цель — похитить логины, пароли и данные карты. Всегда проверяйте адрес сайта в браузере.",
    iconName: "Globe",
  },
  {
    title: "Звонки от «полиции» и «ФСБ»",
    description: "Запугивают уголовным делом, сообщают что вы «свидетель» или «подозреваемый». Давят на срочность и секретность. Настоящие сотрудники не требуют денег по телефону.",
    iconName: "Shield",
  },
  {
    title: "Мошенничество в соцсетях",
    description: "Взлом аккаунтов друзей и просьбы о помощи, фейковые розыгрыши и инвестиции. Всегда звоните другу напрямую, прежде чем переводить деньги по просьбе из мессенджера.",
    iconName: "MessageCircle",
  },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="signs" className="py-32 lg:py-40 px-6 lg:px-12 bg-sand/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p
            className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Популярные схемы
          </p>
          <h2
            className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Как вас могут обмануть
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group bg-background p-10 lg:p-14 transition-all duration-1000 hover:bg-card ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="text-sage mb-6 transition-transform duration-500 group-hover:scale-110">
                <Icon name={service.iconName} size={32} />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
