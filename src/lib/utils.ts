export type Accent = 'amber' | 'forest' | 'navy';

export function cn(...parts: Array<string | false | null | undefined>) {
 return parts.filter(Boolean).join(' ');
}

/** Tailwind class sets per brand accent kept static so JIT can see them. */
export const ACCENT: Record<
 Accent,
 {
  text: string;
  bg: string;
  softBg: string;
  softText: string;
  border: string;
  ring: string;
  grad: string;
  dot: string;
  shadow: string;
 }
> = {
 amber: {
  text: 'text-amber-600',
  bg: 'bg-amber-500',
  softBg: 'bg-amber-100',
  softText: 'text-amber-700',
  border: 'border-amber-200',
  ring: 'ring-amber-500/30',
  grad: 'from-amber-400 to-amber-600',
  dot: 'bg-amber-500',
  shadow: 'shadow-clay-amber',
 },
 forest: {
  text: 'text-forest-600',
  bg: 'bg-forest-500',
  softBg: 'bg-forest-100',
  softText: 'text-forest-700',
  border: 'border-forest-200',
  ring: 'ring-forest-500/30',
  grad: 'from-forest-400 to-forest-600',
  dot: 'bg-forest-500',
  shadow: 'shadow-clay',
 },
 navy: {
  text: 'text-navy-700',
  bg: 'bg-navy-700',
  softBg: 'bg-navy-100',
  softText: 'text-navy-700',
  border: 'border-navy-200',
  ring: 'ring-navy-500/25',
  grad: 'from-navy-500 to-navy-800',
  dot: 'bg-navy-700',
  shadow: 'shadow-clay-navy',
 },
};

export const formatNumber = (n: number) => n.toLocaleString('en-US');

/** Deterministic pseudo-random from a string used for decorative offsets. */
export function seeded(seed: string) {
 let h = 2166136261;
 for (let i = 0; i < seed.length; i++) {
  h ^= seed.charCodeAt(i);
  h = Math.imul(h, 16777619);
 }
 return () => {
  h += 0x6d2b79f5;
  let t = h;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
 };
}
