import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import LanguageToggle from '../LanguageToggle/LanguageToggle'
import './Header.css'

const Header = () => {
  const { language } = useLanguage()
  const t = strings[language]
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setScrolled(scrollTop > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className="container header-container">
        <a href="#hero" className="logo">
          <span className="logo-name">Luis</span>
          <span className="logo-dot">.</span>
        </a>

        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#skills">{t.nav.skills}</a></li>
            <li><a href="#experience">{t.nav.experience}</a></li>
            <li><a href="#projects">{t.nav.projects}</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className="qr-btn" 
            onClick={() => setShowQRModal(true)} 
            aria-label="Gerar QR Code"
            title="QR Code"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
              <line x1="17" y1="7" x2="17.01" y2="7" />
              <line x1="17" y1="17" x2="17.01" y2="17" />
              <line x1="7" y1="17" x2="7.01" y2="17" />
            </svg>
          </button>
          <LanguageToggle />
          <a href="#contact" className="btn btn-primary nav-cta">{t.nav.contact}</a>
        </div>
      </div>

      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQRModal(false)} aria-label="Fechar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-header">
              <h3>Scan Me! 📱</h3>
              <p>{language === 'pt' ? 'Escaneie para abrir no celular' : 'Scan to open on mobile'}</p>
            </div>
            <div className="modal-body">
              <div className="qr-container">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0D1526&data=${encodeURIComponent(window.location.href)}`} 
                  alt="QR Code" 
                  className="qr-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
