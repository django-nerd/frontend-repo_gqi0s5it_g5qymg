import { Link } from 'react-router-dom'

export default function Footer({ cfg }) {
  const footer = cfg?.globalFooter
  const brand = cfg?.visual?.brandColors || {}
  return (
    <footer className="mt-16 border-t border-black/10" style={{background: brand.muted}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {footer?.columns?.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links?.map((l) => (
                  <li key={l.label}>
                    {l.route?.startsWith('http') ? (
                      <a href={l.route} className="text-sm hover:opacity-80">{l.label}</a>
                    ) : (
                      <Link to={l.route} className="text-sm hover:opacity-80">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm opacity-70">{footer?.copyright}</p>
          <div className="flex items-center gap-4">
            {footer?.social?.map((s)=> (
              <a key={s.name} href={s.url} aria-label={s.ariaLabel} className="text-sm hover:opacity-80">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
