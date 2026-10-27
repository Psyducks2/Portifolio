import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import { Globe, Smartphone, Zap, ShieldCheck, Cpu, BarChart3 } from 'lucide-react'
import './Services.css'

const Services = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const cleanup = initSpotlight()
    return () => cleanup()
  }, [])

  const renderServiceIcon = (iconKey) => {
    switch (iconKey) {
      case 'web':
        return <Globe size={26} />
      case 'automation':
        return <Cpu size={26} />
      case 'systems':
        return <Zap size={26} />
      case 'qa':
        return <ShieldCheck size={26} />
      case 'data':
        return <BarChart3 size={26} />
      case 'mobile':
        return <Smartphone size={26} />
      default:
        return <Globe size={26} />
    }
  }

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
                {renderServiceIcon(service.icon)}
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
