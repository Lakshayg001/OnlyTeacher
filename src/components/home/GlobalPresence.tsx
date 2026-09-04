import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { COUNTRIES } from '@/data/site';
import { MAP_H, MAP_W, arcPath, buildDotPath, project } from '@/data/geo';
import Flag from '@/components/ui/Flag';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const HUB = COUNTRIES[0]; // India the teaching hub the arcs radiate from

export function GlobalPresence() {
  const dots = useMemo(() => buildDotPath(2.9, 1.3), []);
  const [activeCode, setActiveCode] = useState(COUNTRIES[0].code);
  const [hovered, setHovered] = useState<string | null>(null);
  const [auto, setAuto] = useState(true);

  const shown = COUNTRIES.find((c) => c.code === (hovered ?? activeCode)) ?? COUNTRIES[0];

  /* Gentle auto-tour until the visitor takes over. */
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActiveCode((prev) => {
        const i = COUNTRIES.findIndex((c) => c.code === prev);
        return COUNTRIES[(i + 1) % COUNTRIES.length].code;
      });
    }, 3400);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (code: string) => {
    setAuto(false);
    setActiveCode(code);
  };

  const [tipX, tipY] = project(shown.lng, shown.lat);

  return (
    <section id="global" className="relative py-14 sm:py-18">
      <div className="container-tot">
        <div className="panel bg-gradient-to-br from-navy-800 via-navy-800 to-navy-900 px-5 py-12 shadow-clay-lg sm:px-8 lg:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="wash wash-deep" />
            <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-forest-500/15 blur-3xl" />
          </div>

          <div className="relative">
            <SectionHeading
              eyebrow="Global presence"
              title={
                <span className="text-white">
                  <span className="text-forest-400">Learning</span> Without <span className="text-gradient-amber">Borders</span>
                </span>
              }
              sub={
                <span className="text-navy-300">
                  A Global Pool of Exceptional Teachers<br />
                  Carefully matched to each child’s curriculum, learning needs and timezone
                </span>
              }
            />

            {/* ---------------------------------- map --------------------------------- */}
            <div
              className="relative mt-10 overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-navy-900/70 to-navy-900/30"
              onMouseLeave={() => setHovered(null)}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(60% 70% at 62% 45%, rgba(255,155,37,0.12), transparent 70%)',
                }}
              />

              <svg
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                className="relative block w-full"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="World map showing TOT presence in India, the United Kingdom, the UAE and Australia"
              >
                <defs>
                  <linearGradient id="arcOn" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF9B25" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#FFC178" stopOpacity="1" />
                    <stop offset="100%" stopColor="#478A58" stopOpacity="0.55" />
                  </linearGradient>
                  <radialGradient id="halo">
                    <stop offset="0%" stopColor="#FF9B25" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FF9B25" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* landmass dots */}
                <path d={dots} fill="#5C7AB0" fillOpacity="0.45" />

                {/* arcs from the hub */}
                {COUNTRIES.filter((c) => c.code !== HUB.code).map((c, i) => {
                  const d = arcPath([HUB.lng, HUB.lat], [c.lng, c.lat], 0.3);
                  const on = shown.code === c.code || shown.code === HUB.code;
                  return (
                    <g key={c.code}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="url(#arcOn)"
                        strokeWidth={on ? 2.6 : 1.1}
                        strokeLinecap="round"
                        strokeDasharray="7 9"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: on ? 1 : 0.3 }}
                        viewport={{ once: true }}
                        animate={{ opacity: on ? 1 : 0.3 }}
                        transition={{
                          pathLength: { duration: 1.3, delay: 0.25 + i * 0.15 },
                          opacity: { duration: 0.35 },
                        }}
                      />
                      {on && (
                        <circle r="3.2" fill="#FFD09A">
                          <animateMotion dur="3.2s" repeatCount="indefinite" path={d} />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* markers */}
                {COUNTRIES.map((c) => {
                  const [x, y] = project(c.lng, c.lat);
                  const on = shown.code === c.code;
                  return (
                    <g
                      key={c.code}
                      transform={`translate(${x} ${y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered(c.code)}
                      onClick={() => pick(c.code)}
                      role="button"
                      tabIndex={0}
                      aria-label={c.name}
                      onFocus={() => setHovered(c.code)}
                      onBlur={() => setHovered(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') pick(c.code);
                      }}
                    >
                      {/* generous, invisible hit area */}
                      <circle r="22" fill="transparent" />

                      <motion.circle
                        r="26"
                        fill="url(#halo)"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        animate={{ scale: on ? 1 : 0.45, opacity: on ? 1 : 0.3 }}
                        transition={{ duration: 0.4, ease: [0.22, 0.8, 0.3, 1] }}
                      />

                      {/* sonar rings transformBox keeps them centred on the marker */}
                      {on &&
                        [0, 1].map((k) => (
                          <motion.circle
                            key={k}
                            r="9"
                            fill="none"
                            stroke="#FF9B25"
                            strokeWidth="1.6"
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            initial={{ scale: 0.55, opacity: 0.75 }}
                            animate={{ scale: 2.6, opacity: 0 }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              delay: k * 1.2,
                              ease: 'easeOut',
                            }}
                          />
                        ))}

                      <motion.circle
                        fill={on ? '#FF9B25' : '#8098C6'}
                        stroke="#fff"
                        strokeWidth={on ? 2.8 : 1.8}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        animate={{ r: on ? 7.5 : 5 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      />

                      <motion.text
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        fill={on ? '#FFFFFF' : '#A9B9D8'}
                        fontSize="13"
                        fontWeight="800"
                        style={{ fontFamily: 'Nunito, sans-serif' }}
                        animate={{ y: on ? -20 : -15, opacity: on ? 1 : 0.75 }}
                        transition={{ duration: 0.3 }}
                      >
                        {c.name}
                      </motion.text>
                    </g>
                  );
                })}
              </svg>

              {/* tooltip, positioned from the projected marker */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={shown.code}
                  initial={{ opacity: 0, y: 8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute z-10 hidden -translate-x-1/2 translate-y-4 rounded-2xl border border-white/15 bg-navy-900/90 px-3.5 py-2.5 shadow-clay-lg backdrop-blur sm:block"
                  style={{ left: `${(tipX / MAP_W) * 100}%`, top: `${(tipY / MAP_H) * 100}%` }}
                >
                  <span className="flex items-center gap-2">
                    <Flag code={shown.flag} size={20} />
                    <span className="text-[13px] font-extrabold text-white">{shown.name}</span>
                  </span>
                  <span className="mt-1 block text-[11.5px] font-bold text-amber-400">
                    {shown.students} students · {shown.timezone}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* legend */}
              <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-3 rounded-full border border-white/10 bg-navy-900/70 px-3.5 py-2 backdrop-blur sm:bottom-4 sm:left-4">
                <span className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-navy-200">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Active
                </span>
                <span className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-navy-400">
                  <span className="h-2 w-2 rounded-full bg-navy-300" /> Teaching region
                </span>
              </div>
            </div>

            {/* ------------------------------ country cards --------------------------- */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {COUNTRIES.map((c) => {
                const on = shown.code === c.code;
                return (
                  <motion.button
                    key={c.code}
                    onClick={() => pick(c.code)}
                    onMouseEnter={() => setHovered(c.code)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{ y: on ? -4 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className={cn(
                      'group relative overflow-hidden rounded-3xl border p-4 text-left transition-colors duration-300',
                      on
                        ? 'border-amber-400/60 bg-amber-500/[0.12]'
                        : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-0 top-0 h-1 origin-left bg-amber-500 transition-transform duration-500',
                        on ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />

                    <span className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2.5">
                        <Flag code={c.flag} size={26} />
                        <span className="text-[15px] font-extrabold text-white">{c.name}</span>
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-navy-200">
                        {c.timezone}
                      </span>
                    </span>

                    <span className="mt-3 flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-forest-400" />
                        <span className="text-[13px] font-extrabold text-white">{c.students}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[13px] font-extrabold text-white">24×7</span>
                      </span>
                    </span>


                  </motion.button>
                );
              })}
            </div>

            {/* ------------------------------- footer row ----------------------------- */}
            <Reveal>
              <div className="mt-4 flex items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[13.5px] font-bold leading-snug text-navy-200">
                  Every child learns differently.{' '}
                  <span className="text-white">We discover how your child learns best . .</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalPresence;
