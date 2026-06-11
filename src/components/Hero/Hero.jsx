import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Hero.css'

const Hero = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const getGreeting = () => {
    const hours = new Date().getHours()
    if (hours >= 5 && hours < 12) return t.hero.greetingMorning
    if (hours >= 12 && hours < 18) return t.hero.greetingAfternoon
    return t.hero.greetingEvening
  }

  const [firstName, ...rest] = t.hero.name.split(' ')
  const lastName = rest.join(' ')
  const [titleBefore, titleAfter] = t.hero.title.split(t.hero.titleHighlight)

  return (
    <section id="hero" className="hero section">
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-glow-amber" aria-hidden="true"></div>

      <div className="hero-float" aria-hidden="true">
        <div className="hero-float-bar">
          <span className="hf-dot hf-dot--red" />
          <span className="hf-dot hf-dot--yellow" />
          <span className="hf-dot hf-dot--green" />
          <span className="hf-filename">developer.ts</span>
        </div>
        <div className="hero-float-body">
          <div className="hf-line">
            <span className="hf-kw">const</span>{' '}
            <span className="hf-var">luis</span>{' '}
            <span className="hf-op">=</span>{' '}
            <span className="hf-brace">{'{'}</span>
          </div>
          <div className="hf-line hf-indent">
            <span className="hf-key">role</span>
            <span className="hf-op">:</span>{' '}
            <span className="hf-str">"Tech Lead"</span><span className="hf-punct">,</span>
          </div>
          <div className="hf-line hf-indent">
            <span className="hf-key">stack</span>
            <span className="hf-op">:</span>{' '}
            <span className="hf-brace">[</span>
            <span className="hf-str">"React"</span>
            <span className="hf-punct">, </span>
            <span className="hf-str">"Node"</span>
            <span className="hf-punct">, </span>
            <span className="hf-str">"Lua"</span>
            <span className="hf-brace">]</span><span className="hf-punct">,</span>
          </div>
          <div className="hf-line hf-indent">
            <span className="hf-key">available</span>
            <span className="hf-op">:</span>{' '}
            <span className="hf-bool">true</span>
          </div>
          <div className="hf-line">
            <span className="hf-brace">{'}'}</span>
          </div>
        </div>
      </div>

      <div className="container hero-content">
        <span className="eyebrow">{t.hero.eyebrow}</span>

        <p className="hero-greeting">{getGreeting()}</p>
        <h1 className="hero-name">
          <span className="hero-name-first">{firstName}</span>
          <br />
          <span className="hero-name-last">{lastName}</span>
        </h1>

        <h2 className="hero-title">
          {titleBefore}<strong>{t.hero.titleHighlight}</strong>{titleAfter}
        </h2>

        <p className="hero-desc">{t.hero.desc}</p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary" onClick={scrollToProjects}>
            <span>{t.hero.btnProjects}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-secondary">
            {t.hero.btnContact}
          </a>
        </div>

        <div className="hero-stats">
          {t.hero.stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <span className="stat-num">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
