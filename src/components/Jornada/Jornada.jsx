import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import confetti from 'canvas-confetti'
import './Jornada.css'

const Jornada = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState({
    about: false,
    skills: false,
    projects: false,
    certs: false
  })
  const [percentage, setPercentage] = useState(0)

  const updateTasksStatus = () => {
    const aboutVal = localStorage.getItem('portfolio_task_about') === 'true'
    const skillsVal = localStorage.getItem('portfolio_task_skills') === 'true'
    const projectsVal = localStorage.getItem('portfolio_task_projects') === 'true'
    const certsVal = localStorage.getItem('portfolio_task_certs') === 'true'

    const updated = {
      about: aboutVal,
      skills: skillsVal,
      projects: projectsVal,
      certs: certsVal
    }

    setTasks(updated)

    const completedCount = Object.values(updated).filter(Boolean).length
    const pct = Math.round((completedCount / 4) * 100)
    setPercentage(pct)

    if (pct === 100 && !localStorage.getItem('portfolio_task_celebrated')) {
      localStorage.setItem('portfolio_task_celebrated', 'true')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setIsOpen(true)
    }
  }

  useEffect(() => {
    updateTasksStatus()
    window.addEventListener('portfolio_task_update', updateTasksStatus)
    return () => window.removeEventListener('portfolio_task_update', updateTasksStatus)
  }, [])

  const triggerDownloadConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    })
  }

  return (
    <div className={`jornada-widget ${isOpen ? 'jornada-widget--open' : ''}`}>
      {/* Widget Trigger Button */}
      <button
        className={`jornada-trigger ${percentage === 100 ? 'jornada-trigger--complete' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.jornada.title}
        title={t.jornada.title}
      >
        <div className="jornada-progress-ring">
          <svg width="46" height="46" viewBox="0 0 46 46">
            <circle cx="23" cy="23" r="19" className="ring-bg" />
            <circle
              cx="23"
              cy="23"
              r="19"
              className="ring-bar"
              style={{ strokeDashoffset: 119 - (119 * percentage) / 100 }}
            />
          </svg>
          <span className="progress-text">{percentage}%</span>
        </div>
        <span className="jornada-label">
          {percentage === 100 ? '🎉 100%' : t.jornada.title.split(' ')[0]}
        </span>
      </button>

      {/* Checklist Panel */}
      {isOpen && (
        <div className="jornada-panel card">
          <div className="jornada-panel-header">
            <h3 className="panel-title">
              {percentage === 100 ? t.jornada.unlockedTitle : t.jornada.title}
            </h3>
            <button
              className="jornada-panel-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar painel"
            >
              ×
            </button>
          </div>

          <p className="panel-subtitle">
            {percentage === 100 ? t.jornada.unlockedDesc : t.jornada.subtitle}
          </p>

          <ul className="jornada-checklist">
            <li className={`checklist-item ${tasks.about ? 'checklist-item--checked' : ''}`}>
              <span className="checklist-status-icon" />
              <span className="checklist-text">{t.jornada.tasks.about}</span>
            </li>
            <li className={`checklist-item ${tasks.skills ? 'checklist-item--checked' : ''}`}>
              <span className="checklist-status-icon" />
              <span className="checklist-text">{t.jornada.tasks.skills}</span>
            </li>
            <li className={`checklist-item ${tasks.projects ? 'checklist-item--checked' : ''}`}>
              <span className="checklist-status-icon" />
              <span className="checklist-text">{t.jornada.tasks.projects}</span>
            </li>
            <li className={`checklist-item ${tasks.certs ? 'checklist-item--checked' : ''}`}>
              <span className="checklist-status-icon" />
              <span className="checklist-text">{t.jornada.tasks.certifications}</span>
            </li>
          </ul>

          {percentage === 100 ? (
            <a
              href="/curriculo.pdf"
              download="Luis_Roberto_Curriculo.pdf"
              className="btn btn-primary download-cv-btn"
              onClick={triggerDownloadConfetti}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t.jornada.btnDownload}</span>
            </a>
          ) : (
            <div className="jornada-hint">
              <span>💡 {language === 'pt' ? 'Continue explorando para desbloquear!' : 'Keep exploring to unlock reward!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Jornada
