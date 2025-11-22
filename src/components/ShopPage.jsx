import { useEffect, useMemo, useState } from 'react'

export default function ShopPage({ cfg }) {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const controller = new AbortController()
    async function fetchItems() {
      setLoading(true)
      try {
        const url = new URL(`${baseUrl}/api/products`)
        if (q) url.searchParams.set('q', q)
        if (category) url.searchParams.set('category', category)
        const res = await fetch(url.toString(), { signal: controller.signal })
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        if (e.name !== 'AbortError') console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
    return () => controller.abort()
  }, [q, category, baseUrl])

  const leftSidebar = useMemo(() => cfg?.pages?.find(p=>p.route==='/shop')?.layout?.leftSidebar, [cfg])
  const gridCfg = useMemo(() => cfg?.pages?.find(p=>p.route==='/shop')?.layout?.productGrid, [cfg])

  const categories = ['Mugs','Photo Gifts','Jewelry','Decor']

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <aside className="md:col-span-3">
        <div className="rounded-xl border p-4 bg-white">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder={leftSidebar?.components?.[0]?.placeholder}
            className="w-full border rounded-lg px-3 py-2 text-sm" />
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Category</div>
            <div className="flex flex-col gap-2">
              {categories.map(c => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="category" checked={category===c} onChange={()=> setCategory(c)} /> {c}
                </label>
              ))}
              <button className="text-xs underline mt-1 self-start" onClick={()=>{setCategory(''); setQ('')}}>Reset filters</button>
            </div>
          </div>
        </div>
      </aside>

      <main className="md:col-span-9">
        {loading ? (
          <p className="text-sm opacity-60">Loading...</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl border p-6 text-center bg-white">No products match your filters.</div>
        ) : (
          <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`}>
            {items.map((p)=> (
              <div key={p.id} className="rounded-xl overflow-hidden border bg-white group">
                <div className="aspect-[4/5] bg-center bg-cover" style={{backgroundImage:`url(${p.images?.[0]})`}}></div>
                <div className="p-3">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-sm opacity-70">{p.price}</div>
                </div>
                <div className="p-3 pt-0">
                  <button className="w-full text-sm px-3 py-2 rounded-lg bg-black text-white">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
