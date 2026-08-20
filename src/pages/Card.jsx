import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import { SITE, SOCIALS, SERVICES } from '../data/site.js'

const LETTERS = [
  { char: 'T', gold: false }, { char: '.', gold: true },
  { char: 'O', gold: false }, { char: '.', gold: true },
  { char: 'P', gold: false }, { char: '.', gold: true },
]

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Iwuanyanwu;Lotanna;;;
FN:Lotanna Iwuanyanwu
ORG:${SITE.legalName}
TITLE:Founder & Lead Architect
TEL;TYPE=CELL,VOICE:${SITE.phone}
TEL;TYPE=WORK,VOICE:${SITE.phone}
EMAIL;TYPE=INTERNET,WORK:${SITE.email}
URL:${SITE.url}
ADR;TYPE=WORK:;;;Abuja;FCT;;Nigeria
NOTE:${SITE.tagline} — ${SITE.url}
END:VCARD`

export default function Card() {
  const [toast, setToast] = useState('')
  const [qr, setQr] = useState('')
  const [showBankInfo, setShowBankInfo] = useState(false)
  const cardRef = useRef(null)

  // QR points to the live digital card URL
  useEffect(() => {
    QRCode.toDataURL(`${SITE.url}/card`, {
      margin: 1,
      width: 640,
      errorCorrectionLevel: 'M',
      color: { dark: '#0A0A0A', light: '#FFFFFF' },
    })
      .then(setQr)
      .catch(() => setQr(''))
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(t)
  }, [toast])

  // 3D perspective tilt effect on mouse movement
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card || window.matchMedia?.('(pointer: coarse)').matches) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = (-y / (rect.height / 2)) * 6
    const rotateY = (x / (rect.width / 2)) * 6

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  const copy = async (text, message) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast(message)
    } catch {
      setToast('Copy failed — long press to copy')
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
    setToast('vCard downloaded to contacts')
  }

  const share = async () => {
    const data = {
      title: 'T.O.P — Top One Percent',
      text: `${SITE.founder.name} · ${SITE.tagline}`,
      url: `${SITE.url}/card`,
    }
    if (navigator.share) {
      try {
        await navigator.share(data)
      } catch {
        /* dismissed */
      }
    } else {
      copy(`${SITE.url}/card`, 'Digital Card link copied')
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[100svh] items-center justify-center overflow-y-auto bg-surface p-4 sm:p-6 py-8 md:py-16 transition-colors"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -right-24 -top-24 h-96 w-96 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.18) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-24 -bottom-24 h-96 w-96 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.12) 0%, transparent 70%)' }}
      />

      {/* Floating Toast Notification */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
        {toast && (
          <span
            className="rounded-full bg-obsidian px-5 py-2.5 text-xs sm:text-sm font-semibold text-bone shadow-2xl border border-gold/40"
            style={{ animation: 'fadeUp .25s var(--ease-out-expo) both' }}
          >
            ✓ {toast}
          </span>
        )}
      </div>

      {/* Digital Business Card Container */}
      <main
        ref={cardRef}
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out"
        style={{ animation: 'fadeUp .7s var(--ease-out-expo) both' }}
      >
        {/* Obsidian Hero Header */}
        <div className="noise relative overflow-hidden bg-obsidian text-bone px-7 pb-8 pt-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-graphite bg-charcoal px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow" aria-hidden="true" />
              <span className="section-label !text-[9px] !text-gold-lt">{SITE.location} · Est. {SITE.founded}</span>
            </div>

            <span className="text-[10px] text-muted font-mono uppercase tracking-widest">
              Digital NFC
            </span>
          </div>

          <div className="relative z-10 mb-3 flex items-end" aria-label="T.O.P">
            {LETTERS.map(({ char, gold }, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`top-wordmark text-6xl ${gold ? 'text-gold-lt' : 'text-bone'}`}
                style={{ opacity: 0, animation: `letterDrop .5s var(--ease-out-expo) ${0.15 + i * 0.06}s forwards` }}
              >
                {char}
              </span>
            ))}
          </div>

          <p className="relative z-10 font-syne text-lg font-extrabold leading-tight text-bone">
            Built different.<br />Built to <span className="text-gold-lt">last.</span>
          </p>
        </div>

        {/* Identity Section */}
        <div className="flex items-center gap-4 border-b border-border bg-surface px-7 py-5">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-surface2 shadow-sm">
            <span className="font-syne text-2xl font-extrabold text-gold">L</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-syne text-base font-bold text-ink">{SITE.founder.name}</p>
            <p className="text-xs text-gold font-semibold">{SITE.founder.role}</p>
            <p className="mt-0.5 text-xs font-light text-subtle">{SITE.legalName} · {SITE.location}</p>
          </div>
        </div>

        {/* Primary Actions (Save Contact + Share Card) */}
        <div className="grid grid-cols-2 gap-2.5 border-b border-border bg-surface2 px-7 py-4">
          <button onClick={saveContact} className="btn-gold !min-h-[44px] !px-3 !text-xs">
            Save Contact 📇
          </button>
          <button onClick={share} className="btn-outline !min-h-[44px] !px-3 !text-xs">
            Share Card 🔗
          </button>
        </div>

        {/* Direct Contact Options */}
        <div className="border-b border-border bg-surface px-7 py-5">
          <p className="section-label mb-3 !text-[10px]">Direct Connect</p>

          {/* Email */}
          <div className="flex items-center gap-3 border-b border-border/60 py-2.5">
            <span className="w-16 shrink-0 text-[10px] uppercase tracking-wider text-muted font-bold">Email</span>
            <a href={`mailto:${SITE.email}`} className="min-w-0 flex-1 truncate text-xs sm:text-sm text-ink hover:text-gold">
              {SITE.emailDisplay}
            </a>
            <button
              onClick={() => copy(SITE.email, 'Email address copied')}
              className="rounded-md border border-border bg-surface2 px-2.5 py-1 text-[11px] text-subtle hover:text-ink hover:border-gold"
            >
              Copy
            </button>
          </div>

          {/* WhatsApp Direct */}
          <div className="flex items-center gap-3 border-b border-border/60 py-2.5">
            <span className="w-16 shrink-0 text-[10px] uppercase tracking-wider text-muted font-bold">WhatsApp</span>
            <a
              href={`https://wa.me/${SITE.phone.replace('+', '')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="min-w-0 flex-1 truncate text-xs sm:text-sm text-emerald-500 font-medium hover:underline"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${SITE.phone.replace('+', '')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-border bg-surface2 px-2.5 py-1 text-[11px] text-emerald-500 font-semibold hover:border-emerald-500"
            >
              Chat 💬
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 border-b border-border/60 py-2.5">
            <span className="w-16 shrink-0 text-[10px] uppercase tracking-wider text-muted font-bold">Phone</span>
            <a href={`tel:${SITE.phone}`} className="min-w-0 flex-1 truncate text-xs sm:text-sm text-ink hover:text-gold">
              {SITE.phoneDisplay}
            </a>
            <button
              onClick={() => copy(SITE.phone, 'Phone number copied')}
              className="rounded-md border border-border bg-surface2 px-2.5 py-1 text-[11px] text-subtle hover:text-ink hover:border-gold"
            >
              Copy
            </button>
          </div>

          {/* Website */}
          <div className="flex items-center gap-3 py-2.5">
            <span className="w-16 shrink-0 text-[10px] uppercase tracking-wider text-muted font-bold">Web</span>
            <a href={SITE.url} target="_blank" rel="noreferrer noopener" className="flex-1 text-xs sm:text-sm text-ink hover:text-gold">
              topone.co
            </a>
            <button
              onClick={() => copy(SITE.url, 'Website link copied')}
              className="rounded-md border border-border bg-surface2 px-2.5 py-1 text-[11px] text-subtle hover:text-ink hover:border-gold"
            >
              Copy
            </button>
          </div>

          {/* Socials */}
          <ul className="mt-3 flex gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label} className="flex-1">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-lg border border-border bg-surface2 py-2 text-center text-[10px] uppercase tracking-wider text-subtle transition-colors hover:border-gold hover:text-gold"
                >
                  {s.label.split(' ')[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* QR Code Scan Panel */}
        <div className="border-b border-border bg-surface2 px-7 py-5">
          <p className="section-label mb-3 !text-[10px]">Instant QR Scan</p>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-3.5 shadow-sm">
            {qr ? (
              <a
                href={qr}
                download="top-digital-card-qr.png"
                aria-label="Download QR code image"
                className="shrink-0 rounded-lg border border-border bg-white p-1.5 transition-transform hover:scale-105"
              >
                <img src={qr} alt="Scan QR Code to open T.O.P digital card" width={84} height={84} className="h-[84px] w-[84px]" />
              </a>
            ) : (
              <div className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-lg border border-border bg-white text-[10px] text-muted">
                Loading QR...
              </div>
            )}
            <div className="min-w-0">
              <p className="font-syne text-xs sm:text-sm font-bold text-ink mb-1">
                Scan to sync card
              </p>
              <p className="text-[11px] font-light leading-relaxed text-subtle">
                Scan with any iPhone or Android camera to immediately open this live contact card.
              </p>
            </div>
          </div>
        </div>

        {/* Banking / Invoicing Wire Details Drawer */}
        <div className="border-b border-border bg-surface px-7 py-4">
          <button
            type="button"
            onClick={() => setShowBankInfo(!showBankInfo)}
            className="flex w-full items-center justify-between text-xs font-syne font-bold text-ink hover:text-gold"
          >
            <span>Invoicing &amp; Wire Payment Rails</span>
            <span className="text-gold">{showBankInfo ? '▲' : '▼'}</span>
          </button>

          {showBankInfo && (
            <div className="mt-3 rounded-xl border border-border bg-surface2 p-3.5 text-xs text-subtle">
              <p className="font-bold text-ink mb-1">{SITE.legalName}</p>
              <p>Account verification, wire transfers, and currency settlement details available upon contract execution.</p>
              <div className="mt-2 flex gap-2">
                <span className="rounded bg-surface px-2 py-0.5 text-[10px] text-muted border border-border">NGN ₦</span>
                <span className="rounded bg-surface px-2 py-0.5 text-[10px] text-muted border border-border">USD $</span>
                <span className="rounded bg-surface px-2 py-0.5 text-[10px] text-muted border border-border">Crypto Rails</span>
              </div>
            </div>
          )}
        </div>

        {/* Services Chips */}
        <div className="border-b border-border bg-surface px-7 py-5">
          <p className="section-label mb-3 !text-[10px]">What We Engineer</p>
          <ul className="grid grid-cols-2 gap-2">
            {SERVICES.map((s) => (
              <li key={s.num}>
                <div className="h-full rounded-xl border border-border bg-surface2 p-2.5 text-left">
                  <span className="block font-syne text-[10px] font-bold text-gold">{s.num}</span>
                  <span className="text-xs font-medium text-ink2 leading-tight">{s.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Start Project CTA */}
        <div className="bg-surface2 px-7 pb-6 pt-5">
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent('Project Brief — T.O.P')}`}
            className="btn-gold w-full text-center"
          >
            Initiate Project Brief <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Footer Navigation Back to Home */}
        <div className="flex items-center justify-between border-t border-border bg-surface px-7 py-4">
          <Link to="/" className="top-wordmark text-base">
            <span className="text-ink">T</span><span className="text-gold">.</span>
            <span className="text-ink">O</span><span className="text-gold">.</span>
            <span className="text-ink">P</span><span className="text-gold">.</span>
          </Link>
          <Link to="/" className="text-xs font-semibold text-gold hover:underline">
            Visit Full Studio Site →
          </Link>
        </div>
      </main>
    </div>
  )
}
