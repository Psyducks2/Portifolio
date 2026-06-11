import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './Projects.css'

const CATEGORY_LABELS = {
  web: 'Web',
  fivem: 'FiveM',
  bot: 'Bot',
}

const Projects = () => {
  const { language } = useLanguage()
  const t = strings[language]
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const cleanup = initSpotlight()
    
    if (activeFilter !== 'all') {
      localStorage.setItem('portfolio_task_projects', 'true')
      window.dispatchEvent(new Event('portfolio_task_update'))
    }

    return () => cleanup()
  }, [activeFilter])

  const allProjects = [
    {
      id: 'mover',
      title: t.projects.mover.title,
      description: t.projects.mover.description,
      tech: t.projects.mover.tech,
      githubUrl: 'https://github.com/Psyducks2/mover',
      demoUrl: 'https://mover3.vercel.app',
      category: 'web'
    },
    {
      id: 'base-andromeda',
      title: t.projects.baseAndromeda.title,
      description: t.projects.baseAndromeda.description,
      tech: t.projects.baseAndromeda.tech,
      githubUrl: 'https://github.com/Psyducks2/BaseAndromeda',
      category: 'fivem'
    },
    {
      id: 'base-echocity',
      title: t.projects.baseEchocity.title,
      description: t.projects.baseEchocity.description,
      tech: t.projects.baseEchocity.tech,
      githubUrl: 'https://github.com/Psyducks2/BaseEchocity',
      category: 'fivem'
    },
    {
      id: 'arrowlab',
      title: t.projects.arrowlab.title,
      description: t.projects.arrowlab.description,
      tech: t.projects.arrowlab.tech,
      demoUrl: 'https://arrowlab.vercel.app',
      category: 'web'
    },
    {
      id: 'registro-viaturas',
      title: t.projects.registroViaturas.title,
      description: t.projects.registroViaturas.description,
      tech: t.projects.registroViaturas.tech,
      githubUrl: 'https://github.com/Psyducks2/Registro-viaturas',
      category: 'web'
    },
    {
      id: 'calculadora-penal',
      title: t.projects.calculadoraPenal.title,
      description: t.projects.calculadoraPenal.description,
      tech: t.projects.calculadoraPenal.tech,
      githubUrl: 'https://github.com/Psyducks2/calculadora_penal_aura',
      demoUrl: 'https://calculadora-penal-aura.vercel.app',
      category: 'web'
    },
    {
      id: 'aura-apresentacoes',
      title: t.projects.auraApresentacoes.title,
      description: t.projects.auraApresentacoes.description,
      tech: t.projects.auraApresentacoes.tech,
      githubUrl: 'https://github.com/Psyducks2/Aura-Apresenta--es',
      demoUrl: 'https://auraroleplay.vercel.app',
      category: 'web'
    },
    {
      id: 'arrow-notfys',
      title: t.projects.arrowNotfys.title,
      description: t.projects.arrowNotfys.description,
      tech: t.projects.arrowNotfys.tech,
      githubUrl: 'https://github.com/Psyducks2/ArrowNotfys',
      demoUrl: 'https://discord.gg/yzfEx3GTQH',
      category: 'bot'
    },
  ]

  const filters = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'web', label: t.projects.filterWeb },
    { id: 'fivem', label: t.projects.filterFiveM },
    { id: 'bot', label: t.projects.filterBot }
  ]

  const projects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="projects section">
      <div className="section-bg-num">05</div>
      <div className="container">
        <h2 className="section-title">{t.projects.title}</h2>
        <p className="section-subtitle">{t.projects.subtitle}</p>

        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn${activeFilter === filter.id ? ' active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card spotlight-card" data-category={project.category}>
              <div className="project-category-badge">{CATEGORY_LABELS[project.category]}</div>
              <div className="project-text">
                <span className="project-title">{project.title}</span>
                <p className="project-subtitle">{project.description}</p>
                <div className="project-tech">{project.tech}</div>
              </div>
              <div className="project-icons">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                    aria-label="GitHub"
                  >
                    <svg className="svg-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn--demo"
                    aria-label="Demo"
                  >
                    <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
