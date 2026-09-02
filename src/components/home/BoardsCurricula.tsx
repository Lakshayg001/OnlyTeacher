import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { BOARDS } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const TONE = {
 amber: {
  card: 'hover:border-amber-300 hover:bg-amber-50/60',
  badge: 'bg-gradient-to-br from-amber-300 to-amber-500 text-navy-800',
  bar: 'bg-amber-500',
  ring: 'border-amber-300 bg-amber-50',
 },
 forest: {
  card: 'hover:border-forest-300 hover:bg-forest-50/60',
  badge: 'bg-gradient-to-br from-forest-400 to-forest-600 text-white',
  bar: 'bg-forest-500',
  ring: 'border-forest-300 bg-forest-50',
 },
 navy: {
  card: 'hover:border-navy-300 hover:bg-navy-50/60',
  badge: 'bg-gradient-to-br from-navy-600 to-navy-900 text-white',
  bar: 'bg-navy-700',
  ring: 'border-navy-300 bg-navy-50',
 },
} as const;

export function BoardsCurricula() {
 const [active, setActive] = useState<string | null>(null);

 return (
  <section id="boards" className="relative py-14 sm:py-18">
   <div className="container-tot">
    <Reveal>
     <SectionHeading
      eyebrow="Explore by board & curriculum"
      tone="forest"
      title={
       <>
        Your School&apos;s Syllabus,{' '}
        <span className="text-gradient-amber">Taught Properly.</span>
       </>
      }
      sub="Teachers are matched to the exact board your child sits including its mark schemes command words and assessment style"
     />
    </Reveal>

    <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
     {BOARDS.map((b, i) => {
      const tone = TONE[b.color];
      const on = active === b.id;
      return (
       <motion.button
        key={b.id}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: i * 0.05 }}
        onClick={() => setActive(on ? null : b.id)}
        onMouseEnter={() => setActive(b.id)}
        onMouseLeave={() => setActive(null)}
        className={cn(
         'group relative overflow-hidden rounded-4xl border-2 border-navy-100 bg-white p-5 text-left shadow-clay transition-all duration-300 hover:-translate-y-2 hover:shadow-clay-lg',
         tone.card,
         on && tone.ring,
        )}
       >
        <span
         aria-hidden="true"
         className={cn(
          'absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100',
          tone.bar,
         )}
        />

        <div className="flex items-start justify-between gap-3">
         <span
          className={cn(
           'inline-flex items-center rounded-2xl px-3.5 py-2 font-display text-lg font-extrabold shadow-clay transition-transform duration-300 group-hover:-rotate-3',
           tone.badge,
          )}
         >
          {b.name}
         </span>
         <span className="transition-transform duration-500 group-hover:scale-110">
          <ClayIcon name={b.icon} size={46} />
         </span>
        </div>

        <h3 className="mt-4 text-[14px] font-extrabold leading-snug text-navy-800">{b.full}</h3>

        <p className="mt-1 text-[12px] font-bold uppercase tracking-wider text-navy-400">
         {b.region}
        </p>

        <div className="mt-4 flex items-center gap-3 border-t border-navy-100 pt-3.5 text-[12px] font-bold text-navy-500">
         <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-forest-500" />
          {b.subjects} subjects
         </span>
         <span className="h-3 w-px bg-navy-200" />
         <span>Grades {b.grades}</span>
        </div>

        <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-extrabold text-amber-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
         Find a {b.name} teacher
         <ArrowRight className="h-3.5 w-3.5" />
        </span>
       </motion.button>
      );
     })}
    </div>

    {/* reassurance strip */}
    <Reveal delay={0.1}>
     <div className="mt-8 flex flex-col items-center gap-5 rounded-4xl border border-navy-100 bg-gradient-to-r from-peach via-white to-mint p-6 shadow-clay sm:flex-row sm:justify-between sm:p-7">
      <div className="flex items-center gap-4">
       <ClayIcon name="globe" size={64} />
       <div>
        <p className="font-display text-lg font-extrabold leading-snug text-navy-800 sm:text-xl">
         Following a state or regional syllabus?
        </p>
        <p className="mt-0.5 text-[14px] font-semibold text-navy-500">
         Tell us which one we will match a teacher who has taught it before.
        </p>
       </div>
      </div>
      <Button to="/contact" variant="dark" className="shrink-0">
       Ask about your board
      </Button>
     </div>
    </Reveal>
   </div>
  </section>
 );
}

export default BoardsCurricula;
