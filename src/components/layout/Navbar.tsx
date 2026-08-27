import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';
import { NAV } from '@/data/site';
import { cn } from '@/lib/utils';
import { useLockBody, useScrolled } from '@/lib/hooks';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import Logo from './Logo';

export function Navbar() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { pathname } = useLocation();
  useLockBody(open);

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-50 overflow-hidden bg-navy-700 text-white">
        <div className="container-tot flex h-9 items-center justify-center gap-2 text-[12px] font-bold sm:text-[13px]">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <span className="truncate">
            Free 45-minute demo lesson — matched to your child&apos;s board &amp; grade
          </span>
          <Link to="/contact" className="hidden shrink-0 text-amber-300 underline-offset-4 hover:underline sm:inline">
            Book now →
          </Link>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          scrolled ? 'py-2' : 'py-3 sm:py-4',
        )}
      >
        <div className="container-tot">
          <nav
            className={cn(
              'flex items-center justify-between gap-4 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-4',
              scrolled
                ? 'border-navy-100 bg-white/90 shadow-clay backdrop-blur-xl'
                : 'border-white/70 bg-white/70 shadow-sm backdrop-blur-md',
            )}
          >
            <Logo className="shrink-0" />

            {/* Desktop nav */}
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <NavLink
                      to={item.href}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-[14.5px] font-bold transition-colors',
                        active ? 'bg-navy-50 text-navy-800' : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800',
                      )}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            openMenu === item.label && 'rotate-180',
                          )}
                        />
                      )}
                    </NavLink>

                    <AnimatePresence>
                      {item.children && openMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
                        >
                          <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white p-2 shadow-clay-lg">
                            {item.children.map((c) => (
                              <Link
                                key={c.label}
                                to={c.href}
                                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-navy-50"
                              >
                                {c.icon && <ClayIcon name={c.icon} size={38} />}
                                <span>
                                  <span className="block text-[14.5px] font-extrabold text-navy-800">{c.label}</span>
                                  {c.desc && <span className="block text-xs font-semibold text-navy-400">{c.desc}</span>}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
              <Button to="/contact" size="sm" className="hidden sm:inline-flex">
                Book a Free Demo
              </Button>
              <button
                onClick={() => setOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full bg-navy-700 text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-navy-900/45 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="fixed right-0 top-0 z-[61] flex h-full w-[86%] max-w-sm flex-col bg-white shadow-clay-lg lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-navy-100 p-5">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-navy-50 text-navy-700"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <ul className="space-y-1.5">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.045 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-extrabold transition-colors',
                          pathname === item.href
                            ? 'bg-amber-50 text-amber-700'
                            : 'text-navy-700 hover:bg-navy-50',
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 -rotate-90 opacity-40" />
                      </Link>
                      {item.children && (
                        <div className="mb-1 ml-3 mt-1 space-y-1 border-l-2 border-navy-100 pl-3">
                          {item.children.map((c) => (
                            <Link
                              key={c.label}
                              to={c.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm font-bold text-navy-500 hover:bg-navy-50"
                            >
                              {c.icon && <ClayIcon name={c.icon} size={26} shadow={false} />}
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 rounded-3xl bg-gradient-to-br from-navy-700 to-navy-900 p-5 text-white">
                  <ClayIcon name="rocket" size={46} />
                  <p className="mt-2 font-display text-xl font-extrabold leading-tight">
                    Every student deserves the best teacher.
                  </p>
                  <p className="mt-1 text-sm text-navy-200">Meet yours in a free 45-minute lesson.</p>
                  <Button to="/contact" full className="mt-4" onClick={() => setOpen(false)}>
                    Book a Free Demo
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
