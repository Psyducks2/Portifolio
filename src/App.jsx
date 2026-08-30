import { useState, useEffect } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { initScrollReveal } from './utils/scrollReveal'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Certifications from './components/Certifications/Certifications'
import GitHubStats from './components/GitHubStats/GitHubStats'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import Jornada from './components/Jornada/Jornada'
import MouseSpotlight from './components/MouseSpotlight/MouseSpotlight'
import Terminal from './components/Terminal/Terminal'
import AffinityQuiz from './components/AffinityQuiz/AffinityQuiz'

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)

  // ScrollReveal animation initializer
  useEffect(() => {
    initScrollReveal()

    const observer = new MutationObserver(() => {
      setTimeout(initScrollReveal, 100)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => observer.disconnect()
  }, [])

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape closes modals
      if (e.key === 'Escape') {
        setTerminalOpen(false)
        setQuizOpen(false)
      }

      // Check if user is typing in an input or textarea
      const tag = document.activeElement?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      // Terminal shortcut 't'
      if (e.key === 't' || e.key === 'T') {
        if (!quizOpen) {
          e.preventDefault()
          setTerminalOpen(prev => !prev)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [quizOpen])

  return (
    <LanguageProvider>
      <div className="App">
        <MouseSpotlight />

        <Header
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenQuiz={() => setQuizOpen(true)}
        />

        <main>
          <Hero
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenQuiz={() => setQuizOpen(true)}
          />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <GitHubStats />
          <Certifications />
          <Services />
          <Contact />
        </main>

        <Footer />

        {/* Floating Widgets & Helpers */}
        <ScrollToTop />
        <WhatsAppButton />
        <Jornada />

        {/* Modals & Overlays */}
        <Terminal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onOpenQuiz={() => setQuizOpen(true)}
        />

        <AffinityQuiz
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
        />
      </div>
    </LanguageProvider>
  )
}

export default App
