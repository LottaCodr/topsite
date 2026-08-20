import { useEffect, useRef, useState } from 'react'
import { useApp } from '../hooks/useApp.js'
import { PROJECTS, SITE, NAV_LINKS } from '../data/site.js'

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

  useEffect(() => {
    if (commandOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandOpen])

  if (!commandOpen) return null

  const actions = [
    // Navigation
    ...NAV_LINKS.map((link) => ({
      id: `nav-${link.id}`,
      group: 'Navigation',
      title: `Go to ${link.label}`,
      subtitle: `Scrolls smoothly to the #${link.id} section`,
      icon: '↗',
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
      icon: '✦',
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
      icon: theme === 'dark' ? '☀️' : '🌙',
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
      icon: currency === 'NGN' ? '$' : '₦',
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
      icon: soundEnabled ? '🔇' : '🔊',
      run: () => {
        toggleSound()
      },
    },
    // Direct Actions
    {
      id: 'action-whatsapp',
      group: 'Quick Connect',
      title: 'Chat with CEO Lotanna on WhatsApp',
      subtitle: '+234 913 577 5141 · Instant direct connection',
      icon: '💬',
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
      icon: '📇',
      run: () => {
        window.location.href = '/card'
      },
    },
    {
      id: 'action-email',
      group: 'Quick Connect',
      title: `Send Direct Email to ${SITE.emailDisplay}`,
      subtitle: 'Guaranteed reply in under 24 hours',
      icon: '✉',
      run: () => {
        window.location.href = `mailto:${SITE.email}?subject=Project%20Inquiry%20%E2%80%94%20T.O.P`
        setCommandOpen(false)
      },
    },
  ]

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.group.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setCommandOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run()
      }
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/75 backdrop-blur-md"
      onClick={() => setCommandOpen(false)}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        style={{ animation: 'fadeUp 0.25s var(--ease-out-expo) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 bg-surface2">
          <span className="text-gold font-syne font-bold text-sm">⌘K</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, case study, or jump to section..."
            className="w-full bg-transparent font-dm text-sm text-ink outline-none placeholder:text-muted"
          />
          <button
            onClick={() => setCommandOpen(false)}
            className="rounded-md border border-border px-2 py-1 text-[11px] font-syne text-muted hover:text-ink"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul className="flex flex-col gap-1">
              {filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => item.run()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all ${
                        isSelected
                          ? 'bg-gold/15 text-ink border border-gold/40'
                          : 'text-subtle hover:bg-surface2 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-surface text-sm text-gold">
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p className={`font-syne text-sm font-bold truncate ${isSelected ? 'text-gold-lt' : 'text-ink'}`}>
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="ml-2 shrink-0 rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                        {item.group}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border bg-surface2 px-4 py-2 text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="font-syne text-gold">
            Top One Percent · {SITE.location}
          </div>
        </div>
      </div>
    </div>
  )
}
