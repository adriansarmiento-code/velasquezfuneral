/**
 * Scroll Reveal & Parallax utilities
 * Used by all page components
 */

let revealObserver = null

export function useReveal() {
  const elements = document.querySelectorAll('.reveal')

  if ('IntersectionObserver' in window) {
    if (revealObserver) revealObserver.disconnect()

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el) => revealObserver.observe(el))
  } else {
    // Fallback: show all
    elements.forEach((el) => el.classList.add('is-visible'))
  }
}

export function useParallax() {
  const wraps = document.querySelectorAll('.parallax-wrap')
  if (!wraps.length) return

  const onScroll = () => {
    wraps.forEach((wrap) => {
      const rect = wrap.getBoundingClientRect()
      const img = wrap.querySelector('.parallax-img')
      if (!img) return
      const offset = rect.top / window.innerHeight
      img.style.transform = `scale(1.1) translateY(${offset * -8}%)`
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Return cleanup
  return () => window.removeEventListener('scroll', onScroll)
}

export function useScrollProgress() {
  const bar = document.querySelector('.scroll-progress')
  if (!bar) return

  const onScroll = () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const progress = docH > 0 ? window.scrollY / docH : 0
    bar.style.transform = `scaleX(${progress})`
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}