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
              <span className="ab-icon">🎓</span>
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
            <div className="about-action" style={{ marginTop: '28px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => window.dispatchEvent(new Event('open-affinity-quiz'))}
              >
                <span>🧠 {t.quiz.btnStart}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
