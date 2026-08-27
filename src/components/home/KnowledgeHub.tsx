import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { POSTS } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import { Button, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const CAT = {
  amber: 'bg-amber-500 text-white',
  forest: 'bg-forest-500 text-white',
  navy: 'bg-navy-700 text-white',
} as const;

export function KnowledgeHub() {
  const [lead, ...rest] = POSTS.slice(0, 4);

  return (
    <section id="blog" className="relative py-14 sm:py-18">
      <div className="container-tot">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Knowledge hub"
              tone="navy"
              title={
                <>
                  Ideas Worth Reading{' '}
                  <span className="text-gradient-amber">Before the Next Lesson.</span>
                </>
              }
              sub="Study strategy, subject deep-dives and honest parent guides from the teachers who write them."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Button to="/blog" variant="outline" iconRight={<ArrowUpRight className="h-4 w-4" />}>
              All articles
            </Button>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* lead article */}
          <Reveal>
            <article className="group relative h-full overflow-hidden rounded-4xl shadow-clay transition-all duration-300 hover:-translate-y-1.5 hover:shadow-clay-lg">
              <SmartImage
                src={lead.image}
                alt={lead.title}
                fallbackIcon="book"
                className="h-full min-h-[22rem] w-full"
                imgClassName="group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className={cn('chip', CAT[lead.accent])}>{lead.category}</span>
                <h3 className="mt-3.5 max-w-lg text-balance font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  {lead.title}
                </h3>
                <p className="mt-2 max-w-md text-[15px] font-semibold text-white/80">{lead.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-[12.5px] font-bold text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> {lead.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" /> {lead.readTime} min read
                  </span>
                  <span>By {lead.author}</span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* list */}
          <div className="grid gap-4">
            {rest.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex gap-4 overflow-hidden rounded-4xl border border-navy-100 bg-white p-3 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-clay-lg"
              >
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  fallbackIcon="book"
                  className="h-full w-32 shrink-0 rounded-3xl sm:w-40"
                  imgClassName="group-hover:scale-110"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center py-2 pr-3">
                  <span className={cn('chip w-fit', CAT[p.accent])}>{p.category}</span>
                  <h3 className="mt-2.5 font-display text-[16.5px] font-extrabold leading-snug text-navy-800 transition-colors group-hover:text-amber-600">
                    {p.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-navy-500">
                    {p.excerpt}
                  </p>
                  <div className="mt-2.5 flex items-center gap-3 text-[11.5px] font-bold text-navy-400">
                    <span>{p.date}</span>
                    <span className="h-3 w-px bg-navy-200" />
                    <span>{p.readTime} min</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KnowledgeHub;
