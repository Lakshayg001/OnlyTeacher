import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Flag from '@/components/ui/Flag';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Filter, Search, X } from 'lucide-react';
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
 const navigate = useNavigate();
 const [tab, setTab] = useState<BookingStatus | 'all'>('all');
 const [query, setQuery] = useState('');
 const [bookings, setBookings] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

 useEffect(() => {
  const fetchBookings = async () => {
   const token = localStorage.getItem('tot_admin_token');
   if (!token) {
    navigate('/admin/login');
    return;
   }
   try {
    const res = await fetch(import.meta.env.PROD ? 'http://13.201.30.247/api/admin/contacts?page=0&size=100&sort=createdAt,desc' : '/api/admin/contacts?page=0&size=100&sort=createdAt,desc', {
     headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401 || res.status === 403) {
     localStorage.removeItem('tot_admin_token');
     navigate('/admin/login');
     return;
    }
    const json = await res.json();
    if (json.success && json.data?.content) {
     const mapped = json.data.content.map((b: any) => ({
      ...b,
      status: 'new', // Using default since API doesn't provide it
      teacher: 'Pending',
      flag: 'IN' // Mock flag
     }));
     setBookings(mapped);
    }
   } catch (e) {
    console.error('Failed to fetch bookings:', e);
   } finally {
    setIsLoading(false);
   }
  };
  fetchBookings();
 }, [navigate]);

 const counts = useMemo(() => {
  const c: Record<string, number> = { all: bookings.length };
  for (const b of bookings) c[b.status] = (c[b.status] ?? 0) + 1;
  return c;
 }, [bookings]);

 const rows = bookings.filter((b) => {
  if (tab !== 'all' && b.status !== tab) return false;
  if (query && !`${b.id} ${b.student} ${b.parent} ${b.subject} ${b.teacher}`.toLowerCase().includes(query.toLowerCase()))
   return false;
  return true;
 });

 return (
  <div className="space-y-5">


   <Panel
    title="Demo bookings"
    sub={`${rows.length} of ${bookings.length} requests`}
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

    {isLoading ? (
     <div className="flex flex-col items-center py-14 text-center">
      <p className="mt-3 font-display text-lg font-extrabold text-navy-700">Loading bookings...</p>
     </div>
    ) : rows.length === 0 ? (
     <div className="flex flex-col items-center py-14 text-center">
      <ClayIcon name="calendar" size={64} />
      <p className="mt-3 font-display text-lg font-extrabold text-navy-700">No bookings match</p>
      <p className="text-[13.5px] font-semibold text-navy-400">Try a different status or search term.</p>
     </div>
    ) : (
     <Table head={['Ref', 'Student & parent', 'Board · Grade', 'Subject & Edge', 'Preferred slot', 'Contact info', 'T&C Timestamp', '']}>
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
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
         <span className="block">{b.subject || '-'}</span>
         {b.examEdge && <span className="block text-[11px] text-navy-400">Edge: {b.examEdge}</span>}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-navy-500">{b.slot}</td>
        <td className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold text-navy-600">
         <span className="block">Phone: {b.phoneCode} {b.phone}</span>
         <span className="block">WA: {b.whatsappCode} {b.whatsapp}</span>
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold text-navy-500">
         {b.termsAcceptedAt ? new Date(b.termsAcceptedAt).toLocaleString() : '-'}
        </td>

        <td className="px-3 py-3 text-right">
         <button 
          onClick={() => setSelectedBooking(b)}
          className="rounded-full border border-navy-100 px-3 py-1.5 text-[12px] font-extrabold text-navy-600 transition-colors hover:border-amber-300 hover:text-amber-600"
         >
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

   <AnimatePresence>
    {selectedBooking && (
     <>
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm"
       onClick={() => setSelectedBooking(null)}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
       <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-clay-navy pointer-events-auto flex flex-col max-h-full"
       >
        <div className="flex items-center justify-between border-b border-navy-100 bg-navy-50/50 p-6 shrink-0">
        <div>
         <h2 className="font-display text-2xl font-extrabold text-navy-800">
          {selectedBooking.student}
         </h2>
         <p className="mt-1 flex items-center gap-2 text-sm font-bold text-navy-500">
          <Flag code={selectedBooking.flag || 'UN'} size={14} /> 
          {selectedBooking.parent}
         </p>
        </div>
        <button
         onClick={() => setSelectedBooking(null)}
         className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy-400 shadow-sm transition-colors hover:bg-navy-50 hover:text-navy-700"
        >
         <X size={20} />
        </button>
       </div>

       <div className="max-h-[70vh] overflow-y-auto p-6">
        <div className="grid gap-6 sm:grid-cols-2">
         {/* Academic Needs */}
         <div className="space-y-4 rounded-2xl bg-navy-50 p-5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-400">Academic Needs</h3>
          <dl className="space-y-3 text-sm">
           <div>
            <dt className="font-bold text-navy-500">Board & Grade</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.board} · G{selectedBooking.grade}</dd>
           </div>
           <div>
            <dt className="font-bold text-navy-500">Subject</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.subject || '-'}</dd>
           </div>
           {selectedBooking.examEdge && (
            <div>
             <dt className="font-bold text-navy-500">Exam Edge</dt>
             <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.examEdge}</dd>
            </div>
           )}
           <div>
            <dt className="font-bold text-navy-500">Preferred Slot</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.slot}</dd>
           </div>
          </dl>
         </div>

         {/* Contact Details */}
         <div className="space-y-4 rounded-2xl bg-navy-50 p-5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-400">Contact Details</h3>
          <dl className="space-y-3 text-sm">
           <div>
            <dt className="font-bold text-navy-500">Email</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.email}</dd>
           </div>
           <div>
            <dt className="font-bold text-navy-500">Phone</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.phoneCode} {selectedBooking.phone}</dd>
           </div>
           <div>
            <dt className="font-bold text-navy-500">WhatsApp</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.whatsappCode} {selectedBooking.whatsapp}</dd>
           </div>
           <div>
            <dt className="font-bold text-navy-500">Preferred Contact</dt>
            <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.contactPref}</dd>
           </div>
          </dl>
         </div>

         {/* Notes & Meta */}
         <div className="col-span-full space-y-4 rounded-2xl border border-navy-100 bg-white p-5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-400">Additional Info</h3>
          {selectedBooking.notes && (
           <div className="mb-4">
            <dt className="text-sm font-bold text-navy-500">Notes from parent</dt>
            <dd className="mt-1 text-sm font-semibold text-navy-700">{selectedBooking.notes}</dd>
           </div>
          )}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs">
           <div>
            <span className="font-bold text-navy-400">Ref:</span>
            <span className="ml-2 font-mono font-bold text-navy-600">{selectedBooking.id}</span>
           </div>
           <div>
            <span className="font-bold text-navy-400">Created:</span>
            <span className="ml-2 font-bold text-navy-600">{selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString() : '-'}</span>
           </div>
           <div>
            <span className="font-bold text-navy-400">T&C Accepted:</span>
            <span className="ml-2 font-bold text-navy-600">{selectedBooking.termsAcceptedAt ? new Date(selectedBooking.termsAcceptedAt).toLocaleString() : '-'}</span>
           </div>
          </div>
         </div>
        </div>
       </div>
       
       <div className="border-t border-navy-100 bg-navy-50/50 p-6 text-right shrink-0">
        <Button onClick={() => setSelectedBooking(null)}>Close</Button>
       </div>
      </motion.div>
     </div>
     </>
    )}
   </AnimatePresence>
  </div>
 );
}
