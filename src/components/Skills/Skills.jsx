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
      <div className="section-bg-num">02</div>
      <div className="container">
        <span className="section-tag">{t.skills.tag}</span>
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-sub">{t.skills.subtitle}</p>

        {/* Skill Icons Showcase Banner */}
        <div className="skill-icons-banner" data-aos="zoom-in">
          <img
            src="https://skillicons.dev/icons?i=react,nextjs,ts,js,nodejs,express,kotlin,androidstudio&perline=8"
            alt="Skills Row 1"
            className="skill-icon-row"
          />
          <img
            src="https://skillicons.dev/icons?i=mysql,c,lua,aws,git,github,vscode,linux&perline=8"
            alt="Skills Row 2"
            className="skill-icon-row"
          />
        </div>

        {/* Categorized Skills Grid */}
        <div className="skills-grid">
          {t.skills.categories.map((category, index) => (
            <div
              className={`skill-card card spotlight-card${category.variant === 'amber' ? ' skill-card--amber' : ''}`}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 70}
            >
              <div className="skill-card-header">
                <div className={`skill-card-icon-wrap skill-card-icon--${category.variant}`}>
                  <SkillIcon id={category.icon} />
                </div>
                <h3 className="skill-card-title">{category.title}</h3>
              </div>

              <div className="skill-tags-cloud">
                {category.tags.map((tag, tagIndex) => (
                  <span
                    className={`skill-tag${tag.variant ? ` skill-tag--${tag.variant}` : ''}`}
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
  switch (id) {
    case 'frontend':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'backend':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    case 'mobile':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
        </svg>
      )
    case 'gamedev':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
      )
    case 'database':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      )
    case 'qa':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}

export default Skills
