import { cn } from '@/lib/utils';
import * as Flags from 'country-flag-icons/react/3x2';

export type FlagCode = string;

/**
 * Inline SVG flags for the countries TOT teaches in.
 * Uses country-flag-icons for standard SVG flag rendering.
 */
export function Flag({
 code,
 size = 20,
 className,
 title,
}: {
 code: FlagCode;
 size?: number;
 className?: string;
 title?: string;
}) {
 const w = size;
 const h = Math.round((size * 2) / 3);
 
 const FlagComponent = Flags[code as keyof typeof Flags];

 return (
  <span
   className={cn(
    'inline-block shrink-0 overflow-hidden rounded-[3px] align-middle shadow-[0_0_0_1px_rgba(27,46,84,0.12)]',
    className,
   )}
   style={{ width: w, height: h }}
   role="img"
   aria-label={title ?? `${code} flag`}
  >
   {FlagComponent ? (
    <FlagComponent style={{ width: '100%', height: '100%', display: 'block' }} />
   ) : (
    <svg viewBox="0 0 30 20" width={w} height={h} aria-hidden="true">
     <rect width="30" height="20" fill="#D9E1F0" />
     <text x="15" y="14" fontSize="11" fontWeight="bold" fill="#1B2E54" textAnchor="middle" style={{ fontFamily: 'sans-serif' }}>
      {code}
     </text>
    </svg>
   )}
  </span>
 );
}

export default Flag;
