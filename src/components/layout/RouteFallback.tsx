import ClayIcon from '@/components/clay/ClayIcon';

/** Shown while a route chunk is fetched brand-consistent, never a blank flash. */
export default function RouteFallback() {
 return (
  <div className="grid min-h-[60vh] place-items-center bg-white">
   <div className="flex flex-col items-center gap-4">
    <div className="flex gap-3">
     {(['math', 'science', 'globe'] as const).map((n, i) => (
      <span key={n} className="animate-float" style={{ animationDelay: `${i * 0.25}s` }}>
       <ClayIcon name={n} size={44} />
      </span>
     ))}
    </div>
    <p className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-navy-400">
     Loading
    </p>
   </div>
  </div>
 );
}
