export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-4">
            <p className="font-serif text-2xl tracking-wide text-foreground mb-4">БезОпасно</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Защита от телефонного мошенничества и киберпреступности. Знание — лучшая защита.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Разделы</p>
            <nav className="flex flex-col gap-3">
              <a href="#about" className="text-sm text-foreground hover:text-sage transition-colors">
                О мошенниках
              </a>
              <a href="#signs" className="text-sm text-foreground hover:text-sage transition-colors">
                Схемы обмана
              </a>
              <a href="#rules" className="text-sm text-foreground hover:text-sage transition-colors">
                Правила защиты
              </a>
              <a href="#contact" className="text-sm text-foreground hover:text-sage transition-colors">
                Связаться
              </a>
            </nav>
          </div>

          {/* Pages */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Страницы</p>
            <nav className="flex flex-col gap-3">
              <a href="/victims" className="text-sm text-foreground hover:text-sage transition-colors">
                Пострадавшим
              </a>
              <a href="/memo" className="text-sm text-foreground hover:text-sage transition-colors">
                Памятка
              </a>
              <a href="/quiz" className="text-sm text-foreground hover:text-sage transition-colors">
                Тест
              </a>
            </nav>
          </div>

          {/* Help */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Помощь</p>
            <nav className="flex flex-col gap-3">
              <a href="tel:102" className="text-sm text-foreground hover:text-sage transition-colors">
                МВД: 102
              </a>
              <a href="tel:88002007818" className="text-sm text-foreground hover:text-sage transition-colors">
                Банк России: 8-800-200-78-18
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} БезОпасно. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">Защита начинается с осведомлённости</p>
        </div>
      </div>
    </footer>
  )
}