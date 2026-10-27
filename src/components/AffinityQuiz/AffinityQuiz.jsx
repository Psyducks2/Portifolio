import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import confetti from 'canvas-confetti'
import { SlidersHorizontal, Target, ArrowLeft, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react'
import './AffinityQuiz.css'

const AffinityQuiz = ({ isOpen, onClose }) => {
  const { language } = useLanguage()
  const t = strings[language]

  const [step, setStep] = useState('start') // start, questions, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ web: 0, auto: 0, lua: 0, data: 0, mobile: 0, qa: 0 })
  const [historyScores, setHistoryScores] = useState([])
  const [dominantProfile, setDominantProfile] = useState('web')

  if (!isOpen) return null

  const quizData = t.quiz
  const totalQuestions = quizData.questions.length
  const progressPercent = Math.round(((currentQuestion + 1) / totalQuestions) * 100)

  const handleStart = () => {
    setStep('questions')
    setCurrentQuestion(0)
    setScores({ web: 0, auto: 0, lua: 0, data: 0, mobile: 0, qa: 0 })
    setHistoryScores([])
  }

  const handleAnswer = (scoreValues) => {
    const updatedScores = { ...scores }
    Object.keys(scoreValues).forEach((key) => {
      updatedScores[key] = (updatedScores[key] || 0) + scoreValues[key]
    })

    setHistoryScores(prev => [...prev, scores])
    setScores(updatedScores)

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResult(updatedScores)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0 && historyScores.length > 0) {
      const prevScore = historyScores[historyScores.length - 1]
      setScores(prevScore)
      setHistoryScores(prev => prev.slice(0, -1))
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResult = (finalScores) => {
    let maxVal = -1
    let dominant = 'web'

    // Evaluate dominant profile
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
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const currentResultProfile = quizData.profiles[dominantProfile] || quizData.profiles.web
  const waEncodedText = encodeURIComponent(currentResultProfile.whatsappMsg)

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-card card spotlight-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="quiz-close" onClick={onClose} aria-label={quizData.btnClose || "Fechar"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* STEP 1: START */}
        {step === 'start' && (
          <div className="quiz-start">
            <div className="quiz-badge-tag">{quizData.tag}</div>
            <div className="quiz-icon-hero">
              <SlidersHorizontal size={40} color="var(--sky-light)" />
            </div>
            <h2 className="quiz-title">{quizData.title}</h2>
            <p className="quiz-desc">{quizData.subtitle}</p>
            
            <div className="quiz-start-footer">
              <button className="btn btn-primary quiz-start-btn" onClick={handleStart}>
                <span>{quizData.btnStart}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: QUESTIONS */}
        {step === 'questions' && (
          <div className="quiz-questions">
            {/* Header with progress */}
            <div className="quiz-progress-wrap">
              <div className="quiz-progress-meta">
                <span className="quiz-badge-tag">
                  {quizData.questionLabel
                    .replace('{current}', currentQuestion + 1)
                    .replace('{total}', totalQuestions)}
                </span>
                <span className="quiz-progress-pct">{progressPercent}%</span>
              </div>

              <div className="quiz-progress-bar-bg">
                <div
                  className="quiz-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

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

            {currentQuestion > 0 && (
              <div className="quiz-back-row">
                <button className="quiz-btn-back" onClick={handleBack}>
                  <ArrowLeft size={14} />
                  <span>{quizData.btnBack}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 'result' && (
          <div className="quiz-result">
            <div className="result-header">
              <div className="result-icon-badge">
                <Target size={28} />
              </div>
              <div>
                <span className="result-match-pill">{currentResultProfile.matchScore}</span>
                <h2 className="quiz-title" style={{ marginBottom: '0.25rem' }}>{quizData.resultTitle}</h2>
              </div>
            </div>

            <p className="quiz-desc" style={{ marginBottom: '1.25rem' }}>{quizData.resultSubtitle}</p>

            {/* Profile Highlight Card */}
            <div className="quiz-match-box">
              <span className="q-match-label">{quizData.dominantLabel}</span>
              <span className="q-match-value text-gradient">{currentResultProfile.title}</span>
              <p className="q-match-sub">{currentResultProfile.subtitle}</p>

              {/* Recommended Techs */}
              <div className="q-result-techs">
                <span className="q-sub-heading">{quizData.recommendedTechsLabel}</span>
                <div className="q-tech-tags">
                  {currentResultProfile.techs.map((tech, tIdx) => (
                    <span className="q-tech-pill" key={tIdx}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* What I Deliver */}
              <div className="q-result-deliverables">
                <span className="q-sub-heading">{quizData.deliverablesLabel}</span>
                <ul className="q-deliverables-list">
                  {currentResultProfile.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="q-deliverable-item">
                      <CheckCircle2 size={16} className="q-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="quiz-actions-row">
              <a
                href={`https://wa.me/5592981309985?text=${waEncodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary quiz-wa-cta"
                onClick={onClose}
              >
                <MessageSquare size={16} />
                <span>{quizData.btnContactWhatsApp}</span>
              </a>

              <a
                href="#contact"
                className="btn btn-secondary"
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
