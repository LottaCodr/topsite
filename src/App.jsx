import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'

/* Route-level code-splitting: the qrcode library lives only in the /card
   chunk, so the home page bundle stays small. */
const Home = lazy(() => import('./pages/Home.jsx'))
const Card = lazy(() => import('./pages/Card.jsx'))

function Shell() {
  const { pathname } = useLocation()
  const isCard = pathname === '/card'

  return (
    <>
      {!isCard && (
        <a href="#main" className="skip-link">Skip to content</a>
      )}
      <Navbar />
      <main id="main">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center" aria-hidden="true">
              <span className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                <span className="block h-full w-1/2 origin-left animate-pulse rounded-full bg-gold" />
              </span>
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
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
