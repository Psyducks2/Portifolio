import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import { GraduationCap, Award, CheckCircle } from 'lucide-react'
import './Certifications.css'

const Certifications = () => {
  const { language } = useLanguage()
  const t = strings[language]
  const [activeFilter, setActiveFilter] = useState('all')

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
  }, [activeFilter])

  const filters = [
    { id: 'all', label: t.certifications.filterAll },
    { id: 'ai', label: t.certifications.filterAi },
    { id: 'security', label: t.certifications.filterSecurity },
    { id: 'business', label: t.certifications.filterBusiness },
    { id: 'core', label: t.certifications.filterCore }
  ]

  const filteredCerts = activeFilter === 'all'
    ? t.certifications.items
    : t.certifications.items.filter(c => c.category === activeFilter)

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
            <GraduationCap size={32} className="edu-icon-svg" />
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

        {/* Category Filters */}
        <div className="certs-filters" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-pill${activeFilter === filter.id ? ' active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="certs-grid">
          {filteredCerts.map((cert, index) => (
            <div
              key={index}
              className="cert-card card spotlight-card"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="cert-card-header">
                <div
                  className="cert-badge-pill"
                  style={{
                    borderColor: `${cert.color}70`,
                    color: cert.color,
                    background: `${cert.color}15`
                  }}
                >
                  <Award size={13} style={{ marginRight: '4px' }} />
                  {cert.badge}
                </div>
                {cert.date && (
                  <span className="cert-date-tag">{cert.date}</span>
                )}
              </div>
              
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.desc}</p>
              
              <div className="cert-card-footer">
                <div className="cert-issuer-info">
                  <div className="cert-verified-tag">
                    <CheckCircle size={14} style={{ color: cert.color, flexShrink: 0 }} />
                    <span className="cert-issuer-name">{cert.issuer}</span>
                  </div>
                  <span className="cert-verified-label">
                    {language === 'pt' ? 'Verificado' : 'Verified'}
                  </span>
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
