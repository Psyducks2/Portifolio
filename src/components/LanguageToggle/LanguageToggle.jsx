import { useLanguage } from '../../contexts/LanguageContext'
import './LanguageToggle.css'

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="language-toggle">
      <button
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => language !== 'pt' && toggleLanguage()}
        aria-label="Português"
      >
        PT
      </button>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => language !== 'en' && toggleLanguage()}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}

export default LanguageToggle
