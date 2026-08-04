import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Reveals every `.reveal` descendant once it enters the viewport.
 * - Uses a single observer per section (cheap).
 * - Unobserves after reveal so nothing re-animates on scroll-back.
 * - Instantly reveals everything when the user prefers reduced motion.
 */
export function useReveal({ threshold = 0.12, stagger = 70 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const items = Array.from(root.querySelectorAll('.reveal'))
    if (!items.length) return

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const group = Array.from(el.parentElement?.children ?? [])
          const i = Math.max(0, group.indexOf(el))
          el.style.transitionDelay = `${Math.min(i, 6) * stagger}ms`
          el.classList.add('is-visible')
          io.unobserve(el)
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [threshold, stagger])

  return ref
}

/** True once the page has settled — used to gate hero entrance animation. */
export function useMounted(delay = 60) {
  const ref = useRef(false)
  return ref
}
