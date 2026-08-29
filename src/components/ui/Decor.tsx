import { motion } from 'framer-motion';
import ClayIcon from '@/components/clay/ClayIcon';
import { cn } from '@/lib/utils';
import type { ClayIconName } from '@/types';

/** A single clay icon that drifts gently in the background. */
export function FloatIcon({
  name,
  size = 56,
  className,
  delay = 0,
  amplitude = 14,
  duration = 7,
}: {
  name: ClayIconName;
  size?: number;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn('pointer-events-none absolute', className)}
      animate={{ y: [0, -amplitude, 0], rotate: [0, 4, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ClayIcon name={name} size={size} />
    </motion.div>
  );
}

/** Soft colour blobs used behind panels. */
export function Blobs({
  className,
  tone = 'mixed',
}: {
  className?: string;
  tone?: 'mixed' | 'amber' | 'navy' | 'forest';
}) {
  const sets = {
    mixed: ['bg-amber-300/35', 'bg-navy-300/30', 'bg-forest-300/30'],
    amber: ['bg-amber-300/40', 'bg-amber-200/40', 'bg-amber-400/25'],
    navy: ['bg-navy-300/35', 'bg-navy-200/40', 'bg-navy-400/20'],
    forest: ['bg-forest-300/35', 'bg-forest-200/40', 'bg-forest-400/20'],
  } as const;
  const [a, b, c] = sets[tone];
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className={cn('absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl animate-float-slow', a)} />
      <div className={cn('absolute -bottom-32 right-[-6rem] h-96 w-96 rounded-full blur-3xl animate-float-slow', b)} style={{ animationDelay: '2s' }} />
      <div className={cn('absolute left-1/2 top-1/3 h-64 w-64 rounded-full blur-3xl animate-float-slow', c)} style={{ animationDelay: '4s' }} />
    </div>
  );
}

/** Faint academic doodles: formulas, orbits, dashed flight paths. */
export function Doodles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M-20 480C120 400 220 520 340 460S540 300 680 360s180 140 320 80"
        stroke="#1B2E54"
        strokeOpacity="0.08"
        strokeWidth="2"
        strokeDasharray="10 12"
      />
      <circle cx="150" cy="120" r="60" stroke="#FF9B25" strokeOpacity="0.16" strokeWidth="2" />
      <circle cx="150" cy="120" r="92" stroke="#FF9B25" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="6 10" />
      <circle cx="1050" cy="470" r="70" stroke="#478A58" strokeOpacity="0.15" strokeWidth="2" />
      <text x="860" y="50" fontSize="42" fontWeight="800" fill="#1B2E54" fillOpacity="0.07" fontFamily="Baloo 2, sans-serif">
        E = mc²
      </text>
      <text x="80" y="520" fontSize="38" fontWeight="800" fill="#FF9B25" fillOpacity="0.12" fontFamily="Baloo 2, sans-serif">
        a² + b² = c²
      </text>
      <text x="640" y="40" fontSize="34" fontWeight="800" fill="#478A58" fillOpacity="0.12" fontFamily="Baloo 2, sans-serif">
        ∫ f(x) dx
      </text>
      <text x="420" y="560" fontSize="30" fontWeight="800" fill="#1B2E54" fillOpacity="0.07" fontFamily="Baloo 2, sans-serif">
        H₂O
      </text>
    </svg>
  );
}

/** Bottom "wave" divider that echoes the reference deck's curved panels. */
export function WaveDivider({
  className,
  fill = '#FFFFFF',
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn('block w-full', flip && 'rotate-180', className)}
      style={{ height: 'clamp(40px, 6vw, 96px)' }}
    >
      <path d="M0 60C240 110 480 110 720 80s480-70 720-20v60H0V60z" fill={fill} />
    </svg>
  );
}
