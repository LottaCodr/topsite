import { useEffect, useState } from 'react'
import { SITE } from '../data/site.js'

/**
 * Mobile-only sticky action bar. Appears once the user has scrolled past the
 * hero and disappears near the contact section so it never blocks the form.
 * Research-backed: repeating the single primary CTA is a reliable converter,
 * and a thumb-reachable action beats scrolling back up to the navbar.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const contact = document.getElementById('contact')

    let ticking = false
    const read = () => {
      const y = window.scrollY
      let nearForm = false
      if (contact) {
        const r = contact.getBoundingClientRect()
        nearForm = r.top < window.innerHeight * 0.75 && r.bottom > 0
      }
      setVisible(y > window.innerHeight * 0.9 && !nearForm)
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
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)',
        transition: 'transform .4s cubic-bezier(0.16,1,0.3,1), opacity .3s ease, visibility .3s ease',
      }}
    >
      <div className="border-t border-border bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-gold flex-1 text-center">
            Start a Project <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent('Project Brief — T.O.P')}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border2 text-ink transition-colors hover:border-gold hover:text-gold"
            aria-label={`Email ${SITE.name}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m3.5 7 8.5 6 8.5-6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
