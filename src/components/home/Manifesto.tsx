import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MANIFESTO, MANIFESTO_INTRO } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Button, Eyebrow } from '@/components/ui/Primitives';

export function Manifesto() {
 return (
  <section className="relative py-14 sm:py-18">
   <div className="container-tot">
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
     {/* ------------------------------ sticky left ----------------------------- */}
     <div className="lg:sticky lg:top-28 lg:h-fit">
      <Eyebrow tone="forest">{MANIFESTO_INTRO.eyebrow}</Eyebrow>

      <h2 className="mt-5 text-balance font-display text-3xl font-extrabold leading-[1.1] text-navy-800 sm:text-4xl lg:text-[2.9rem]">
       Every Student Deserves the{' '}
       <span className="text-amber-500">Right Teacher</span>
      </h2>

      <p className="mt-5 max-w-md text-[17px] leading-relaxed text-navy-500">
       {MANIFESTO_INTRO.body}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
       <Button to="/about" variant="dark" iconRight={<ArrowUpRight className="h-4 w-4" />}>
        Read our story
       </Button>
      </div>

      {/* image stack */}
      <div className="relative mt-10 hidden lg:block">
       <div className="relative aspect-[4/3] w-[86%] overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
        <SmartImage
         src="/small.jpeg"
         alt="Students working together"
         fallbackIcon="student"
         className="h-full w-full"
        />
       </div>

       <div className="absolute -left-6 -top-6 animate-float">
        <ClayIcon name="bulb" size={62} />
       </div>
      </div>
     </div>

     {/* ------------------------------ statements ------------------------------ */}
     <ol className="relative flex flex-col gap-3">
      {/* The vertical dashed line */}
      <span
       aria-hidden="true"
       className="absolute bottom-32 left-[1.4rem] top-6 hidden w-0 border-l-[2px] border-dashed border-forest-300 sm:block"
      />
      {MANIFESTO.map((m, i) => (
       <motion.li
        key={m.n}
        initial={{ opacity: 0, x: 26 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 0.8, 0.3, 1] }}
        className="group relative flex items-center gap-4 sm:gap-5"
       >
        {/* Number Box on the line */}
        <div className="relative z-10 shrink-0 hidden sm:block">
         <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-800 font-display text-[15px] font-bold text-white shadow-sm">
          {m.n}
         </span>
        </div>
        {/* Content Card */}
        <div className="flex flex-1 items-center gap-4 rounded-2xl border border-navy-50 bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-4 sm:pr-6">
         <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-slate-50">
          <ClayIcon name={m.icon} size={36} shadow={false} />
         </div>
         <div>
          <h3 className="font-display text-[15.5px] font-extrabold leading-snug text-navy-800 sm:text-[17px]">
           {m.title}
          </h3>
          <p className="mt-1 text-[13.5px] leading-relaxed text-navy-500">{m.body}</p>
         </div>
        </div>
       </motion.li>
      ))}

      {/* closing card */}
      <motion.li
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6, delay: 0.1 }}
       className="relative mt-2 overflow-hidden rounded-2xl bg-forest-700 p-5 shadow-md sm:p-6"
      >
       <div className="absolute right-4 top-4 hidden sm:block">
        <svg
         aria-hidden="true"
         className="h-16 w-32 text-white/30"
         viewBox="0 0 100 60"
         fill="none"
        >
         <path d="M10,50 Q40,50 60,30 T90,10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
         <path d="M85,5 L95,10 L85,15 L88,10 Z" fill="currentColor" opacity="0.8" />
        </svg>
       </div>
       <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white shadow-sm">
         <ClayIcon name="graduation" size={44} tone="amber" shadow={false} />
        </div>
        <div className="max-w-[85%]">
         <p className="font-display text-[17px] font-extrabold leading-snug text-white sm:text-[19px]">
          Connect With the Right Teacher.
          <br className="hidden sm:block" />
          Learn With Confidence. Grow With TOT.
         </p>
         <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-forest-50/90">
          We connect students with teachers who understand, personalise learning and help them grow every day.
         </p>
        </div>
       </div>
      </motion.li>
     </ol>
    </div>
   </div>
  </section>
 );
}

export default Manifesto;
