import { useEffect, useState } from 'react'

const MouseSpotlight = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setOpacity(1)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '600px',
        height: '600px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.07) 0%, rgba(56, 189, 248, 0.03) 35%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        borderRadius: '50%',
        transition: 'opacity 0.4s ease',
        opacity: opacity
      }}
    />
  )
}

export default MouseSpotlight
