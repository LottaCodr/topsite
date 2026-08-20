import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import CaseStudyModal from './components/CaseStudyModal.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Card = lazy(() => import('./pages/Card.jsx'))

function Shell() {
  const { pathname } = useLocation()
  const isCard = pathname === '/card'

  return (
    <>
      {!isCard && (
        <a href="#main" className="skip-link">Skip to main content</a>
      )}
      <Navbar />
      <main id="main">
        <Suspense
          fallback={
            <div className="flex min-h-[70vh] items-center justify-center" aria-hidden="true">
              <div className="flex flex-col items-center gap-3">
                <span className="h-1.5 w-28 overflow-hidden rounded-full bg-border">
                  <span className="block h-full w-1/2 origin-left animate-pulse rounded-full bg-gold" />
                </span>
                <span className="font-syne text-xs font-bold uppercase tracking-widest text-muted">
                  Loading T.O.P...
                </span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isCard && (
        <>
          <Footer />
          <StickyMobileCTA />
        </>
      )}
      {/* Global Overlays */}
      <CommandPalette />
      <CaseStudyModal />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AppProvider>
  )
}
