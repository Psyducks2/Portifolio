import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './Skills.css'

const Skills = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const cleanup = initSpotlight()
    
    // Função para registrar interação com habilidades para a jornada de gamificação
    const recordSkillInteraction = () => {
      localStorage.setItem('portfolio_task_skills', 'true')
      window.dispatchEvent(new Event('portfolio_task_update'))
    }

    const cards = document.querySelectorAll('.skill-card')
    cards.forEach(card => card.addEventListener('mouseenter', recordSkillInteraction, { once: true }))

    return () => {
      cleanup()
      cards.forEach(card => card.removeEventListener('mouseenter', recordSkillInteraction))
    }
  }, [])

  return (
    <section id="skills" className="skills section">
      <div className="section-bg-num">03</div>
      <div className="container">
        <span className="section-tag">{t.skills.tag}</span>
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-sub">{t.skills.subtitle}</p>

        <div className="skills-grid">
          {t.skills.categories.map((category, index) => (
            <div
              className={`skill-card card spotlight-card${index === 0 ? ' skill-card--featured' : ''}`}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className={`skill-card-icon${category.variant === 'amber' ? ' amber' : ''}`}>
                <SkillIcon id={category.icon} />
              </div>
              <h3 className="skill-card-title">{category.title}</h3>
              <div className="skill-tags">
                {category.tags.map((tag, tagIndex) => (
                  <span
                    className={`skill-tag${tag.variant ? ` ${tag.variant}` : ''}`}
                    key={tagIndex}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SkillIcon = ({ id }) => {
  const icons = {
    frontend: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    backend: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    gamedev: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="4" /><path d="M6 12h4m-2-2v4" /><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="18" cy="13" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
    mgmt: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tools: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  }
  return icons[id] || (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export default Skills
