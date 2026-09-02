import { useEffect, useRef, useState } from 'react';

/** Fires once when the element scrolls into view. */
export function useInView<T extends HTMLElement>(rootMargin = '-12% 0px') {
 const ref = useRef<T | null>(null);
 const [inView, setInView] = useState(false);

 useEffect(() => {
  const el = ref.current;
  if (!el) return;
  if (typeof IntersectionObserver === 'undefined') {
   setInView(true);
   return;
  }
  const io = new IntersectionObserver(
   ([entry]) => {
    if (entry.isIntersecting) {
     setInView(true);
     io.disconnect();
    }
   },
   { rootMargin, threshold: 0.05 },
  );
  io.observe(el);
  return () => io.disconnect();
 }, [rootMargin]);

 return { ref, inView };
}

/** Eased count-up that starts when `active` flips true. */
export function useCountUp(target: number, active: boolean, duration = 1600) {
 const [value, setValue] = useState(0);

 useEffect(() => {
  if (!active) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   setValue(target);
   return;
  }
  let raf = 0;
  // The first rAF timestamp is the frame's start time, which can predate the
  // moment we scheduled it so anchor on the first callback, not on "now".
  let start: number | null = null;
  const tick = (now: number) => {
   if (start === null) start = now;
   const t = Math.min(1, Math.max(0, (now - start) / duration));
   const eased = 1 - Math.pow(1 - t, 3);
   setValue(Math.round(target * eased));
   if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  // rAF is throttled in background tabs; guarantee the final value lands.
  const settle = window.setTimeout(() => setValue(target), duration + 400);

  return () => {
   cancelAnimationFrame(raf);
   window.clearTimeout(settle);
  };
 }, [target, active, duration]);

 return value;
}

export function useMediaQuery(query: string) {
 const [matches, setMatches] = useState(() =>
  typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
 );
 useEffect(() => {
  const mq = window.matchMedia(query);
  const on = () => setMatches(mq.matches);
  on();
  mq.addEventListener('change', on);
  return () => mq.removeEventListener('change', on);
 }, [query]);
 return matches;
}

export function useScrolled(threshold = 24) {
 const [scrolled, setScrolled] = useState(false);
 useEffect(() => {
  const on = () => setScrolled(window.scrollY > threshold);
  on();
  window.addEventListener('scroll', on, { passive: true });
  return () => window.removeEventListener('scroll', on);
 }, [threshold]);
 return scrolled;
}

export function useLockBody(locked: boolean) {
 useEffect(() => {
  if (!locked) return;
  const prev = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => {
   document.body.style.overflow = prev;
  };
 }, [locked]);
}

/** Normalised pointer position (-1..1) within an element, for tilt effects. */
export function useTilt<T extends HTMLElement>(strength = 8) {
 const ref = useRef<T | null>(null);
 const [style, setStyle] = useState<React.CSSProperties>({});

 const onMove = (e: React.MouseEvent) => {
  const el = ref.current;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  setStyle({
   transform: `perspective(1000px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateZ(0)`,
  });
 };
 const onLeave = () => setStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0)' });

 return { ref, style, onMove, onLeave };
}
