import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"
import { Link } from "react-router-dom"

const rules = [
  {
    category: "По телефону",
    icon: "PhoneOff",
    color: "text-terracotta",
    items: [
      "Никогда не называйте SMS-коды — ни банку, ни «полиции»",
      "Банк не просит переводить деньги на «безопасный счёт»",
      "Положите трубку и перезвоните сами по номеру с карты",
      "Не принимайте решений под давлением и спешкой",
      "«Ваш родственник попал в беду» — стандартный сценарий обмана",
    ],
  },
  {
    category: "В интернете",
    icon: "ShieldOff",
    color: "text-sage",
    items: [
      "Проверяйте адрес сайта — мошенники копируют дизайн банков",
      "Не переходите по ссылкам из SMS и мессенджеров",
      "Не скачивайте приложения по просьбе незнакомцев",
      "Используйте разные пароли для важных сервисов",
      "Включите двухфакторную аутентификацию везде, где это возможно",
    ],
  },
  {
    category: "В мессенджерах",
    icon: "MessageSquareOff",
    color: "text-stone",
    items: [
      "Взломали аккаунт друга — позвоните ему напрямую",
      "Не переводите деньги по просьбе «друзей» в переписке",
      "Не участвуйте в «инвестициях» и «розыгрышах» в соцсетях",
      "Незнакомый пишет первым — повод для осторожности",
      "Никаких предоплат за «призы» и «выигрыши»",
    ],
  },
  {
    category: "Защита данных",
    icon: "Lock",
    color: "text-sage",
    items: [
      "Не фотографируйте и не пересылайте данные паспорта",
      "CVV-код на карте — никому и никогда",
      "Не сообщайте дату рождения в сочетании с ФИО незнакомцам",
      "СНИЛС и ИНН — конфиденциальные данные",
      "Регулярно проверяйте выписки по карте",
    ],
  },
]

const redFlags = [
  { text: "Вас торопят и не дают времени подумать", icon: "Clock" },
  { text: "Просят сохранить разговор в тайне", icon: "EyeOff" },
  { text: "Говорят что ваши деньги «уже переводят»", icon: "AlertTriangle" },
  { text: "Номер не совпадает с официальным", icon: "PhoneCall" },
  { text: "Просят установить стороннее приложение", icon: "Download" },
  { text: "Предлагают перевести деньги «для сохранности»", icon: "ArrowRightLeft" },
]

export default function Memo() {
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
            Ваша защита
          </p>
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-8 text-balance transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Памятка
            <span className="block text-sage">по безопасности</span>
          </h1>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Простые правила, которые нужно знать каждому. Распечатайте и поделитесь с близкими.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone to-transparent animate-pulse" />
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-terracotta/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-6">Сигналы опасности</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Стоп — это мошенники
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Если вы слышите или видите хотя бы одно из этого — немедленно прекратите контакт
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {redFlags.map((flag) => (
              <div key={flag.text} className="bg-background p-8 flex items-start gap-4 hover:bg-card transition-colors duration-300">
                <div className="text-terracotta shrink-0 mt-1">
                  <Icon name={flag.icon} size={20} />
                </div>
                <p className="text-foreground leading-relaxed">{flag.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-6">Правила защиты</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Что нужно знать
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {rules.map((rule) => (
              <div key={rule.category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={rule.color}>
                    <Icon name={rule.icon} size={28} />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">{rule.category}</h3>
                </div>
                <ul className="space-y-4">
                  {rule.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main rule */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-sage">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <svg className="w-16 h-16 mx-auto text-primary-foreground/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-primary-foreground leading-relaxed mb-10">
            Главное правило: положите трубку, закройте сайт, остановитесь. Ни один настоящий банк и ни одна настоящая служба безопасности не требует немедленных действий.
          </blockquote>
          <p className="text-sm tracking-widest uppercase text-primary-foreground/80">Запомните и передайте близким</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">
            Всё равно попали в ловушку?
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Это случается даже с осторожными людьми. Узнайте, что делать дальше — есть конкретные шаги, которые помогут.
          </p>
          <Link
            to="/victims"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500"
          >
            Инструкция для пострадавших
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
