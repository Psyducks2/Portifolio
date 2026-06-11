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
                <span>{category.icon}</span>
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

export default Skills
