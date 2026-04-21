import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"
import { Link } from "react-router-dom"

const steps = [
  {
    number: "01",
    icon: "Phone",
    title: "Немедленно позвоните в банк",
    description: "Если вы успели перевести деньги или сообщить данные карты — немедленно звоните на горячую линию вашего банка (номер на обороте карты). Попросите заблокировать карту и отменить операцию. Действуйте максимально быстро — у вас есть лишь несколько минут.",
    highlight: "Номер Банка России: 8-800-200-78-18",
  },
  {
    number: "02",
    icon: "ShieldAlert",
    title: "Заблокируйте карты и счета",
    description: "Через мобильное приложение или по телефону заблокируйте все карты, данные которых вы могли сообщить. Смените пароли от интернет-банка, электронной почты и мобильного приложения банка. Сделайте это с другого устройства, если есть подозрение на заражение телефона.",
    highlight: null,
  },
  {
    number: "03",
    icon: "FileText",
    title: "Подайте заявление в полицию",
    description: "Обратитесь в ближайшее отделение полиции или подайте заявление онлайн через портал МВД России. Зафиксируйте все детали: номер звонившего, время звонка, сумму перевода, реквизиты получателя. Чем подробнее заявление — тем выше шансы вернуть деньги.",
    highlight: "Горячая линия МВД: 102",
  },
  {
    number: "04",
    icon: "Globe",
    title: "Сообщите в Роскомнадзор",
    description: "Если вас обманули через поддельный сайт — сообщите о нём в Роскомнадзор через форму на сайте eip.rkn.gov.ru. Это поможет заблокировать мошеннический ресурс и защитить других людей.",
    highlight: "Сайт: eip.rkn.gov.ru",
  },
  {
    number: "05",
    icon: "Users",
    title: "Обратитесь за юридической помощью",
    description: "В каждом регионе работают бесплатные юридические консультации. Также можно обратиться в Роспотребнадзор, если мошенничество связано с интернет-торговлей. Не оставайтесь с проблемой один на один.",
    highlight: null,
  },
]

const contacts = [
  { org: "МВД России", phone: "102", note: "Подача заявления о мошенничестве" },
  { org: "Банк России", phone: "8-800-200-78-18", note: "Если проблема с банком" },
  { org: "Роспотребнадзор", phone: "8-800-555-49-43", note: "Интернет-мошенничество" },
  { org: "Единый портал госуслуг", phone: "8-800-100-70-10", note: "Помощь по Госуслугам" },
]

export default function Victims() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 lg:px-12 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/30 to-background" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p
            className={`text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Если вы пострадали
          </p>
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-8 text-balance transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Что делать,
            <span className="block text-sage">если вас обманули</span>
          </h1>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Не паникуйте. Действуйте последовательно. Шансы вернуть деньги есть — особенно если вы действуете быстро.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone to-transparent animate-pulse" />
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group py-10 lg:py-14 border-t border-border last:border-b"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-8 lg:gap-12">
                <span className="font-serif text-4xl lg:text-5xl text-stone/50 group-hover:text-sage transition-colors duration-500 shrink-0">
                  {step.number}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-sage">
                      <Icon name={step.icon} size={24} />
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  {step.highlight && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 border border-sage/30 text-sage text-sm tracking-wide">
                      {step.highlight}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-sand/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-6">Куда обращаться</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Важные телефоны
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {contacts.map((c) => (
              <div key={c.org} className="bg-background p-8 lg:p-10 hover:bg-card transition-colors duration-300">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">{c.note}</p>
                <p className="font-serif text-xl text-foreground mb-2">{c.org}</p>
                <a href={`tel:${c.phone.replace(/-/g, "")}`} className="text-sage text-lg hover:text-sage/80 transition-colors">
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 bg-sage">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary-foreground mb-6">
            Изучите памятку, чтобы это не повторилось
          </h2>
          <p className="text-primary-foreground/80 mb-10 leading-relaxed">
            Прочитайте простые правила, которые помогут вам и вашим близким не стать жертвой в будущем.
          </p>
          <Link
            to="/memo"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-foreground text-sage text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-all duration-500"
          >
            Читать памятку
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
