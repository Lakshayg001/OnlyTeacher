import { useState } from 'react';
import Flag from '@/components/ui/Flag';
import { Check, Globe2, Palette, Save, ShieldCheck } from 'lucide-react';
import { BOARDS, BRAND, COUNTRIES } from '@/data/site';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Panel } from './AdminKit';
import { cn } from '@/lib/utils';

const PALETTE = [
 { name: 'Primary Dark', hex: '#1B2E54', role: 'Headings, navigation, dark panels' },
 { name: 'Primary Accent', hex: '#FF9B25', role: 'Primary CTAs, highlights, focus' },
 { name: 'Base', hex: '#FFFFFF', role: 'Page background, cards' },
 { name: 'Highlight', hex: '#478A58', role: 'Success, verification, callouts' },
];

const TOGGLES = [
 { id: 'pricing', label: 'Show pricing on the website', desc: 'Client requirement: pricing stays off all public pages.', on: false },
 { id: 'countryPricing', label: 'Country-based pricing', desc: 'Country affects curriculum and timezone only never price.', on: false },
 { id: 'support', label: '24×7 live support widget', desc: 'Shows the support launcher across every public page.', on: true },
 { id: 'rematch', label: 'Free teacher rematch', desc: 'Families can request a different teacher at no cost.', on: true },
 { id: 'recordings', label: 'Share lesson recordings', desc: 'Parents receive a recording after every class.', on: true },
];

export default function Settings() {
 const [toggles, setToggles] = useState(
  Object.fromEntries(TOGGLES.map((t) => [t.id, t.on])) as Record<string, boolean>,
 );
 const [saved, setSaved] = useState(false);
 const [boards, setBoards] = useState<Set<string>>(new Set(BOARDS.map((b) => b.id)));

 const toggleBoard = (id: string) =>
  setBoards((prev) => {
   const next = new Set(prev);
   if (next.has(id)) next.delete(id);
   else next.add(id);
   return next;
  });

 const save = () => {
  setSaved(true);
  setTimeout(() => setSaved(false), 2200);
 };

 return (
  <div className="space-y-5">
   <div className="grid gap-4 xl:grid-cols-2">
    <Panel title="Platform preferences" sub="What families see on the public site">
     <ul className="space-y-3">
      {TOGGLES.map((t) => (
       <li
        key={t.id}
        className="flex items-start justify-between gap-4 rounded-2xl border border-navy-100 bg-navy-50/50 p-4"
       >
        <div className="min-w-0">
         <p className="text-[14px] font-extrabold text-navy-800">{t.label}</p>
         <p className="mt-0.5 text-[12.5px] font-semibold text-navy-400">{t.desc}</p>
        </div>
        <button
         role="switch"
         aria-checked={toggles[t.id]}
         onClick={() => setToggles((s) => ({ ...s, [t.id]: !s[t.id] }))}
         className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300',
          toggles[t.id] ? 'bg-forest-500' : 'bg-navy-200',
         )}
        >
         <span
          className={cn(
           'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300',
           toggles[t.id] ? 'translate-x-6' : 'translate-x-1',
          )}
         />
        </button>
       </li>
      ))}
     </ul>
    </Panel>

    <div className="space-y-4">
     <Panel title="Brand palette" sub="Design tokens used across the site and console">
      <ul className="space-y-2.5">
       {PALETTE.map((c) => (
        <li key={c.hex} className="flex items-center gap-3 rounded-2xl border border-navy-100 p-3">
         <span
          className="h-11 w-11 shrink-0 rounded-2xl border border-navy-100 shadow-inner-soft"
          style={{ background: c.hex }}
         />
         <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-extrabold text-navy-800">{c.name}</span>
          <span className="block truncate text-[12px] font-semibold text-navy-400">{c.role}</span>
         </span>
         <code className="shrink-0 rounded-lg bg-navy-50 px-2 py-1 font-mono text-[11.5px] font-bold text-navy-600">
          {c.hex}
         </code>
        </li>
       ))}
      </ul>
      <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-navy-400">
       <Palette className="h-3.5 w-3.5" /> Editing tokens here updates the public site theme.
      </p>
     </Panel>

     <Panel title="Organisation">
      <dl className="space-y-2.5 text-[13.5px]">
       {[
        ['Legal name', BRAND.full],
        ['Support email', BRAND.email],
        ['Support line', BRAND.phone],
        ['Registered office', BRAND.address],
       ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-0.5 rounded-2xl bg-navy-50/70 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
         <dt className="text-[11.5px] font-extrabold uppercase tracking-wider text-navy-400">{k}</dt>
         <dd className="font-bold text-navy-700">{v}</dd>
        </div>
       ))}
      </dl>
     </Panel>
    </div>
   </div>

   <Panel title="Curricula offered" sub="Toggle which boards appear on the public site">
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
     {BOARDS.map((b) => {
      const on = boards.has(b.id);
      return (
       <button
        key={b.id}
        onClick={() => toggleBoard(b.id)}
        className={cn(
         'flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all',
         on ? 'border-forest-300 bg-forest-50' : 'border-navy-100 bg-white hover:border-navy-200',
        )}
       >
        <ClayIcon name={b.icon} size={40} />
        <span className="min-w-0 flex-1">
         <span className="block text-[13.5px] font-extrabold text-navy-800">{b.name}</span>
         <span className="block truncate text-[11.5px] font-bold text-navy-400">{b.region}</span>
        </span>
        <span
         className={cn(
          'grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors',
          on ? 'bg-forest-500 text-white' : 'bg-navy-100 text-navy-300',
         )}
        >
         <Check className="h-3.5 w-3.5" />
        </span>
       </button>
      );
     })}
    </div>
   </Panel>

   <Panel title="Regional coverage" sub="Countries served and scheduling timezones">
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
     {COUNTRIES.map((c) => (
      <div key={c.code} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4 text-center">
       <Flag code={c.flag} size={40} className="mx-auto" />
       <p className="mt-2 text-[13.5px] font-extrabold text-navy-800">{c.name}</p>
       <p className="text-[11.5px] font-bold text-navy-400">{c.timezone}</p>
       <p className="mt-2 rounded-full bg-white px-2 py-1 text-[11.5px] font-extrabold text-amber-600">
        {c.students}
       </p>
      </div>
     ))}
    </div>
    <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-navy-400">
     <Globe2 className="h-3.5 w-3.5" /> Country selection never changes course pricing.
    </p>
   </Panel>

   <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-navy-100 bg-white p-5 shadow-sm sm:flex-row">
    <p className="flex items-center gap-2 text-[13px] font-semibold text-navy-500">
     <ShieldCheck className="h-4.5 w-4.5 text-forest-500" />
     Changes apply to the public site immediately after saving.
    </p>
    <Button onClick={save} icon={saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}>
     {saved ? 'Saved' : 'Save changes'}
    </Button>
   </div>
  </div>
 );
}
