import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Banknote,
  CreditCard,
  Mail,
  MessageCircle,
  Moon,
  Search,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useApp } from '../hooks/useApp.js'
import { PROJECTS, SITE, NAV_LINKS } from '../data/site.js'
import { cn } from '../lib/utils.js'
import { Badge } from './ui/badge.jsx'
import { Dialog, DialogContent } from './ui/dialog.jsx'

export default function CommandPalette() {
  const {
    commandOpen,
    setCommandOpen,
    theme,
    toggleTheme,
    currency,
    toggleCurrency,
    soundEnabled,
    toggleSound,
    openCaseStudy,
    playSound,
  } = useApp()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const actions = useMemo(
    () => [
      // Navigation
      ...NAV_LINKS.map((link) => ({
        id: `nav-${link.id}`,
        group: 'Navigation',
        title: `Go to ${link.label}`,
        subtitle: `Scrolls smoothly to the #${link.id} section`,
        icon: ArrowUpRight,
        run: () => {
          const el = document.getElementById(link.id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          setCommandOpen(false)
        },
      })),
      // Case Studies
      ...PROJECTS.map((p) => ({
        id: `case-${p.id}`,
        group: 'Case Studies',
        title: `View Case Study: ${p.name}`,
        subtitle: `${p.subtitle} · ${p.category}`,
        icon: Sparkles,
        run: () => {
          setCommandOpen(false)
          openCaseStudy(p.id)
        },
      })),
      // Preferences
      {
        id: 'pref-theme',
        group: 'Preferences',
        title: `Switch Theme to ${theme === 'dark' ? 'Editorial Light' : 'Obsidian Dark'}`,
        subtitle: `Currently active: ${theme === 'dark' ? 'Obsidian Noir' : 'Editorial Parchment'}`,
        icon: theme === 'dark' ? Sun : Moon,
        run: () => {
          toggleTheme()
          playSound('click')
        },
      },
      {
        id: 'pref-currency',
        group: 'Preferences',
        title: `Switch Currency to ${currency === 'NGN' ? 'USD ($)' : 'NGN (₦)'}`,
        subtitle: `Currently displaying prices in: ${currency}`,
        icon: Banknote,
        run: () => {
          toggleCurrency()
          playSound('click')
        },
      },
      {
        id: 'pref-sound',
        group: 'Preferences',
        title: `${soundEnabled ? 'Disable' : 'Enable'} Audio Micro-Haptics`,
        subtitle: `Subtle synthesized UI sound feedback: ${soundEnabled ? 'On' : 'Off'}`,
        icon: soundEnabled ? Volume2 : VolumeX,
        run: () => {
          toggleSound()
        },
      },
      // Quick Connect
      {
        id: 'action-whatsapp',
        group: 'Quick Connect',
        title: 'Chat with CEO Lotanna on WhatsApp',
        subtitle: '+234 913 577 5141 · Instant direct connection',
        icon: MessageCircle,
        run: () => {
          window.open(SITE.whatsapp, '_blank', 'noreferrer,noopener')
          setCommandOpen(false)
        },
      },
      {
        id: 'action-card',
        group: 'Quick Connect',
        title: 'Open Digital Business Card (/card)',
        subtitle: 'NFC-ready card with vCard download and QR code',
        icon: CreditCard,
        run: () => {
          window.location.href = '/card'
        },
      },
      {
        id: 'action-email',
        group: 'Quick Connect',
        title: `Send Direct Email to ${SITE.emailDisplay}`,
        subtitle: 'Guaranteed reply in under 24 hours',
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${SITE.email}?subject=Project%20Inquiry%20%E2%80%94%20T.O.P`
          setCommandOpen(false)
        },
      },
    ],
    [theme, currency, soundEnabled, openCaseStudy, playSound, setCommandOpen, toggleCurrency, toggleSound, toggleTheme]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q)
    )
  }, [actions, query])

  // Reset state when opened
  useEffect(() => {
    if (commandOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandOpen])

  // Keep selection within bounds
  useEffect(() => {
    setSelectedIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)))
  }, [filtered.length])

  const runAction = (action) => {
    playSound('click')
    action.run()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const action = filtered[selectedIndex]
      if (action) runAction(action)
    }
  }

  // Scroll the selected row into view
  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  let lastGroup = ''

  return (
    <Dialog
      open={commandOpen}
      onOpenChange={(open) => setCommandOpen(open)}
    >
      <DialogContent
        showCloseButton={false}
        className="top-[20%] max-w-xl translate-y-0 gap-0 overflow-hidden p-0"
        aria-describedby={undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="size-4 shrink-0 text-gold" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search sections, case studies, preferences…"
            aria-label="Command search"
            className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="shrink-0 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2" role="listbox" aria-label="Command results">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="mb-1 font-syne text-sm font-bold text-foreground">No commands found.</p>
              <p className="text-xs text-muted-foreground">
                Try “pricing”, “case study”, “theme”, or “WhatsApp”.
              </p>
            </div>
          ) : (
            filtered.map((action, i) => {
              const showGroup = action.group !== lastGroup
              lastGroup = action.group
              const Icon = action.icon
              const isSelected = i === selectedIndex
              return (
                <div key={action.id}>
                  {showGroup && (
                    <p className="px-3 pt-3 pb-1.5 font-syne text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {action.group}
                    </p>
                  )}
                  <button
                    type="button"
                    data-index={i}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onClick={() => runAction(action)}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left outline-none',
                      isSelected ? 'bg-gold/10' : 'hover:bg-secondary/60'
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-lg border transition-colors',
                        isSelected ? 'border-gold/40 bg-gold/15 text-gold' : 'border-border bg-secondary/60 text-muted-foreground'
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn('block truncate font-syne text-sm font-bold', isSelected ? 'text-gold' : 'text-foreground')}>
                        {action.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{action.subtitle}</span>
                    </span>
                    {isSelected && (
                      <Badge variant="gold" className="shrink-0 font-mono text-[9px]">
                        ⏎ Enter
                      </Badge>
                    )}
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-5 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-3">
            <span><kbd className="rounded border border-border bg-secondary px-1 font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="rounded border border-border bg-secondary px-1 font-mono">⏎</kbd> run</span>
          </span>
          <span className="top-wordmark text-sm">
            T<span className="text-gold">.</span>O<span className="text-gold">.</span>P<span className="text-gold">.</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
