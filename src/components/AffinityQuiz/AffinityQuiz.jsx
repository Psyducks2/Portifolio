import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './AffinityQuiz.css'

const AffinityQuiz = ({ onClose }) => {
  const { language } = useLanguage()
  const t = strings[language]

  const [step, setStep] = useState('start') // start, questions, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({
    front: 0,
    back: 0,
    game: 0,
    lead: 0
  })
  const [profilePercentages, setProfilePercentages] = useState({})
  const [dominantProfile, setDominantProfile] = useState('')

  useEffect(() => {
    if (step === 'questions' || step === 'start') {
      const cleanup = initSpotlight()
      return () => cleanup()
    }
  }, [step, currentQuestion])

  const quizData = t.quiz

  const handleStart = () => {
    setStep('questions')
    setCurrentQuestion(0)
    setScores({ front: 0, back: 0, game: 0, lead: 0 })
  }

  const handleAnswer = (scoreValues) => {
    const newScores = { ...scores }
    Object.keys(scoreValues).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + scoreValues[key]
    })
    setScores(newScores)

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newScores)
    }
  }

  const calculateResult = (finalScores) => {
    const totalPoints = Object.values(finalScores).reduce((a, b) => a + b, 0)
    
    // Evitar divisão por zero
    const pts = totalPoints > 0 ? totalPoints : 1

    const percentages = {
      front: Math.round((finalScores.front / pts) * 100),
      back: Math.round((finalScores.back / pts) * 100),
      game: Math.round((finalScores.game / pts) * 100),
      lead: Math.round((finalScores.lead / pts) * 100)
    }

    // Encontrar perfil dominante
    let maxVal = -1
    let dominant = 'front'
    Object.keys(percentages).forEach((key) => {
      if (percentages[key] > maxVal) {
        maxVal = percentages[key]
        dominant = key
      }
    })

    setProfilePercentages(percentages)
    setDominantProfile(dominant)
    setStep('result')

    // Registrar conclusão da tarefa para a jornada
    localStorage.setItem('portfolio_task_quiz', 'true')
    window.dispatchEvent(new Event('portfolio_task_update'))
  }

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-card card" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close" onClick={onClose} aria-label="Fechar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {step === 'start' && (
          <div className="quiz-start">
            <div className="quiz-icon">🧠</div>
            <h2 className="quiz-title">{quizData.title}</h2>
            <p className="quiz-desc">{quizData.subtitle}</p>
            <button className="btn btn-primary" onClick={handleStart}>
              <span>{quizData.btnStart}</span>
            </button>
          </div>
        )}

        {step === 'questions' && (
          <div className="quiz-questions">
            <span className="quiz-badge">
              {quizData.questionLabel
                .replace('{current}', currentQuestion + 1)
                .replace('{total}', quizData.questions.length)}
            </span>
            <h3 className="quiz-question-text">{quizData.questions[currentQuestion].q}</h3>
            
            <div className="quiz-options">
              {quizData.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className="quiz-option-card spotlight-card"
                  onClick={() => handleAnswer(option.score)}
                >
                  <span className="quiz-option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="quiz-result">
            <div className="result-success-icon">🚀</div>
            <h2 className="quiz-title">{quizData.resultTitle}</h2>
            <p className="quiz-desc">{quizData.resultSubtitle}</p>
            
            <div className="profile-match">
              <span className="pm-label">Compatibilidade Dominante:</span>
              <span className="pm-value text-gradient">{quizData.profiles[dominantProfile]}</span>
            </div>

            <div className="result-bars">
              {Object.keys(profilePercentages).map((profile) => (
                <div className="result-bar-item" key={profile}>
                  <div className="r-bar-info">
                    <span className="r-bar-name">{quizData.profiles[profile].split(' (')[0]}</span>
                    <span className="r-bar-pct">{profilePercentages[profile]}%</span>
                  </div>
                  <div className="r-bar-track">
                    <div 
                      className={`r-bar-fill ${profile === dominantProfile ? 'r-bar-fill--dominant' : ''}`}
                      style={{ width: `${profilePercentages[profile]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-result-actions">
              <button className="btn btn-primary" onClick={onClose}>
                <span>{quizData.btnClose}</span>
              </button>
              <button className="btn btn-secondary" onClick={handleStart}>
                <span>{quizData.btnRestart}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AffinityQuiz
