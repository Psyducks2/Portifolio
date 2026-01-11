import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Hero.css'

const Hero = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-image-wrapper">
            <div className="hero-image-placeholder">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="100" fill="rgba(59, 130, 246, 0.2)"/>
                <circle cx="100" cy="80" r="30" fill="rgba(251, 251, 251, 0.9)"/>
                <path d="M40 160 Q100 140 160 160" stroke="rgba(251, 251, 251, 0.9)" strokeWidth="20" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-greeting">{t.hero.greeting}</h1>
            <h2 className="hero-name">{t.hero.name}</h2>
            <h3 className="hero-title">{t.hero.title}</h3>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={scrollToProjects}>
                {t.hero.btnProjects}
              </button>
              <a 
                href="https://www.linkedin.com/in/luis-roberto-4aa69b30a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t.hero.btnLinkedIn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
