import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { FAQS, SITE } from '../data/site.js'

/** Native <details> gives us keyboard + screen-reader behaviour for free;
 *  we only control the icon state. */
export default function FAQ() {
  const ref = useReveal()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" ref={ref} className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">

        <header className="reveal lg:col-span-4">
          <p className="section-label mb-4">Questions</p>
          <h2 className="display mb-5 text-ink" style={{ fontSize: 'clamp(30px,4.2vw,46px)' }}>
            Answered<br />before you <span className="text-gold">ask.</span>
          </h2>
          <p className="text-[15px] font-light leading-relaxed text-subtle">
            Still unsure?{' '}
            <a href={`mailto:${SITE.email}`} className="text-gold underline underline-offset-4 hover:text-gold-dk">
              Email us directly
            </a>{' '}
            — a real person replies within 24 hours.
          </p>
        </header>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => (
              <li key={f.q} className="reveal">
                <details
                  open={open === i}
                  onToggle={(e) => { if (e.currentTarget.open) setOpen(i) }}
                  className="group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-syne text-[15px] font-bold text-ink transition-colors group-hover:text-gold lg:text-base">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-colors group-open:border-gold/50"
                    >
                      <span className="absolute h-px w-3 bg-ink2 transition-colors group-open:bg-gold" />
                      <span className="absolute h-3 w-px bg-ink2 transition-transform duration-300 group-open:rotate-90 group-open:bg-gold" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-10 text-[15px] font-light leading-relaxed text-subtle sm:pr-14">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
