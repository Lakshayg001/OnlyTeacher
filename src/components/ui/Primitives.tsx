import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCountUp, useInView } from '@/lib/hooks';

/* --------------------------------- Button -------------------------------- */

type Variant = 'primary' | 'dark' | 'green' | 'ghost' | 'outline' | 'white';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-clay-amber hover:from-amber-500 hover:to-amber-600 active:translate-y-0.5',
  dark: 'bg-navy-700 text-white shadow-clay-navy hover:bg-navy-800 active:translate-y-0.5',
  green: 'bg-forest-500 text-white shadow-clay hover:bg-forest-600 active:translate-y-0.5',
  outline:
    'bg-white text-navy-700 border-2 border-navy-200 hover:border-amber-400 hover:text-amber-600 shadow-sm',
  white: 'bg-white text-navy-700 shadow-clay hover:shadow-clay-lg',
  ghost: 'text-navy-600 hover:bg-navy-50 hover:text-navy-800',
};

const SIZE: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-[15px] gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', to, href, icon, iconRight, full, className, children, ...rest },
  ref,
) {
  const classes = cn(
    'group/btn inline-flex items-center justify-center rounded-full font-extrabold tracking-tight',
    'transition-all duration-200 will-change-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none',
    VARIANT[variant],
    SIZE[size],
    full && 'w-full',
    className,
  );

  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight && (
        <span className="shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} className={classes} {...rest}>
      {inner}
    </button>
  );
});

/* ---------------------------------- Chip --------------------------------- */

export function Chip({
  children,
  tone = 'amber',
  className,
}: {
  children: ReactNode;
  tone?: 'amber' | 'forest' | 'navy' | 'white';
  className?: string;
}) {
  const tones = {
    amber: 'bg-amber-100 text-amber-700',
    forest: 'bg-forest-100 text-forest-700',
    navy: 'bg-navy-100 text-navy-700',
    white: 'bg-white/85 text-navy-700 backdrop-blur',
  } as const;
  return <span className={cn('chip', tones[tone], className)}>{children}</span>;
}

/* ------------------------------ Section head ----------------------------- */

export function Eyebrow({
  children,
  tone = 'amber',
  className,
}: {
  children: ReactNode;
  tone?: 'amber' | 'forest' | 'navy';
  className?: string;
}) {
  const dot = { amber: 'bg-amber-500', forest: 'bg-forest-500', navy: 'bg-navy-600' }[tone];
  const text = { amber: 'text-amber-700', forest: 'text-forest-700', navy: 'text-navy-600' }[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-sm',
        text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = 'center',
  tone = 'amber',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: string;
  sub?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'amber' | 'forest' | 'navy';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          'max-w-3xl text-balance text-3xl font-extrabold leading-[1.12] text-navy-800 sm:text-4xl lg:text-[2.85rem]',
        )}
      >
        {title}
        {accent && <span className="text-gradient-amber"> {accent}</span>}
      </h2>
      {sub && (
        <p
          className={cn(
            'max-w-2xl text-[15px] leading-relaxed text-navy-500 sm:text-base',
            align === 'center' && 'mx-auto',
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* --------------------------------- Reveal -------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.8, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------- Counter -------------------------------- */

export function Counter({
  value,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const n = useCountUp(value, inView);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* --------------------------------- Stars --------------------------------- */

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.6l2.5 5.1 5.6.8-4 3.9 1 5.6L10 14.4 4.9 17l1-5.6-4-3.9 5.6-.8L10 1.6z"
            fill={i < Math.round(rating) ? '#FF9B25' : '#D9E1F0'}
          />
        </svg>
      ))}
    </span>
  );
}

/* -------------------------------- Marquee -------------------------------- */

export function Marquee({
  items,
  className,
  itemClassName,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn('marquee-mask overflow-hidden', className)}>
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-bold text-navy-600 shadow-sm',
              itemClassName,
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Clay tile ------------------------------- */

export function ClayTile({
  children,
  tone = 'amber',
  size = 'md',
  className,
}: {
  children: ReactNode;
  tone?: 'amber' | 'forest' | 'navy' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const tones = {
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/70',
    forest: 'bg-gradient-to-br from-forest-50 to-forest-100 border-forest-200/70',
    navy: 'bg-gradient-to-br from-navy-50 to-navy-100 border-navy-200/70',
    white: 'bg-white border-navy-100',
  } as const;
  const sizes = { sm: 'h-12 w-12 rounded-2xl', md: 'h-16 w-16 rounded-3xl', lg: 'h-20 w-20 rounded-[1.6rem]' };
  return (
    <div
      className={cn(
        'grid shrink-0 place-items-center border shadow-inner-soft',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
