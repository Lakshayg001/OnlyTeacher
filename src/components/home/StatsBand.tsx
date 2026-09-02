import { STATS } from '@/data/site';
import { IMG } from '@/data/images';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Counter, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const TONE = {
 amber: 'from-amber-50 to-white border-amber-200/70',
 forest: 'from-forest-50 to-white border-forest-200/70',
 navy: 'from-navy-50 to-white border-navy-200/70',
} as const;

const NUM = {
 amber: 'text-amber-600',
 forest: 'text-forest-600',
 navy: 'text-navy-700',
} as const;

export function StatsBand() {
 return (
  <section className="relative py-14 sm:py-18">
   <div className="container-tot">
    <Reveal>
     <SectionHeading
      eyebrow="Our impact"
      title={
       <>
        Every Student Matters.
        <br className="hidden sm:block" /> Every Teacher{' '}
        <span className="text-gradient-amber">Makes a Difference.</span>
       </>
      }
      sub="The right teacher changes how a child feels about a subject and that changes everything that follows"
     />
    </Reveal>

    <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
     {/* stat grid */}
     <div className="grid gap-4 sm:grid-cols-2">
      {STATS.map((s, i) => (
       <Reveal key={s.label} delay={i * 0.08}>
        <article
         className={cn(
          'group relative h-full overflow-hidden rounded-4xl border bg-gradient-to-br p-6 shadow-clay transition-all duration-300 hover:-translate-y-1.5 hover:shadow-clay-lg',
          TONE[s.accent],
         )}
        >
         <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/60 blur-2xl" />
         <div className="relative flex items-start justify-between gap-3">
          <div>
           <p className={cn('font-display text-4xl font-extrabold leading-none sm:text-5xl', NUM[s.accent])}>
            <Counter value={s.value} suffix={s.suffix} />
           </p>
           <p className="mt-2.5 max-w-[13rem] text-[14.5px] font-bold leading-snug text-navy-600">
            {s.label}
           </p>
          </div>
          <div className="transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
           <ClayIcon name={s.icon} size={56} />
          </div>
         </div>
        </article>
       </Reveal>
      ))}
     </div>

     {/* photo collage */}
     <Reveal delay={0.15}>
      <div className="grid h-full grid-cols-2 grid-rows-[1.15fr_1fr] gap-4">
       <div className="relative col-span-2 overflow-hidden rounded-4xl shadow-clay">
        <SmartImage
         src={IMG.heroClass}
         alt="Teacher guiding a student through a lesson"
         fallbackIcon="teacher"
         className="h-full min-h-[190px] w-full"
         overlay
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
         <p className="font-display text-xl font-extrabold leading-tight text-white">
          Attention that is never divided
         </p>
         <p className="mt-1 text-[13px] font-semibold text-white/80">
          A classroom built for exactly one student
         </p>
        </div>
       </div>
       <div className="overflow-hidden rounded-4xl shadow-clay">
        <SmartImage
         src={IMG.girlStudy}
         alt="Student studying at home"
         fallbackIcon="student"
         className="h-full min-h-[150px] w-full"
        />
       </div>
       <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-navy-700 to-navy-900 p-5 shadow-clay">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-500/25 blur-2xl" />
        <ClayIcon name="clock" size={44} />
        <p className="mt-3 font-display text-3xl font-extrabold leading-none text-white">
         <Counter value={340} suffix="k+" />
        </p>
        <p className="mt-1.5 text-[13px] font-bold leading-snug text-navy-200">
         One-to-one teaching hours delivered
        </p>
       </div>
      </div>
     </Reveal>
    </div>
   </div>
  </section>
 );
}

export default StatsBand;
