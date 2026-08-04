const ITEMS = [
  'Branding & Identity', 'AI App Development', 'Motion & Animation',
  'Artworks & Illustration', 'Brand Strategy', 'Product Design',
  'Kinetic Identity', 'Digital Products',
]

export default function Marquee() {
  return (
    <div
      className="marquee-wrap relative select-none overflow-hidden border-y border-border bg-surface py-4"
      role="presentation"
    >
      {/* Edge fades so items enter and leave instead of being chopped */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

      <div className="marquee-track flex w-max" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {ITEMS.map((item) => (
              <span key={item} className="mx-5 inline-flex items-center gap-5">
                <span className="font-syne text-[13px] font-bold uppercase tracking-[0.12em] text-ink2">
                  {item}
                </span>
                <span className="text-gold" aria-hidden="true">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Accessible text equivalent for the scrolling list */}
      <span className="sr-only">Services: {ITEMS.join(', ')}.</span>
    </div>
  )
}
