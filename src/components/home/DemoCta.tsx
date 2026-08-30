import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { FloatIcon } from '@/components/ui/Decor';
import type { ClayIconName } from '@/types';

const PROMISES: { icon: ClayIconName; title: string; sub: string }[] = [
  { icon: 'student', title: '1. Personalised One-to-One Learning', sub: 'Every lesson is tailored to your child\'s pace, strengths and goals for better results.' },
  { icon: 'book', title: '2. Expert & Verified Teachers', sub: 'Qualified, experienced and background-verified teachers who truly understand students.' },
  { icon: 'target', title: '3. Real Progress & Continuous Support', sub: 'Regular feedback, performance tracking and ongoing support for steady improvement.' },
];

export function DemoCta() {
  return (
    <section id="book-demo" className="relative py-14 sm:py-18">
      <div className="container-tot">
        <div className="panel bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 px-6 py-11 shadow-clay-lg sm:px-10 lg:px-14">
          {/* backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="wash wash-onamber" />
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
            <div className="absolute -bottom-28 right-[-4rem] h-80 w-80 rounded-full bg-forest-500/25 blur-3xl" />
            <FloatIcon name="rocket" size={56} className="right-[6%] top-[8%] hidden lg:block" />
            <FloatIcon name="graduation" size={48} className="left-[42%] bottom-[6%] hidden xl:block" delay={1.4} />
          </div>

          <div className="relative grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* ------------------------------- pitch ------------------------------- */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-navy-700 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-forest-500" />
                </span>
                Free 1-to-1 demo lesson
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.06 }}
                className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.1] text-navy-800 sm:text-4xl lg:text-[2.9rem]"
              >
                Meet the Right<br />Online Teacher<br />for <span className="relative text-white z-10 inline-block">Your Child.<svg className="absolute -bottom-2.5 left-0 w-[105%] -z-10 text-forest-500" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M-2,15 Q50,-2 102,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg></span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 max-w-lg text-[16.5px] font-semibold leading-relaxed text-navy-700"
              >
                Experience a personalised one-to-one demo lesson with a teacher who matches your child&apos;s grade, subject and learning goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Button
                  to="/contact"
                  variant="dark"
                  size="lg"
                  iconRight={<ArrowRight className="h-4.5 w-4.5" />}
                >
                  Book a Free Demo
                </Button>

              </motion.div>
            </div>

            {/* ------------------------------ promises ----------------------------- */}
            <ul className="grid gap-3">
              {PROMISES.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
                  className="group flex items-center gap-4 rounded-3xl border border-white/50 bg-white/85 p-4 shadow-clay backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                    <ClayIcon name={p.icon} size={48} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-extrabold leading-snug text-navy-800">
                      {p.title}
                    </span>
                    <span className="block text-[13px] font-semibold text-navy-500">{p.sub}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoCta;
