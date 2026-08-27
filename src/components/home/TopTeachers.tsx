import { useRef, useState } from 'react';
import Flag from '@/components/ui/Flag';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Languages } from 'lucide-react';
import { TEACHERS } from '@/data/site';
import type { Teacher } from '@/types';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Button, Reveal, SectionHeading, Stars } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const RING = {
  amber: 'ring-amber-300',
  forest: 'ring-forest-300',
  navy: 'ring-navy-300',
} as const;

const BAR = {
  amber: 'bg-amber-500',
  forest: 'bg-forest-500',
  navy: 'bg-navy-700',
} as const;

const FILTERS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Technology'] as const;

export function TopTeachers() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const scroller = useRef<HTMLDivElement>(null);

  const list =
    filter === 'All'
      ? TEACHERS
      : TEACHERS.filter((t) => t.subjects.some((s) => s.includes(filter) || filter.includes(s)));

  const nudge = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="teachers" className="relative py-14 sm:py-18">
      <div className="container-tot">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Top rated teachers"
              title={
                <>
                  The Right Teacher Can{' '}
                  <span className="text-gradient-amber">Change Everything.</span>
                </>
              }
              sub="Hand-picked, panel-tested, ID-verified — and rated by the families they teach every month."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => nudge(-1)}
                aria-label="Previous teachers"
                className="grid h-12 w-12 place-items-center rounded-full border-2 border-navy-100 bg-white text-navy-600 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => nudge(1)}
                aria-label="Next teachers"
                className="grid h-12 w-12 place-items-center rounded-full border-2 border-navy-100 bg-white text-navy-600 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* subject filter */}
        <Reveal delay={0.06}>
          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-[13px] font-extrabold transition-all',
                  filter === f
                    ? 'bg-navy-700 text-white shadow-clay-navy'
                    : 'border border-navy-100 bg-white text-navy-500 hover:border-amber-300 hover:text-amber-600',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* card rail */}
        <div
          ref={scroller}
          className="no-scrollbar -mx-5 mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0"
        >
          {list.map((t, i) => (
            <TeacherCard key={t.id} teacher={t} index={i} />
          ))}
          {list.length === 0 && (
            <div className="w-full rounded-4xl border border-dashed border-navy-200 p-10 text-center">
              <ClayIcon name="teacher" size={56} className="mx-auto" />
              <p className="mt-3 font-bold text-navy-500">
                No teachers listed for that subject yet — but we can still match you.
              </p>
            </div>
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-4xl bg-navy-700 p-6 text-center shadow-clay-navy sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <ClayIcon name="shield" size={58} />
              <div>
                <p className="font-display text-lg font-extrabold text-white sm:text-xl">
                  Only 3 in 100 applicants make it onto TOT.
                </p>
                <p className="mt-0.5 text-[14px] font-semibold text-navy-300">
                  Subject test · live panel demo · ID &amp; background check · board assessment
                </p>
              </div>
            </div>
            <Button to="/teachers" iconRight={<ArrowRight className="h-4.5 w-4.5" />} className="shrink-0">
              Browse all teachers
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeacherCard({ teacher: t, index }: { teacher: Teacher; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06 }}
      className="group relative flex w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-4xl border border-navy-100 bg-white shadow-clay transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-clay-lg sm:w-[21rem]"
    >
      <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1.5', BAR[t.accent])} />

      <div className="flex items-start gap-4 p-5 pb-4">
        <div className="relative shrink-0">
          <SmartImage
            src={t.photo}
            alt={t.name}
            fallbackIcon="teacher"
            className={cn('h-20 w-20 rounded-3xl ring-4', RING[t.accent])}
            imgClassName="group-hover:scale-110"
          />
          {t.verified && (
            <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-forest-500 ring-[3px] ring-white">
              <BadgeCheck className="h-4 w-4 text-white" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-lg font-extrabold leading-tight text-navy-800">
              {t.name}
            </h3>
            <Flag code={t.flag} size={18} />
          </div>
          <p className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-navy-500">
            {t.headline}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <Stars rating={t.rating} size={13} />
            <span className="text-[12px] font-extrabold text-navy-700">{t.rating}</span>
            <span className="text-[12px] font-bold text-navy-400">({t.reviews})</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 px-5 pb-5">
        <Row label="Subjects" items={t.subjects} tone="amber" />
        <Row label="Boards" items={t.boards} tone="navy" />

        <div className="grid grid-cols-2 gap-2 border-t border-navy-100 pt-3">
          <Meta label="Experience" value={`${t.experience} yrs`} icon="clock" />
          <Meta label="Grades" value={t.grades.replace('Grades ', '')} icon="graduation" />
        </div>

        <p className="flex items-center gap-1.5 text-[12px] font-bold text-navy-500">
          <Languages className="h-3.5 w-3.5 text-forest-500" />
          {t.languages.join(' · ')}
        </p>
      </div>

      <div className="border-t border-navy-100 p-4">
        <Button to="/contact" variant="outline" size="sm" full iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
          Book a free demo
        </Button>
      </div>
    </motion.article>
  );
}

function Row({ label, items, tone }: { label: string; items: string[]; tone: 'amber' | 'navy' }) {
  const cls =
    tone === 'amber'
      ? 'bg-amber-50 text-amber-700 border-amber-200/70'
      : 'bg-navy-50 text-navy-600 border-navy-200/70';
  return (
    <div>
      <p className="mb-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-navy-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span key={s} className={cn('rounded-lg border px-2 py-1 text-[11px] font-extrabold', cls)}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Meta({ label, value, icon }: { label: string; value: string; icon: 'clock' | 'graduation' }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-navy-50 px-2.5 py-2">
      <ClayIcon name={icon} size={26} shadow={false} />
      <span className="min-w-0">
        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-navy-400">
          {label}
        </span>
        <span className="block truncate text-[13px] font-extrabold text-navy-800">{value}</span>
      </span>
    </div>
  );
}

export default TopTeachers;
