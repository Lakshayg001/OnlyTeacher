import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, UserCheck } from 'lucide-react';
import { STEPS } from '@/data/site';

import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Button, Reveal } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const NUMBER = {
 amber: 'text-amber-500/90',
 forest: 'text-forest-500/90',
 navy: 'text-navy-500/90',
} as const;

const PROMISES = [
 { Icon: Clock, label: '50-Minute One-to-One', sub: 'Undivided attention. Real teaching.', accent: 'text-amber-500', bg: 'bg-amber-100/50' },
 { Icon: UserCheck, label: 'A Teacher Chosen for Your Child', sub: 'A thoughtful match, not a random assignment.', accent: 'text-forest-500', bg: 'bg-forest-100/50' },
 { Icon: BookOpen, label: 'Learning Made Personal', sub: 'At your child\'s pace, in their own way.', accent: 'text-navy-500', bg: 'bg-navy-100/50' },
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
       <div className="text-center mb-12">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl md:text-6xl">
         Meet. Connect.{' '}
         <span className="text-gradient-amber block sm:inline">Learn. Grow.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-navy-600 sm:text-xl">
         Your child's journey to better learning starts with{' '}
         <span className="text-amber-600 font-bold">The Only Teacher</span>.
        </p>
       </div>
      </Reveal>

      {/* horizontal steps */}
      <div className="relative mb-14">
       {/* Dotted connecting line for desktop */}
       <div className="absolute top-1/2 left-0 right-0 hidden h-0.5 -translate-y-1/2 border-t-2 border-dashed border-navy-200 lg:block" aria-hidden="true" />
       
       <ol className="relative z-10 grid gap-6 lg:grid-cols-3">
        {STEPS.map((s, i) => (
         <motion.li
          key={s.n}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.1 }}
          className={cn(
           'group relative flex flex-col items-center text-center gap-5 rounded-4xl border bg-white p-6 shadow-clay-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-clay lg:p-8',
          )}
         >
          <div className="flex w-full items-center justify-between lg:justify-center">
           <span
            className={cn(
             'font-display text-2xl font-extrabold leading-none transition-transform duration-500',
             NUMBER[s.accent],
            )}
           >
            {s.n}
           </span>
          </div>
          
          <div className="shrink-0 transition-transform duration-500 group-hover:-translate-y-2">
           <ClayIcon name={s.icon} size={82} />
          </div>
          
          <div className="relative mt-2">
           <span className="block font-display text-xl font-extrabold leading-snug text-navy-800">
            {s.title}
           </span>
           <span className="mt-2 block text-[14.5px] leading-relaxed text-navy-500">
            {s.body}
           </span>
          </div>
         </motion.li>
        ))}
       </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:gap-10 items-stretch">
       {/* Promises & CTA */}
       <Reveal delay={0.15}>
        <div className="flex h-full flex-col gap-6">
         <div className="flex flex-wrap justify-center gap-4">
          {PROMISES.map(({ Icon, label, sub, accent, bg }) => (
           <div
            key={label}
            className="flex w-full sm:w-[calc(50%-0.5rem)] lg:w-full xl:w-[calc(50%-0.5rem)] items-start gap-4 rounded-3xl border border-navy-100 bg-white/85 p-5 shadow-sm backdrop-blur"
           >
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", bg)}>
             <Icon className={cn("h-6 w-6", accent)} />
            </div>
            <div>
             <span className="block text-base font-extrabold leading-tight text-navy-800">
              {label}
             </span>
             <span className="mt-1.5 block text-sm font-medium text-navy-500">{sub}</span>
            </div>
           </div>
          ))}
         </div>

         <div className="pt-2">
          <Button to="/contact" size="lg" full iconRight={<ArrowRight className="h-5 w-5" />} className="shadow-lg shadow-amber-500/20">
           Book a Free Class
          </Button>
         </div>
        </div>
       </Reveal>

       {/* visual */}
       <Reveal delay={0.12}>
        <div className="relative h-full overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
         <SmartImage
          src="/owl.jpeg"
          alt="A live one-to-one online lesson in progress"
          fallbackIcon="laptop"
          ratio="1/1"
          className="h-full w-full bg-white object-cover"
          imgClassName="!object-contain"
          overlay
         />

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
