import { useId } from 'react';
import type { ClayIconName } from '@/types';

type Palette = { a: string; b: string; c: string };

/** Soft 3D "clay" palettes, tuned to the TOT brand. */
const P: Record<string, Palette> = {
 amber: { a: '#FFD09A', b: '#FF9B25', c: '#D9761A' },
 navy: { a: '#7C97C9', b: '#2E4A80', c: '#1B2E54' },
 forest: { a: '#8FC2A1', b: '#478A58', c: '#2C5738' },
 violet: { a: '#C6BDF5', b: '#8B7BE8', c: '#5F51B8' },
 rose: { a: '#FFB6C0', b: '#F4718A', c: '#C24A63' },
 sky: { a: '#A6D4F7', b: '#4FA3E3', c: '#2A6FA8' },
 sun: { a: '#FFE9A3', b: '#FFC94D', c: '#E0982A' },
 slate: { a: '#E4EAF4', b: '#BCC8DE', c: '#8C9BB8' },
};

const THEME: Record<ClayIconName, keyof typeof P> = {
 math: 'amber',
 science: 'forest',
 physics: 'sky',
 biology: 'forest',
 chemistry: 'violet',
 technology: 'navy',
 engineering: 'amber',
 globe: 'sky',
 teacher: 'amber',
 student: 'violet',
 book: 'rose',
 rocket: 'amber',
 trophy: 'sun',
 bulb: 'sun',
 support: 'forest',
 shield: 'navy',
 heart: 'rose',
 calendar: 'sky',
 chat: 'violet',
 graduation: 'navy',
 laptop: 'slate',
 puzzle: 'forest',
 target: 'rose',
 clock: 'sky',
};

export interface ClayIconProps {
 name: ClayIconName;
 size?: number;
 className?: string;
 /** Override the automatic palette. */
 tone?: keyof typeof P;
 /** Draw the soft contact shadow under the shape. */
 shadow?: boolean;
}

export function ClayIcon({ name, size = 64, className = '', tone, shadow = true }: ClayIconProps) {
 const uid = useId().replace(/:/g, '');
 const p = P[tone ?? THEME[name] ?? 'amber'];
 const g = `g-${uid}`;
 const gl = `gl-${uid}`;
 const soft = `s-${uid}`;

 return (
  <svg
   viewBox="0 0 64 64"
   width={size}
   height={size}
   className={className}
   role="presentation"
   aria-hidden="true"
   fill="none"
  >
   <defs>
    <linearGradient id={g} x1="12" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
     <stop stopColor={p.a} />
     <stop offset="0.55" stopColor={p.b} />
     <stop offset="1" stopColor={p.c} />
    </linearGradient>
    <linearGradient id={gl} x1="18" y1="10" x2="40" y2="40" gradientUnits="userSpaceOnUse">
     <stop stopColor="#fff" stopOpacity="0.85" />
     <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
    </linearGradient>
    <filter id={soft} x="-30%" y="-30%" width="160%" height="170%">
     <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor={p.c} floodOpacity="0.35" />
    </filter>
   </defs>

   {shadow && (
    <ellipse cx="32" cy="57.5" rx="17" ry="3.4" fill={p.c} opacity="0.16" />
   )}

   <g filter={`url(#${soft})`}>{shapes(name, g, gl, p)}</g>
  </svg>
 );
}

/* -------------------------------------------------------------------------- */
/*                  shapes                  */
/* -------------------------------------------------------------------------- */

function shapes(name: ClayIconName, g: string, gl: string, p: Palette) {
 const body = `url(#${g})`;
 const gloss = `url(#${gl})`;

 switch (name) {
  case 'math':
   return (
    <>
     <rect x="8" y="8" width="48" height="44" rx="13" fill={body} />
     <rect x="12" y="11.5" width="40" height="20" rx="9" fill={gloss} opacity="0.5" />
     <g stroke="#fff" strokeWidth="3.4" strokeLinecap="round">
      <path d="M16 21h9M20.5 16.5v9" />
      <path d="M39 21h9" />
      <path d="M16 38h9M39 35h9M39 41h9" />
      <path d="M40.5 16.5l7 7M47.5 16.5l-7 7" opacity="0" />
     </g>
     <circle cx="20.5" cy="38" r="0" fill="#fff" />
    </>
   );

  case 'science':
   return (
    <>
     <path
      d="M26 8h12v14.5l11.4 20.8C52.2 48.4 48.6 55 43 55H21c-5.6 0-9.2-6.6-6.4-11.7L26 22.5V8z"
      fill={body}
     />
     <path d="M27.5 9.5h5v13.6L22 43c-1.4 2.6.4 5.8 3.3 5.8h-4c-3.4 0-5.5-3.6-3.9-6.5l12.1-22V9.5z" fill={gloss} opacity="0.45" />
     <rect x="23" y="5" width="18" height="6" rx="3" fill={p.c} opacity="0.85" />
     <circle cx="28" cy="45" r="3.2" fill="#fff" opacity="0.9" />
     <circle cx="37" cy="40" r="2.2" fill="#fff" opacity="0.7" />
     <circle cx="35" cy="48" r="1.7" fill="#fff" opacity="0.55" />
    </>
   );

  case 'physics':
   return (
    <>
     <ellipse cx="32" cy="32" rx="24" ry="10" stroke={body} strokeWidth="5" transform="rotate(-30 32 32)" />
     <ellipse cx="32" cy="32" rx="24" ry="10" stroke={body} strokeWidth="5" transform="rotate(30 32 32)" />
     <ellipse cx="32" cy="32" rx="24" ry="10" stroke={p.a} strokeWidth="4" opacity="0.7" transform="rotate(90 32 32)" />
     <circle cx="32" cy="32" r="8" fill={body} />
     <circle cx="29" cy="29" r="3" fill="#fff" opacity="0.75" />
     <circle cx="52" cy="21" r="3.6" fill={p.c} />
    </>
   );

  case 'biology':
   return (
    <>
     <path
      d="M32 56c0-14 8-22 20-24C50 46 42 54 32 56z"
      fill={body}
     />
     <path d="M32 56c0-14-8-22-20-24 2 14 10 22 20 24z" fill={p.b} opacity="0.75" />
     <path d="M32 56V26" stroke={p.c} strokeWidth="4" strokeLinecap="round" />
     <path d="M32 30c-6-8-4-18 0-24 4 6 6 16 0 24z" fill={p.a} />
     <circle cx="32" cy="14" r="2.6" fill="#fff" opacity="0.85" />
    </>
   );

  case 'chemistry':
   return (
    <>
     <rect x="10" y="14" width="18" height="36" rx="9" fill={body} />
     <rect x="34" y="22" width="18" height="28" rx="9" fill={p.b} opacity="0.9" />
     <rect x="13.5" y="17" width="9" height="16" rx="4.5" fill={gloss} opacity="0.55" />
     <circle cx="19" cy="41" r="3" fill="#fff" opacity="0.85" />
     <circle cx="43" cy="42" r="2.4" fill="#fff" opacity="0.7" />
     <rect x="12" y="9" width="14" height="6" rx="3" fill={p.c} />
     <rect x="36" y="17" width="14" height="6" rx="3" fill={p.c} opacity="0.8" />
    </>
   );

  case 'technology':
   return (
    <>
     <rect x="10" y="10" width="44" height="44" rx="14" fill={body} />
     <rect x="14" y="13.5" width="36" height="18" rx="9" fill={gloss} opacity="0.45" />
     <rect x="21" y="21" width="22" height="22" rx="7" fill="#fff" opacity="0.92" />
     <rect x="27" y="27" width="10" height="10" rx="3.5" fill={p.c} />
     <g stroke={p.c} strokeWidth="3" strokeLinecap="round" opacity="0.85">
      <path d="M26 10V5M38 10V5M26 59v-5M38 59v-5M10 26H5M10 38H5M59 26h-5M59 38h-5" />
     </g>
    </>
   );

  case 'engineering':
   return (
    <>
     <path
      d="M32 6l5.5 4.3 6.8-1.3 2.6 6.4 6.4 2.6-1.3 6.8L56 32l-4.3 5.5 1.3 6.8-6.4 2.6-2.6 6.4-6.8-1.3L32 58l-5.5-4.3-6.8 1.3-2.6-6.4-6.4-2.6 1.3-6.8L8 32l4.3-5.5-1.3-6.8 6.4-2.6 2.6-6.4 6.8 1.3L32 6z"
      fill={body}
     />
     <circle cx="32" cy="32" r="11" fill="#fff" opacity="0.94" />
     <circle cx="32" cy="32" r="5" fill={p.c} />
     <path d="M20 18c3-3 7-5 11-5.5" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" opacity="0.55" />
    </>
   );

  case 'globe':
   return (
    <>
     <circle cx="32" cy="32" r="24" fill={body} />
     <path d="M12 24c8 4 32 4 40 0M12 40c8-4 32-4 40 0" stroke="#fff" strokeWidth="2.6" opacity="0.8" strokeLinecap="round" />
     <ellipse cx="32" cy="32" rx="10" ry="24" stroke="#fff" strokeWidth="2.6" opacity="0.8" />
     <path d="M8 32h48" stroke="#fff" strokeWidth="2.6" opacity="0.8" />
     <path d="M18 16c5-4 12-6 18-5" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
     <circle cx="44" cy="22" r="4" fill={P.amber.b} stroke="#fff" strokeWidth="2" />
    </>
   );

  case 'teacher':
   return (
    <>
     <rect x="6" y="10" width="38" height="28" rx="8" fill={P.navy.b} />
     <rect x="10" y="14" width="30" height="20" rx="5" fill="#fff" opacity="0.94" />
     <g stroke={P.amber.b} strokeWidth="2.8" strokeLinecap="round">
      <path d="M15 21h12M15 27h8" />
     </g>
     <circle cx="45" cy="26" r="8" fill={body} />
     <path d="M33 54c0-8 5.5-13 12-13s12 5 12 13H33z" fill={body} />
     <ellipse cx="42" cy="23" rx="2.6" ry="2" fill="#fff" opacity="0.7" />
    </>
   );

  case 'student':
   return (
    <>
     <circle cx="32" cy="21" r="11" fill={body} />
     <path d="M12 56c0-11 9-19 20-19s20 8 20 19H12z" fill={p.b} />
     <path d="M18 54c0-9 6-15 14-15" stroke="#fff" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
     <ellipse cx="27" cy="18" rx="3" ry="2.4" fill="#fff" opacity="0.75" />
     <path d="M20 14l12-7 12 7-12 6-12-6z" fill={P.amber.b} />
    </>
   );

  case 'book':
   return (
    <>
     <path d="M12 12c0-3.3 2.7-6 6-6h28c3.3 0 6 2.7 6 6v40c0 3.3-2.7 6-6 6H18c-3.3 0-6-2.7-6-6V12z" fill={body} />
     <path d="M12 12c0-3.3 2.7-6 6-6h6v52h-6c-3.3 0-6-2.7-6-6V12z" fill={p.c} opacity="0.6" />
     <g stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9">
      <path d="M31 20h12M31 28h12M31 36h8" />
     </g>
     <rect x="15" y="10" width="4" height="14" rx="2" fill="#fff" opacity="0.5" />
    </>
   );

  case 'rocket':
   return (
    <>
     <path d="M32 4c9 7 14 17 14 28l-4 10H22l-4-10C18 21 23 11 32 4z" fill={body} />
     <circle cx="32" cy="24" r="7" fill="#fff" opacity="0.95" />
     <circle cx="32" cy="24" r="3.4" fill={p.c} />
     <path d="M22 34l-8 8 2 8 8-6M42 34l8 8-2 8-8-6" fill={P.amber.b} />
     <path d="M27 46h10l-5 12-5-12z" fill={P.amber.c} opacity="0.85" />
    </>
   );

  case 'trophy':
   return (
    <>
     <path d="M18 10h28v14c0 8-6.3 14-14 14s-14-6-14-14V10z" fill={body} />
     <path d="M18 14h-6c0 8 4 12 8 13M46 14h6c0 8-4 12-8 13" stroke={p.c} strokeWidth="4" strokeLinecap="round" />
     <rect x="27" y="37" width="10" height="10" rx="3" fill={p.b} />
     <rect x="18" y="46" width="28" height="8" rx="4" fill={p.c} />
     <path d="M32 15l2.4 5 5.6.7-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.6-.7L32 15z" fill="#fff" opacity="0.95" />
    </>
   );

  case 'bulb':
   return (
    <>
     <path d="M32 6c11 0 19 8 19 18 0 7-4 11-6.6 15-1.6 2.4-2.4 4-2.4 6H22c0-2-.8-3.6-2.4-6C17 35 13 31 13 24c0-10 8-18 19-18z" fill={body} />
     <rect x="22" y="46" width="20" height="6" rx="3" fill={p.c} />
     <rect x="25" y="53" width="14" height="5" rx="2.5" fill={p.c} opacity="0.75" />
     <path d="M24 20c1.6-4 5-6.5 9-7" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" opacity="0.6" />
    </>
   );

  case 'support':
   return (
    <>
     <path d="M14 34v-4a18 18 0 0 1 36 0v4" stroke={body} strokeWidth="6" strokeLinecap="round" />
     <rect x="6" y="30" width="13" height="18" rx="6.5" fill={body} />
     <rect x="45" y="30" width="13" height="18" rx="6.5" fill={body} />
     <rect x="24" y="46" width="16" height="10" rx="5" fill={P.amber.b} />
     <circle cx="32" cy="51" r="2.4" fill="#fff" />
     <rect x="9" y="33" width="5" height="8" rx="2.5" fill="#fff" opacity="0.5" />
    </>
   );

  case 'shield':
   return (
    <>
     <path d="M32 4l22 8v18c0 14-9.4 25-22 30C19.4 55 10 44 10 30V12l22-8z" fill={body} />
     <path d="M32 4L10 12v18c0 14 9.4 25 22 30V4z" fill={gloss} opacity="0.22" />
     <path d="M22 31l7 7 14-14" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
   );

  case 'heart':
   return (
    <>
     <path
      d="M32 55S8 41 8 24.5C8 16.5 14.3 10 22 10c4.3 0 8.2 2 10 5 1.8-3 5.7-5 10-5 7.7 0 14 6.5 14 14.5C56 41 32 55 32 55z"
      fill={body}
     />
     <path d="M18 18c-3 2-5 5.4-5 9" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
    </>
   );

  case 'calendar':
   return (
    <>
     <rect x="8" y="12" width="48" height="44" rx="12" fill={body} />
     <rect x="8" y="12" width="48" height="14" rx="7" fill={p.c} />
     <rect x="17" y="6" width="6" height="12" rx="3" fill={p.c} />
     <rect x="41" y="6" width="6" height="12" rx="3" fill={p.c} />
     <g fill="#fff" opacity="0.95">
      <rect x="17" y="32" width="8" height="7" rx="2.5" />
      <rect x="28" y="32" width="8" height="7" rx="2.5" />
      <rect x="39" y="32" width="8" height="7" rx="2.5" />
      <rect x="17" y="43" width="8" height="7" rx="2.5" opacity="0.6" />
      <rect x="28" y="43" width="8" height="7" rx="2.5" fill={P.amber.b} opacity="1" />
     </g>
    </>
   );

  case 'chat':
   return (
    <>
     <path d="M10 20c0-6.6 5.4-12 12-12h20c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12H30l-12 10v-10h-8V20z" fill={body} />
     <g fill="#fff" opacity="0.95">
      <circle cx="24" cy="26" r="3.2" />
      <circle cx="32" cy="26" r="3.2" />
      <circle cx="40" cy="26" r="3.2" />
     </g>
     <path d="M16 18c1.6-3 4.4-5 8-5.6" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" opacity="0.5" />
    </>
   );

  case 'graduation':
   return (
    <>
     <path d="M32 10l26 11-26 11L6 21l26-11z" fill={body} />
     <path d="M32 10L6 21l26 11V10z" fill={gloss} opacity="0.25" />
     <path d="M16 27v11c0 5.5 7.2 10 16 10s16-4.5 16-10V27l-16 7-16-7z" fill={p.c} />
     <path d="M56 22v13" stroke={P.amber.b} strokeWidth="3.4" strokeLinecap="round" />
     <circle cx="56" cy="38" r="4" fill={P.amber.b} />
    </>
   );

  case 'laptop':
   return (
    <>
     <rect x="12" y="10" width="40" height="30" rx="6" fill={P.navy.b} />
     <rect x="16" y="14" width="32" height="22" rx="3.5" fill="#fff" opacity="0.95" />
     <g stroke={P.amber.b} strokeWidth="2.6" strokeLinecap="round">
      <path d="M21 21h14M21 27h9" />
     </g>
     <path d="M6 44h52l-3.4 6.6c-1 2-3 3.4-5.4 3.4H14.8c-2.3 0-4.4-1.3-5.4-3.4L6 44z" fill={body} />
     <rect x="26" y="45.5" width="12" height="3" rx="1.5" fill={p.c} opacity="0.5" />
    </>
   );

  case 'puzzle':
   return (
    <>
     <path
      d="M12 18a6 6 0 0 1 6-6h8a5 5 0 1 1 10 0h8a6 6 0 0 1 6 6v8a5 5 0 1 1 0 10v8a6 6 0 0 1-6 6h-8a5 5 0 1 0-10 0h-8a6 6 0 0 1-6-6V18z"
      fill={body}
     />
     <path d="M18 20c1.4-1.6 3.4-2.6 6-2.8" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
     <circle cx="38" cy="34" r="4.5" fill="#fff" opacity="0.75" />
    </>
   );

  case 'target':
   return (
    <>
     <circle cx="32" cy="32" r="24" fill={body} />
     <circle cx="32" cy="32" r="16" fill="#fff" opacity="0.95" />
     <circle cx="32" cy="32" r="9" fill={p.b} />
     <circle cx="32" cy="32" r="3.6" fill="#fff" />
     <path d="M32 32l18-18" stroke={P.forest.b} strokeWidth="4" strokeLinecap="round" />
     <path d="M46 10l8 2-2 8" stroke={P.forest.b} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
   );

  case 'clock':
   return (
    <>
     <circle cx="32" cy="32" r="24" fill={body} />
     <circle cx="32" cy="32" r="17" fill="#fff" opacity="0.95" />
     <path d="M32 21v11l8 5" stroke={p.c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
     <path d="M16 18c3-3.4 7-5.8 11-6.8" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" opacity="0.4" />
    </>
   );

  default:
   return <circle cx="32" cy="32" r="22" fill={body} />;
 }
}

export default ClayIcon;
