import { useEffect, useRef } from 'react'
import './MatrixEffect.css'

const MatrixEffect = ({ onClose }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const characters = '01PSYDUCKSLUISROBERTOFULLSTACKKOTLINLUACREACTNODETSABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+{}[]:;<>,.?'
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = new Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 9, 15, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#38BDF8'
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length))
        
        // Randomly color some characters green or amber for depth
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#34D399'
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = '#F59E0B'
        } else {
          ctx.fillStyle = '#38BDF8'
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="matrix-overlay" onClick={onClose}>
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="matrix-exit-badge">
        <span>⚡ MATRIX MODE ACTIVATED — CLICK ANYWHERE OR PRESS ESC TO EXIT ⚡</span>
      </div>
    </div>
  )
}

export default MatrixEffect
