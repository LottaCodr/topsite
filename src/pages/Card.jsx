import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, SOCIALS } from '../data/site.js'

const LETTERS = [
  { char: 'T', gold: false }, { char: '.', gold: true },
  { char: 'O', gold: false }, { char: '.', gold: true },
  { char: 'P', gold: false }, { char: '.', gold: true },
]

const SVCS = [
  { num: '01', name: 'Branding & Identity' },
  { num: '02', name: 'AI App Development' },
  { num: '03', name: 'Motion & Animation' },
  { num: '04', name: 'Artworks & Illustration' },
]

const WORK = [
  { name: 'Glimms', tag: 'In dev', dot: '#8FB800' },
  { name: 'nēro', tag: 'Beta', dot: '#C9A96E' },
  { name: 'Nile Valley EMR', tag: 'Active', dot: '#2B8A72' },
]

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Iwuanyanwu;Lotanna;;;
FN:Lotanna Iwuanyanwu
ORG:Top One Percent Ltd
TITLE:Founder & CEO
EMAIL;TYPE=INTERNET,WORK:${SITE.email}
URL:${SITE.url}
ADR;TYPE=WORK:;;;Abuja;FCT;;Nigeria
END:VCARD`

export default function Card() {
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const copy = async (text, message) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast(message)
    } catch {
      setToast('Copy failed — long-press to copy')
    }
  }

  const saveContact = () => {
    const blob = new Blob([VCARD], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lotanna-iwuanyanwu-top.vcf'
    a.click()
    URL.revokeObjectURL(url)
    setToast('Contact card downloaded')
  }

  const share = async () => {
    const data = { title: 'T.O.P — Top One Percent', text: SITE.tagline, url: SITE.url }
    if (navigator.share) {
      try { await navigator.share(data) } catch { /* user dismissed */ }
    } else {
      copy(SITE.url, 'Link copied')
    }
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface p-4 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -right-24 -top-24 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.10) 0%, transparent 70%)' }}
      />

      {/* Toast — announced politely, never blocks the UI */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        {toast && (
          <span
            className="rounded-full bg-obsidian px-4 py-2.5 text-sm text-bone shadow-lg"
            style={{ animation: 'fadeUp .3s var(--ease-out-expo) both' }}
          >
            {toast}
          </span>
        )}
      </div>

      <main
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_24px_70px_-30px_rgba(16,14,10,0.45)]"
        style={{ animation: 'fadeUp .8s var(--ease-out-expo) .05s both' }}
      >
        {/* Hero */}
        <div className="noise relative overflow-hidden bg-obsidian px-7 pb-8 pt-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.16) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 mb-7 inline-flex items-center gap-2 rounded-full border border-graphite bg-charcoal px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-lt animate-pulse-slow" aria-hidden="true" />
            <span className="section-label !text-[9px] !text-gold-lt">{SITE.location} · Est. {SITE.founded}</span>
          </div>

          <div className="relative z-10 mb-3 flex items-end" aria-label="T.O.P">
            {LETTERS.map(({ char, gold }, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`top-wordmark text-6xl ${gold ? 'text-gold-lt' : 'text-bone'}`}
                style={{ opacity: 0, animation: `letterDrop .55s var(--ease-out-expo) ${0.2 + i * 0.07}s forwards` }}
              >
                {char}
              </span>
            ))}
          </div>

          <p className="relative z-10 font-syne text-lg font-extrabold leading-tight text-bone">
            Built different.<br />Built to <span className="text-gold-lt">last.</span>
          </p>
        </div>

        {/* Identity */}
        <div className="flex items-center gap-4 border-b border-border px-7 py-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-surface2">
            <span className="font-syne text-xl font-extrabold text-gold">L</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-syne text-base font-bold text-ink">Lotanna Iwuanyanwu</p>
            <p className="text-xs text-gold">Founder &amp; CEO</p>
            <p className="mt-0.5 text-xs font-light text-subtle">Tech &amp; Media · {SITE.location}</p>
          </div>
        </div>

        {/* Primary actions first — the two things a card is actually for */}
        <div className="grid grid-cols-2 gap-2.5 border-b border-border px-7 py-5">
          <button onClick={saveContact} className="btn-gold !min-h-[46px] !px-4 !text-[13px]">
            Save contact
          </button>
          <button onClick={share} className="btn-outline !min-h-[46px] !px-4 !text-[13px]">
            Share card
          </button>
        </div>

        {/* Contact rows */}
        <div className="border-b border-border px-7 py-5">
          <p className="section-label mb-4 !text-[10px]">Contact</p>

          <div className="flex items-center gap-3 border-b border-surface2 py-3">
            <span className="w-11 shrink-0 text-[10px] uppercase tracking-[0.14em] text-subtle">Email</span>
            <a href={`mailto:${SITE.email}`} className="min-w-0 flex-1 truncate text-sm text-ink hover:text-gold">
              {SITE.email}
            </a>
            <button
              onClick={() => copy(SITE.email, 'Email copied')}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-subtle transition-colors hover:text-ink"
            >
              Copy<span className="sr-only"> email address</span>
            </button>
          </div>

          <div className="flex items-center gap-3 py-3">
            <span className="w-11 shrink-0 text-[10px] uppercase tracking-[0.14em] text-subtle">Web</span>
            <a href={SITE.url} target="_blank" rel="noreferrer noopener" className="flex-1 text-sm text-ink transition-colors hover:text-gold">
              topone.co
            </a>
            <button
              onClick={() => copy(SITE.url, 'Link copied')}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-subtle transition-colors hover:text-ink"
            >
              Copy<span className="sr-only"> website link</span>
            </button>
          </div>

          <ul className="mt-3 flex gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label} className="flex-1">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-lg border border-border bg-surface py-2.5 text-center text-[10px] uppercase tracking-[0.12em] text-subtle transition-colors hover:border-gold hover:text-gold"
                >
                  {s.label.split(' ')[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="border-b border-border px-7 py-5">
          <p className="section-label mb-4 !text-[10px]">What we do</p>
          <ul className="grid grid-cols-2 gap-2">
            {SVCS.map((s) => (
              <li key={s.num}>
                <div className="h-full rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-gold hover:bg-surface2">
                  <span className="mb-1.5 block font-syne text-xs font-bold tracking-[0.16em] text-gold">{s.num}</span>
                  <span className="text-xs leading-snug text-ink2">{s.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Work */}
        <div className="border-b border-border px-7 py-5">
          <p className="section-label mb-4 !text-[10px]">Recent work</p>
          <ul className="flex flex-col gap-3">
            {WORK.map((w, i) => (
              <li key={w.name} className="flex items-center gap-3">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse-slow"
                  style={{ background: w.dot, animationDelay: `${i * 0.5}s` }}
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm font-medium text-ink">{w.name}</span>
                <span className="rounded-md border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-subtle">
                  {w.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="px-7 pb-6 pt-5">
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent('Project Brief — T.O.P')}`}
            className="btn-gold w-full"
          >
            Start a project <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface px-7 py-4">
          <Link to="/" className="top-wordmark select-none text-base">
            <span className="text-ink">T</span><span className="text-gold">.</span>
            <span className="text-ink">O</span><span className="text-gold">.</span>
            <span className="text-ink">P</span><span className="text-gold">.</span>
          </Link>
          <Link to="/" className="text-xs font-light text-subtle transition-colors hover:text-ink">
            Visit the site →
          </Link>
        </div>
      </main>
    </div>
  )
}
