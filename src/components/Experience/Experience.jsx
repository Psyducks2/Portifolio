import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Experience.css'

const Experience = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const experiences = [
    {
      title: t.experience.arrowlab.title,
      company: t.experience.arrowlab.company,
      period: t.experience.arrowlab.period,
      description: t.experience.arrowlab.description
    },
    {
      title: t.experience.freelancer.title,
      company: t.experience.freelancer.company,
      period: t.experience.freelancer.period,
      description: t.experience.freelancer.description
    }
  ]

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <h2 className="section-title">{t.experience.title}</h2>
        <p className="section-subtitle">{t.experience.subtitle}</p>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item" data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="experience-dot"></div>
              <div className="experience-content card">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <div className="experience-company">{exp.company}</div>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
