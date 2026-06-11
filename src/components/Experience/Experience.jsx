import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './Experience.css'

const Experience = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const cleanup = initSpotlight()
    return () => cleanup()
  }, [])

  return (
    <section id="experience" className="experience section">
      <div className="section-bg-num">04</div>
      <div className="container">
        <span className="section-tag">{t.experience.tag}</span>
        <h2 className="section-title">{t.experience.title}</h2>
        <p className="section-sub">{t.experience.subtitle}</p>

        <div className="exp-timeline">
          {t.experience.items.map((exp, index) => {
            const amber = exp.companyVariant === 'amber'
            return (
              <div
                className="exp-item"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`exp-dot${amber ? ' amber' : ''}`}>
                  <div className="exp-dot-inner" />
                </div>
                <div className="exp-card card spotlight-card">
                  <div className="exp-header">
                    <h3 className="exp-role">{exp.role}</h3>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <div className={`exp-company${amber ? ' amber' : ''}`}>{exp.company}</div>
                  <ul className="exp-bullets">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="exp-tags">
                    {exp.tags.map((tag, tagIndex) => (
                      <span className="skill-tag" key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
