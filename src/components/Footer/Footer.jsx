import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Footer.css'

const Footer = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#hero" className="logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">Luis</span>
              <span className="logo-slash">/</span>
              <span className="logo-bracket">&gt;</span>
            </a>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer-quote-box">
            <p className="footer-quote">{t.footer.quote}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Luis Roberto. {t.footer.developed}{' '}
            <a
              href="https://github.com/Psyducks2/Portifolio"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-source-link"
            >
              {t.footer.sourceCode}
            </a>
          </p>

          <button onClick={scrollToTop} className="footer-back-top" aria-label="Voltar ao topo">
            {t.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
