import { Suspense, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLockBody, useMediaQuery } from '@/lib/hooks';
import Logo from '@/components/layout/Logo';
import RouteFallback from '@/components/layout/RouteFallback';

const NAV = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Demo bookings', Icon: CalendarCheck, badge: '3' },
  { to: '/admin/students', label: 'Students', Icon: Users },
  { to: '/admin/teachers', label: 'Teachers', Icon: GraduationCap },
  { to: '/admin/courses', label: 'Courses', Icon: BookOpen },
  { to: '/admin/content', label: 'Knowledge hub', Icon: Newspaper },
  { to: '/admin/reports', label: 'Reports', Icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', Icon: Settings },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { pathname } = useLocation();
  useLockBody(open && !isDesktop);

  const current = NAV.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)));

  return (
    <div className="flex min-h-screen bg-navy-50/60">
      {/* ------------------------------- sidebar ------------------------------- */}
      <AnimatePresence>
        {(isDesktop || open) && (
          <>
            {!isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-navy-900/50 backdrop-blur-sm lg:hidden"
              />
            )}
            <motion.aside
              initial={isDesktop ? false : { x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className={cn(
                'z-50 flex w-[16.5rem] shrink-0 flex-col bg-navy-800 text-navy-300',
                isDesktop ? 'sticky top-0 h-screen' : 'fixed inset-y-0 left-0',
              )}
            >
              <div className="flex items-center justify-between px-5 py-5">
                <Logo invert to="/admin" />
                {!isDesktop && (
                  <button
                    onClick={() => setOpen(false)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"
                    aria-label="Close navigation"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
                <p className="px-3 pb-2 pt-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-navy-500">
                  Console
                </p>
                {NAV.map(({ to, label, Icon, end, badge }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => !isDesktop && setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-bold transition-all',
                        isActive
                          ? 'bg-amber-500 text-white shadow-clay-amber'
                          : 'text-navy-300 hover:bg-white/[0.07] hover:text-white',
                      )
                    }
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-extrabold text-white">
                        {badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="space-y-2 border-t border-white/10 p-3">
                <NavLink
                  to="/"
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-bold text-navy-300 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <ExternalLink className="h-4.5 w-4.5" />
                  View website
                </NavLink>
                <NavLink
                  to="/admin/login"
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-bold text-navy-300 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  Sign out
                </NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------------------------------- main -------------------------------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/85 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
            {!isDesktop && (
              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-navy-700 text-white"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <div>
              <h1 className="font-display text-lg font-extrabold leading-tight text-navy-800 sm:text-xl">
                {current?.label ?? 'Admin'}
              </h1>
              <p className="hidden text-[12px] font-semibold text-navy-400 sm:block">
                TOT operations console
              </p>
            </div>

            <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <input
                placeholder="Search students, teachers, bookings…"
                className="h-11 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-[13.5px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300 focus:bg-white"
              />
            </div>

            <div className="ml-auto flex items-center gap-2.5 md:ml-0">
              <span className="hidden text-right sm:block">
                <span className="block text-[13px] font-extrabold leading-tight text-navy-800">
                  Sanchit Goel
                </span>
                <span className="block text-[11px] font-bold text-navy-400">Academic Director</span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-display text-sm font-extrabold text-white ring-2 ring-amber-100">
                SG
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
