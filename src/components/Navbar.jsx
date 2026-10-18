import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Banknote,
  CreditCard,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Settings2,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site.js'
import { useScrollState, useActiveSection } from '../hooks/useScrollState.js'
import { useApp } from '../hooks/useApp.js'
import { cn } from '../lib/utils.js'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { Separator } from './ui/separator.jsx'
import { Switch } from './ui/switch.jsx'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip.jsx'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from './ui/dialog.jsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu.jsx'

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

function Wordmark({ className }) {
  return (
    <span className={cn('top-wordmark select-none', className)} aria-hidden="true">
      <span className="text-foreground">T</span><span className="text-gold">.</span>
      <span className="text-foreground">O</span><span className="text-gold">.</span>
      <span className="text-foreground">P</span><span className="text-gold">.</span>
    </span>
  )
}

export default function Navbar() {
  const { scrolled, hidden, progress } = useScrollState(24)
  const { pathname } = useLocation()
  const active = useActiveSection(SECTION_IDS)

  const {
    theme,
    setTheme,
    currency,
    setCurrency,
    soundEnabled,
    toggleSound,
    setCommandOpen,
    studioTime,
    playSound,
  } = useApp()

  if (pathname === '/card') return null

  return (
    <header
      style={{
        transform: hidden ? 'translate3d(0,-100%,0)' : 'translate3d(0,0,0)',
        willChange: 'transform',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease, border-color 0.3s ease',
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-40',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.12)]'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      {/* Reading progress indicator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold via-gold-lt to-gold/0"
        style={{
          transform: `scaleX(${progress})`,
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Studio status bar (desktop) */}
      <div className="hidden border-b border-border/40 bg-secondary/40 py-1 text-[11px] text-muted-foreground lg:block">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-success" />
              <span className="font-syne font-bold text-foreground">Abuja Studio:</span>
              <span className="font-mono">{studioTime || '12:00'} WAT</span>
            </span>
            <span className="text-border">|</span>
            <span>
              Status:{' '}
              <span className="font-semibold text-gold">
                {SITE.availability.status} for {SITE.availability.quarter}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Guaranteed &lt;24h brief response</span>
            <span className="text-border">|</span>
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-gold"
            >
              {SITE.emailDisplay}
            </a>
          </div>
        </div>
      </div>

      <nav
        aria-label="Primary navigation"
        className="container-page flex items-center justify-between"
        style={{
          paddingTop: scrolled ? '0.65rem' : '1rem',
          paddingBottom: scrolled ? '0.65rem' : '1rem',
          transition: 'padding 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          className="shrink-0 transition-opacity hover:opacity-80"
          aria-label="T.O.P (Top One Percent) Home"
        >
          <Wordmark className="text-2xl sm:text-3xl" />
        </Link>

        {/* Desktop section links */}
        <ul className="hidden items-center gap-1 rounded-xl border border-border/80 bg-secondary/60 p-1.5 backdrop-blur-md xl:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-lg px-3.5 py-1.5 font-syne text-xs font-semibold tracking-wide transition-colors duration-200',
                    isActive ? 'bg-gold text-[#0E0C08] shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCommandOpen(true)
              playSound('open')
            }}
            className="text-muted-foreground"
          >
            <Search />
            <span>Search</span>
            <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-gold">
              ⌘K
            </kbd>
          </Button>

          {/* Currency selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Select display currency">
                <Banknote />
                <span>{currency === 'NGN' ? '₦ NGN' : '$ USD'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Currency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currency}
                onValueChange={(v) => {
                  setCurrency(v)
                  playSound('click')
                }}
              >
                <DropdownMenuRadioItem value="NGN">
                  <span className="font-mono">₦</span> Nigerian Naira (NGN)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="USD">
                  <span className="font-mono">$</span> US Dollar (USD)
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Preferences */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon-sm" aria-label="Preferences">
                    <Settings2 />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Preferences</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                  playSound('click')
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
                <span>{theme === 'dark' ? 'Editorial Light' : 'Obsidian Dark'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Audio micro-haptics</DropdownMenuLabel>
              <DropdownMenuItem
                className="justify-between"
                onSelect={(e) => e.preventDefault()}
              >
                <span className="flex items-center gap-2.5">
                  {soundEnabled ? <Volume2 /> : <VolumeX />}
                  Sound feedback
                </span>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={() => toggleSound()}
                  aria-label="Toggle UI sound feedback"
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/card">
                  <CreditCard />
                  Digital business card
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild size="sm" className="px-4">
            <a href="#contact" onClick={() => playSound('open')}>
              Start Brief
              <ArrowRight />
            </a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                  playSound('click')
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</TooltipContent>
          </Tooltip>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 overflow-y-auto p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="text-2xl">
                  <Wordmark />
                </SheetTitle>
                <SheetDescription className="section-label !text-[10px]">
                  Navigation Index · {SITE.location}
                </SheetDescription>
              </SheetHeader>

              <ul className="flex flex-col gap-1 px-6 py-6">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <SheetClose asChild>
                      <a
                        href={l.href}
                        className="flex items-center justify-between rounded-lg py-3 font-syne text-xl font-bold text-foreground transition-colors hover:text-gold"
                      >
                        {l.label}
                        <ArrowRight className="size-4 text-gold" />
                      </a>
                    </SheetClose>
                  </li>
                ))}
                <li>
                  <SheetClose asChild>
                    <Link
                      to="/card"
                      className="flex items-center justify-between rounded-lg py-3 font-syne text-xl font-bold text-gold"
                    >
                      Digital Business Card
                      <CreditCard className="size-4" />
                    </Link>
                  </SheetClose>
                </li>
              </ul>

              <div className="mt-auto flex flex-col gap-3 border-t border-border px-6 py-6">
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => setCommandOpen(true)}
                      className="w-full"
                    >
                      <Search />
                      Search
                    </Button>
                  </SheetClose>
                  <Button variant="outline" asChild className="w-full text-success">
                    <a href={SITE.whatsapp} target="_blank" rel="noreferrer noopener">
                      <MessageCircle />
                      WhatsApp
                    </a>
                  </Button>
                </div>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full" onClick={() => playSound('open')}>
                    <a href="#contact">
                      Start a Project Brief
                      <ArrowRight />
                    </a>
                  </Button>
                </SheetClose>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <Badge variant="success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-slow" />
                    {SITE.availability.status}
                  </Badge>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
