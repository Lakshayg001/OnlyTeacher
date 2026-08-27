import { cn } from '@/lib/utils';

export type FlagCode = 'IN' | 'GB' | 'AE' | 'AU' | 'JP';

/**
 * Inline SVG flags for the countries TOT teaches in.
 *
 * Regional-indicator flag emoji do not render on Windows (Chrome falls back to
 * the bare letter pair, e.g. "IN"), so every flag on the site is drawn instead.
 */
export function Flag({
  code,
  size = 20,
  className,
  title,
}: {
  code: FlagCode | string;
  size?: number;
  className?: string;
  title?: string;
}) {
  const w = size;
  const h = Math.round((size * 2) / 3);

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
      <svg viewBox="0 0 30 20" width={w} height={h} aria-hidden="true">
        {shape(code)}
      </svg>
    </span>
  );
}

function shape(code: string) {
  switch (code) {
    case 'IN':
      return (
        <>
          <rect width="30" height="6.67" fill="#FF9933" />
          <rect y="6.67" width="30" height="6.66" fill="#FFFFFF" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.7" />
          <circle cx="15" cy="10" r="0.6" fill="#000080" />
          <g stroke="#000080" strokeWidth="0.3">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * Math.PI) / 6;
              return (
                <line
                  key={i}
                  x1={15 + Math.cos(a) * 0.8}
                  y1={10 + Math.sin(a) * 0.8}
                  x2={15 + Math.cos(a) * 2.5}
                  y2={10 + Math.sin(a) * 2.5}
                />
              );
            })}
          </g>
        </>
      );

    case 'GB':
      return (
        <>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0l30 20M30 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2" />
          <path d="M15 0v20M0 10h30" stroke="#FFFFFF" strokeWidth="6.5" />
          <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.8" />
        </>
      );

    case 'AE':
      return (
        <>
          <rect width="30" height="6.67" fill="#00732F" />
          <rect y="6.67" width="30" height="6.66" fill="#FFFFFF" />
          <rect y="13.33" width="30" height="6.67" fill="#000000" />
          <rect width="7.5" height="20" fill="#FF0000" />
        </>
      );

    case 'AU':
      return (
        <>
          <rect width="30" height="20" fill="#012169" />
          <g transform="translate(0,0) scale(0.5)">
            <rect width="30" height="20" fill="#012169" />
            <path d="M0 0l30 20M30 0L0 20" stroke="#FFFFFF" strokeWidth="3.4" />
            <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.7" />
            <path d="M15 0v20M0 10h30" stroke="#FFFFFF" strokeWidth="5.6" />
            <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.2" />
          </g>
          <g fill="#FFFFFF">
            <circle cx="7.5" cy="15.5" r="1.5" />
            <circle cx="22" cy="4.5" r="0.85" />
            <circle cx="24.8" cy="9" r="1" />
            <circle cx="21.5" cy="13.5" r="0.95" />
            <circle cx="26.5" cy="14.5" r="0.7" />
            <circle cx="23.5" cy="9.2" r="0.45" />
          </g>
        </>
      );

    case 'JP':
      return (
        <>
          <rect width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </>
      );

    default:
      return <rect width="30" height="20" fill="#D9E1F0" />;
  }
}

export default Flag;
