import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Jornada.css'

const Jornada = () => {
  const { language } = useLanguage()
  const t = strings[language]

  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState({
    about: false,
    skills: false,
    projects: false
  })
  const [percentage, setPercentage] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [celebrated, setCelebrated] = useState(false)

  // Atualiza as tarefas com base no localStorage
  const updateTasksStatus = () => {
    const aboutVal = localStorage.getItem('portfolio_task_about') === 'true'
    const skillsVal = localStorage.getItem('portfolio_task_skills') === 'true'
    const projectsVal = localStorage.getItem('portfolio_task_projects') === 'true'

    const updated = {
      about: aboutVal,
      skills: skillsVal,
      projects: projectsVal
    }

    setTasks(updated)

    // Calcula a porcentagem com base em 3 tarefas
    const completedCount = Object.values(updated).filter(Boolean).length
    const pct = Math.round((completedCount / 3) * 100)
    setPercentage(pct)

    // Verifica se completou 100% para soltar confetes
    if (pct === 100 && !celebrated && !localStorage.getItem('portfolio_task_celebrated')) {
      triggerCelebration()
    }
  }

  const triggerCelebration = () => {
    setShowConfetti(true)
    setCelebrated(true)
    localStorage.setItem('portfolio_task_celebrated', 'true')
    
    // Abre o painel automaticamente para celebrar com o usuário
    setIsOpen(true)
    
    // Desliga confetes após 6 segundos
    setTimeout(() => {
      setShowConfetti(false)
    }, 6000)
  }

  useEffect(() => {
    updateTasksStatus()
    
    // Escuta evento global de atualização de tarefas
    window.addEventListener('portfolio_task_update', updateTasksStatus)
    return () => window.removeEventListener('portfolio_task_update', updateTasksStatus)
  }, [celebrated])

  // Lógica de confete: gerar partículas aleatórias
  const renderConfetti = () => {
    if (!showConfetti) return null
    const particles = Array.from({ length: 100 })
    return (
      <div className="confetti-wrapper">
        {particles.map((_, idx) => {
          const style = {
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#0ea5e9', '#38bdf8', '#f59e0b', '#10b981', '#ec4899'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2.5 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }
          return <div key={idx} className="confetti-piece" style={style} />
        })}
      </div>
    )
  }

  const unlockedTitle = language === 'pt' ? 'Jornada Concluída! 100%' : 'Journey Completed! 100%'

  return (
    <>
      {renderConfetti()}

      <div className={`jornada-widget ${isOpen ? 'jornada-widget--open' : ''}`}>
        {/* Widget Button */}
        <button 
          className={`jornada-trigger ${percentage === 100 ? 'jornada-trigger--complete' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t.jornada.title}
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
          <span className="jornada-label">{isOpen ? t.jornada.title.split(' ')[0] : t.jornada.title}</span>
        </button>

        {/* Checklist Panel */}
        {isOpen && (
          <div className="jornada-panel card">
            <h3 className="panel-title">{percentage === 100 ? unlockedTitle : t.jornada.title}</h3>
            <p className="panel-subtitle">
              {percentage === 100 ? t.jornada.unlockedDesc : t.jornada.subtitle}
            </p>

            <ul className="jornada-checklist">
              <li className={`checklist-item ${tasks.about ? 'checklist-item--checked' : ''}`}>
                <span className="checklist-status" />
                <span className="checklist-text">{t.jornada.tasks.about}</span>
              </li>
              <li className={`checklist-item ${tasks.skills ? 'checklist-item--checked' : ''}`}>
                <span className="checklist-status" />
                <span className="checklist-text">{t.jornada.tasks.skills}</span>
              </li>
              <li className={`checklist-item ${tasks.projects ? 'checklist-item--checked' : ''}`}>
                <span className="checklist-status" />
                <span className="checklist-text">{t.jornada.tasks.projects}</span>
              </li>
            </ul>

            {percentage === 100 && (
              <a 
                href="/curriculo.pdf" 
                download="Luis_Roberto_Curriculo.pdf"
                className="btn btn-primary download-cv-btn"
                onClick={() => {
                  setShowConfetti(true)
                  setTimeout(() => setShowConfetti(false), 5000)
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{t.jornada.btnDownload}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Jornada
