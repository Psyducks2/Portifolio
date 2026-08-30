import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import confetti from 'canvas-confetti'
import './AffinityQuiz.css'

const AffinityQuiz = ({ isOpen, onClose }) => {
  const { language } = useLanguage()
  const t = strings[language]

  const [step, setStep] = useState('start') // start, questions, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ web: 0, mobile: 0, lua: 0, qa: 0 })
  const [dominantProfile, setDominantProfile] = useState('web')

  if (!isOpen) return null

  const quizData = t.quiz

  const handleStart = () => {
    setStep('questions')
    setCurrentQuestion(0)
    setScores({ web: 0, mobile: 0, lua: 0, qa: 0 })
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
    let maxVal = -1
    let dominant = 'web'
    Object.keys(finalScores).forEach((key) => {
      if (finalScores[key] > maxVal) {
        maxVal = finalScores[key]
        dominant = key
      }
    })

    setDominantProfile(dominant)
    setStep('result')

    // Confetti celebration
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    })
  }

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-card card spotlight-card" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close" onClick={onClose} aria-label="Fechar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {step === 'start' && (
          <div className="quiz-start">
            <div className="quiz-badge-tag">{quizData.tag}</div>
            <div className="quiz-icon-hero">🧠</div>
            <h2 className="quiz-title">{quizData.title}</h2>
            <p className="quiz-desc">{quizData.subtitle}</p>
            <button className="btn btn-primary" onClick={handleStart}>
              <span>{quizData.btnStart}</span>
            </button>
          </div>
        )}

        {step === 'questions' && (
          <div className="quiz-questions">
            <span className="quiz-badge-tag">
              {quizData.questionLabel
                .replace('{current}', currentQuestion + 1)
                .replace('{total}', quizData.questions.length)}
            </span>
            <h3 className="quiz-question-text">{quizData.questions[currentQuestion].q}</h3>

            <div className="quiz-options">
              {quizData.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className="quiz-option-card card"
                  onClick={() => handleAnswer(option.score)}
                >
                  <span className="quiz-opt-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="quiz-option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="quiz-result">
            <div className="result-icon">🎯</div>
            <h2 className="quiz-title">{quizData.resultTitle}</h2>
            <p className="quiz-desc">{quizData.resultSubtitle}</p>

            <div className="quiz-match-box">
              <span className="q-match-label">{quizData.dominantLabel}</span>
              <span className="q-match-value text-gradient">{quizData.profiles[dominantProfile]}</span>
            </div>

            <div className="quiz-actions-row">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={onClose}
              >
                <span>{quizData.btnContactMatch}</span>
              </a>

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
