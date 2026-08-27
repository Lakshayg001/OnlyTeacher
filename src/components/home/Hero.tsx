import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COUNTRIES, SUBJECT_MARQUEE } from '@/data/site';
import { IMG } from '@/data/images';
import SmartImage from '@/components/ui/SmartImage';
import Flag from '@/components/ui/Flag';
import { Button, Marquee } from '@/components/ui/Primitives';
import { Doodles, FloatIcon } from '@/components/ui/Decor';

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
            <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl animate-float-slow" />
            <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-navy-300/25 blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }} />
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
                className="mt-5 text-balance font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy-800 sm:text-6xl lg:text-[4.1rem]"
              >
                Find Your
                <br />
                Perfect{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-amber">Teacher.</span>
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
                Personalized learning with teachers who understand your child.
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
            <div className="relative z-10 mx-auto w-full max-w-[520px] lg:max-w-none">
              <div className="relative aspect-[4/4.4]">
                {/* orbit rings */}
                <div aria-hidden="true" className="absolute inset-[6%] rounded-full border-2 border-dashed border-amber-300/50 animate-spin-slow" />
                <div aria-hidden="true" className="absolute inset-[16%] rounded-full border-2 border-navy-200/50" />

                {/* main portrait */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.8, 0.3, 1] }}
                  className="absolute inset-[9%] overflow-hidden rounded-[46%_54%_50%_50%/48%_44%_56%_52%] shadow-clay-lg ring-8 ring-white"
                >
                  <SmartImage
                    src={IMG.heroStudent}
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


                {/* countries pill */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.85 }}
                  className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-navy-100 bg-white/95 px-4 py-2.5 shadow-clay backdrop-blur"
                >
                  <span className="flex items-center -space-x-1.5">
                    {COUNTRIES.map((c) => (
                      <Flag
                        key={c.code}
                        code={c.flag}
                        size={22}
                        title={c.name}
                        className="ring-2 ring-white"
                      />
                    ))}
                  </span>
                  <span className="text-[12px] font-extrabold text-navy-700">4 countries</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* subject marquee */}
          <div className="relative border-t border-white/60 bg-white/55 py-5 backdrop-blur">
            <Marquee items={SUBJECT_MARQUEE} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
