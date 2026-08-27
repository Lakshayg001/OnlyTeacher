import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock3 } from 'lucide-react';
import { BOARDS, COURSES, COURSE_SPECS, TRACKS } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import FilterBar from '@/components/ui/FilterBar';
import PageHero from '@/components/layout/PageHero';
import { Button, Reveal, SectionHeading, Stars } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const ACCENT_TEXT = {
  amber: 'text-amber-700 bg-amber-100',
  forest: 'text-forest-700 bg-forest-100',
  navy: 'text-navy-700 bg-navy-100',
} as const;

const SPEC_TONE = {
  amber: 'bg-amber-50 border-amber-200/70',
  forest: 'bg-forest-50 border-forest-200/70',
  navy: 'bg-navy-50 border-navy-200/70',
} as const;

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState<string>('all');
  const [board, setBoard] = useState<string>('all');

  const subject = params.get('s') ?? 'all';

  const subjects = useMemo(
    () => ['all', ...Array.from(new Set(COURSES.map((c) => c.subject)))],
    [],
  );

  const results = COURSES.filter((c) => {
    if (subject !== 'all' && c.subject !== subject) return false;
    if (track !== 'all' && c.track !== track) return false;
    if (board !== 'all' && !c.boards.some((b) => b.includes(board))) return false;
    if (query && !`${c.title} ${c.subject} ${c.blurb}`.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });

  const setSubject = (s: string) => {
    if (s === 'all') setParams({});
    else setParams({ s });
  };

  return (
    <>
      <PageHero
        crumb="Courses"
        eyebrow="Course catalogue"
        title="One Curriculum. One Student."
        accent="One Teacher."
        sub="Every course is taught live and one-to-one, matched to the board your school follows. Plans are built after your free demo — never from a price list."
        icons={['math', 'science', 'technology']}
      />

      {/* filters */}
      <section className="py-8">
        <div className="container-tot">
          <FilterBar
            query={query}
            onQuery={setQuery}
            placeholder="Search a subject, topic or course…"
            resultLabel={`${results.length} course${results.length === 1 ? '' : 's'}`}
            onReset={() => {
              setQuery('');
              setTrack('all');
              setBoard('all');
              setSubject('all');
            }}
            groups={[
              {
                id: 'subject',
                label: 'Subject',
                value: subject,
                onChange: setSubject,
                options: subjects.map((s) => ({
                  value: s,
                  label: s === 'all' ? 'All subjects' : s,
                })),
              },
              {
                id: 'stage',
                label: 'Stage',
                value: track,
                onChange: setTrack,
                options: [
                  { value: 'all', label: 'All stages' },
                  ...TRACKS.map((t) => ({ value: t.id, label: t.label, hint: t.grades })),
                ],
              },
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
            ]}
          />
        </div>
      </section>

      {/* results */}
      <section className="pb-14">
        <div className="container-tot">
          {results.length === 0 ? (
            <div className="rounded-4xl border-2 border-dashed border-navy-200 p-14 text-center">
              <ClayIcon name="puzzle" size={72} className="mx-auto" />
              <h3 className="mt-4 font-display text-xl font-extrabold text-navy-800">
                No courses match those filters yet
              </h3>
              <p className="mt-1.5 text-[15px] text-navy-500">
                We can still match a teacher — tell us the board and subject.
              </p>
              <Button to="/contact" className="mt-6">
                Ask for a custom match
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c, i) => (
                <motion.article
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
                  className="group flex flex-col overflow-hidden rounded-4xl border border-navy-100 bg-white shadow-clay transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-clay-lg"
                >
                  <div className="relative">
                    <SmartImage
                      src={c.image}
                      alt={c.title}
                      fallbackIcon={c.icon}
                      ratio="16/10"
                      className="w-full"
                      imgClassName="group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                    <span className={cn('absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em]', ACCENT_TEXT[c.accent])}>
                      {c.subject}
                    </span>
                    <span className="absolute -bottom-6 right-4 drop-shadow-lg transition-transform duration-500 group-hover:-rotate-12">
                      <ClayIcon name={c.icon} size={56} />
                    </span>
                    <span className="absolute bottom-3 left-4 text-[12px] font-extrabold text-white">
                      {c.grade}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-6">
                    <h3 className="font-display text-lg font-extrabold leading-snug text-navy-800">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-navy-500">{c.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.boards.map((b) => (
                        <span key={b} className="rounded-lg border border-navy-100 bg-navy-50 px-2 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-navy-500">
                          {b}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4 text-[12px] font-bold text-navy-500">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-amber-500" /> {c.modules}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5 text-forest-500" /> {c.hours}h
                      </span>
                      <Stars rating={c.rating} size={12} />
                    </div>
                    <Button to="/contact" variant="outline" size="sm" full className="mt-4">
                      Book a free demo
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* specs */}
      <section className="pb-16">
        <div className="container-tot">
          <Reveal>
            <div className="panel bg-gradient-to-br from-lilac via-white to-mint px-6 py-12 shadow-clay sm:px-10">
              <SectionHeading
                eyebrow="Included with every course"
                title={
                  <>
                    Six Guarantees,{' '}
                    <span className="text-gradient-amber">Every Single Time.</span>
                  </>
                }
              />
              <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {COURSE_SPECS.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className={cn(
                      'flex items-start gap-3.5 rounded-3xl border bg-white/70 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-clay',
                      SPEC_TONE[s.accent],
                    )}
                  >
                    <ClayIcon name={s.icon} size={46} />
                    <span>
                      <span className="block text-[15px] font-extrabold text-navy-800">{s.title}</span>
                      <span className="mt-0.5 block text-[13px] font-semibold text-navy-500">{s.desc}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

