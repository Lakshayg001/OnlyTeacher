import { Link } from 'react-router-dom';
import Flag from '@/components/ui/Flag';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ACTIVITY, BOARD_SPLIT, BOOKINGS, BOOKING_TREND, COUNTRY_SPLIT } from '@/data/admin';
import { TEACHERS } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button, Stars } from '@/components/ui/Primitives';
import { AreaChart, BarList, Donut, Kpi, Panel, StatusPill, Table } from './AdminKit';
import { cn } from '@/lib/utils';

const DOT = { amber: 'bg-amber-500', forest: 'bg-forest-500', navy: 'bg-navy-600' } as const;

export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* greeting */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 to-navy-900 p-6 shadow-clay-navy sm:p-7"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="wash wash-deep" />
        </div>
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <ClayIcon name="graduation" size={64} />
            <div>
              <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">
                Good afternoon, Sanchit.
              </h2>
              <p className="mt-1 text-[14px] font-semibold text-navy-300">
                3 new demo requests are waiting to be matched to a teacher.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Button to="/admin/bookings" size="sm" icon={<Plus className="h-4 w-4" />}>
              Match a booking
            </Button>
            <Button to="/admin/reports" variant="white" size="sm">
              View reports
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Active students" value={12500} suffix="+" delta={8.4} icon="student" tone="amber" />
        <Kpi label="Demo bookings (Aug)" value={574} delta={12.1} icon="calendar" tone="forest" />
        <Kpi label="Teachers on bench" value={850} suffix="+" delta={3.2} icon="teacher" tone="navy" />
        <Kpi label="Demo → enrol rate" value={68} suffix="%" delta={-1.4} icon="target" tone="amber" />
      </div>

      {/* charts */}
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Demo bookings"
          sub="Last 12 months, all countries"
          action={
            <span className="rounded-full bg-forest-100 px-3 py-1.5 text-[11.5px] font-extrabold text-forest-700">
              +173% YoY
            </span>
          }
        >
          <AreaChart data={BOOKING_TREND} />
        </Panel>

        <Panel title="Students by country" sub="Learning without borders">
          <Donut data={COUNTRY_SPLIT} />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* recent bookings */}
        <Panel
          title="Latest demo requests"
          sub="Newest first"
          action={
            <Link to="/admin/bookings" className="inline-flex items-center gap-1 text-[12.5px] font-extrabold text-amber-600 hover:underline">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <Table head={['Student', 'Board · Grade', 'Subject', 'Teacher', 'Status']}>
            {BOOKINGS.slice(0, 6).map((b) => (
              <tr key={b.id} className="transition-colors hover:bg-navy-50/60">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-100 text-[13px] font-extrabold text-navy-700">
                      {b.student.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-extrabold text-navy-800">
                        {b.student}
                      </span>
                      <span className="block text-[11.5px] font-bold text-navy-400">
                        <Flag code={b.flag} size={14} /> {b.country}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
                  {b.board} · G{b.grade}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{b.subject}</td>
                <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">{b.teacher}</td>
                <td className="px-3 py-3"><StatusPill status={b.status} /></td>
              </tr>
            ))}
          </Table>
        </Panel>

        <div className="space-y-4">
          <Panel title="Enrolment by board" sub="Share of active students">
            <BarList data={BOARD_SPLIT} />
          </Panel>

          <Panel title="Recent activity">
            <ul className="space-y-3.5">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="relative mt-1.5 flex">
                    <span className={cn('h-2.5 w-2.5 rounded-full', DOT[a.tone])} />
                    {i < ACTIVITY.length - 1 && (
                      <span className="absolute left-1/2 top-4 h-8 w-px -translate-x-1/2 bg-navy-100" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] leading-snug text-navy-600">
                      <span className="font-extrabold text-navy-800">{a.who}</span> {a.what}
                    </span>
                    <span className="block text-[11.5px] font-bold text-navy-400">{a.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      {/* top teachers */}
      <Panel
        title="Top rated teachers this month"
        sub="Ranked by parent rating and completed lessons"
        action={
          <Link to="/admin/teachers" className="inline-flex items-center gap-1 text-[12.5px] font-extrabold text-amber-600 hover:underline">
            Manage <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TEACHERS.slice(0, 4).map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-navy-50/50 p-3 transition-all hover:-translate-y-1 hover:border-amber-200 hover:bg-white hover:shadow-clay"
            >
              <SmartImage
                src={t.photo}
                alt={t.name}
                fallbackIcon="teacher"
                className="h-12 w-12 shrink-0 rounded-2xl ring-2 ring-white"
              />
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-extrabold text-navy-800">{t.name}</p>
                <p className="truncate text-[11.5px] font-bold text-navy-400">
                  {t.subjects[0]} · <Flag code={t.flag} size={13} /> {t.country}
                </p>
                <div className="mt-0.5 flex items-center gap-1">
                  <Stars rating={t.rating} size={11} />
                  <span className="text-[11px] font-extrabold text-navy-600">{t.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
