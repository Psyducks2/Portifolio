import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Stats.css'

const Stats = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const stats = [
    {
      value: t.stats.clients.value,
      label: t.stats.clients.label,
      icon: '👥'
    },
    {
      value: t.stats.experience.value,
      label: t.stats.experience.label,
      icon: '💻'
    },
    {
      value: t.stats.projects.value,
      label: t.stats.projects.label,
      icon: '🚀'
    },
    {
      value: t.stats.technologies.value,
      label: t.stats.technologies.label,
      icon: '⚡'
    }
  ]

  return (
    <section id="stats" className="stats section">
      <div className="container">
        <h2 className="section-title">{t.stats.title}</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card card" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
