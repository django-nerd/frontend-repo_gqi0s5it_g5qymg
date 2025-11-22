import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ cfg }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const headerCfg = cfg?.globalHeader
  const brand = cfg?.visual?.brandColors || {}

  return (
    <header
      className={`w-full top-0 z-40 transition-all ${headerCfg?.behavior?.sticky ? 'sticky' : ''} ${scrolled && headerCfg?.behavior?.shrinkOnScroll ? 'backdrop-blur bg-white/70 shadow-sm' : 'bg-transparent'}`}
      style={{color: brand.text}}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between py-4 ${scrolled ? 'py-2' : 'py-4'}`}>
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={headerCfg?.logo?.src} alt={headerCfg?.logo?.alt || 'Logo'} className="h-8 w-auto" onError={(e)=>{e.currentTarget.style.display='none'}} />
              <span className="font-semibold text-lg">{cfg?.name}</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {headerCfg?.topNav?.map((item)=> (
              <Link key={item.label} to={item.route} className="text-sm hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {headerCfg?.utilityNav?.map((u)=> (
              u.route ? (
                <Link key={u.label} to={u.route} className="text-sm px-3 py-1.5 rounded-full hover:bg-black/5">{u.label}</Link>
              ) : (
                <button key={u.label} className="text-sm px-3 py-1.5 rounded-full hover:bg-black/5" aria-label={u.label}>{u.label}</button>
              )
            ))}
          </div>

          {headerCfg?.behavior?.mobileHamburger && (
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
              <span className="block w-5 h-0.5 bg-black mb-1" />
              <span className="block w-5 h-0.5 bg-black mb-1" />
              <span className="block w-5 h-0.5 bg-black" />
            </button>
          )}
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <nav className="flex flex-col gap-2">
              {headerCfg?.topNav?.map((item)=> (
                <Link key={item.label} to={item.route} className="px-3 py-2 rounded-lg hover:bg-black/5">{item.label}</Link>
              ))}
            </nav>
            <div className="pt-2 flex flex-wrap gap-2">
              {headerCfg?.utilityNav?.map((u)=> (
                u.route ? (
                  <Link key={u.label} to={u.route} className="text-sm px-3 py-1.5 rounded-full bg-black/5">{u.label}</Link>
                ) : (
                  <button key={u.label} className="text-sm px-3 py-1.5 rounded-full bg-black/5">{u.label}</button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
