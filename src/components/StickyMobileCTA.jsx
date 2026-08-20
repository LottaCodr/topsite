import { useEffect, useState } from 'react'
import { SITE } from '../data/site.js'

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
      setVisible(y > window.innerHeight * 0.85 && !nearForm)
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
      className="fixed inset-x-0 bottom-0 z-30 md:hidden"
      style={{
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)',
        transition: 'transform .35s cubic-bezier(0.16,1,0.3,1), opacity .3s ease, visibility .3s ease',
      }}
    >
      <div className="border-t border-border bg-surface/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2.5">
          <a href="#contact" className="btn-gold flex-1 text-center !min-h-[46px] !text-xs">
            Start Project Brief <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-xl border border-border bg-surface2 text-emerald-500 hover:border-emerald-500"
            aria-label="Direct WhatsApp chat with CEO"
          >
            <span className="text-xl">💬</span>
          </a>
        </div>
      </div>
    </div>
  )
}
