import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import { nav, site } from '../data/site.js'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="AUCIS home">
      <img
        src="/au-logo.png"
        alt="Air University Kamra"
        className="h-11 w-11 shrink-0 object-contain opacity-95 transition duration-500 group-hover:opacity-100"
      />
      <span className="leading-none">
        <span className="block font-heavy text-lg tracking-[0.22em] text-cream">AUCIS</span>
        <span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-cream/40">
          Air University Kamra
        </span>
      </span>
    </Link>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return (
    <div className="relative flex min-h-screen flex-col">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
          scrolled ? 'border-b border-cream/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[13px] tracking-wide transition duration-300 ${
                    isActive ? 'text-cream' : 'text-cream/55 hover:text-cream'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-sand to-transparent transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/join" className="btn-primary hidden px-5 py-2.5 text-[13px] sm:inline-flex">
              Join AUCIS
              <Icon name="arrowRight" size={15} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 md:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-cream/10 bg-ink/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="container-page flex flex-col py-4">
            {[...nav, { label: 'Join Us', to: '/join' }].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `border-b border-cream/5 py-3 text-sm tracking-wide ${
                    isActive ? 'text-cream' : 'text-cream/60'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <footer className="relative mt-24 border-t border-cream/10 bg-navy/40">
        <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/50">
              {site.intro}
            </p>
            <div className="mt-6 flex gap-3">
              {site.socials.length === 0 ? (
                <span className="text-xs uppercase tracking-[0.22em] text-cream/30">
                  Social links coming soon
                </span>
              ) : (
                site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-cream/10 text-cream/60 transition hover:border-sand/40 hover:text-cream"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon || 'arrowUpRight'} size={16} />
                  </a>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-cream/40">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[...nav, { label: 'Join Us', to: '/join' }].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-cream/60 transition hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-cream/40">Campus</h3>
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              {site.location.line1}
              <br />
              {site.location.line2}
            </p>
            <p className="mt-3 text-sm text-cream/60">
              {site.email ? (
                <a href={`mailto:${site.email}`} className="transition hover:text-cream">
                  {site.email}
                </a>
              ) : (
                <span className="text-cream/35">Official email coming soon</span>
              )}
            </p>
          </div>
        </div>

        <div className="container-page flex flex-col gap-2 border-t border-cream/10 py-6 text-[11px] uppercase tracking-[0.2em] text-cream/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} AUCIS · Air University Kamra</span>
          <span>Built by the society, for the society</span>
        </div>
      </footer>
    </div>
  )
}
