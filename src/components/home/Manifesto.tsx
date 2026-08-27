import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MANIFESTO, MANIFESTO_INTRO } from '@/data/site';
import { IMG } from '@/data/images';
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
              <span className="text-gradient-amber">Best Teacher.</span>
            </h2>

            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-navy-500">
              {MANIFESTO_INTRO.body}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button to="/about" variant="dark" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                Read our story
              </Button>
              <Button to="/teachers" variant="outline">
                Meet the teachers
              </Button>
            </div>

            {/* image stack */}
            <div className="relative mt-10 hidden lg:block">
              <div className="relative aspect-[4/3] w-[86%] overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
                <SmartImage
                  src={IMG.groupStudy}
                  alt="Students working together"
                  fallbackIcon="student"
                  className="h-full w-full"
                />
              </div>
              <div className="absolute -bottom-8 right-0 aspect-square w-40 overflow-hidden rounded-3xl shadow-clay ring-[6px] ring-white">
                <SmartImage
                  src={IMG.raiseHand}
                  alt="Student raising a hand"
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
          <ol className="relative space-y-4">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[2.15rem] top-6 hidden w-0.5 bg-gradient-to-b from-amber-300 via-forest-300 to-navy-200 sm:block"
            />
            {MANIFESTO.map((m, i) => (
              <motion.li
                key={m.n}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 0.8, 0.3, 1] }}
                className="group relative flex gap-4 rounded-4xl border border-navy-100 bg-white p-5 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-clay-lg sm:gap-5 sm:p-6"
              >
                <div className="relative shrink-0">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 font-display text-lg font-extrabold text-white shadow-clay-navy transition-transform duration-300 group-hover:-rotate-6">
                    {m.n}
                  </span>
                  <span className="absolute -bottom-3 -right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ClayIcon name={m.icon} size={34} shadow={false} />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold leading-snug text-navy-800 sm:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-navy-500">{m.body}</p>
                </div>
              </motion.li>
            ))}

            {/* closing card */}
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-500 to-forest-700 p-6 shadow-clay sm:p-8"
            >
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <ClayIcon name="graduation" size={58} tone="sun" />
                <div>
                  <p className="font-display text-xl font-extrabold leading-snug text-white sm:text-2xl">
                    That is the whole promise. Nothing clever, just done properly.
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-forest-50/90">
                    12,500 students across four countries have taken us up on it.
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
