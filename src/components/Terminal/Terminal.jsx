import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import './Terminal.css'

const Terminal = ({ isOpen, onClose, onOpenQuiz }) => {
  const { language } = useLanguage()
  const t = strings[language]
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    setHistory([
      { type: 'system', content: t.terminal.welcome },
      { type: 'system', content: t.terminal.helpHint }
    ])
  }, [language])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase()
    let response = null

    switch (cleanCmd) {
      case 'help':
        response = (
          <div className="term-help-block">
            <p className="term-help-title">{t.terminal.availableCmds}</p>
            <div className="term-cmd-row"><span className="term-cmd-name">about</span> — {t.terminal.cmdAboutDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">skills</span> — {t.terminal.cmdSkillsDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">projects</span> — {t.terminal.cmdProjectsDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">certs</span> — {t.terminal.cmdCertsDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">contact</span> — {t.terminal.cmdContactDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">quiz</span> — {t.terminal.cmdQuizDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">clear</span> — {t.terminal.cmdClearDesc}</div>
            <div className="term-cmd-row"><span className="term-cmd-name">exit</span> — {t.terminal.cmdExitDesc}</div>
          </div>
        )
        break

      case 'about':
        response = (
          <div>
            <p><strong>Luis Roberto</strong> — {t.hero.role}</p>
            <p style={{ marginTop: '4px', opacity: 0.9 }}>{t.about.paragraphs[0].replace(/<\/?[^>]+(>|$)/g, '')}</p>
          </div>
        )
        break

      case 'skills':
        response = (
          <div>
            <p><strong>Frontend:</strong> React, Next.js, TypeScript, JavaScript, TailwindCSS</p>
            <p><strong>Backend & Cloud:</strong> Node.js, Express.js, AWS, REST APIs, WebSockets</p>
            <p><strong>Mobile:</strong> Kotlin, Android SDK, Jetpack Compose, Room DB, Hilt</p>
            <p><strong>Sistemas & Concorrência:</strong> Lua (4+ anos), C, FiveM, RedM (VORP), Linux</p>
            <p><strong>Bancos de Dados:</strong> MySQL, SQL Modelagem, Firebase</p>
            <p><strong>QA & Ferramentas:</strong> Software Testing, Power BI, Git, Clean Architecture</p>
          </div>
        )
        break

      case 'projects':
        response = (
          <div>
            <p>• <strong>BioTrack</strong> (IoT Climate Monitor — InovaTech FAMETRO 2026)</p>
            <p>• <strong>ORYN</strong> (Modern Finance Tracker — Android Kotlin / Jetpack Compose)</p>
            <p>• <strong>PsyAntiCheat-REDM</strong> (Open Source Security MIT — Lua / NUI / MySQL)</p>
            <p>• <strong>Mover</strong> (Empregabilidade Acessível PCDs — InovaTech FAMETRO 2025)</p>
            <p>• <strong>Base Andromeda & Base Echocity</strong> (Multiplayer Server Frameworks FiveM)</p>
            <p>• <strong>Calculadora Penal Aura</strong> & <strong>Aura Apresentações</strong></p>
          </div>
        )
        break

      case 'certs':
      case 'certifications':
        response = (
          <div>
            <p>• <strong>Graduação:</strong> ADS @ FAMETRO (Análise e Desenvolvimento de Sistemas)</p>
            <p>• <strong>Microsoft:</strong> Azure AI Fundamentals (AI-900)</p>
            <p>• <strong>Cisco:</strong> Introduction to Cybersecurity</p>
            <p>• <strong>AWS:</strong> AWS na Prática (Cursa)</p>
            <p>• <strong>QA:</strong> Testes de Software & QA (Cursa)</p>
            <p>• <strong>Data:</strong> Power BI Prático (JGC Consultoria)</p>
            <p>• <strong>LinkedIn:</strong> Fundamentos de Cibersegurança & InfoSec</p>
          </div>
        )
        break

      case 'contact':
        response = (
          <div>
            <p>Email: <a href="mailto:linsroberto2016@gmail.com" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>linsroberto2016@gmail.com</a></p>
            <p>Telefone/WhatsApp: <a href="https://wa.me/5592981309985" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>(92) 98130-9985</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/luis-roberto-4aa69b30a/" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>/in/luis-roberto-4aa69b30a</a></p>
            <p>GitHub: <a href="https://github.com/Psyducks2" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>github.com/Psyducks2</a></p>
          </div>
        )
        break

      case 'quiz':
        response = <span>{language === 'pt' ? 'Iniciando diagnóstico técnico...' : 'Launching tech affinity diagnosis...'}</span>
        setTimeout(() => {
          if (onOpenQuiz) onOpenQuiz()
          onClose()
        }, 600)
        break

      case 'clear':
        setHistory([])
        return

      case 'exit':
        onClose()
        return

      case '':
        return

      default:
        response = (
          <span style={{ color: '#ef4444' }}>
            {language === 'pt' 
              ? `Comando não reconhecido: "${cleanCmd}". Digite "help" para ver a lista de comandos.` 
              : `Command not found: "${cleanCmd}". Type "help" to see available commands.`}
          </span>
        )
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: response }
    ])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window card spotlight-card" onClick={e => e.stopPropagation()}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="term-dot term-dot--red" onClick={onClose} title="Close" />
            <span className="term-dot term-dot--yellow" title="Minimize" />
            <span className="term-dot term-dot--green" title="Maximize" />
          </div>
          <div className="terminal-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>{t.terminal.title}</span>
          </div>
          <button className="terminal-close-btn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-line--${item.type}`}>
              {item.type === 'input' && <span className="term-prompt">luis@psy:~$ </span>}
              <div className="term-content">{item.content}</div>
            </div>
          ))}

          {/* Prompt line */}
          <div className="term-input-row">
            <span className="term-prompt">luis@psy:~$ </span>
            <input
              ref={inputRef}
              type="text"
              className="term-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}

export default Terminal
