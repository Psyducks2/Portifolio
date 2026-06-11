import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './Services.css'

const Services = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const cleanup = initSpotlight()
    return () => cleanup()
  }, [])

  const services = [
    {
      title: t.services.fullstack.title,
      description: t.services.fullstack.description,
      icon: '🌐'
    },
    {
      title: t.services.gamedev.title,
      description: t.services.gamedev.description,
      icon: '🎮'
    },
    {
      title: t.services.leadership.title,
      description: t.services.leadership.description,
      icon: '👨‍💼'
    },
    {
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      icon: '💡'
    }
  ]

  return (
    <section id="services" className="services section">
      <div className="section-bg-num">02</div>
      <div className="container">
        <h2 className="section-title">{t.services.title}</h2>
        <p className="section-subtitle">{t.services.subtitle}</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card card spotlight-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
