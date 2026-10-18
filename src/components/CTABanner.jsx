import { ArrowRight, MessageCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal.js'
import { SITE } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'
import { Badge } from './ui/badge.jsx'
import { Button } from './ui/button.jsx'

export default function CTABanner() {
  const ref = useReveal()
  const { playSound } = useApp()

  return (
    <section ref={ref} className="px-4 py-16 sm:px-6 lg:px-12">
      <div className="container-page !px-0">
        <div className="reveal">
          <div
            className="noise relative flex flex-col items-start gap-8 overflow-hidden rounded-3xl border border-gold/30 px-6 py-12 shadow-2xl sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20"
            style={{
              background:
                'linear-gradient(135deg, #0A0A0A 0%, #12100B 55%, #1C1710 100%)',
              color: '#FAF7F2',
            }}
          >
            {/* Ambient Lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.18) 0%, transparent 65%)',
              }}
            />

            <div className="relative z-10 max-w-xl">
              <Badge variant="gold" className="mb-4">
                <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-success" />
                {SITE.availability.status} · {SITE.availability.quarter}
              </Badge>

              <h2
                className="display mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 46px)', color: '#FAF7F2' }}
              >
                Ready to engineer your category-defining presence?
              </h2>

              <p className="text-sm font-light leading-relaxed sm:text-base" style={{ color: 'rgba(250,247,242,0.6)' }}>
                One conversation with our senior architects. Zero sales fluff. Fixed-scope
                clarity on architecture, price, and deliverables in under 24 hours.
              </p>
            </div>

            <div className="relative z-10 flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg" onClick={() => playSound('open')}>
                <a href="#contact">
                  Start a Project Brief
                  <ArrowRight />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 text-[#FAF7F2] backdrop-blur-md hover:border-gold hover:bg-gold/10 hover:text-[#D8B775]"
              >
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer noopener">
                  <MessageCircle />
                  WhatsApp the CEO
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
