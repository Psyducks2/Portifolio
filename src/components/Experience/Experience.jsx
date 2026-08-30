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
      <div className="section-bg-num">03</div>
      <div className="container">
        <span className="section-tag">{t.experience.tag}</span>
        <h2 className="section-title">{t.experience.title}</h2>
        <p className="section-sub">{t.experience.subtitle}</p>

        <div className="exp-timeline">
          {t.experience.items.map((exp, index) => {
            const isAmber = exp.companyVariant === 'amber'
            return (
              <div
                className="exp-item"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className={`exp-dot${isAmber ? ' exp-dot--amber' : ''}`}>
                  <div className="exp-dot-inner" />
                </div>

                <div className="exp-card card spotlight-card">
                  <div className="exp-header">
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <div className={`exp-company${isAmber ? ' exp-company--amber' : ''}`}>
                        {exp.company}
                      </div>
                    </div>
                    <span className="exp-period">{exp.period}</span>
                  </div>

                  <ul className="exp-bullets">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="exp-tags">
                    {exp.tags.map((tag, tIdx) => (
                      <span className="skill-tag" key={tIdx}>{tag}</span>
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
