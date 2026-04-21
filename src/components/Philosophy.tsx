import { useEffect, useRef, useState } from "react"

export function Philosophy() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="py-32 lg:py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div
            className={`relative aspect-[4/5] bg-sand overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-10 bg-gradient-to-br from-sand to-background">
              {[
                { icon: "📞", label: "Звонок от «банка»" },
                { icon: "🔗", label: "Фишинговая ссылка" },
                { icon: "💬", label: "Поддельный мессенджер" },
                { icon: "💳", label: "Кража данных карты" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 w-full max-w-xs px-6 py-4 bg-background/80 border border-border">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm tracking-wide text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            {/* Overlay accent */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-terracotta/80" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p
              className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Знай врага в лицо
            </p>

            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-foreground mb-8 text-balance transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              id="about"
            >
              Как работают
              <span className="italic"> мошенники</span>
            </h2>

            <div
              className={`space-y-6 text-muted-foreground leading-relaxed transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p>
                Телефонные мошенники используют психологическое давление: они представляются сотрудниками банков, 
                полиции или госорганов, создают искусственную панику и требуют немедленных действий — перевода денег, 
                сообщения кодов или установки приложений.
              </p>
              <p>
                Киберпреступники действуют через поддельные сайты, фишинговые письма и вредоносные ссылки.
                Их цель — похитить ваши <em className="text-foreground">личные данные</em> и получить доступ 
                к вашим <em className="text-foreground">банковским счетам</em>.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border transition-all duration-1000 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <p className="font-serif text-3xl md:text-4xl text-sage">1 млн+</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Жертв в год</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-sage">15 млрд</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Ущерб в рублях</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-sage">97%</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">Можно предотвратить</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}