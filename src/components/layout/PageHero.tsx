import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { ClayIconName } from '@/types';
import ClayIcon from '@/components/clay/ClayIcon';
import { Eyebrow } from '@/components/ui/Primitives';
import { Doodles } from '@/components/ui/Decor';

export default function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  icons = ['book', 'globe', 'bulb'],
  children,
  crumb,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub: string;
  icons?: ClayIconName[];
  children?: ReactNode;
  crumb: string;
}) {
  return (
    <section className="relative pb-4 pt-4 sm:pt-6">
      <div className="container-tot">
        <div className="panel bg-gradient-to-br from-sky via-white to-peach px-6 py-12 shadow-clay sm:px-10 sm:py-16 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="wash wash-brand" />
            <Doodles />
            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-navy-300/20 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center text-center">
            <nav className="mb-5 flex items-center gap-1.5 text-[12px] font-bold text-navy-400">
              <Link to="/" className="hover:text-amber-600">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-navy-700">{crumb}</span>
            </nav>

            <Eyebrow>{eyebrow}</Eyebrow>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 max-w-3xl text-balance font-display text-[2.2rem] font-extrabold leading-[1.08] text-navy-800 sm:text-5xl lg:text-[3.4rem]"
            >
              {title}
              {accent && <span className="text-gradient-amber"> {accent}</span>}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-navy-500"
            >
              {sub}
            </motion.p>

            <div className="mt-7 flex items-center gap-4">
              {icons.map((n, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.09 }}
                  className="animate-float"
                  style={{ animationDelay: `${i * 0.8}s` }}
                >
                  <ClayIcon name={n} size={54} />
                </motion.div>
              ))}
            </div>

            {children && <div className="mt-8 w-full">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
