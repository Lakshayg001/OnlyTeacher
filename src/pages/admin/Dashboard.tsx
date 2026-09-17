import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Flag from '@/components/ui/Flag';
import { ArrowUpRight, Plus } from 'lucide-react';
import { BOOKINGS } from '@/data/admin';
import { Button } from '@/components/ui/Primitives';
import { AreaChart, BarList, Donut, Kpi, Panel, StatusPill, Table } from './AdminKit';

const COUNTRY_CONFIG: Record<string, { flag: string; color: string }> = {
 'India': { flag: 'IN', color: '#FF9B25' },
 'UAE': { flag: 'AE', color: '#478A58' },
 'United Kingdom': { flag: 'GB', color: '#1B2E54' },
 'Australia': { flag: 'AU', color: '#8B7BE8' },
 'USA': { flag: 'US', color: '#E2914F' },
 'Canada': { flag: 'CA', color: '#55C4A2' }
};
const DEFAULT_COLORS = ['#FF9B25', '#478A58', '#1B2E54', '#8B7BE8', '#E2914F', '#55C4A2'];

export default function Dashboard() {
 const [isLoading, setIsLoading] = useState(true);
 const [bookingTrend, setBookingTrend] = useState<any[]>([]);
 const [countrySplit, setCountrySplit] = useState<any[]>([]);
 const [boardSplit, setBoardSplit] = useState<any[]>([]);
 const [totalStudents, setTotalStudents] = useState(0);

 useEffect(() => {
  async function fetchData() {
   try {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    const res = await fetch(import.meta.env.PROD ? 'http://13.201.30.247/api/admin/contacts?size=10000' : '/api/admin/contacts?size=10000', {
     headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Failed to fetch');
    const json = await res.json();
    const contacts = json.data?.content || [];
    
    setTotalStudents(contacts.length);

    // 1. Process Booking Trend
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendMap = new Map<string, number>();
    
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
     trendMap.set(`${months[d.getMonth()]}`, 0);
    }
    
    contacts.forEach((c: any) => {
     if (c.createdAt) {
      const d = new Date(c.createdAt);
      const m = months[d.getMonth()];
      if (trendMap.has(m)) {
       trendMap.set(m, trendMap.get(m)! + 1);
      }
     }
    });
    
    setBookingTrend(Array.from(trendMap.entries()).map(([m, v]) => ({ m, v })));

    // 2. Process Country Split
    const cMap = new Map<string, number>();
    contacts.forEach((c: any) => {
     if (c.country) cMap.set(c.country, (cMap.get(c.country) || 0) + 1);
    });
    
    let colorIdx = 0;
    const countries = Array.from(cMap.entries())
     .sort((a, b) => b[1] - a[1])
     .map(([label, value]) => {
      const conf = COUNTRY_CONFIG[label];
      const color = conf?.color || DEFAULT_COLORS[colorIdx++ % DEFAULT_COLORS.length];
      const flag = conf?.flag || 'UN';
      return { label, value, flag, color };
     });
    setCountrySplit(countries);

    // 3. Process Board Split
    const bMap = new Map<string, number>();
    contacts.forEach((c: any) => {
     if (c.board) bMap.set(c.board, (bMap.get(c.board) || 0) + 1);
    });
    
    const totalBoards = Array.from(bMap.values()).reduce((a, b) => a + b, 0);
    const boards = Array.from(bMap.entries())
     .sort((a, b) => b[1] - a[1])
     .map(([label, count]) => ({
      label,
      value: totalBoards > 0 ? Math.round((count / totalBoards) * 100) : 0
     }));
    setBoardSplit(boards);

   } catch (err) {
    console.error(err);
   } finally {
    setIsLoading(false);
   }
  }
  
  fetchData();
 }, []);

 if (isLoading) {
  return <div className="flex items-center justify-center min-h-[50vh] text-navy-400 font-semibold text-sm">Fetching real-time data...</div>;
 }

 return (
  <div className="space-y-5">


   {/* charts */}
   <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
    <Panel
     title="Demo bookings"
     sub="Last 12 months all countries"
     action={
      <span className="rounded-full bg-forest-100 px-3 py-1.5 text-[11.5px] font-extrabold text-forest-700">
       Real-time
      </span>
     }
    >
     <AreaChart data={bookingTrend} />
    </Panel>

    <Panel title="Students by country" sub="Learning without borders">
     <Donut data={countrySplit} />
    </Panel>
   </div>

   <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">


    <div className="space-y-4">
     <Panel title="Enrolment by board" sub="Share of active students">
      <BarList data={boardSplit} />
     </Panel>
    </div>
   </div>
  </div>
 );
}
