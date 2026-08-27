import { BOARD_SPLIT, BOOKING_TREND, COUNTRY_SPLIT, STUDENTS } from '@/data/admin';
import Flag from '@/components/ui/Flag';
import { COUNTRIES } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import { AreaChart, BarList, Donut, Kpi, Meter, Panel, Table } from './AdminKit';

const RETENTION = [
  { label: 'Term 1 → Term 2', value: 91 },
  { label: 'Term 2 → Term 3', value: 87 },
  { label: 'Year 1 → Year 2', value: 74 },
  { label: 'Demo → Enrolment', value: 68 },
];

export default function Reports() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Lessons delivered (Aug)" value={9840} delta={9.6} icon="laptop" tone="navy" />
        <Kpi label="Avg attendance" value={94} suffix="%" delta={1.8} icon="calendar" tone="forest" />
        <Kpi label="Teacher rematch rate" value={4} suffix="%" delta={-0.6} icon="teacher" tone="amber" />
        <Kpi label="Parent NPS" value={72} delta={5.1} icon="heart" tone="forest" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Demo bookings trend" sub="Last 12 months across all four countries">
          <AreaChart data={BOOKING_TREND} height={250} />
        </Panel>
        <Panel title="Students by country">
          <Donut data={COUNTRY_SPLIT} />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Enrolment by board">
          <BarList data={BOARD_SPLIT} />
        </Panel>

        <Panel title="Retention checkpoints">
          <BarList data={RETENTION} />
        </Panel>

        <Panel title="Regional operations" sub="Timezone coverage and curricula">
          <ul className="space-y-3">
            {COUNTRIES.map((c) => (
              <li key={c.code} className="flex items-center gap-3 rounded-2xl bg-navy-50/70 px-3.5 py-3">
                <Flag code={c.flag} size={26} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-extrabold text-navy-800">{c.name}</span>
                  <span className="block truncate text-[11.5px] font-bold text-navy-400">
                    {c.timezone} · {c.curricula.slice(0, 2).join(', ')}
                  </span>
                </span>
                <span className="shrink-0 text-[13px] font-extrabold text-amber-600">{c.students}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Student progress detail" sub="Attendance against syllabus completion">
        <Table head={['Student', 'Board · Grade', 'Teacher', 'Attendance', 'Progress']}>
          {STUDENTS.map((s) => (
            <tr key={s.id} className="transition-colors hover:bg-navy-50/60">
              <td className="px-3 py-3">
                <div className="flex items-center gap-2.5">
                  <ClayIcon name="student" size={32} shadow={false} />
                  <span>
                    <span className="block text-[13.5px] font-extrabold text-navy-800">{s.name}</span>
                    <span className="block text-[11.5px] font-bold text-navy-400"><Flag code={s.flag} size={13} /> {s.country}</span>
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
                {s.board} · G{s.grade}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{s.teacher}</td>
              <td className="px-3 py-3"><Meter value={s.attendance} tone="forest" /></td>
              <td className="px-3 py-3"><Meter value={s.progress} /></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}
