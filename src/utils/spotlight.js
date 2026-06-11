/**
 * Utilitário para inicializar o efeito de spotlight (holofote que segue o mouse)
 * em cards com a classe `.spotlight-card`.
 */
export const initSpotlight = () => {
  const cards = document.querySelectorAll('.spotlight-card')

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Usando requestAnimationFrame para garantir suavidade e alta taxa de FPS
    window.requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  }

  cards.forEach((card) => {
    const listener = (e) => handleMouseMove(e, card)
    card.addEventListener('mousemove', listener)
    card._spotlightListener = listener
  })

  // Retorna uma função para remover os event listeners (cleanup)
  return () => {
    cards.forEach((card) => {
      if (card._spotlightListener) {
        card.removeEventListener('mousemove', card._spotlightListener)
        delete card._spotlightListener
      }
    })
  }
}
