import { useState } from 'react';
import { Eye, EyeOff, Plus, Search } from 'lucide-react';
import { BOARDS, COURSES, TRACKS } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button, Stars } from '@/components/ui/Primitives';
import { Panel, Table } from './AdminKit';
import { cn } from '@/lib/utils';

export default function ManageCourses() {
 const [query, setQuery] = useState('');
 const [track, setTrack] = useState('all');
 const [hidden, setHidden] = useState<Set<string>>(new Set());

 const toggle = (id: string) =>
  setHidden((prev) => {
   const next = new Set(prev);
   if (next.has(id)) next.delete(id);
   else next.add(id);
   return next;
  });

 const rows = COURSES.filter((c) => {
  if (track !== 'all' && c.track !== track) return false;
  if (query && !`${c.title} ${c.subject} ${c.boards.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
   return false;
  return true;
 });

 return (
  <div className="space-y-5">
   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {[
     { icon: 'book' as const, value: COURSES.length, label: 'Published courses' },
     { icon: 'globe' as const, value: BOARDS.length, label: 'Boards supported' },
     { icon: 'clock' as const, value: COURSES.reduce((a, c) => a + c.hours, 0), label: 'Curriculum hours' },
     { icon: 'trophy' as const, value: (COURSES.reduce((a, c) => a + c.rating, 0) / COURSES.length).toFixed(2), label: 'Average rating' },
    ].map((s) => (
     <div key={s.label} className="flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-5 shadow-sm">
      <ClayIcon name={s.icon} size={46} />
      <div>
       <p className="font-display text-2xl font-extrabold leading-none text-navy-800">{s.value}</p>
       <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">{s.label}</p>
      </div>
     </div>
    ))}
   </div>

   <Panel
    title="Course catalogue"
    sub="Pricing is never published plans are built after the demo"
    action={
     <Button size="sm" icon={<Plus className="h-4 w-4" />}>
      New course
     </Button>
    }
   >
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
     <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
      {[{ id: 'all', label: 'All stages' }, ...TRACKS.map((t) => ({ id: t.id, label: t.label }))].map((t) => (
       <button
        key={t.id}
        onClick={() => setTrack(t.id)}
        className={cn(
         'shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-extrabold transition-all',
         track === t.id
          ? 'bg-navy-700 text-white'
          : 'border border-navy-100 text-navy-500 hover:border-amber-300 hover:text-amber-600',
        )}
       >
        {t.label}
       </button>
      ))}
     </div>
     <div className="relative max-w-xs flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
      <input
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search courses…"
       className="h-11 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-[13.5px] font-semibold text-navy-700 outline-none focus:border-amber-300 focus:bg-white"
      />
     </div>
    </div>

    <Table head={['Course', 'Stage', 'Boards', 'Modules', 'Hours', 'Rating', 'Visibility']}>
     {rows.map((c) => {
      const isHidden = hidden.has(c.id);
      return (
       <tr key={c.id} className={cn('transition-colors hover:bg-navy-50/60', isHidden && 'opacity-50')}>
        <td className="px-3 py-3">
         <div className="flex items-center gap-3">
          <SmartImage
           src={c.image}
           alt={c.title}
           fallbackIcon={c.icon}
           className="h-11 w-16 shrink-0 rounded-xl"
          />
          <span className="min-w-0">
           <span className="block truncate text-[13.5px] font-extrabold text-navy-800">{c.title}</span>
           <span className="block text-[11.5px] font-bold text-navy-400">{c.subject}</span>
          </span>
         </div>
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{c.grade}</td>
        <td className="px-3 py-3">
         <div className="flex flex-wrap gap-1">
          {c.boards.map((b) => (
           <span key={b} className="rounded-lg bg-navy-50 px-2 py-1 text-[11px] font-extrabold text-navy-500">
            {b}
           </span>
          ))}
         </div>
        </td>
        <td className="px-3 py-3 text-[13px] font-bold text-navy-600">{c.modules}</td>
        <td className="px-3 py-3 text-[13px] font-bold text-navy-600">{c.hours}h</td>
        <td className="whitespace-nowrap px-3 py-3">
         <div className="flex items-center gap-1.5">
          <Stars rating={c.rating} size={12} />
          <span className="text-[12.5px] font-extrabold text-navy-700">{c.rating}</span>
         </div>
        </td>
        <td className="px-3 py-3">
         <button
          onClick={() => toggle(c.id)}
          className={cn(
           'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-extrabold transition-colors',
           isHidden
            ? 'bg-navy-100 text-navy-500 hover:bg-navy-200'
            : 'bg-forest-100 text-forest-700 hover:bg-forest-200',
          )}
         >
          {isHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {isHidden ? 'Hidden' : 'Live'}
         </button>
        </td>
       </tr>
      );
     })}
    </Table>
   </Panel>
  </div>
 );
}
