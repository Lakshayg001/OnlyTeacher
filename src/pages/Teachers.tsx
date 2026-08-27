import { useState } from 'react';
import Flag from '@/components/ui/Flag';
import { motion } from 'framer-motion';
import { BadgeCheck, Languages } from 'lucide-react';
import { BOARDS, COUNTRIES, TEACHERS } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import FilterBar from '@/components/ui/FilterBar';
import PageHero from '@/components/layout/PageHero';
import { Button, Reveal, SectionHeading, Stars } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const RING = { amber: 'ring-amber-300', forest: 'ring-forest-300', navy: 'ring-navy-300' } as const;
const BAR = { amber: 'bg-amber-500', forest: 'bg-forest-500', navy: 'bg-navy-700' } as const;

const PIPELINE = [
  { icon: 'target' as const, title: 'Subject test', body: 'Written assessment at two grades above what they will teach.' },
  { icon: 'teacher' as const, title: 'Live panel demo', body: 'A real lesson taught in front of our academic panel.' },
  { icon: 'shield' as const, title: 'ID & background', body: 'Identity, qualifications and references all verified.' },
  { icon: 'book' as const, title: 'Board assessment', body: 'Mark schemes and command words for the exact curriculum.' },
];

export default function Teachers() {
  const [query, setQuery] = useState('');
  const [board, setBoard] = useState('all');
  const [country, setCountry] = useState('all');

  const list = TEACHERS.filter((t) => {
    if (board !== 'all' && !t.boards.some((b) => b.includes(board))) return false;
    if (country !== 'all' && t.country !== country) return false;
    if (query && !`${t.name} ${t.subjects.join(' ')} ${t.headline}`.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });

  return (
    <>
      <PageHero
        crumb="Teachers"
        eyebrow="Top rated teachers"
        title="The Right Teacher Can"
        accent="Change Everything."
        sub="Hand-picked, panel-tested and ID-verified. Filter by board, country or subject — then meet them in a free lesson."
        icons={['teacher', 'shield', 'trophy']}
      />

      {/* filters */}
      <section className="py-8">
        <div className="container-tot">
          <FilterBar
            query={query}
            onQuery={setQuery}
            placeholder="Search by name or subject…"
            resultLabel={`${list.length} teacher${list.length === 1 ? '' : 's'}`}
            onReset={() => {
              setQuery('');
              setBoard('all');
              setCountry('all');
            }}
            groups={[
              {
                id: 'board',
                label: 'Board',
                value: board,
                onChange: setBoard,
                options: [
                  { value: 'all', label: 'All boards' },
                  ...BOARDS.map((b) => ({ value: b.name, label: b.name })),
                ],
              },
              {
                id: 'country',
                label: 'Country',
                value: country,
                onChange: setCountry,
                options: [
                  { value: 'all', label: 'All countries' },
                  ...COUNTRIES.map((c) => ({ value: c.name, label: c.name, flag: c.flag })),
                ],
              },
            ]}
          />
        </div>
      </section>

      {/* grid */}
      <section className="pb-14">
        <div className="container-tot">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((t, i) => (
              <motion.article
                key={t.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
                className="group relative flex flex-col overflow-hidden rounded-4xl border border-navy-100 bg-white shadow-clay transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-clay-lg"
              >
                <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1.5', BAR[t.accent])} />
                <div className="flex items-start gap-4 p-5 pb-4">
                  <div className="relative shrink-0">
                    <SmartImage
                      src={t.photo}
                      alt={t.name}
                      fallbackIcon="teacher"
                      className={cn('h-20 w-20 rounded-3xl ring-4', RING[t.accent])}
                      imgClassName="group-hover:scale-110"
                    />
                    <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-forest-500 ring-[3px] ring-white">
                      <BadgeCheck className="h-4 w-4 text-white" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-display text-lg font-extrabold text-navy-800">{t.name}</h3>
                      <Flag code={t.flag} size={18} />
                    </div>
                    <p className="mt-0.5 text-[13px] font-semibold leading-snug text-navy-500">{t.headline}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Stars rating={t.rating} size={13} />
                      <span className="text-[12px] font-extrabold text-navy-700">{t.rating}</span>
                      <span className="text-[12px] font-bold text-navy-400">({t.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3 px-5 pb-5">
                  <div className="flex flex-wrap gap-1.5">
                    {t.subjects.map((s) => (
                      <span key={s} className="rounded-lg border border-amber-200/70 bg-amber-50 px-2 py-1 text-[11px] font-extrabold text-amber-700">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.boards.map((b) => (
                      <span key={b} className="rounded-lg border border-navy-200/70 bg-navy-50 px-2 py-1 text-[11px] font-extrabold text-navy-600">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-navy-100 pt-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-navy-50 px-2.5 py-2">
                      <ClayIcon name="clock" size={26} shadow={false} />
                      <span>
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-navy-400">Experience</span>
                        <span className="block text-[13px] font-extrabold text-navy-800">{t.experience} yrs</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl bg-navy-50 px-2.5 py-2">
                      <ClayIcon name="graduation" size={26} shadow={false} />
                      <span>
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-navy-400">Grades</span>
                        <span className="block truncate text-[13px] font-extrabold text-navy-800">
                          {t.grades.replace('Grades ', '')}
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="flex items-center gap-1.5 text-[12px] font-bold text-navy-500">
                    <Languages className="h-3.5 w-3.5 text-forest-500" />
                    {t.languages.join(' · ')}
                  </p>
                </div>

                <div className="border-t border-navy-100 p-4">
                  <Button to="/contact" variant="outline" size="sm" full>
                    Book a free demo
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {list.length === 0 && (
            <div className="rounded-4xl border-2 border-dashed border-navy-200 p-14 text-center">
              <ClayIcon name="teacher" size={72} className="mx-auto" />
              <h3 className="mt-4 font-display text-xl font-extrabold text-navy-800">
                No teachers listed for that combination
              </h3>
              <p className="mt-1.5 text-[15px] text-navy-500">
                Our bench is 850 strong — tell us what you need and we will find them.
              </p>
              <Button to="/contact" className="mt-6">Request a match</Button>
            </div>
          )}
        </div>
      </section>

      {/* selection pipeline */}
      <section className="pb-16">
        <div className="container-tot">
          <div className="panel bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-12 shadow-clay-lg sm:px-10">
            <div aria-hidden="true" className="wash wash-deep" />
            <div className="relative">
              <SectionHeading
                eyebrow="How teachers are selected"
                title={<span className="text-white">Only 3 in 100 Applicants <span className="text-gradient-amber">Make It.</span></span>}
                sub={<span className="text-navy-300">Four stages, no shortcuts, and a monthly rating from the families they teach.</span>}
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PIPELINE.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.07}>
                    <div className="h-full rounded-4xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-1.5">
                      <div className="flex items-center justify-between">
                        <ClayIcon name={p.icon} size={50} />
                        <span className="font-display text-3xl font-extrabold text-white/15">0{i + 1}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-extrabold text-white">{p.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-navy-300">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
