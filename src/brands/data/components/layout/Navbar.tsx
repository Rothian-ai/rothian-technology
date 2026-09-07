import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { primaryNav, site, socials } from '@data/data/site';
import { services } from '@data/data/services';
import { Button } from '@data/components/ui/Button';
import { cn } from '@data/lib/cn';
import { EASE } from '@data/lib/motion';
import { useScrollLock } from '@data/lib/hooks';
import { pad } from '@data/lib/format';

/** Services dropdown — the family header's disclosure pattern. */
function ServicesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to="/data/services"
        className={({ isActive }) =>
          cn(
            'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
            isActive ? 'text-brand-green' : 'text-paper/85 hover:text-paper',
          )
        }
      >
        Services
        <ChevronDown
          className={cn('size-3.5 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </NavLink>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {services.map((service) => (
                <NavLink
                  key={service.slug}
                  to={`/data/services/${service.slug}`}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-xl px-4 py-2.5 text-sm transition-colors',
                      isActive
                        ? 'bg-white/10 text-brand-green'
                        : 'text-paper/80 hover:bg-white/5 hover:text-paper',
                    )
                  }
                >
                  {service.title}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Fixed glass-pill navigation bar — the Rothian family header, in Data's green. */
export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const { scrollY } = useScroll();

  // Navigating anywhere — link, back button, anything — closes the overlay.
  // Adjusted during render rather than in an effect so there is no frame where
  // the menu is still covering the new page.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useScrollLock(open);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-brand-green focus:px-5 focus:py-3 focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5" id="primary-nav">
        <div className="container-site">
          <motion.nav
            animate={{
              backgroundColor: scrolled ? 'rgba(10,18,16,0.85)' : 'rgba(10,18,16,0.35)',
            }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between rounded-full border border-white/10 py-2.5 pl-5 pr-2.5 shadow-lg shadow-black/10 backdrop-blur-xl"
          >
            <Link to="/data" className="shrink-0" aria-label={`${site.name} — Home`}>
              <img
                src={site.logo.light}
                alt={site.name}
                className="h-8 w-auto sm:h-9"
                width={466}
                height={148}
              />
            </Link>

            <div className="hidden items-center lg:flex">
              {primaryNav.map((item) =>
                item.href === '/data/services' ? (
                  <ServicesDropdown key={item.href} />
                ) : (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/data'}
                    className={({ isActive }) =>
                      cn(
                        'px-4 py-2 text-sm font-medium transition-colors',
                        isActive ? 'text-brand-green' : 'text-paper/85 hover:text-paper',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button href="/data/contact" size="md" className="hidden sm:inline-flex" arrow>
                Let&rsquo;s Talk
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid size-11 place-items-center rounded-full border border-white/15 text-paper transition-colors hover:border-brand-green/60 hover:text-brand-green lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink-950 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="container-site flex min-h-full flex-col py-6">
        <div className="flex h-16 items-center justify-between">
          <img src={site.logo.light} alt={site.name} className="h-8 w-auto" width={466} height={148} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-paper"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-10 flex flex-col">
          {primaryNav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + i * 0.06, duration: 0.6, ease: EASE }}
              className="border-b border-white/10"
            >
              <NavLink
                to={item.href}
                end={item.href === '/data'}
                className={({ isActive }) =>
                  cn(
                    'flex items-baseline gap-4 py-5 text-[2rem] leading-none tracking-tight',
                    isActive ? 'text-brand-green' : 'text-paper',
                  )
                }
              >
                <span className="font-mono text-label text-mist">{pad(i + 1)}</span>
                <span className="font-display font-bold">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <p className="eyebrow text-mist">Services</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/data/services/${s.slug}`}
                  className="text-[0.9375rem] text-paper/60 transition-colors hover:text-brand-green"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.58, duration: 0.6 }}
          className="mt-auto flex flex-col gap-6 pt-12"
        >
          <Button href="/data/contact" size="lg" className="w-full" arrow>
            Let&rsquo;s Talk
          </Button>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow text-mist transition-colors hover:text-brand-green"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
