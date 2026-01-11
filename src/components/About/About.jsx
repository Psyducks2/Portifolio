import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './About.css'

const About = () => {
  const { language } = useLanguage()
  const t = strings[language]

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">{t.about.title}</h2>
        <div className="about-content">
          <div className="about-text-wrapper">
            <p className="about-text">{t.about.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
