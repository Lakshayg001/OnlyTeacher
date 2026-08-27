import { useState } from 'react';
import { Plus } from 'lucide-react';
import { POSTS } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Panel } from './AdminKit';
import { cn } from '@/lib/utils';

type State = 'published' | 'draft' | 'review';

const STATE_STYLE: Record<State, string> = {
  published: 'bg-forest-100 text-forest-700',
  draft: 'bg-navy-100 text-navy-500',
  review: 'bg-amber-100 text-amber-700',
};

const INITIAL: Record<string, State> = {
  b1: 'published', b2: 'published', b3: 'published',
  b4: 'review', b5: 'draft', b6: 'published',
};

export default function Content() {
  const [states, setStates] = useState(INITIAL);

  const cycle = (id: string) =>
    setStates((s) => {
      const order: State[] = ['draft', 'review', 'published'];
      const next = order[(order.indexOf(s[id]) + 1) % order.length];
      return { ...s, [id]: next };
    });

  const counts = (Object.values(states) as State[]).reduce(
    (acc, s) => ({ ...acc, [s]: (acc[s] ?? 0) + 1 }),
    {} as Record<State, number>,
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {(['published', 'review', 'draft'] as State[]).map((s) => (
          <div key={s} className="flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-5 shadow-sm">
            <ClayIcon name={s === 'published' ? 'rocket' : s === 'review' ? 'bulb' : 'book'} size={46} />
            <div>
              <p className="font-display text-2xl font-extrabold leading-none text-navy-800">
                {counts[s] ?? 0}
              </p>
              <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400 capitalize">
                {s === 'review' ? 'In review' : s}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Panel
        title="Knowledge hub articles"
        sub="STEM, study strategy and parent guides"
        action={
          <Button size="sm" icon={<Plus className="h-4 w-4" />}>
            New article
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-clay"
            >
              <div className="relative">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  fallbackIcon="book"
                  ratio="16/9"
                  className="w-full"
                  imgClassName="group-hover:scale-105"
                />
                <button
                  onClick={() => cycle(p.id)}
                  className={cn(
                    'absolute right-3 top-3 rounded-full px-3 py-1.5 text-[11px] font-extrabold capitalize backdrop-blur transition-transform hover:scale-105',
                    STATE_STYLE[states[p.id]],
                  )}
                >
                  {states[p.id]}
                </button>
              </div>
              <div className="p-4">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-amber-600">
                  {p.category}
                </span>
                <h3 className="mt-1.5 text-[14.5px] font-extrabold leading-snug text-navy-800">{p.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-[11.5px] font-bold text-navy-400">
                  {p.author} <span className="h-3 w-px bg-navy-200" /> {p.date} <span className="h-3 w-px bg-navy-200" /> {p.readTime} min
                </p>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
