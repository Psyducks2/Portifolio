import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import LanguageToggle from '../LanguageToggle/LanguageToggle'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { Terminal, Sparkles } from 'lucide-react'
import './Header.css'

const Header = ({ onOpenTerminal, onOpenQuiz }) => {
  const { language } = useLanguage()
  const t = strings[language]
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="scroll-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

        <div className="container header-container">
          {/* Logo */}
          <a href="#hero" className="logo" onClick={handleNavClick}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Luis</span>
            <span className="logo-slash">/</span>
            <span className="logo-bracket">&gt;</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav">
            <ul className="nav-links">
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#skills">{t.nav.skills}</a></li>
              <li><a href="#experience">{t.nav.experience}</a></li>
              <li><a href="#projects">{t.nav.projects}</a></li>
              <li><a href="#certifications">{t.nav.certifications}</a></li>
              <li><a href="#github">{t.nav.github}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </nav>

          {/* Header Action Tools */}
          <div className="header-actions">
            {/* Terminal Button */}
            <button
              className="header-icon-btn"
              onClick={onOpenTerminal}
              aria-label="Abrir Terminal CLI"
              title="Terminal CLI (Tecla T)"
            >
              <Terminal size={18} />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <LanguageToggle />

            {/* CTA button */}
            <a href="#contact" className="btn btn-primary nav-cta">
              {t.nav.contact}
            </a>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav className={`mobile-nav${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-nav-links">
          <li><a href="#about" onClick={handleNavClick}>{t.nav.about}</a></li>
          <li><a href="#skills" onClick={handleNavClick}>{t.nav.skills}</a></li>
          <li><a href="#experience" onClick={handleNavClick}>{t.nav.experience}</a></li>
          <li><a href="#projects" onClick={handleNavClick}>{t.nav.projects}</a></li>
          <li><a href="#certifications" onClick={handleNavClick}>{t.nav.certifications}</a></li>
          <li><a href="#github" onClick={handleNavClick}>{t.nav.github}</a></li>
          <li><a href="#contact" onClick={handleNavClick}>{t.nav.contact}</a></li>
        </ul>

        <div className="mobile-nav-tools">
          <button
            className="btn btn-secondary mobile-tool-btn"
            onClick={() => {
              handleNavClick()
              onOpenTerminal()
            }}
          >
            <Terminal size={16} />
            <span>Terminal CLI</span>
          </button>

          <button
            className="btn btn-secondary mobile-tool-btn"
            onClick={() => {
              handleNavClick()
              onOpenQuiz()
            }}
          >
            <Sparkles size={16} />
            <span>Diagnóstico de Stack</span>
          </button>
        </div>

        <div className="mobile-nav-bottom">
          <LanguageToggle />
          <a href="#contact" className="btn btn-primary mobile-nav-cta" onClick={handleNavClick}>
            {t.nav.contact}
          </a>
        </div>
      </nav>
    </>
  )
}

export default Header
