import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './GitHubStats.css'

const GitHubStats = () => {
  const { language } = useLanguage()

  useEffect(() => {
    const cleanup = initSpotlight()
    return () => cleanup()
  }, [])

  return (
    <section id="github-stats" className="github-stats section">
      <div className="section-bg-num">06</div>
      <div className="container">
        <h2 className="section-title">GitHub Contributions</h2>
        <p className="section-subtitle">Minha atividade e contribuições no GitHub</p>
        
        <div className="github-wrapper">
          <a
            href="https://github.com/Psyducks2"
            target="_blank"
            rel="noopener noreferrer"
            className="github-profile-link"
          >
            <div className="github-stats-grid">
              <div className="github-stat-card card spotlight-card">
                <div className="github-stat-icon">📁</div>
                <div className="github-stat-value">7+</div>
                <div className="github-stat-label">Repositórios</div>
              </div>
              
              <div className="github-stat-card card spotlight-card">
                <div className="github-stat-icon">⭐</div>
                <div className="github-stat-value">2+</div>
                <div className="github-stat-label">Stars</div>
              </div>
              
              <div className="github-stat-card card spotlight-card">
                <div className="github-stat-icon">🔷</div>
                <div className="github-stat-value">5+</div>
                <div className="github-stat-label">Linguagens</div>
              </div>
              
              <div className="github-stat-card card spotlight-card">
                <div className="github-stat-icon">💻</div>
                <div className="github-stat-value">Ativo</div>
                <div className="github-stat-label">Desenvolvendo</div>
              </div>
            </div>
            
            <div className="github-cta">
              <span>Ver perfil completo no GitHub</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
