import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { IMG } from '@/data/images';
import type { ClayIconName } from '@/types';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  label: string;
  icon: ClayIconName;
  title: string;
  body: string;
  image: string;
  points: string[];
  accent: 'amber' | 'forest' | 'navy';
}

const FEATURES: Feature[] = [
  {
    id: 'classroom',
    label: 'Live classroom',
    icon: 'laptop',
    title: 'A whiteboard built for two',
    body: 'Write, draw and solve together in real time. Every lesson is recorded, so nothing is lost the moment it ends.',
    image: IMG.onlineLesson,
    points: ['Shared interactive whiteboard', 'Every class recorded', 'Works on laptop and tablet'],
    accent: 'navy',
  },
  {
    id: 'labs',
    label: 'Science & labs',
    icon: 'chemistry',
    title: 'Experiments you can actually see',
    body: 'Simulations and lab walkthroughs make abstract reactions and forces concrete before the exam asks about them.',
    image: IMG.chemistry,
    points: ['Guided lab video walkthroughs', 'Physics and chemistry simulations', 'Diagram practice that scores marks'],
    accent: 'forest',
  },
  {
    id: 'practice',
    label: 'Practice & papers',
    icon: 'target',
    title: 'Past papers, marked properly',
    body: 'Board-specific question banks with examiner-style feedback — so revision targets the marks your child is losing.',
    image: IMG.exam,
    points: ['Board-matched question banks', 'Examiner-style feedback', 'Weekly progress checkpoints'],
    accent: 'amber',
  },
  {
    id: 'reports',
    label: 'Parent reports',
    icon: 'shield',
    title: 'You see everything, every week',
    body: 'Attendance, topics covered, honest teacher notes and what to work on next — sent after every single lesson.',
    image: IMG.studyDesk,
    points: ['Notes after every class', 'Monthly progress review', 'Direct line to your counsellor'],
    accent: 'navy',
  },
];

const TAB_ON = {
  amber: 'border-amber-400 bg-amber-50',
  forest: 'border-forest-400 bg-forest-50',
  navy: 'border-navy-400 bg-navy-50',
} as const;

const DOT = {
  amber: 'text-amber-600',
  forest: 'text-forest-600',
  navy: 'text-navy-700',
} as const;

export function ClassroomShowcase() {
  const [active, setActive] = useState(FEATURES[0].id);
  const feature = FEATURES.find((f) => f.id === active) ?? FEATURES[0];

  return (
    <section className="relative py-14 sm:py-18">
      <div className="container-tot">
        <Reveal>
          <SectionHeading
            eyebrow="Easy interactive platform"
            title={
              <>
                Everything the Lesson Needs,{' '}
                <span className="text-gradient-amber">In One Place.</span>
              </>
            }
            sub="No downloads, no plug-ins, no hunting for last week's notes."
          />
        </Reveal>

        {/* tabs */}
        <Reveal delay={0.06}>
          <div className="no-scrollbar mt-9 flex gap-2.5 overflow-x-auto pb-2 sm:justify-center">
            {FEATURES.map((f) => {
              const on = f.id === active;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  aria-pressed={on}
                  className={cn(
                    'flex shrink-0 items-center gap-2.5 rounded-full border-2 py-2 pl-2 pr-5 transition-all duration-300',
                    on ? cn(TAB_ON[f.accent], 'shadow-clay') : 'border-navy-100 bg-white hover:border-navy-200',
                  )}
                >
                  <ClayIcon name={f.icon} size={34} shadow={false} />
                  <span className={cn('text-[14px] font-extrabold', on ? 'text-navy-800' : 'text-navy-500')}>
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid items-center gap-6 rounded-4xl border border-navy-100 bg-white p-4 shadow-clay sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
          >
            <div className="relative order-2 lg:order-1">
              <ClayIcon name={feature.icon} size={64} className="mb-4" />
              <h3 className="font-display text-2xl font-extrabold leading-tight text-navy-800 sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-navy-500">{feature.body}</p>

              <ul className="mt-6 space-y-2.5">
                {feature.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl bg-navy-50 px-4 py-3"
                  >
                    <Check className={cn('h-4.5 w-4.5 shrink-0', DOT[feature.accent])} />
                    <span className="text-[14.5px] font-bold text-navy-700">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
                <SmartImage
                  src={feature.image}
                  alt={feature.title}
                  fallbackIcon={feature.icon}
                  ratio="4/3"
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden animate-float sm:block">
                <ClayIcon name="bulb" size={58} />
              </div>
              <div className="absolute -right-4 -top-4 hidden animate-float sm:block" style={{ animationDelay: '1.5s' }}>
                <ClayIcon name="rocket" size={52} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ClassroomShowcase;
