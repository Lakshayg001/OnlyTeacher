import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollTop() {
 const [show, setShow] = useState(false);
 const [progress, setProgress] = useState(0);

 useEffect(() => {
  const on = () => {
   const max = document.documentElement.scrollHeight - window.innerHeight;
   setProgress(max > 0 ? window.scrollY / max : 0);
   setShow(window.scrollY > 640);
  };
  on();
  window.addEventListener('scroll', on, { passive: true });
  return () => window.removeEventListener('scroll', on);
 }, []);

 const R = 22;
 const C = 2 * Math.PI * R;

 return (
  <AnimatePresence>
   {show && (
    <motion.button
     initial={{ opacity: 0, scale: 0.7, y: 16 }}
     animate={{ opacity: 1, scale: 1, y: 0 }}
     exit={{ opacity: 0, scale: 0.7, y: 16 }}
     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
     aria-label="Back to top"
     className="fixed bottom-6 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-navy-700 text-white shadow-clay-navy transition-transform hover:-translate-y-1 sm:bottom-8 sm:right-8"
    >
     <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
      <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
      <circle
       cx="26"
       cy="26"
       r={R}
       fill="none"
       stroke="#FF9B25"
       strokeWidth="3"
       strokeLinecap="round"
       strokeDasharray={C}
       strokeDashoffset={C * (1 - progress)}
      />
     </svg>
     <ArrowUp className="relative h-5 w-5" />
    </motion.button>
   )}
  </AnimatePresence>
 );
}
