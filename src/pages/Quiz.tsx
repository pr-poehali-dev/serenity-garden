import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const questions = [
  {
    id: 1,
    scenario: "Вам звонит незнакомый номер. Голос представляется сотрудником службы безопасности вашего банка и говорит: «С вашего счёта прямо сейчас пытаются вывести деньги. Чтобы их сохранить, немедленно переведите все средства на наш защищённый счёт». Ваши действия?",
    options: [
      { text: "Поблагодарю и переведу деньги — надо спасать накопления", correct: false, explanation: "Это классическая схема! Банк никогда не просит переводить деньги на «защищённый счёт». Это счёт мошенника." },
      { text: "Попрошу время подумать и перезвоню позже", correct: false, explanation: "Почти правильно, но лучше прервать звонок и самостоятельно позвонить в банк по номеру с карты — мошенники могут перезвонить." },
      { text: "Положу трубку и сам перезвоню в банк по номеру на карте", correct: true, explanation: "Правильно! Прервите контакт и сами инициируйте звонок по официальному номеру банка с оборота вашей карты." },
      { text: "Попрошу назвать мои данные для подтверждения личности", correct: false, explanation: "Мошенники могут знать ваши данные из утечек. Это не поможет разоблачить их и только затянет вас в ловушку." },
    ],
  },
  {
    id: 2,
    scenario: "Вам пришло SMS: «Ваша карта заблокирована. Перейдите по ссылке для разблокировки: sberbank-secure-unlock.ru». Что сделаете?",
    options: [
      { text: "Перейду по ссылке и введу данные карты для разблокировки", correct: false, explanation: "Это фишинговый сайт! Мошенники создают копии сайтов банков. Никогда не вводите данные карты по ссылке из SMS." },
      { text: "Не буду переходить — позвоню в банк по номеру на карте", correct: true, explanation: "Отлично! Официальные уведомления банка не содержат подобных ссылок. Всегда проверяйте статус карты через официальное приложение." },
      { text: "Перешлю ссылку другу, чтобы он проверил", correct: false, explanation: "Так вы подвергаете опасности и друга. Никогда не пересылайте подозрительные ссылки." },
      { text: "Напишу в чат-поддержку банка прямо в SMS-приложении", correct: false, explanation: "В SMS нет чат-поддержки. Используйте только официальное приложение банка или звоните на номер с карты." },
    ],
  },
  {
    id: 3,
    scenario: "Вашему другу взломали аккаунт в ВКонтакте. С его страницы пришло сообщение: «Привет! Попал в трудную ситуацию, одолжи 5000 рублей до завтра, верну с процентами. Скинь на карту 1234 5678 9012 3456». Что сделаете?",
    options: [
      { text: "Переведу деньги — это же мой друг, ему нужна помощь", correct: false, explanation: "Аккаунт взломан мошенниками. Они используют доверие к друзьям. Никогда не переводите деньги не убедившись лично." },
      { text: "Позвоню другу на телефон и уточню, правда ли это он", correct: true, explanation: "Именно! Всегда проверяйте по другому каналу — позвоните напрямую на телефон, прежде чем переводить деньги." },
      { text: "Напишу в том же чате дополнительные вопросы для проверки", correct: false, explanation: "Мошенник может ответить на вопросы, используя информацию со страницы вашего друга. Только звонок на телефон даст уверенность." },
      { text: "Переведу небольшую сумму — чтобы проверить", correct: false, explanation: "Любая сумма — это потеря. Мошенники рассчитывают именно на такую логику." },
    ],
  },
  {
    id: 4,
    scenario: "Вам звонит человек, представляется следователем МВД: «Мы ведём расследование. Ваш счёт использовался мошенниками. Чтобы снять с вас подозрения, вам нужно снять наличные и передать их нашему сотруднику для проверки. Никому не говорите об этом звонке». Ваши действия?",
    options: [
      { text: "Соглашусь — раз это полиция, нужно помочь следствию", correct: false, explanation: "Полиция никогда не просит передавать наличные «сотрудникам» и не требует хранить это в секрете. Это мошенничество." },
      { text: "Попрошу официальную повестку по почте", correct: false, explanation: "Лучше, но мошенник начнёт давить и убеждать. Правильнее просто прервать звонок." },
      { text: "Положу трубку и позвоню на горячую линию МВД 102", correct: true, explanation: "Верно! Настоящие следователи работают официально — через повестки, а не звонки с просьбами передать наличные." },
      { text: "Расскажу всё родственникам и попрошу совета", correct: false, explanation: "Правильно рассказать близким, но не тратить время на обсуждение — нужно сразу звонить в МВД по номеру 102." },
    ],
  },
  {
    id: 5,
    scenario: "В социальной сети вам пишет незнакомец: «Поздравляем! Вы выиграли iPhone 15. Для получения приза оплатите доставку 500 рублей и пришлите копию паспорта». Что сделаете?",
    options: [
      { text: "Оплачу доставку — 500 рублей не жалко за iPhone", correct: false, explanation: "Никакого iPhone нет. После оплаты мошенники исчезнут или потребуют ещё денег. А данные паспорта могут использовать для кредитов." },
      { text: "Попрошу сначала показать доказательства розыгрыша", correct: false, explanation: "Мошенники легко присылают поддельные «доказательства». Сам факт «розыгрыша» от незнакомца — это красный флаг." },
      { text: "Проигнорирую и заблокирую — это очевидный развод", correct: true, explanation: "Абсолютно правильно! В настоящих розыгрышах не просят платить за доставку и присылать паспорт незнакомцам." },
      { text: "Пришлю только деньги, без паспорта — так безопаснее", correct: false, explanation: "Деньги тоже потеряете. Никогда не платите незнакомцам за «выигрыши»." },
    ],
  },
]

const getResult = (score: number) => {
  if (score === 5) return {
    title: "Отлично! Вас не проведёшь",
    desc: "Вы хорошо разбираетесь в схемах мошенников и знаете как реагировать. Поделитесь этим тестом с близкими — помогите им тоже защититься.",
    color: "bg-sage",
    icon: "ShieldCheck",
  }
  if (score >= 3) return {
    title: "Хороший результат, но есть над чем подумать",
    desc: "Вы знаете основные схемы, но в некоторых ситуациях можете ошибиться. Прочитайте памятку — она поможет закрепить знания.",
    color: "bg-stone/60",
    icon: "Shield",
  }
  return {
    title: "Осторожно — вы в зоне риска",
    desc: "Мошенники умеют давить на эмоции и создавать панику. Изучите памятку и правила — это может спасти ваши деньги.",
    color: "bg-terracotta",
    icon: "ShieldAlert",
  }
}

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  const question = questions[current]

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const correct = question.options[idx].correct
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => [...prev, correct])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }

  const result = getResult(score)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center px-6 lg:px-12 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/30 to-background" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Проверь себя</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-[1.1] text-foreground mb-6">
            Распознаешь ли ты
            <span className="block text-sage">мошенника?</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            5 реальных сценариев. Как бы вы поступили?
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {!finished ? (
            <div>
              {/* Progress */}
              <div className="flex items-center gap-4 mb-12">
                <div className="flex gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-8 transition-all duration-500 ${
                        i < current ? "bg-sage" :
                        i === current ? "bg-terracotta" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  {current + 1} / {questions.length}
                </span>
              </div>

              {/* Question */}
              <div className="mb-10">
                <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-4">Ситуация {current + 1}</p>
                <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">
                  {question.scenario}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((opt, idx) => {
                  let cls = "w-full text-left px-6 py-5 border border-border text-foreground leading-relaxed transition-all duration-300 hover:border-sage hover:bg-card"
                  if (answered && idx === selected) {
                    cls = opt.correct
                      ? "w-full text-left px-6 py-5 border border-sage bg-sage/10 text-foreground leading-relaxed"
                      : "w-full text-left px-6 py-5 border border-terracotta bg-terracotta/10 text-foreground leading-relaxed"
                  } else if (answered && opt.correct) {
                    cls = "w-full text-left px-6 py-5 border border-sage bg-sage/5 text-foreground leading-relaxed"
                  }
                  return (
                    <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-lg text-muted-foreground shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {answered && selected !== null && (
                <div className={`px-6 py-5 mb-8 border ${question.options[selected].correct ? "border-sage/30 bg-sage/5" : "border-terracotta/30 bg-terracotta/5"}`}>
                  <div className="flex items-start gap-3">
                    <div className={question.options[selected].correct ? "text-sage" : "text-terracotta"}>
                      <Icon name={question.options[selected].correct ? "CheckCircle" : "XCircle"} size={20} />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {question.options[selected].explanation}
                    </p>
                  </div>
                </div>
              )}

              {answered && (
                <button
                  onClick={handleNext}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500"
                >
                  {current + 1 >= questions.length ? "Посмотреть результат" : "Следующий вопрос"}
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            /* Result */
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 ${result.color} mb-10 mx-auto`}>
                <div className="text-primary-foreground">
                  <Icon name={result.icon} size={40} />
                </div>
              </div>

              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Ваш результат: {score} из {questions.length}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
                {result.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
                {result.desc}
              </p>

              {/* Answer summary */}
              <div className="flex justify-center gap-3 mb-12">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center text-sm ${correct ? "bg-sage text-primary-foreground" : "bg-terracotta text-primary-foreground"}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500"
                >
                  Пройти ещё раз
                </button>
                <Link
                  to="/memo"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-border text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-500"
                >
                  Читать памятку
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
