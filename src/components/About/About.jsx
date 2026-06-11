import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './About.css'

const About = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          localStorage.setItem('portfolio_task_about', 'true')
          window.dispatchEvent(new Event('portfolio_task_update'))
          observer.disconnect()
        }
      })
    }, { threshold: 0.25 })

    const el = document.getElementById('about')
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about section">
      <div className="section-bg-num">01</div>
      <div className="container">
        <span className="section-tag">{t.about.tag}</span>
        <h2 className="section-title">{t.about.title}</h2>

        <div className="about-grid">
          <div className="about-visual" data-aos="fade-right">
            <div className="about-avatar-ring" aria-hidden="true"></div>
            <div className="about-avatar" aria-label="LR"></div>
            <div className="about-badge about-badge--1">
              <span className="ab-dot" />
              <span className="ab-text">Disponível</span>
            </div>
            <div className="about-badge about-badge--2">
              <span className="ab-icon">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </span>
              <span className="ab-text">ADS</span>
            </div>
          </div>

          <div className="about-text" data-aos="fade-left">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
            <div className="about-chips">
              {t.about.chips.map((chip, index) => (
                <span className="chip" key={index}>{chip}</span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
