import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock3, Sparkles } from 'lucide-react';
import { COURSES, TRACKS } from '@/data/site';
import type { TrackId } from '@/types';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Button, Reveal, SectionHeading, Stars } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const SPEC_TONE: Record<string, string> = {
 amber: 'bg-amber-50 border-amber-200/70',
 forest: 'bg-forest-50 border-forest-200/70',
 navy: 'bg-navy-50 border-navy-200/70',
 violet: 'bg-violet-50 border-violet-200/70',
 sky: 'bg-sky-50 border-sky-200/70',
};

type DiffItem = {
 title: string;
 desc: string;
 icon: any;
 accent: string;
};

const DIFFERENCES: DiffItem[] = [
 { title: 'One-to-One', desc: 'Focused attention, tailored to your child.', icon: 'target', accent: 'amber' },
 { title: 'Expert Teachers', desc: 'Experienced educators who know how to teach—not just what to teach.', icon: 'teacher', accent: 'forest' },
 { title: 'Personalised Learning', desc: 'Lessons shaped around your child, not the class average.', icon: 'puzzle', accent: 'violet' },
 { title: 'Friendly & Supportive', desc: 'A teacher who makes learning comfortable, confident, enjoyable.', icon: 'heart', accent: 'sky' },
 { title: 'Global Learning', desc: 'World-class teaching, wherever your family lives.', icon: 'globe', accent: 'amber' },
 { title: 'Progress That Matters', desc: 'Building confidence through meaningful, measurable learning.', icon: 'biology', accent: 'forest' },
];

const ACCENT_BAR = {
 amber: 'from-amber-400 to-amber-600',
 forest: 'from-forest-400 to-forest-600',
 navy: 'from-navy-500 to-navy-800',
} as const;

const ACCENT_TEXT = {
 amber: 'text-amber-700 bg-amber-100',
 forest: 'text-forest-700 bg-forest-100',
 navy: 'text-navy-700 bg-navy-100',
} as const;

export function ExploreCourses() {
 const [track, setTrack] = useState<TrackId>('secondary');
 const courses = COURSES.filter((c) => c.track === track);

 return (
  <section id="courses" className="relative py-14 sm:py-18">
   <div className="container-tot">
    <div className="panel bg-gradient-to-b from-lilac via-white to-white px-5 py-12 shadow-clay sm:px-10 lg:px-14">
     <div aria-hidden="true" className="wash wash-violet" />

     <div className="relative">
      <Reveal>
       <SectionHeading
        eyebrow="Explore courses"
        title={
         <>
          One Child. One Teacher.<br />
          <span className="text-gradient-amber">One Learning Journey.</span>
         </>
        }
        sub="One-to-one teaching, personalised to your child's pace, strengths and goals."
       />
      </Reveal>

      {/* ------------------------------ track tabs ------------------------------ */}
      <Reveal delay={0.08}>
       <div className="no-scrollbar mt-9 flex gap-2.5 overflow-x-auto pb-2 sm:justify-center">
        {TRACKS.map((t) => {
         const on = t.id === track;
         return (
          <button
           key={t.id}
           onClick={() => setTrack(t.id)}
           className={cn(
            'group relative flex shrink-0 items-center gap-2.5 rounded-full border-2 py-2 pl-2 pr-5 transition-all duration-300',
            on
             ? 'border-amber-400 bg-white shadow-clay'
             : 'border-transparent bg-white/70 hover:bg-white hover:shadow-sm',
           )}
           aria-pressed={on}
          >
           <span
            className={cn(
             'grid h-10 w-10 place-items-center rounded-full transition-colors',
             on ? 'bg-amber-50' : 'bg-navy-50',
            )}
           >
            <ClayIcon name={t.icon} size={28} shadow={false} />
           </span>
           <span className="text-left">
            <span className={cn('block text-[14.5px] font-extrabold leading-tight', on ? 'text-navy-800' : 'text-navy-600')}>
             {t.label}
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-navy-400">
             {t.grades}
            </span>
           </span>
          </button>
         );
        })}
       </div>
      </Reveal>

      {/* ------------------------------- course grid ---------------------------- */}
      <AnimatePresence mode="wait">
       <motion.div
        key={track}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35 }}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
       >
        {courses.map((c) => (
         <article
          key={c.id}
          className="group flex flex-col overflow-hidden rounded-4xl border border-navy-100 bg-white shadow-clay transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-clay-lg"
         >
          <div className="relative">
           <SmartImage
            src={c.image}
            alt={c.title}
            fallbackIcon={c.icon}
            ratio="16/10"
            className="w-full"
            imgClassName="group-hover:scale-105"
           />
           <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
           <span className={cn('absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em]', ACCENT_TEXT[c.accent])}>
            {c.subject}
           </span>
           <span className="absolute -bottom-6 right-4 drop-shadow-lg transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
            <ClayIcon name={c.icon} size={58} />
           </span>
           <span className="absolute bottom-3 left-4 text-[12px] font-extrabold text-white">
            {c.grade}
           </span>
          </div>

          <div className="flex flex-1 flex-col p-5 pt-6">
           <h3 className="font-display text-lg font-extrabold leading-snug text-navy-800">
            {c.title}
           </h3>
           <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-navy-500">{c.blurb}</p>



           <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4 text-[12px] font-bold text-navy-500">
            <span className="inline-flex items-center gap-1.5">
             <BookOpen className="h-3.5 w-3.5 text-amber-500" /> {c.modules} modules
            </span>
            <span className="inline-flex items-center gap-1.5">
             <Clock3 className="h-3.5 w-3.5 text-forest-500" /> {c.hours}h
            </span>
            <span className="inline-flex items-center gap-1">
             <Stars rating={c.rating} size={12} />
            </span>
           </div>

           <div className={cn('mt-4 h-1.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100', ACCENT_BAR[c.accent])} />
          </div>
         </article>
        ))}
       </motion.div>
      </AnimatePresence>

      {/* --------------------------- why tot feels different -------------------- */}
      <Reveal delay={0.1}>
       <div className="mt-12 rounded-4xl border border-navy-100 bg-white p-6 shadow-clay sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
         <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-sm">
          <Sparkles className="h-4 w-4 text-amber-400" />
          Why TOT Feels Different
         </span>
         <h3 className="max-w-2xl text-balance font-display text-[1.4rem] font-extrabold leading-tight text-navy-800 sm:text-3xl">
          Because great teaching starts with <span className="text-amber-500">understanding</span> the learner.
         </h3>
         <div className="flex w-full max-w-[200px] items-center justify-center gap-2 opacity-60">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-navy-200"></div>
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-navy-200"></div>
         </div>
        </div>

        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
         {DIFFERENCES.map((s, i) => (
          <motion.div
           key={s.title}
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.45, delay: i * 0.05 }}
           className={cn(
            'group flex items-center gap-4 rounded-3xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-clay',
            SPEC_TONE[s.accent],
           )}
          >
           <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
            <ClayIcon name={s.icon} size={56} />
           </span>
           <span>
            <span className="block text-[15px] font-extrabold leading-snug text-navy-800">
             {s.title}
            </span>
            <span className="mt-0.5 block text-[13px] font-semibold leading-snug text-navy-500">
             {s.desc}
            </span>
           </span>
          </motion.div>
         ))}
         
         {/* Footer row */}
         <div className="col-span-full mt-1.5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-sky-50/60 p-4 sm:flex-row">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
           <ClayIcon name="graduation" size={32} />
          </div>
          <div className="relative hidden flex-1 items-center sm:flex">
           <div className="h-[2px] w-full border-t-2 border-dotted border-sky-200"></div>
           <Sparkles className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 text-amber-400" />
          </div>
          <div className="shrink-0 text-center text-[15px] font-extrabold text-navy-800">
           Every child learns differently.<br />
           <span className="text-amber-500">We discover how</span> your child learns best . .
          </div>
          <div className="relative hidden flex-1 items-center sm:flex">
           <div className="h-[2px] w-full border-t-2 border-dotted border-sky-200"></div>
           <Sparkles className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 text-amber-400" />
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
           <ClayIcon name="book" size={32} />
          </div>
         </div>
        </div>
       </div>
      </Reveal>

      <Reveal delay={0.12}>
       <div className="mt-9 flex flex-col items-center gap-3">
        <Button to="/courses" size="lg" iconRight={<ArrowRight className="h-4.5 w-4.5" />}>
         View the full course catalogue
        </Button>
        <p className="text-[13px] font-bold text-navy-400">
         Plans are built after the free demo never a fixed price list.
        </p>
       </div>
      </Reveal>
     </div>
    </div>
   </div>
  </section>
 );
}

export default ExploreCourses;
