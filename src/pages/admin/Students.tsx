import { useState } from 'react';
import Flag from '@/components/ui/Flag';
import { Search, UserPlus } from 'lucide-react';
import { STUDENTS } from '@/data/admin';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Meter, Panel, StatusPill, Table } from './AdminKit';
import { cn } from '@/lib/utils';

const STATUSES = ['all', 'active', 'trial', 'paused'] as const;

export default function Students() {
 const [status, setStatus] = useState<(typeof STATUSES)[number]>('all');
 const [query, setQuery] = useState('');

 const rows = STUDENTS.filter((s) => {
  if (status !== 'all' && s.status !== status) return false;
  if (query && !`${s.name} ${s.board} ${s.teacher} ${s.subjects.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
   return false;
  return true;
 });

 const avgAttendance = Math.round(STUDENTS.reduce((a, s) => a + s.attendance, 0) / STUDENTS.length);
 const avgProgress = Math.round(STUDENTS.reduce((a, s) => a + s.progress, 0) / STUDENTS.length);

 return (
  <div className="space-y-5">
   <div className="grid gap-4 sm:grid-cols-3">
    <div className="flex items-center gap-4 rounded-3xl border border-amber-200/70 bg-white p-5 shadow-sm">
     <ClayIcon name="student" size={48} />
     <div>
      <p className="font-display text-2xl font-extrabold leading-none text-navy-800">{STUDENTS.length}</p>
      <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">On roster</p>
     </div>
    </div>
    <div className="flex items-center gap-4 rounded-3xl border border-forest-200/70 bg-white p-5 shadow-sm">
     <ClayIcon name="calendar" size={48} />
     <div>
      <p className="font-display text-2xl font-extrabold leading-none text-navy-800">{avgAttendance}%</p>
      <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">Avg attendance</p>
     </div>
    </div>
    <div className="flex items-center gap-4 rounded-3xl border border-navy-200/70 bg-white p-5 shadow-sm">
     <ClayIcon name="target" size={48} />
     <div>
      <p className="font-display text-2xl font-extrabold leading-none text-navy-800">{avgProgress}%</p>
      <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">Avg syllabus progress</p>
     </div>
    </div>
   </div>

   <Panel
    title="Student roster"
    sub={`${rows.length} of ${STUDENTS.length} students`}
    action={
     <Button size="sm" icon={<UserPlus className="h-4 w-4" />}>
      Add student
     </Button>
    }
   >
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
     <div className="flex gap-1.5">
      {STATUSES.map((s) => (
       <button
        key={s}
        onClick={() => setStatus(s)}
        className={cn(
         'rounded-full px-3.5 py-2 text-[12.5px] font-extrabold capitalize transition-all',
         status === s
          ? 'bg-navy-700 text-white'
          : 'border border-navy-100 text-navy-500 hover:border-amber-300 hover:text-amber-600',
        )}
       >
        {s}
       </button>
      ))}
     </div>
     <div className="relative max-w-xs flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
      <input
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search students…"
       className="h-11 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-[13.5px] font-semibold text-navy-700 outline-none focus:border-amber-300 focus:bg-white"
      />
     </div>
    </div>

    <Table head={['Student', 'Board · Grade', 'Teacher', 'Subjects', 'Attendance', 'Progress', 'Status']}>
     {rows.map((s) => (
      <tr key={s.id} className="transition-colors hover:bg-navy-50/60">
       <td className="px-3 py-3">
        <div className="flex items-center gap-2.5">
         <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-[12.5px] font-extrabold text-white">
          {s.name.split(' ').map((n) => n[0]).join('')}
         </span>
         <span>
          <span className="block text-[13.5px] font-extrabold text-navy-800">{s.name}</span>
          <span className="block text-[11.5px] font-bold text-navy-400">
           <Flag code={s.flag} size={14} /> {s.country} · since {s.joined}
          </span>
         </span>
        </div>
       </td>
       <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
        {s.board} · G{s.grade}
       </td>
       <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{s.teacher}</td>
       <td className="px-3 py-3">
        <div className="flex flex-wrap gap-1">
         {s.subjects.map((sub) => (
          <span key={sub} className="rounded-lg bg-navy-50 px-2 py-1 text-[11px] font-extrabold text-navy-500">
           {sub}
          </span>
         ))}
        </div>
       </td>
       <td className="px-3 py-3"><Meter value={s.attendance} tone="forest" /></td>
       <td className="px-3 py-3"><Meter value={s.progress} /></td>
       <td className="px-3 py-3"><StatusPill status={s.status} /></td>
      </tr>
     ))}
    </Table>
   </Panel>
  </div>
 );
}
