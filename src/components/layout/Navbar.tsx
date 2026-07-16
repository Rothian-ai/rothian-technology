import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { EASE } from '../../lib/motion'
import { NAV_ITEMS, type NavItem } from '../../lib/nav'
import { Button } from '../ui/Button'

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {item.to ? (
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
              isActive ? 'text-brand-coral' : 'text-white/85 hover:text-white'
            }`
          }
        >
          {item.label}
          <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </NavLink>
      ) : (
        <button
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
          aria-expanded={open}
          onFocus={() => setOpen(true)}
        >
          {item.label}
          <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {item.children!.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-white/10 text-brand-coral'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Fixed glass-pill navigation bar — the Rothian family header, tuned to Technology's navy ink. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useEffect(() => scrollY.on('change', (y) => setScrolled(y > 24)), [scrollY])
  useEffect(() => setMobileOpen(false), [location.pathname])
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5" id="primary-nav">
        <div className="container-site">
          <motion.nav
            animate={{
              backgroundColor: scrolled ? 'rgba(9,11,24,0.85)' : 'rgba(9,11,24,0.35)',
            }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between rounded-full border border-white/10 py-2.5 pl-5 pr-2.5 shadow-lg shadow-black/10 backdrop-blur-xl"
          >
            <Link to="/" className="shrink-0" aria-label="Rothian — Home">
              <img
                src="/logos/rothian-tech-logo-white.png"
                alt="Rothian — Powering Business"
                className="h-8 w-auto sm:h-9"
                width={117}
                height={36}
              />
            </Link>

            <div className="hidden items-center lg:flex">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <DesktopDropdown key={item.label} item={item} />
                ) : item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to!}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-brand-coral' : 'text-white/85 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button to="/contact" className="hidden sm:inline-flex">
                Get Started
              </Button>
              <button
                className="grid size-11 place-items-center rounded-full text-white lg:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-950/97 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-3 font-display text-3xl font-bold text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to ?? item.children![0].to}
                      className="block py-3 font-display text-3xl font-bold text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <ul className="mb-2 flex flex-col border-l border-white/15 pl-5">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link to={child.to} className="block py-2 text-base text-white/70">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: EASE } }}
              className="mt-8"
            >
              <Button to="/contact" size="lg" withArrow className="w-full">
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
