import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
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

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-md' : 'bg-white',
        )}
      >
        <div className="container-tot flex h-20 items-center justify-between gap-4 sm:h-24">
          <Logo className="shrink-0 h-16 sm:h-20 lg:h-24" />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              return (
                <li
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-flex items-center gap-1.5 px-4 py-3 text-[15px] font-bold transition-colors',
                        isActive ? 'text-navy-800' : 'text-navy-500 hover:text-navy-800',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {item.children && (
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 opacity-50 transition-transform duration-200',
                              openMenu === item.label && 'rotate-180',
                            )}
                          />
                        )}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-amber-400"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>

                  <AnimatePresence>
                    {item.children && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-1"
                      >
                        <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white p-2 shadow-xl shadow-navy-900/5 ring-1 ring-black/5">
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

          <div className="flex shrink-0 items-center gap-3">
            <Button to="/contact" size="md" className="hidden sm:inline-flex rounded-full bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-md">
              Try a Free Class! 🚀
            </Button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-navy-50 text-navy-700 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-amber-400 via-amber-300 to-forest-400"
        />
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
                    Try a Free Class! 🚀
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
