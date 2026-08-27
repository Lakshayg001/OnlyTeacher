import { Link } from 'react-router-dom';
import Flag from '@/components/ui/Flag';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { BOARDS, BRAND, COUNTRIES } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import Logo from './Logo';

const COLUMNS = [
  {
    title: 'Learn',
    links: [
      { label: 'All Courses', to: '/courses' },
      { label: 'Boards & Curricula', to: '/courses' },
      { label: 'Find a Teacher', to: '/teachers' },
      { label: 'Free Demo Lesson', to: '/contact' },
      { label: 'Knowledge Hub', to: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About TOT', to: '/about' },
      { label: 'Our Conviction', to: '/about' },
      { label: 'Teach with Us', to: '/contact' },
      { label: 'Contact', to: '/contact' },
      { label: 'Admin Console', to: '/admin' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Centre', to: '/contact' },
      { label: '24×7 Live Support', to: '/contact' },
      { label: 'Reschedule a Class', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Terms of Use', to: '/contact' },
    ],
  },
];

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden bg-navy-800 text-navy-200">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-forest-500/10 blur-3xl" />
        <div className="wash wash-deep" />
      </div>

      {/* CTA band */}
      <div className="container-tot relative pt-14">
        <div className="panel flex flex-col items-center gap-6 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 px-6 py-10 text-center shadow-clay-lg sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-5">
            <div className="hidden shrink-0 sm:block">
              <ClayIcon name="rocket" size={78} tone="navy" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-tight text-navy-800 sm:text-3xl">
                Finding the right teacher should not be difficult.
              </h2>
              <p className="mt-1.5 max-w-xl text-[15px] font-semibold text-navy-700">
                One free lesson. One matched teacher. No card, no commitment.
              </p>
            </div>
          </div>
          <Button to="/contact" variant="dark" size="lg" className="shrink-0">
            Book a Free Demo
          </Button>
        </div>
      </div>

      {/* Main */}
      <div className="container-tot relative grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-navy-300">
            One-to-one online tuition for Grades 3–12, across every major curriculum, in four countries.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <a href={`mailto:${BRAND.email}`} className="link-underline font-semibold text-navy-100">
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="link-underline font-semibold text-navy-100">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span className="text-navy-300">{BRAND.address}</span>
            </li>
          </ul>

          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-navy-200 transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-base font-extrabold uppercase tracking-[0.16em] text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="link-underline text-[14.5px] font-semibold text-navy-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Boards + countries strip */}
      <div className="container-tot relative border-t border-white/10 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-navy-400">
              Curricula supported
            </p>
            <div className="flex flex-wrap gap-2">
              {BOARDS.map((b) => (
                <span
                  key={b.id}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-navy-200"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-navy-400">
              Learning without borders
            </p>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <span
                  key={c.code}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-navy-200"
                >
                  <Flag code={c.flag} size={20} />
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-tot relative flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs font-semibold text-navy-400 sm:flex-row">
        <p>© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Built for students, everywhere
          <span aria-hidden="true">🎓</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
