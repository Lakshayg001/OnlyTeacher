import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COUNTRIES } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import Flag from '@/components/ui/Flag';
import { Button } from '@/components/ui/Primitives';
import { Doodles, FloatIcon } from '@/components/ui/Decor';
import ClayIcon from '@/components/clay/ClayIcon';

const FLOATERS = [
 { name: 'math', cls: 'left-[-4%] top-[8%]', size: 66, delay: 0 },
 { name: 'science', cls: 'right-[-2%] top-[2%]', size: 58, delay: 0.6 },
 { name: 'physics', cls: 'right-[-6%] top-[46%]', size: 62, delay: 1.2 },
 { name: 'biology', cls: 'left-[-7%] bottom-[26%]', size: 54, delay: 1.8 },
 { name: 'technology', cls: 'right-[6%] bottom-[-3%]', size: 56, delay: 2.4 },
 { name: 'globe', cls: 'left-[8%] top-[-6%]', size: 50, delay: 3 },
] as const;

export function Hero() {
 return (
  <section className="relative pb-6 pt-4 sm:pt-6">
   <div className="container-tot">
    <div className="panel bg-gradient-to-br from-sky via-white to-peach shadow-clay">
     {/* backdrop */}
     <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="wash wash-brand" />
      <Doodles />
      <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-forest-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
     </div>

     <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-14 lg:py-16">
      {/* ------------------------------- copy ------------------------------- */}
      <div className="relative z-10">
       <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur"
       >
        <span className="relative flex h-2 w-2">
         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-500 opacity-75" />
         <span className="relative inline-flex h-2 w-2 rounded-full bg-forest-500" />
        </span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-navy-700">
         One-to-One Live Tuition · Grades 3–12
        </span>
       </motion.div>

       <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-5 text-balance font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy-800 sm:text-5xl lg:text-[3.8rem]"
       >
        Find Your
        <br />
        Perfect{' '}
        <span className="relative inline-block">
         <span className="text-amber-500">Teacher.</span>
         <motion.svg
          viewBox="0 0 300 16"
          className="absolute -bottom-1.5 left-0 h-3 w-full"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
         >
          <motion.path
           d="M4 11C60 4 120 3 178 7s90 5 118 2"
           stroke="#478A58"
           strokeWidth="5"
           strokeLinecap="round"
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 0.9, delay: 0.65 }}
          />
         </motion.svg>
        </span>
       </motion.h1>

       <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mt-6 max-w-lg text-[17px] leading-relaxed text-navy-500 sm:text-lg xl:max-w-xl"
       >
        Personalised Online Tuition With Teachers Who Understand Your Child.
       </motion.p>

       <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.26 }}
        className="mt-8 flex flex-wrap items-center gap-3"
       >
        <Button to="/contact" size="lg" iconRight={<ArrowRight className="h-4.5 w-4.5" />}>
         Book a Free Demo
        </Button>

       </motion.div>


      </div>

      {/* ------------------------------ visual ------------------------------ */}
      <div className="relative z-10 mx-auto mt-14 w-full max-w-[520px] lg:mt-20 lg:max-w-[600px] xl:max-w-[680px]">
       <div className="relative aspect-[3/2]">
        {/* main portrait */}
        <motion.div
         initial={{ opacity: 0, scale: 0.94, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.8, 0.3, 1] }}
         className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-clay-lg ring-8 ring-white"
        >
         <SmartImage
          src="/front002.png"
          alt="Student learning one-to-one online"
          fallbackIcon="student"
          priority
          className="h-full w-full"
         />
        </motion.div>

        {/* floating clay icons */}
        {FLOATERS.map((f) => (
         <FloatIcon
          key={f.name}
          name={f.name}
          size={f.size}
          delay={f.delay}
          className={f.cls}
         />
        ))}
       </div>

       {/* countries pill */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="ml-auto mr-4 mt-8 flex w-fit items-center gap-2 rounded-full border border-navy-100 bg-white/95 px-5 py-3 shadow-clay lg:mr-8"
       >
        <span className="flex items-center -space-x-1.5">
         {COUNTRIES.map((c) => (
          <Flag
           key={c.code}
           code={c.flag}
           size={24}
           title={c.name}
           className="ring-2 ring-white"
          />
         ))}
        </span>
        <span className="text-[13px] font-extrabold text-navy-700">4 countries</span>
       </motion.div>
      </div>
     </div>

     {/* feature strip */}
     <div className="relative rounded-b-3xl border-t border-white/60 bg-white/95 px-6 py-6 sm:px-10 lg:px-14 backdrop-blur">
      <div className="grid grid-cols-1 gap-6 divide-y divide-navy-100/50 sm:grid-cols-2 sm:gap-4 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
       {/* feature 1 */}
       <div className="flex items-center gap-4 pt-4 sm:pr-4 sm:pt-0">
        <ClayIcon name="student" size={44} tone="forest" shadow={false} />
        <div>
         <h4 className="font-display text-[15px] font-bold text-forest-700">Personalised Learning</h4>
         <p className="mt-1 text-[13px] leading-snug text-navy-500">Tailored lessons for every student.</p>
        </div>
       </div>
       {/* feature 2 */}
       <div className="flex items-center gap-4 pt-4 sm:px-4 sm:pt-0">
        <ClayIcon name="chat" size={44} tone="sky" shadow={false} />
        <div>
         <h4 className="font-display text-[15px] font-bold text-sky-700">One-to-One Attention</h4>
         <p className="mt-1 text-[13px] leading-snug text-navy-500">Focused on your child, every step of the way.</p>
        </div>
       </div>
       {/* feature 3 */}
       <div className="flex items-center gap-4 pt-4 sm:px-4 sm:pt-0">
        <ClayIcon name="teacher" size={44} tone="amber" shadow={false} />
        <div>
         <h4 className="font-display text-[15px] font-bold text-amber-700">Expert Teachers</h4>
         <p className="mt-1 text-[13px] leading-snug text-navy-500">Experienced, passionate and student-first.</p>
        </div>
       </div>
       {/* feature 4 */}
       <div className="flex items-center gap-4 pt-4 sm:pl-4 sm:pt-0">
        <ClayIcon name="shield" size={44} tone="violet" shadow={false} />
        <div>
         <h4 className="font-display text-[15px] font-bold text-violet-700">Safe & Flexible Learning</h4>
         <p className="mt-1 text-[13px] leading-snug text-navy-500">Learn from the comfort of your home.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}

export default Hero;
