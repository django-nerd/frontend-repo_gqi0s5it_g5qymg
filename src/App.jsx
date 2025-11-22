import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ShopPage from './components/ShopPage'
import './index.css'

function Shell({ children, cfg }) {
  const brand = cfg?.visual?.brandColors || {}
  return (
    <div style={{background: brand.bg, color: brand.text}}>
      <Header cfg={cfg?.site || cfg} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">{children}</main>
      <Footer cfg={cfg?.site || cfg} />
    </div>
  )
}

function App() {
  const [cfg, setCfg] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/site`).then(r=>r.json()).then(setCfg).catch(()=>{})
  }, [baseUrl])

  if (!cfg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm opacity-60">Loading Custom Treasures...</p>
      </div>
    )
  }

  const site = cfg.site || cfg

  return (
    <BrowserRouter>
      <Shell cfg={site}>
        <Routes>
          <Route path="/" element={<HomePage cfg={site} />} />
          <Route path="/shop" element={<ShopPage cfg={site} />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
