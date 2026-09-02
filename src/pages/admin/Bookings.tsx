import { useMemo, useState } from 'react';
import Flag from '@/components/ui/Flag';
import { motion } from 'framer-motion';
import { Download, Filter, Search } from 'lucide-react';
import { BOOKINGS } from '@/data/admin';
import type { BookingStatus } from '@/types';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Panel, StatusPill, Table } from './AdminKit';
import { cn } from '@/lib/utils';

const TABS: { id: BookingStatus | 'all'; label: string }[] = [
 { id: 'all', label: 'All' },
 { id: 'new', label: 'New' },
 { id: 'scheduled', label: 'Scheduled' },
 { id: 'completed', label: 'Completed' },
 { id: 'cancelled', label: 'Cancelled' },
];

export default function Bookings() {
 const [tab, setTab] = useState<BookingStatus | 'all'>('all');
 const [query, setQuery] = useState('');

 const counts = useMemo(() => {
  const c: Record<string, number> = { all: BOOKINGS.length };
  for (const b of BOOKINGS) c[b.status] = (c[b.status] ?? 0) + 1;
  return c;
 }, []);

 const rows = BOOKINGS.filter((b) => {
  if (tab !== 'all' && b.status !== tab) return false;
  if (query && !`${b.id} ${b.student} ${b.parent} ${b.subject} ${b.teacher}`.toLowerCase().includes(query.toLowerCase()))
   return false;
  return true;
 });

 return (
  <div className="space-y-5">
   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {[
     { label: 'Awaiting match', value: counts.new ?? 0, icon: 'chat' as const, tone: 'amber' as const },
     { label: 'Scheduled', value: counts.scheduled ?? 0, icon: 'calendar' as const, tone: 'navy' as const },
     { label: 'Completed', value: counts.completed ?? 0, icon: 'trophy' as const, tone: 'forest' as const },
     { label: 'Cancelled', value: counts.cancelled ?? 0, icon: 'clock' as const, tone: 'navy' as const },
    ].map((s, i) => (
     <motion.div
      key={s.label}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className={cn(
       'flex items-center gap-4 rounded-3xl border bg-white p-5 shadow-sm',
       s.tone === 'amber' ? 'border-amber-200/70' : s.tone === 'forest' ? 'border-forest-200/70' : 'border-navy-200/70',
      )}
     >
      <ClayIcon name={s.icon} size={48} />
      <div>
       <p className="font-display text-2xl font-extrabold leading-none text-navy-800">{s.value}</p>
       <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
        {s.label}
       </p>
      </div>
     </motion.div>
    ))}
   </div>

   <Panel
    title="Demo bookings"
    sub={`${rows.length} of ${BOOKINGS.length} requests`}
    action={
     <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
      Export CSV
     </Button>
    }
   >
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
     <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
      {TABS.map((t) => (
       <button
        key={t.id}
        onClick={() => setTab(t.id)}
        className={cn(
         'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-extrabold transition-all',
         tab === t.id
          ? 'bg-navy-700 text-white'
          : 'border border-navy-100 text-navy-500 hover:border-amber-300 hover:text-amber-600',
        )}
       >
        {t.label}
        <span className={cn('rounded-full px-1.5 py-0.5 text-[10.5px]', tab === t.id ? 'bg-white/20' : 'bg-navy-100 text-navy-500')}>
         {counts[t.id] ?? 0}
        </span>
       </button>
      ))}
     </div>

     <div className="relative max-w-xs flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
      <input
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search bookings…"
       className="h-11 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-[13.5px] font-semibold text-navy-700 outline-none transition-colors focus:border-amber-300 focus:bg-white"
      />
     </div>
    </div>

    {rows.length === 0 ? (
     <div className="flex flex-col items-center py-14 text-center">
      <ClayIcon name="calendar" size={64} />
      <p className="mt-3 font-display text-lg font-extrabold text-navy-800">No bookings match</p>
      <p className="text-[13.5px] font-semibold text-navy-400">Try a different status or search term.</p>
     </div>
    ) : (
     <Table head={['Ref', 'Student & parent', 'Board · Grade', 'Subject', 'Preferred slot', 'Teacher', 'Status', '']}>
      {rows.map((b) => (
       <tr key={b.id} className="transition-colors hover:bg-navy-50/60">
        <td className="whitespace-nowrap px-3 py-3 font-mono text-[12px] font-bold text-navy-400">{b.id}</td>
        <td className="px-3 py-3">
         <span className="block text-[13.5px] font-extrabold text-navy-800">{b.student}</span>
         <span className="block text-[11.5px] font-bold text-navy-400">
          <Flag code={b.flag} size={14} /> {b.parent}
         </span>
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
         {b.board} · G{b.grade}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{b.subject}</td>
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-navy-500">{b.slot}</td>
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{b.teacher}</td>
        <td className="px-3 py-3"><StatusPill status={b.status} /></td>
        <td className="px-3 py-3 text-right">
         <button className="rounded-full border border-navy-100 px-3 py-1.5 text-[12px] font-extrabold text-navy-600 transition-colors hover:border-amber-300 hover:text-amber-600">
          Open
         </button>
        </td>
       </tr>
      ))}
     </Table>
    )}

    <p className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-navy-400">
     <Filter className="h-3.5 w-3.5" />
     Bookings are matched to teachers by board, grade and timezone never by price.
    </p>
   </Panel>
  </div>
 );
}
