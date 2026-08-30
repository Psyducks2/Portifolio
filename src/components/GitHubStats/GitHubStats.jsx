import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './GitHubStats.css'

const GitHubStats = () => {
  const { language } = useLanguage()
  const t = strings[language]

  useEffect(() => {
    const cleanup = initSpotlight()
    return () => cleanup()
  }, [])

  return (
    <section id="github" className="github-stats section">
      <div className="section-bg-num">05</div>
      <div className="container">
        <span className="section-tag">{t.githubStats.tag}</span>
        <h2 className="section-title">{t.githubStats.title}</h2>
        <p className="section-sub">{t.githubStats.subtitle}</p>

        {/* Highlight Stats Cards */}
        <div className="gh-cards-grid">
          {t.githubStats.cards.map((card, idx) => (
            <div key={idx} className="gh-metric-card card spotlight-card" data-aos="fade-up" data-aos-delay={idx * 60}>
              <span className="gh-metric-value">{card.value}</span>
              <span className="gh-metric-label">{card.label}</span>
            </div>
          ))}
        </div>

        {/* GitHub Visuals Bento */}
        <div className="gh-bento-grid">
          {/* Streak Card */}
          <div className="gh-bento-item gh-bento-streak card spotlight-card" data-aos="fade-up">
            <h3 className="gh-bento-title">⚡ {t.githubStats.streakTitle}</h3>
            <div className="gh-img-wrapper">
              <img
                src="https://streak-stats.demolab.com?user=Psyducks2&theme=tokyonight&hide_border=true&date_format=j%20M%5B%20Y%5D"
                alt="GitHub Streak"
                className="gh-stats-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Top Languages & Overview Card */}
          <div className="gh-bento-item gh-bento-langs card spotlight-card" data-aos="fade-up" data-aos-delay="100">
            <h3 className="gh-bento-title">📊 {t.githubStats.langsTitle}</h3>
            <div className="gh-img-wrapper">
              <img
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=Psyducks2&layout=compact&theme=tokyonight&hide_border=true"
                alt="Top Languages"
                className="gh-stats-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Snake Contribution Grid */}
          <div className="gh-bento-item gh-bento-snake card spotlight-card" data-aos="fade-up" data-aos-delay="150">
            <div className="gh-snake-header">
              <h3 className="gh-bento-title">🐍 {t.githubStats.snakeTitle}</h3>
              <a
                href={t.githubStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-btn-link"
              >
                <span>{t.githubStats.btnProfile}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
            <div className="gh-snake-img-wrapper">
              <img
                src="https://raw.githubusercontent.com/Psyducks2/Psyducks2/output/github-contribution-grid-snake-dark.svg"
                alt="GitHub Snake Animation"
                className="gh-snake-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
