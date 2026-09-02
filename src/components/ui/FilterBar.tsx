import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import Flag from '@/components/ui/Flag';

export interface FilterOption {
 value: string;
 label: string;
 /** ISO code renders an inline flag before the label. */
 flag?: string;
 /** Optional secondary line, e.g. a grade range. */
 hint?: string;
}

export interface FilterGroupDef {
 id: string;
 label: string;
 value: string;
 options: FilterOption[];
 onChange: (value: string) => void;
}

interface FilterBarProps {
 query: string;
 onQuery: (v: string) => void;
 placeholder: string;
 /** e.g. "12 courses" */
 resultLabel: string;
 groups: FilterGroupDef[];
 /** Value that counts as "no filter applied" for each group. */
 neutral?: string;
 onReset: () => void;
}

/**
 * Search + faceted filters.
 *
 * Chips wrap onto as many lines as they need instead of scrolling inside a
 * fixed column the previous layout clipped long labels ("Secondary…",
 * "Australian…") mid-word with no affordance that more existed.
 */
export function FilterBar({
 query,
 onQuery,
 placeholder,
 resultLabel,
 groups,
 neutral = 'all',
 onReset,
}: FilterBarProps) {
 const activeCount =
  groups.filter((g) => g.value !== neutral).length + (query.trim() ? 1 : 0);

 return (
  <div className="overflow-hidden rounded-4xl border border-navy-100 bg-white shadow-clay">
   {/* ------------------------------- search ------------------------------- */}
   <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
    <div className="relative flex-1">
     <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-navy-300" />
     <input
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="h-13 w-full rounded-full border-2 border-navy-100 bg-navy-50/60 pl-12 pr-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300 focus:bg-white"
     />
    </div>

    <div className="flex shrink-0 items-center gap-2.5">
     <span className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-4 py-2.5 text-[12.5px] font-extrabold text-white">
      <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
      {resultLabel}
     </span>

     {activeCount > 0 && (
      <button
       onClick={onReset}
       className="inline-flex items-center gap-1.5 rounded-full border-2 border-navy-100 px-3.5 py-2 text-[12.5px] font-extrabold text-navy-500 transition-colors hover:border-amber-300 hover:text-amber-600"
      >
       <RotateCcw className="h-3.5 w-3.5" />
       Clear
       <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-amber-500 text-[10px] text-white">
        {activeCount}
       </span>
      </button>
     )}
    </div>
   </div>

   {/* ------------------------------- facets ------------------------------- */}
   <div className="border-t border-navy-100 bg-navy-50/40">
    {groups.map((g) => (
     <fieldset
      key={g.id}
      className="flex flex-col gap-2 border-b border-navy-100/70 px-4 py-3.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4 sm:px-5"
     >
      <legend className="sr-only">{g.label}</legend>
      <span
       aria-hidden="true"
       className="shrink-0 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-navy-400 sm:w-[4.75rem] sm:pt-1.5"
      >
       {g.label}
      </span>

      {/* wraps never clipped */}
      <div className="flex flex-1 flex-wrap gap-2">
       {g.options.map((o) => {
        const on = g.value === o.value;
        return (
         <button
          key={o.value}
          type="button"
          onClick={() => g.onChange(o.value)}
          aria-pressed={on}
          className={cn(
           'inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-[12.5px] font-extrabold transition-all duration-200',
           on
            ? 'border-navy-700 bg-navy-700 text-white shadow-clay-navy'
            : 'border-navy-100 bg-white text-navy-500 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-600',
          )}
         >
          {o.flag && <Flag code={o.flag} size={16} />}
          <span className="whitespace-nowrap">{o.label}</span>
          {o.hint && (
           <span
            className={cn(
             'whitespace-nowrap text-[10.5px] font-bold',
             on ? 'text-navy-200' : 'text-navy-300',
            )}
           >
            {o.hint}
           </span>
          )}
         </button>
        );
       })}
      </div>
     </fieldset>
    ))}
   </div>
  </div>
 );
}

export default FilterBar;
