import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const LAWYER_NAME = "Корхмазян Сюзанна Сашиковна"
const LAWYER_PHONE = "+7 (927) 696-26-30"
const LAWYER_PHONE_HREF = "tel:+79276962630"
const OFFICE_ADDRESS = "г. Самара, ул. Ново-Садовая, 149А"

type Message = {
  id: number
  from: "user" | "lawyer"
  text: string
  time: string
}

const AUTO_REPLIES = [
  "Здравствуйте! Я получила ваш вопрос и готова помочь. Расскажите подробнее о ситуации — когда это произошло и какую сумму вы потеряли?",
  "Понимаю вашу ситуацию. Для подготовки заявления в полицию нам потребуются: номер телефона мошенника, дата и время звонка, данные о переводе (если был). Всё это есть?",
  "Хорошо. Также рекомендую сразу обратиться в банк с заявлением об опротестовании транзакции — шансы вернуть деньги выше в первые 24 часа. Я могу помочь составить такое заявление.",
  "Для более детальной консультации лучше встретиться лично или созвониться. Вы можете позвонить мне напрямую: +7 (927) 696-26-30. Также жду вас в офисе по адресу: г. Самара, ул. Ново-Садовая, 149А.",
]

function getTime() {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
}

export default function Lawyer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "lawyer",
      text: `Здравствуйте! Меня зовут ${LAWYER_NAME}. Я специализируюсь на делах, связанных с телефонным мошенничеством и киберпреступлениями. Задайте ваш вопрос — я отвечу в ближайшее время.`,
      time: getTime(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [replyIndex, setReplyIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), from: "user", text, time: getTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const reply = AUTO_REPLIES[replyIndex % AUTO_REPLIES.length]
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "lawyer", text: reply, time: getTime() },
      ])
      setReplyIndex((i) => i + 1)
    }, 1800 + Math.random() * 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/30 to-background" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p
            className={`text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Бесплатная консультация
          </p>
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-6 text-balance transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Онлайн-юрист
            <span className="block text-sage">по делам мошенников</span>
          </h1>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Напишите ваш вопрос прямо здесь — юрист поможет составить заявление, защитить права и вернуть деньги.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Lawyer Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile */}
            <div
              className={`border border-border bg-card p-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-sage/20 flex items-center justify-center mb-6">
                <Icon name="User" size={36} className="text-sage" />
              </div>
              <div className="mb-1">
                <span className="text-xs tracking-[0.25em] uppercase text-terracotta">Юрист</span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-foreground mb-1 leading-snug">
                {LAWYER_NAME}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Специализация: телефонное мошенничество, киберпреступления, защита прав потребителей
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                <span className="text-xs tracking-widest uppercase text-sage">Онлайн</span>
              </div>
            </div>

            {/* Contacts */}
            <div
              className={`border border-border bg-card p-8 space-y-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Контакты</p>
              <div className="flex items-start gap-4">
                <div className="text-sage mt-0.5 shrink-0">
                  <Icon name="Phone" size={18} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Телефон</p>
                  <a href={LAWYER_PHONE_HREF} className="text-foreground hover:text-sage transition-colors text-lg font-medium">
                    {LAWYER_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-sage mt-0.5 shrink-0">
                  <Icon name="MapPin" size={18} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Офис</p>
                  <p className="text-foreground leading-relaxed">Россия, {OFFICE_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-sage mt-0.5 shrink-0">
                  <Icon name="Clock" size={18} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Часы работы</p>
                  <p className="text-foreground">Пн–Пт: 9:00 – 18:00</p>
                  <p className="text-muted-foreground text-sm">Онлайн-чат: круглосуточно</p>
                </div>
              </div>
              <a
                href={LAWYER_PHONE_HREF}
                className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500"
              >
                <Icon name="Phone" size={16} />
                Позвонить
              </a>
            </div>

            {/* What can help */}
            <div
              className={`border border-border bg-card p-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-5">Помогу с</p>
              <ul className="space-y-3">
                {[
                  "Заявление в полицию",
                  "Претензия в банк",
                  "Возврат переведённых средств",
                  "Жалоба в Роскомнадзор",
                  "Защита персональных данных",
                  "Консультация по делу",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat */}
          <div
            className={`lg:col-span-8 flex flex-col border border-border transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ minHeight: "600px" }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-border bg-card">
              <div className="w-10 h-10 bg-sage/20 flex items-center justify-center shrink-0">
                <Icon name="User" size={20} className="text-sage" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{LAWYER_NAME}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  <span className="text-xs text-muted-foreground">Онлайн — обычно отвечает быстро</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-background" style={{ maxHeight: "460px" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "lawyer" && (
                    <div className="w-8 h-8 bg-sage/20 flex items-center justify-center shrink-0 mt-1">
                      <Icon name="User" size={14} className="text-sage" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-sage text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs text-muted-foreground px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-sage/20 flex items-center justify-center shrink-0 mt-1">
                    <Icon name="User" size={14} className="text-sage" />
                  </div>
                  <div className="bg-card border border-border px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card px-4 py-4">
              <div className="flex gap-3 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Напишите ваш вопрос юристу..."
                  rows={2}
                  className="flex-1 bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors resize-none text-sm leading-relaxed"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="px-5 py-3 bg-sage text-primary-foreground hover:bg-sage/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 self-end"
                  aria-label="Отправить"
                >
                  <Icon name="Send" size={18} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-1">
                Enter — отправить, Shift+Enter — новая строка
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Офис юриста</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              Россия, {OFFICE_ADDRESS}
            </h2>
          </div>
          <div className="border border-border overflow-hidden" style={{ height: "420px" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=50.192950%2C53.202269&z=16&pt=50.192950%2C53.202269,pm2rdm~&text=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0%2C+%D1%83%D0%BB.+%D0%9D%D0%BE%D0%B2%D0%BE-%D0%A1%D0%B0%D0%B4%D0%BE%D0%B2%D0%B0%D1%8F+149%D0%90&lang=ru_RU"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Офис юриста на карте"
              className="w-full h-full"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <a
              href="https://yandex.ru/maps/?text=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+%D1%83%D0%BB+%D0%9D%D0%BE%D0%B2%D0%BE-%D0%A1%D0%B0%D0%B4%D0%BE%D0%B2%D0%B0%D1%8F+149%D0%90"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="ExternalLink" size={14} />
              Открыть в Яндекс Картах
            </a>
            <a
              href={`https://2gis.ru/samara/search/%D0%9D%D0%BE%D0%B2%D0%BE-%D0%A1%D0%B0%D0%B4%D0%BE%D0%B2%D0%B0%D1%8F%20149%D0%90`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="ExternalLink" size={14} />
              Открыть в 2GIS
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
