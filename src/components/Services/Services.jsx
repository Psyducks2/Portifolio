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

  return (
    <section id="services" className="services section">
      <div className="section-bg-num">07</div>
      <div className="container">
        <span className="section-tag">{t.services.tag}</span>
        <h2 className="section-title">{t.services.title}</h2>
        <p className="section-sub">{t.services.subtitle}</p>

        <div className="services-grid">
          {t.services.items.map((service, index) => (
            <div
              key={index}
              className="service-card card spotlight-card"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="service-icon-wrap">
                <span className="service-icon-emoji">{service.icon}</span>
              </div>
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
