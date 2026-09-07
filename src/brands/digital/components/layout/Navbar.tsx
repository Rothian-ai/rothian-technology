import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { EASE } from '../../lib/motion'
import { PRIMARY_CTA, NAV_ITEMS } from '../../lib/nav'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  useEffect(() => scrollY.on('change', (y) => setScrolled(y > 24)), [scrollY])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
        <div className="container-site">
          <motion.nav
            animate={{ backgroundColor: scrolled ? 'rgba(8,6,10,0.85)' : 'rgba(8,6,10,0.35)' }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between rounded-full border border-white/10 py-2.5 pl-5 pr-2.5 backdrop-blur-xl"
          >
            <Link to="/digital" className="flex shrink-0 items-center gap-3" aria-label="Rothian Digital — home">
              <img
                src="/digital/logos/rothian-digital-logo-white.png"
                alt="Rothian Digital"
                className="h-8 w-auto sm:h-9"
                width={466}
                height={156}
              />
            </Link>

            <div className="hidden items-center lg:flex">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors focus-brand ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-festival-gradient"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={PRIMARY_CTA.to}
                className="group hidden items-center gap-2 rounded-full bg-festival-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(168,24,122,0.6)] transition-transform duration-300 hover:scale-[1.03] focus-brand sm:inline-flex"
              >
                {PRIMARY_CTA.label}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid size-11 place-items-center rounded-full text-white focus-brand lg:hidden"
              >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-950/97 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="flex flex-col"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <Link
                    to={item.to}
                    className="block border-b border-white/10 py-4 font-display text-3xl font-bold text-white"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <Link
              to={PRIMARY_CTA.to}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white"
            >
              {PRIMARY_CTA.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
