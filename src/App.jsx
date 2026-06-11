import { useState, useEffect } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { initScrollReveal } from './utils/scrollReveal'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import GitHubStats from './components/GitHubStats/GitHubStats'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import AffinityQuiz from './components/AffinityQuiz/AffinityQuiz'
import Jornada from './components/Jornada/Jornada'

function App() {
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    initScrollReveal()
    
    // Escuta evento customizado para abrir o quiz
    const openQuizHandler = () => setShowQuiz(true)
    window.addEventListener('open-affinity-quiz', openQuizHandler)

    // Re-initialize on route changes or language changes
    const observer = new MutationObserver(() => {
      setTimeout(initScrollReveal, 100)
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('open-affinity-quiz', openQuizHandler)
    }
  }, [])

  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Skills />
          <Projects />
          <GitHubStats />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <Jornada onOpenQuiz={() => setShowQuiz(true)} />
        {showQuiz && <AffinityQuiz onClose={() => setShowQuiz(false)} />}
      </div>
    </LanguageProvider>
  )
}

export default App
