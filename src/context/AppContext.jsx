import React, { useEffect, useState, useCallback } from 'react'
import { AppContext } from './context.js'
import { PROJECTS } from '../data/site.js'

export function AppProvider({ children }) {
  // Theme: 'dark' (Obsidian Noir) or 'light' (Editorial Parchment)
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('top_theme')
      if (saved === 'light' || saved === 'dark') return saved
      return 'dark'
    }
    return 'dark'
  })

  // Currency: 'NGN' (₦) or 'USD' ($)
  const [currency, setCurrencyState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('top_currency')
      if (saved === 'USD' || saved === 'NGN') return saved
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (tz && !tz.includes('Lagos') && !tz.includes('Africa')) {
          return 'USD'
        }
      } catch {
        /* fallback */
      }
    }
    return 'NGN'
  })

  // Sound effects: default false
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('top_sound') === 'true'
    }
    return false
  })

  // Case Study Modal
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(null)

  // Command Palette
  const [commandOpen, setCommandOpen] = useState(false)

  // Preselected service/calculation for brief form
  const [briefPreset, setBriefPreset] = useState(null)

  // Live Lagos/Abuja studio time
  const [studioTime, setStudioTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        setStudioTime(formatter.format(now))
      } catch {
        setStudioTime('12:00:00')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.style.colorScheme = 'light'
    }
    localStorage.setItem('top_theme', theme)
  }, [theme])

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setCurrency = useCallback((curr) => {
    setCurrencyState(curr)
    localStorage.setItem('top_currency', curr)
  }, [])

  const toggleCurrency = useCallback(() => {
    setCurrencyState((prev) => {
      const next = prev === 'NGN' ? 'USD' : 'NGN'
      localStorage.setItem('top_currency', next)
      return next
    })
  }, [])

  const setSound = useCallback((val) => {
    setSoundEnabled(val)
    localStorage.setItem('top_sound', String(val))
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev
      localStorage.setItem('top_sound', String(next))
      return next
    })
  }, [])

  // Web Audio synth micro-haptics
  const playSound = useCallback(
    (type = 'click') => {
      if (!soundEnabled || typeof window === 'undefined') return
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        const now = ctx.currentTime
        if (type === 'click') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(800, now)
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.04)
          gain.gain.setValueAtTime(0.06, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
          osc.start(now)
          osc.stop(now + 0.04)
        } else if (type === 'open') {
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(320, now)
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.08)
          gain.gain.setValueAtTime(0.05, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
          osc.start(now)
          osc.stop(now + 0.08)
        } else if (type === 'success') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(523.25, now)
          osc.frequency.setValueAtTime(659.25, now + 0.06)
          osc.frequency.setValueAtTime(783.99, now + 0.12)
          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
          osc.start(now)
          osc.stop(now + 0.25)
        }
      } catch {
        /* audio context blocked */
      }
    },
    [soundEnabled]
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
        playSound('open')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playSound])

  const openCaseStudy = useCallback(
    (id) => {
      setActiveCaseStudyId(id)
      playSound('open')
    },
    [playSound]
  )

  const closeCaseStudy = useCallback(() => {
    setActiveCaseStudyId(null)
  }, [])

  const activeCaseStudy = activeCaseStudyId
    ? PROJECTS.find((p) => p.id === activeCaseStudyId) || null
    : null

  const formatPrice = useCallback(
    (ngnAmount, usdAmount) => {
      if (currency === 'USD') {
        return typeof usdAmount === 'number'
          ? `$${usdAmount.toLocaleString()}`
          : usdAmount
      }
      return typeof ngnAmount === 'number'
        ? `₦${ngnAmount.toLocaleString()}`
        : ngnAmount
    },
    [currency]
  )

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        currency,
        setCurrency,
        toggleCurrency,
        soundEnabled,
        setSound,
        toggleSound,
        playSound,
        activeCaseStudy,
        openCaseStudy,
        closeCaseStudy,
        commandOpen,
        setCommandOpen,
        briefPreset,
        setBriefPreset,
        studioTime,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
