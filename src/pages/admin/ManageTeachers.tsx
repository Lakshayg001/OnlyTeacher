import { useState } from 'react';
import Flag from '@/components/ui/Flag';
import { BadgeCheck, Search, UserPlus } from 'lucide-react';
import { TEACHERS } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button, Stars } from '@/components/ui/Primitives';
import { Meter, Panel, Table } from './AdminKit';
import { cn } from '@/lib/utils';

export default function ManageTeachers() {
 const [query, setQuery] = useState('');
 const rows = TEACHERS.filter((t) =>
  `${t.name} ${t.subjects.join(' ')} ${t.boards.join(' ')} ${t.country}`
   .toLowerCase()
   .includes(query.toLowerCase()),
 );

 const avgRating = (TEACHERS.reduce((a, t) => a + t.rating, 0) / TEACHERS.length).toFixed(2);
 const totalReviews = TEACHERS.reduce((a, t) => a + t.reviews, 0);

 return (
  <div className="space-y-5">
   <div className="grid gap-4 sm:grid-cols-3">
    {[
     { icon: 'teacher' as const, value: '850+', label: 'On the bench', border: 'border-amber-200/70' },
     { icon: 'trophy' as const, value: avgRating, label: 'Average rating', border: 'border-forest-200/70' },
     { icon: 'heart' as const, value: totalReviews.toLocaleString('en-US'), label: 'Parent reviews', border: 'border-navy-200/70' },
    ].map((s) => (
     <div key={s.label} className={cn('flex items-center gap-4 rounded-3xl border bg-white p-5 shadow-sm', s.border)}>
      <ClayIcon name={s.icon} size={48} />
      <div>
       <p className="font-display text-2xl font-extrabold leading-none text-navy-800">{s.value}</p>
       <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">{s.label}</p>
      </div>
     </div>
    ))}
   </div>

   <Panel
    title="Teacher directory"
    sub="Verification boards and monthly ratings"
    action={
     <Button size="sm" icon={<UserPlus className="h-4 w-4" />}>
      Invite teacher
     </Button>
    }
   >
    <div className="relative mb-4 max-w-sm">
     <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
     <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search teachers…"
      className="h-11 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-[13.5px] font-semibold text-navy-700 outline-none focus:border-amber-300 focus:bg-white"
     />
    </div>

    <Table head={['Teacher', 'Subjects', 'Boards', 'Grades', 'Experience', 'Rating', 'Load', 'Verified']}>
     {rows.map((t) => (
      <tr key={t.id} className="transition-colors hover:bg-navy-50/60">
       <td className="px-3 py-3">
        <div className="flex items-center gap-2.5">
         <SmartImage
          src={t.photo}
          alt={t.name}
          fallbackIcon="teacher"
          className="h-10 w-10 shrink-0 rounded-xl ring-2 ring-navy-100"
         />
         <span className="min-w-0">
          <span className="block truncate text-[13.5px] font-extrabold text-navy-800">{t.name}</span>
          <span className="block text-[11.5px] font-bold text-navy-400">
           <Flag code={t.flag} size={14} /> {t.country}
          </span>
         </span>
        </div>
       </td>
       <td className="px-3 py-3">
        <div className="flex flex-wrap gap-1">
         {t.subjects.map((s) => (
          <span key={s} className="rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-extrabold text-amber-700">
           {s}
          </span>
         ))}
        </div>
       </td>
       <td className="px-3 py-3">
        <div className="flex flex-wrap gap-1">
         {t.boards.map((b) => (
          <span key={b} className="rounded-lg bg-navy-50 px-2 py-1 text-[11px] font-extrabold text-navy-500">
           {b}
          </span>
         ))}
        </div>
       </td>
       <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
        {t.grades.replace('Grades ', '')}
       </td>
       <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{t.experience} yrs</td>
       <td className="whitespace-nowrap px-3 py-3">
        <div className="flex items-center gap-1.5">
         <Stars rating={t.rating} size={12} />
         <span className="text-[12.5px] font-extrabold text-navy-700">{t.rating}</span>
        </div>
       </td>
       <td className="px-3 py-3">
        <Meter value={Math.min(96, 52 + t.reviews % 45)} tone="forest" />
       </td>
       <td className="px-3 py-3">
        {t.verified ? (
         <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 px-2.5 py-1 text-[11px] font-extrabold text-forest-700">
          <BadgeCheck className="h-3.5 w-3.5" /> Verified
         </span>
        ) : (
         <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-extrabold text-amber-700">
          Pending
         </span>
        )}
       </td>
      </tr>
     ))}
    </Table>
   </Panel>
  </div>
 );
}
