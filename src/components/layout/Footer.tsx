import { Link } from 'react-router-dom';
import Flag from '@/components/ui/Flag';
import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Youtube } from 'lucide-react';
import { BRAND, COUNTRIES } from '@/data/site';
import Logo from './Logo';

const COLUMNS = [
    {
        title: 'Learn',
        links: [
            { label: 'All Courses', to: '/courses' },
            { label: 'Boards & Curricula', to: '/courses' },
            { label: 'Free Class', to: '/contact' },
            { label: 'Knowledge Hub', to: '/blog' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About TOT', to: '/about' },
            { label: 'Pricing Plans', to: '/pricing' },
            { label: 'Our Conviction', to: '/about' },
            { label: 'Contact', to: '/contact' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: '24×7 Support', to: '/contact' },
            { label: 'Refund & Cancellation Policy', to: '/refund-policy' },
            { label: 'Privacy Policy', to: '/privacy-policy' },
            { label: 'Terms of Use', to: '/terms-of-use' },
        ],
    },
];

const SOCIALS = [
    { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/the.only.teacher' },
    { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1CMsWSWNZd/' },
    // Temporarily removed - will be re-added later:
    // { Icon: Linkedin, label: 'LinkedIn', href: '#' },
    // { Icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
    return (
        <footer className="relative mt-8 overflow-hidden bg-navy-800 text-navy-200">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-forest-500/10 blur-3xl" />
                <div className="wash wash-deep" />
            </div>


            {/* Main */}
            <div className="container-tot relative grid gap-10 py-14 lg:grid-cols-[1.4fr_3fr]">
                <div>
                    <Logo className="h-56" />

                    <ul className="mt-6 space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                            <a href={`mailto:${BRAND.email}`} className="link-underline font-semibold text-navy-100">
                                {BRAND.email}
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                            <a
                                href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="link-underline font-semibold text-navy-100"
                            >
                                WhatsApp Support: {BRAND.whatsapp}
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wide text-white">
                                {BRAND.legalName}
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-400" />
                            <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                                    <Flag code="IN" size={14} />
                                    <span>India Office</span>
                                </span>
                                <p className="text-xs text-navy-300 leading-relaxed">{BRAND.indiaOffice}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-400" />
                            <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                                    <Flag code="GB" size={14} />
                                    <span>UK Office</span>
                                </span>
                                <p className="text-xs text-navy-300 leading-relaxed">{BRAND.ukOffice}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-400" />
                            <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                                    <Flag code="NZ" size={14} />
                                    <span>New Zealand Office</span>
                                </span>
                                <p className="text-xs text-navy-300 leading-relaxed">{BRAND.nzOffice}</p>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-6 flex gap-2.5">
                        {SOCIALS.map(({ Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={label}
                                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-navy-200 transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-500 hover:text-white"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10 lg:gap-14">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
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

                    <div className="border-t border-white/10 pt-8">
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
