import { useEffect, useRef, useState } from 'react'

/**
 * Tracks scroll position for the navbar:
 *  - `scrolled`  → past the hero threshold (condense + add surface)
 *  - `hidden`    → scrolling down fast past 400px (hide chrome, give content room)
 *  - `progress`  → 0..1 read progress for the top indicator bar
 * rAF-throttled so we never read layout more than once a frame.
 */
export function useScrollState(threshold = 24) {
  const [state, setState] = useState({ scrolled: false, hidden: false, progress: 0 })
  // Use a ref for lastY so the closure always reads the live value, preventing jitter
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  useEffect(() => {
    let ticking = false

    const read = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = y > threshold
      // Require scrolling down by ≥8px (not just 4px) past 400px to avoid jitter on momentum/rubber-band scrolls
      const hidden = y > 400 && y > lastY.current + 8
      const progress = max > 0 ? Math.min(1, y / max) : 0
      lastY.current = y
      setState((prev) => {
        if (
          prev.scrolled === scrolled &&
          prev.hidden === hidden &&
          Math.abs(prev.progress - progress) < 0.004
        ) return prev
        return { scrolled, hidden, progress }
      })
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  return state
}

/** Highlights the nav item for whichever section owns the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.15, 0.5] },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
