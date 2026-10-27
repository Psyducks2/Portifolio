import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { Sparkles, Terminal, FileText } from 'lucide-react'
import './Hero.css'

const Hero = ({ onOpenTerminal, onOpenQuiz }) => {
  const { language } = useLanguage()
  const t = strings[language]

  const getGreeting = () => {
    const hours = new Date().getHours()
    if (hours >= 5 && hours < 12) return t.hero.greetingMorning
    if (hours >= 12 && hours < 18) return t.hero.greetingAfternoon
    return t.hero.greetingEvening
  }

  const [firstName, ...rest] = t.hero.name.split(' ')
  const lastName = rest.join(' ')
  const [roleBefore, roleAfter] = t.hero.role.split(t.hero.roleHighlight)

  return (
    <section id="hero" className="hero section">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <div className="hero-glow hero-glow--blue" aria-hidden="true"></div>
      <div className="hero-glow hero-glow--amber" aria-hidden="true"></div>

      <div className="container hero-container">
        {/* Left Column: Text & CTAs */}
        <div className="hero-left" data-aos="fade-right">
          <div className="hero-eyebrow-badge">
            <span className="live-dot"></span>
            <span>{t.hero.eyebrow}</span>
          </div>

          <p className="hero-greeting">{getGreeting()}</p>
          
          <h1 className="hero-name">
            <span className="hero-name-first">{firstName}</span>{' '}
            <span className="hero-name-last text-gradient">{lastName}</span>
          </h1>

          <h2 className="hero-role">
            {roleBefore}
            <span className="text-highlight">{t.hero.roleHighlight}</span>
            {roleAfter}
          </h2>

          <p className="hero-desc">{t.hero.desc}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>{t.hero.btnProjects}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            
            <a
              href="/curriculo.pdf"
              download="Luis_Roberto_Curriculo.pdf"
              className="btn btn-secondary"
            >
              <FileText size={16} />
              <span>{t.hero.btnCV}</span>
            </a>

            <a href="#contact" className="btn btn-secondary">
              {t.hero.btnContact}
            </a>

            {/* Quick interactive buttons */}
            <button
              onClick={onOpenTerminal}
              className="btn btn-icon-ghost"
              title="Abrir Terminal CLI"
              aria-label="Abrir Terminal CLI"
            >
              <Terminal size={16} />
              <span>CLI</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="btn btn-icon-ghost"
              title="Teste de Afinidade de Stack"
              aria-label="Teste de Afinidade de Stack"
            >
              <Sparkles size={16} />
              <span>Quiz</span>
            </button>
          </div>

          <div className="hero-stats-row">
            {t.hero.stats.map((stat, idx) => (
              <div className="hero-stat-card" key={idx}>
                <span className="h-stat-num">{stat.value}</span>
                <span className="h-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Code Bento / Window */}
        <div className="hero-right" data-aos="fade-left">
          <div className="code-window card spotlight-card">
            <div className="code-window-bar">
              <div className="window-dots">
                <span className="w-dot w-dot--red" />
                <span className="w-dot w-dot--yellow" />
                <span className="w-dot w-dot--green" />
              </div>
              <div className="window-filename">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>luis_architect.ts</span>
              </div>
              <div className="window-action">
                <span className="window-lang">TypeScript</span>
              </div>
            </div>

            <div className="code-window-body">
              <pre>
                <code>
                  <span className="c-kw">interface</span> <span className="c-type">EngineerProfile</span> <span className="c-brace">{'{'}</span>{'\n'}
                  {'  '}name: <span className="c-str">'Luis Roberto'</span>;{'\n'}
                  {'  '}role: <span className="c-str">'Full Stack & Analista'</span>;{'\n'}
                  {'  '}location: <span className="c-str">'Manaus, AM - Brasil'</span>;{'\n'}
                  {'  '}education: <span className="c-str">'ADS @ FAMETRO (2025-2027)'</span>;{'\n'}
                  {'  '}primaryStacks: <span className="c-type">string</span>[];{'\n'}
                  {'  '}automations_BI: <span className="c-type">string</span>[];{'\n'}
                  {'  '}highConcurrency: <span className="c-type">string</span>[];{'\n'}
                  {'  '}openToWork: <span className="c-bool">boolean</span>;{'\n'}
                  <span className="c-brace">{'}'}</span>{'\n\n'}
                  <span className="c-kw">export const</span> <span className="c-var">luisProfile</span>: <span className="c-type">EngineerProfile</span> = <span className="c-brace">{'{'}</span>{'\n'}
                  {'  '}name: <span className="c-str">'Luis Roberto'</span>,{'\n'}
                  {'  '}role: <span className="c-str">'Full Stack & Analista'</span>,{'\n'}
                  {'  '}location: <span className="c-str">'Manaus / AM'</span>,{'\n'}
                  {'  '}education: <span className="c-str">'ADS FAMETRO'</span>,{'\n'}
                  {'  '}primaryStacks: [<span className="c-str">'React'</span>, <span className="c-str">'Next.js'</span>, <span className="c-str">'Node.js'</span>, <span className="c-str">'TypeScript'</span>],{'\n'}
                  {'  '}automations_BI: [<span className="c-str">'N8N'</span>, <span className="c-str">'Typebot'</span>, <span className="c-str">'WhatsApp API'</span>, <span className="c-str">'Power BI'</span>],{'\n'}
                  {'  '}highConcurrency: [<span className="c-str">'Lua (4+ anos)'</span>, <span className="c-str">'RedM (450+ players)'</span>, <span className="c-str">'FiveM'</span>],{'\n'}
                  {'  '}openToWork: <span className="c-bool">true</span>{'\n'}
                  <span className="c-brace">{'}'}</span>;
                </code>
              </pre>
            </div>

            <div className="code-window-footer">
              <div className="code-status">
                <span className="status-indicator"></span>
                <span>Ready for compilation · 0 errors · 0 warnings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
