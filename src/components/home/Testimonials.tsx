import { useCallback, useEffect, useState } from 'react';
import Flag from '@/components/ui/Flag';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Reveal, SectionHeading, Stars } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5200);
    return () => clearInterval(id);
  }, [paused, go]);

  const active = TESTIMONIALS[index];

  return (
    <section className="relative py-14 sm:py-18">
      <div className="container-tot">
        <Reveal>
          <SectionHeading
            eyebrow="What families say"
            tone="forest"
            title={
              <>
                Real Students. Real Boards.{' '}
                <span className="text-gradient-amber">Real Changes.</span>
              </>
            }
            sub="Every review below names the country, curriculum and subject — so you can find a story that looks like yours."
          />
        </Reveal>

        <div
          className="mt-11 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* feature quote */}
          <div className="relative overflow-hidden rounded-4xl border border-navy-100 bg-white p-6 shadow-clay sm:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-100/70 blur-2xl" />
            <Quote className="relative h-10 w-10 text-amber-400" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <blockquote className="mt-4 text-balance font-display text-xl font-extrabold leading-[1.4] text-navy-800 sm:text-[1.7rem]">
                  “{active.quote}”
                </blockquote>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <SmartImage
                    src={active.avatar}
                    alt={active.name}
                    fallbackIcon="student"
                    className="h-14 w-14 rounded-2xl ring-4 ring-amber-100"
                  />
                  <div className="flex-1">
                    <p className="font-display text-base font-extrabold text-navy-800">{active.name}</p>
                    <p className="text-[13px] font-semibold text-navy-500">{active.role}</p>
                  </div>
                  <Stars rating={active.rating} size={17} />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Tag><Flag code={active.flag} size={16} className="mr-1.5" />{active.country}</Tag>
                  <Tag tone="forest">{active.curriculum}</Tag>
                  <Tag tone="navy">{active.subject}</Tag>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="relative mt-8 flex items-center justify-between border-t border-navy-100 pt-5">
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Review ${i + 1}`}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === index ? 'w-7 bg-amber-500' : 'w-2 bg-navy-200 hover:bg-navy-300',
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-navy-100 text-navy-600 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-600"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-navy-100 text-navy-600 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-600"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* mini reviews */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {TESTIMONIALS.filter((_, i) => i !== index)
              .slice(0, 3)
              .map((t, i) => (
                <motion.button
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => setIndex(TESTIMONIALS.findIndex((x) => x.id === t.id))}
                  className="group flex items-start gap-3.5 rounded-3xl border border-navy-100 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-clay"
                >
                  <SmartImage
                    src={t.avatar}
                    alt={t.name}
                    fallbackIcon="student"
                    className="h-12 w-12 shrink-0 rounded-2xl ring-2 ring-navy-100"
                  />
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-navy-600">
                      “{t.quote}”
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] font-extrabold text-navy-800">{t.name}</span>
                      <span className="text-[11px] font-bold text-navy-400">
                        <Flag code={t.flag} size={15} /> {t.curriculum} · {t.subject}
                      </span>
                    </span>
                  </span>
                </motion.button>
              ))}

            <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-forest-500 to-forest-700 p-5 shadow-clay">
              <ClayIcon name="trophy" size={52} />
              <div>
                <p className="font-display text-2xl font-extrabold leading-none text-white">4.9/5</p>
                <p className="mt-1 text-[13px] font-bold text-forest-50/90">
                  3,400+ verified parent reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children, tone = 'amber' }: { children: React.ReactNode; tone?: 'amber' | 'forest' | 'navy' }) {
  const cls = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    forest: 'bg-forest-50 text-forest-700 border-forest-200',
    navy: 'bg-navy-50 text-navy-700 border-navy-200',
  }[tone];
  return (
    <span className={cn('rounded-full border px-3 py-1.5 text-[12px] font-extrabold', cls)}>
      {children}
    </span>
  );
}

export default Testimonials;
