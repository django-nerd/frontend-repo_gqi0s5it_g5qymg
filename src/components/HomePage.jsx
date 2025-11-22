import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage({ cfg }) {
  const hero = cfg?.pages?.find(p=>p.route==='/')?.layout?.hero
  const featureRow = cfg?.pages?.find(p=>p.route==='/')?.layout?.featureRow || []
  const collections = cfg?.pages?.find(p=>p.route==='/')?.layout?.collectionsShowcase
  const brand = cfg?.visual?.brandColors || {}

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (hero?.autoplay && hero?.slides?.length > 1) {
      const id = setInterval(()=> setIndex((prev)=> (prev+1) % hero.slides.length), hero.autoplayInterval || 6000)
      return () => clearInterval(id)
    }
  }, [hero])

  const current = hero?.slides?.[index]

  return (
    <div>
      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden" aria-label={hero?.accessibility?.ariaLabel}>
        {current && (
          <div className="aspect-[16/7] w-full bg-center bg-cover" style={{backgroundImage:`url(${current.image})`}}>
            <div className="w-full h-full bg-gradient-to-t from-black/50 to-black/10 flex items-center">
              <div className="mx-auto max-w-7xl px-6">
                <h1 className="text-white text-4xl md:text-5xl font-semibold drop-shadow" style={{fontFamily: cfg?.visual?.fontFamilies?.headline}}>{current.headline}</h1>
                <p className="mt-3 text-white/90 max-w-xl">{current.subheadline}</p>
                <Link to={current?.cta?.route || '/shop'} className="inline-block mt-6 px-5 py-3 rounded-full text-sm font-medium" style={{background: brand.primary, color: '#fff'}}> {current?.cta?.label || 'Shop'} </Link>
              </div>
            </div>
          </div>
        )}
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {hero?.slides?.map((_, i)=> (
            <button key={i} onClick={()=>setIndex(i)} className={`w-2.5 h-2.5 rounded-full ${i===index ? 'bg-white' : 'bg-white/60'}`} aria-label={`Go to slide ${i+1}`}></button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {featureRow.map((f)=> (
          <div key={f.headline} className="rounded-xl p-5 border border-black/10 bg-white" style={{boxShadow: cfg?.visual?.shadow}}>
            <div className="font-semibold">{f.headline}</div>
            <p className="text-sm opacity-80">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Collections */}
      <section className="mt-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-semibold">{collections?.title}</h2>
          <Link to="/shop" className="text-sm underline">Shop all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections?.collections?.map((c)=> (
            <Link key={c.title} to={c.route} className="group block rounded-2xl overflow-hidden bg-center bg-cover aspect-[16/10]" style={{backgroundImage:`url(${c.image})`}}>
              <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent p-6 flex items-end">
                <span className="text-white text-lg font-medium drop-shadow">{c.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Instagram strip */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{cfg?.pages?.find(p=>p.route==='/')?.layout?.instagramStrip?.title}</h3>
          <a href={cfg?.pages?.find(p=>p.route==='/')?.layout?.instagramStrip?.cta?.url} className="text-sm underline">{cfg?.pages?.find(p=>p.route==='/')?.layout?.instagramStrip?.cta?.label}</a>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {cfg?.pages?.find(p=>p.route==='/')?.layout?.instagramStrip?.images?.map((src, i)=> (
            <div key={i} className="aspect-square rounded-xl overflow-hidden">
              <img src={src} alt="Instagram preview" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
