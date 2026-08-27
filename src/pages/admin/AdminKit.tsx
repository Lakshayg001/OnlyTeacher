import type { ReactNode } from 'react';
import Flag from '@/components/ui/Flag';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Counter } from '@/components/ui/Primitives';
import ClayIcon from '@/components/clay/ClayIcon';
import type { ClayIconName } from '@/types';

/* --------------------------------- shell --------------------------------- */

export function Panel({
  title,
  action,
  children,
  className,
  sub,
}: {
  title?: string;
  sub?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-3xl border border-navy-100 bg-white p-5 shadow-sm', className)}>
      {(title || action) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="font-display text-[16.5px] font-extrabold text-navy-800">{title}</h2>
            )}
            {sub && <p className="mt-0.5 text-[12.5px] font-semibold text-navy-400">{sub}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/* ---------------------------------- KPI ---------------------------------- */

export function Kpi({
  label,
  value,
  suffix,
  delta,
  icon,
  tone = 'amber',
}: {
  label: string;
  value: number;
  suffix?: string;
  delta: number;
  icon: ClayIconName;
  tone?: 'amber' | 'forest' | 'navy';
}) {
  const up = delta >= 0;
  const bg = {
    amber: 'from-amber-50 to-white border-amber-200/70',
    forest: 'from-forest-50 to-white border-forest-200/70',
    navy: 'from-navy-50 to-white border-navy-200/70',
  }[tone];

  return (
    <div
      className={cn(
        'group rounded-3xl border bg-gradient-to-br p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-clay',
        bg,
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-navy-400">
          {label}
        </p>
        <span className="transition-transform duration-300 group-hover:-rotate-12">
          <ClayIcon name={icon} size={40} />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold leading-none text-navy-800">
        <Counter value={value} suffix={suffix} />
      </p>
      <p
        className={cn(
          'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-extrabold',
          up ? 'bg-forest-100 text-forest-700' : 'bg-red-100 text-red-600',
        )}
      >
        {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        {up ? '+' : ''}
        {delta}% vs last month
      </p>
    </div>
  );
}

/* ------------------------------- area chart ------------------------------- */

export function AreaChart({
  data,
  height = 220,
}: {
  data: { m: string; v: number }[];
  height?: number;
}) {
  const W = 720;
  const H = height;
  const pad = { t: 16, r: 12, b: 28, l: 34 };
  const max = Math.max(...data.map((d) => d.v)) * 1.12;
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const pts = data.map((d, i) => {
    const x = pad.l + (i / (data.length - 1)) * iw;
    const y = pad.t + ih - (d.v / max) * ih;
    return [x, y] as const;
  });

  // Smooth cubic path
  const line = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C${cx} ${py} ${cx} ${y} ${x} ${y}`;
  }, '');

  const area = `${line} L${pad.l + iw} ${pad.t + ih} L${pad.l} ${pad.t + ih} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Demo bookings per month">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF9B25" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF9B25" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = pad.t + ih * t;
        return (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke="#D9E1F0" strokeWidth="1" strokeDasharray="4 6" />
            <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="10" fontWeight="700" fill="#8098C6">
              {Math.round(max * (1 - t))}
            </text>
          </g>
        );
      })}

      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="#FF9B25" strokeWidth="3" strokeLinecap="round" />

      {pts.map(([x, y], i) => (
        <g key={data[i].m}>
          <circle cx={x} cy={y} r="4.5" fill="#fff" stroke="#FF9B25" strokeWidth="2.5" />
          <text x={x} y={H - 8} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#8098C6">
            {data[i].m}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* -------------------------------- donut ---------------------------------- */

export function Donut({
  data,
  size = 180,
}: {
  data: { label: string; value: number; color: string; flag?: string }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 62;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle cx="80" cy="80" r={R} fill="none" stroke="#EEF2F9" strokeWidth="22" />
          {data.map((d) => {
            const len = (d.value / total) * C;
            const el = (
              <circle
                key={d.label}
                cx="80"
                cy="80"
                r={R}
                fill="none"
                stroke={d.color}
                strokeWidth="22"
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="font-display text-2xl font-extrabold leading-none text-navy-800">
              {total.toLocaleString('en-US')}
            </p>
            <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-navy-400">
              Students
            </p>
          </div>
        </div>
      </div>

      <ul className="min-w-[10rem] flex-1 space-y-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="flex-1 truncate text-[13px] font-bold text-navy-600">
              {d.flag && <Flag code={d.flag} size={15} />} {d.label}
            </span>
            <span className="text-[13px] font-extrabold text-navy-800">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- bars ---------------------------------- */

export function BarList({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="mb-1.5 flex items-center justify-between text-[12.5px] font-extrabold">
            <span className="text-navy-700">{d.label}</span>
            <span className="text-navy-400">{d.value}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-navy-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-[width] duration-1000"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------- badges --------------------------------- */

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-amber-100 text-amber-700',
    scheduled: 'bg-sky text-navy-700',
    completed: 'bg-forest-100 text-forest-700',
    cancelled: 'bg-red-100 text-red-600',
    active: 'bg-forest-100 text-forest-700',
    trial: 'bg-amber-100 text-amber-700',
    paused: 'bg-navy-100 text-navy-500',
  };
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold capitalize',
        map[status] ?? 'bg-navy-100 text-navy-600',
      )}
    >
      {status}
    </span>
  );
}

export function Meter({ value, tone = 'amber' }: { value: number; tone?: 'amber' | 'forest' }) {
  const bar = tone === 'amber' ? 'from-amber-400 to-amber-600' : 'from-forest-400 to-forest-600';
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-navy-100">
        <div className={cn('h-full rounded-full bg-gradient-to-r', bar)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[12px] font-extrabold text-navy-600">{value}%</span>
    </div>
  );
}

/* --------------------------------- table --------------------------------- */

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-navy-100">
            {head.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-3 py-3 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-navy-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">{children}</tbody>
      </table>
    </div>
  );
}
