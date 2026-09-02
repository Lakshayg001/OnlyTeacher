import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, ShieldCheck, Timer } from 'lucide-react';
import { STEPS } from '@/data/site';

import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Button, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const CARD = {
 amber: 'from-amber-50 to-white border-amber-200/70',
 forest: 'from-forest-50 to-white border-forest-200/70',
 navy: 'from-navy-50 to-white border-navy-200/70',
} as const;

const NUMBER = {
 amber: 'text-amber-500/25',
 forest: 'text-forest-500/25',
 navy: 'text-navy-500/25',
} as const;

const PROMISES = [
 { Icon: Timer, label: '50 real teaching minutes', sub: 'Not a sales call' },
 { Icon: ShieldCheck, label: 'No card, no commitment', sub: 'Nothing to cancel' },
 { Icon: CalendarCheck, label: 'Booked within 24 hours', sub: 'In your timezone' },
];

export function DemoPromise() {
 return (
  <section id="demo" className="relative py-14 sm:py-18">
   <div className="container-tot">
    <div className="panel bg-gradient-to-br from-peach via-white to-sky px-5 py-12 shadow-clay sm:px-10 lg:px-14">
     <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="wash wash-brand" />
      <div className="absolute -right-16 top-8 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl animate-float-slow" />
      <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-forest-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
     </div>

     <div className="relative">
      <Reveal>
       <SectionHeading
        eyebrow="Your first lesson"
        title={
         <>
          Finding the Right Teacher{' '}
          <span className="text-gradient-amber">Should Not Be Difficult.</span>
         </>
        }
        sub="Three steps one free lesson and an honest answer about where your child actually stands"
       />
      </Reveal>

      <div className="mt-11 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
       {/* steps */}
       <ol className="space-y-4">
        {STEPS.map((s, i) => (
         <motion.li
          key={s.n}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.1 }}
          className={cn(
           'group relative flex items-center gap-5 overflow-hidden rounded-4xl border bg-gradient-to-br p-5 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg sm:p-6',
           CARD[s.accent],
          )}
         >
          <span
           aria-hidden="true"
           className={cn(
            'pointer-events-none absolute -right-2 -top-6 font-display text-[6rem] font-extrabold leading-none transition-transform duration-500 group-hover:scale-110',
            NUMBER[s.accent],
           )}
          >
           {s.n}
          </span>
          <span className="shrink-0 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
           <ClayIcon name={s.icon} size={62} />
          </span>
          <span className="relative">
           <span className="block font-display text-lg font-extrabold leading-snug text-navy-800 sm:text-xl">
            {s.title}
           </span>
           <span className="mt-1 block text-[14.5px] leading-relaxed text-navy-500">
            {s.body}
           </span>
          </span>
         </motion.li>
        ))}

        <Reveal delay={0.15}>
         <div className="grid gap-2.5 sm:grid-cols-3">
          {PROMISES.map(({ Icon, label, sub }) => (
           <div
            key={label}
            className="flex items-center gap-2.5 rounded-2xl border border-navy-100 bg-white/85 px-3 py-2.5 backdrop-blur"
           >
            <Icon className="h-4.5 w-4.5 shrink-0 text-forest-500" />
            <span>
             <span className="block text-[12.5px] font-extrabold leading-tight text-navy-800">
              {label}
             </span>
             <span className="block text-[11px] font-bold text-navy-400">{sub}</span>
            </span>
           </div>
          ))}
         </div>
        </Reveal>
       </ol>

       {/* visual + CTA */}
       <Reveal delay={0.12}>
        <div className="relative flex h-full flex-col gap-4">
         <div className="relative overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
          <SmartImage
           src="/owl.jpeg"
           alt="A live one-to-one online lesson in progress"
           fallbackIcon="laptop"
           ratio="1/1"
           className="w-full bg-white"
           imgClassName="!object-contain"
           overlay
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
           <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-700">
             <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Demo lesson
            </span>
            <p className="mt-2 font-display text-xl font-extrabold leading-tight text-white">
             50 minutes, one student
            </p>
           </div>
           <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/95 font-display text-lg font-extrabold text-amber-600">
            1:1
           </span>
          </div>
         </div>

         <div className="flex flex-1 flex-col justify-between gap-4 rounded-4xl bg-gradient-to-br from-navy-700 to-navy-900 p-6 shadow-clay-navy">
          <div className="flex items-start gap-4">
           <ClayIcon name="heart" size={54} />
           <div>
            <p className="font-display text-lg font-extrabold leading-snug text-white">
             Not the right fit? We rematch, free.
            </p>
            <p className="mt-1 text-[14px] font-semibold text-navy-300">
             Chemistry between teacher and student is not a nice-to-have.
            </p>
           </div>
          </div>
          <Button to="/contact" size="lg" full iconRight={<ArrowRight className="h-4.5 w-4.5" />}>
           Book a Free Demo
          </Button>
         </div>
        </div>
       </Reveal>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}

export default DemoPromise;
