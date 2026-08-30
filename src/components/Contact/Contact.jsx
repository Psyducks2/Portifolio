import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { strings } from '../../i18n/strings'
import { initSpotlight } from '../../utils/spotlight'
import './Contact.css'

const Contact = () => {
  const { language } = useLanguage()
  const t = strings[language]
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    const cleanup = initSpotlight()
    return () => cleanup()
  }, [])

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const encodedWaMsg = encodeURIComponent(t.contact.whatsappMsg)

  return (
    <section id="contact" className="contact section">
      <div className="section-bg-num">08</div>
      <div className="container">
        <span className="section-tag">{t.contact.tag}</span>
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="section-sub">{t.contact.subtitle}</p>

        <div className="contact-grid">
          {/* Email Card */}
          <div className="contact-card card spotlight-card" data-aos="fade-up">
            <div className="contact-card-top">
              <div className="contact-icon contact-icon--email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span className="contact-card-label">Email</span>
            </div>
            <div className="contact-card-value">{t.contact.email}</div>
            <div className="contact-card-actions">
              <a href={`mailto:${t.contact.email}`} className="contact-btn-action">
                <span>Enviar Email</span>
              </a>
              <button
                className="contact-btn-copy"
                onClick={() => copyToClipboard(t.contact.email, 'email')}
                aria-label="Copiar email"
              >
                {copiedKey === 'email' ? t.contact.copied : t.contact.btnCopy}
              </button>
            </div>
          </div>

          {/* WhatsApp / Phone Card */}
          <div className="contact-card card spotlight-card" data-aos="fade-up" data-aos-delay="70">
            <div className="contact-card-top">
              <div className="contact-icon contact-icon--phone">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span className="contact-card-label">WhatsApp / Telefone</span>
            </div>
            <div className="contact-card-value">{t.contact.phone}</div>
            <div className="contact-card-actions">
              <a
                href={`https://wa.me/5592981309985?text=${encodedWaMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn-action contact-btn-action--wa"
              >
                <span>Chamar no WhatsApp</span>
              </a>
              <button
                className="contact-btn-copy"
                onClick={() => copyToClipboard('92981309985', 'phone')}
                aria-label="Copiar número"
              >
                {copiedKey === 'phone' ? t.contact.copied : t.contact.btnCopy}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="contact-card card spotlight-card" data-aos="fade-up" data-aos-delay="140">
            <div className="contact-card-top">
              <div className="contact-icon contact-icon--linkedin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="contact-card-label">LinkedIn</span>
            </div>
            <div className="contact-card-value">Luis Roberto</div>
            <div className="contact-card-actions">
              <a
                href="https://www.linkedin.com/in/luis-roberto-4aa69b30a/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn-action"
              >
                <span>Conectar no LinkedIn</span>
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="contact-card card spotlight-card" data-aos="fade-up" data-aos-delay="210">
            <div className="contact-card-top">
              <div className="contact-icon contact-icon--github">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="contact-card-label">GitHub</span>
            </div>
            <div className="contact-card-value">@Psyducks2</div>
            <div className="contact-card-actions">
              <a
                href="https://github.com/Psyducks2"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn-action"
              >
                <span>Seguir no GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
