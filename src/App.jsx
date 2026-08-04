import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Card from './pages/Card.jsx'
import { useLocation } from 'react-router-dom'

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isCard && <Footer />}
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
