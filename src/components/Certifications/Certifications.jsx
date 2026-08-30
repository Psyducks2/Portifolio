import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './Certifications.css'

const Certifications = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const cleanup = initSpotlight()
    
    // Register interaction with certifications section for visitor journey
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          localStorage.setItem('portfolio_task_certs', 'true')
          window.dispatchEvent(new Event('portfolio_task_update'))
          observer.disconnect()
        }
      })
    }, { threshold: 0.25 })

    const el = document.getElementById('certifications')
    if (el) observer.observe(el)

    return () => {
      cleanup()
      observer.disconnect()
    }
  }, [])

  return (
    <section id="certifications" className="certifications section">
      <div className="section-bg-num">06</div>
      <div className="container">
        <span className="section-tag">{t.certifications.tag}</span>
        <h2 className="section-title">{t.certifications.title}</h2>
        <p className="section-sub">{t.certifications.subtitle}</p>

        {/* Academic Degree Highlight Card */}
        <div className="education-banner card spotlight-card" data-aos="fade-up">
          <div className="edu-icon-wrap">
            <span className="edu-icon">🎓</span>
          </div>
          <div className="edu-content">
            <div className="edu-badge-row">
              <span className="edu-status-pill">{t.certifications.education.status}</span>
              <span className="edu-period-text">{t.certifications.education.period}</span>
            </div>
            <h3 className="edu-course-title">{t.certifications.education.course}</h3>
            <h4 className="edu-institution-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/>
              </svg>
              {t.certifications.education.institution}
            </h4>
            <p className="edu-details-text">{t.certifications.education.details}</p>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="certs-grid">
          {t.certifications.items.map((cert, index) => (
            <div
              key={index}
              className="cert-card card spotlight-card"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="cert-card-header">
                <div className="cert-badge-pill" style={{ borderColor: `${cert.color}60`, color: cert.color }}>
                  {cert.badge}
                </div>
                <div className="cert-issuer-name">{cert.issuer}</div>
              </div>
              
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.desc}</p>
              
              <div className="cert-card-footer">
                <div className="cert-verified-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: cert.color }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{language === 'pt' ? 'Certificação Verificada' : 'Verified Credential'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
