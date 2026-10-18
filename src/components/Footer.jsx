import { Link } from 'react-router-dom'
import { AtSign, ArrowUpRight, Clock, CreditCard, Globe, Mail, MapPin, Moon, Phone, Sun, Volume2, VolumeX } from 'lucide-react'
import { FOOTER_LINKS, SITE, SOCIALS } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'
import { Button } from './ui/button.jsx'
import { Separator } from './ui/separator.jsx'
import { Switch } from './ui/switch.jsx'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip.jsx'

const SOCIAL_ICONS = {
  Instagram: AtSign,
  'X / Twitter': Globe,
  LinkedIn: Globe,
  'WhatsApp Direct': Phone,
}

export default function Footer() {
  const { theme, toggleTheme, currency, toggleCurrency, soundEnabled, toggleSound, studioTime, playSound } =
    useApp()

  return (
    <footer className="noise relative overflow-hidden border-t border-border bg-[#0A0A0A] pt-16 text-[#FAF7F2]" style={{ color: '#FAF7F2' }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(184,146,74,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="container-page relative z-10">
        <div className="grid gap-12 pb-14 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" className="top-wordmark mb-5 inline-block text-3xl" aria-label="T.O.P home">
              <span style={{ color: '#FAF7F2' }}>T</span><span className="text-gold">.</span>
              <span style={{ color: '#FAF7F2' }}>O</span><span className="text-gold">.</span>
              <span style={{ color: '#FAF7F2' }}>P</span><span className="text-gold">.</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm font-light leading-relaxed" style={{ color: 'rgba(250,247,242,0.6)' }}>
              {SITE.tagline} Elite brand systems, full-stack AI engineering, and kinetic motion
              for category-defining companies worldwide.
            </p>

            <ul className="mb-6 flex flex-col gap-2.5 text-sm" style={{ color: 'rgba(250,247,242,0.75)' }}>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-gold" />
                {SITE.location}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 text-gold" />
                <span className="font-mono">{studioTime || '12:00'}</span>
                <span style={{ color: 'rgba(250,247,242,0.5)' }}>{SITE.timezoneDisplay}</span>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-lt">
                  <Mail className="size-4 text-gold" />
                  {SITE.emailDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-lt">
                  <Phone className="size-4 text-gold" />
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>

            {/* Socials */}
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label] || Globe
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={`${s.label}: ${s.handle}`}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs transition-colors hover:border-gold/50 hover:text-gold-lt"
                    >
                      <Icon className="size-3.5" />
                      {s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} className="lg:col-span-2" aria-label={group}>
              <p className="section-label mb-5">{group}</p>
              <ul className="flex flex-col gap-3 text-sm" style={{ color: 'rgba(250,247,242,0.7)' }}>
                {links.map((l) => (
                  <li key={l.label}>
                    {l.internal ? (
                      <Link to={l.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-lt">
                        {l.label}
                        <CreditCard className="size-3.5 opacity-60" />
                      </Link>
                    ) : (
                      <a href={l.href} className="transition-colors hover:text-gold-lt">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Preferences */}
          <div className="lg:col-span-2">
            <p className="section-label mb-5">Preferences</p>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2" style={{ color: 'rgba(250,247,242,0.7)' }}>
                  {theme === 'dark' ? <Moon className="size-4 text-gold" /> : <Sun className="size-4 text-gold" />}
                  {theme === 'dark' ? 'Obsidian' : 'Parchment'}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme()
                        playSound('click')
                      }}
                      className="cursor-pointer rounded-md border border-white/15 bg-white/5 px-3 py-1 font-syne text-xs font-bold text-gold-lt transition-colors hover:border-gold/50"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                      Switch
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span style={{ color: 'rgba(250,247,242,0.7)' }}>Currency</span>
                <button
                  type="button"
                  onClick={() => {
                    toggleCurrency()
                    playSound('click')
                  }}
                  className="cursor-pointer rounded-md border border-white/15 bg-white/5 px-3 py-1 font-syne text-xs font-bold text-gold-lt transition-colors hover:border-gold/50"
                  aria-label="Toggle display currency"
                >
                  {currency === 'NGN' ? '₦ NGN' : '$ USD'}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2" style={{ color: 'rgba(250,247,242,0.7)' }}>
                  {soundEnabled ? <Volume2 className="size-4 text-gold" /> : <VolumeX className="size-4 text-gold" />}
                  Sound
                </span>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={() => toggleSound()}
                  aria-label="Toggle UI sound feedback"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator style={{ background: 'rgba(250,247,242,0.12)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-xs sm:flex-row" style={{ color: 'rgba(250,247,242,0.5)' }}>
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. Founded {SITE.founded} in Abuja, Nigeria.
          </p>
          <div className="flex items-center gap-5">
            <a href="#home" className="inline-flex items-center gap-1 transition-colors hover:text-gold-lt">
              Back to top
              <ArrowUpRight className="size-3.5" />
            </a>
            <Button asChild variant="ghost" size="sm" className="text-gold-lt hover:bg-white/5 hover:text-gold-lt">
              <a href="#contact">Start a Brief</a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
