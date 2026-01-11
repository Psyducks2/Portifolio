import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Footer.css'

const Footer = () => {
  const { language } = useLanguage()
  const t = strings[language]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            {t.footer.developed}{' '}
            <a
              href="https://github.com/Psyducks2/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {t.footer.sourceCode}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
