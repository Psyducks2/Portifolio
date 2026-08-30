import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { GraduationCap, MapPin, Layers, Zap, ShieldCheck, Briefcase } from 'lucide-react'
import './About.css'

const About = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          localStorage.setItem('portfolio_task_about', 'true')
          window.dispatchEvent(new Event('portfolio_task_update'))
          observer.disconnect()
        }
      })
    }, { threshold: 0.25 })

    const el = document.getElementById('about')
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const chipIcons = [
    <MapPin key="map" size={14} />,
    <GraduationCap key="grad" size={14} />,
    <Layers key="layers" size={14} />,
    <Zap key="zap" size={14} />,
    <ShieldCheck key="shield" size={14} />,
    <Briefcase key="brief" size={14} />
  ]

  return (
    <section id="about" className="about section">
      <div className="section-bg-num">01</div>
      <div className="container">
        <span className="section-tag">{t.about.tag}</span>
        <h2 className="section-title">{t.about.title}</h2>

        <div className="about-grid">
          {/* Avatar / Visual Profile Card */}
          <div className="about-visual" data-aos="fade-right">
            <div className="about-avatar-card card spotlight-card">
              <div className="avatar-frame">
                <img
                  src="https://github.com/Psyducks2.png"
                  alt="Luis Roberto"
                  className="avatar-img"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="avatar-fallback" style={{ display: 'none' }}>
                  <span>LR</span>
                </div>
              </div>

              <div className="avatar-details">
                <h3 className="avatar-name">Luis Roberto</h3>
                <p className="avatar-subtitle">{t.hero.role}</p>
                <div className="avatar-tags">
                  <span className="avatar-badge avatar-badge--status">
                    <span className="status-dot"></span>
                    {t.about.badgeAvailable}
                  </span>
                  <span className="avatar-badge avatar-badge--edu">
                    <GraduationCap size={14} style={{ marginRight: '4px' }} />
                    {t.about.badgeEducation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text & Details */}
          <div className="about-text" data-aos="fade-left">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}

            <div className="about-chips-wrapper">
              {t.about.chips.map((chip, index) => (
                <span className="about-chip" key={index}>
                  {chipIcons[index % chipIcons.length]}
                  <span>{chip}</span>
                </span>
              ))}
            </div>

            <div className="about-cta-row">
              <a
                href="/curriculo.pdf"
                download="Luis_Roberto_Curriculo.pdf"
                className="btn btn-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>{t.hero.btnCV}</span>
              </a>

              <a
                href="https://github.com/Psyducks2"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
