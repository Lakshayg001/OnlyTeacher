import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ClipboardList, Mail, MapPin, PartyPopper, Phone } from 'lucide-react';
import { BRAND, COUNTRIES, COURSES } from '@/data/site';
import { IMG } from '@/data/images';

import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import Flag from '@/components/ui/Flag';
import PageHero from '@/components/layout/PageHero';
import { Button, Reveal } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const GRADES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SUBJECTS = Array.from(new Set(COURSES.map((c) => c.subject))).filter(s => !s.toLowerCase().includes('technology'));
const SLOTS = ['Weekday morning', 'Weekday afternoon', 'Weekday evening', 'Weekend'];

interface FormState {
 country: string;
 board: string;
 grade: string;
 subject: string;
 slot: string;
 parent: string;
 student: string;
 email: string;
 phone: string;
 notes: string;
}

const EMPTY: FormState = {
 country: '', board: '', grade: '', subject: '', slot: '',
 parent: '', student: '', email: '', phone: '', notes: '',
};

const STEP_META = [
 { key: 'Where', title: 'Where are you learning?', sub: 'Country and curriculum decide the teacher match.' },
 { key: 'What', title: 'What does your child need?', sub: 'Grade, subject and a slot that works for you.' },
 { key: 'Who', title: 'How do we reach you?', sub: 'We confirm the demo within 24 hours.' },
];

const NEXT_STEPS = [
 { icon: 'chat' as const, t: 'We call within 24 hours', b: 'To confirm the board, grade and slot.' },
 { icon: 'teacher' as const, t: 'We shortlist teachers', b: 'Matched to your curriculum, not your postcode.' },
 { icon: 'rocket' as const, t: 'The demo runs', b: '50 real teaching minutes, then honest feedback.' },
];

export default function Contact() {
 const [step, setStep] = useState(0);
 const [form, setForm] = useState<FormState>(EMPTY);
 const [done, setDone] = useState(false);

 const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
  setForm((f) => ({ ...f, [k]: v }));

 const valid = [
  Boolean(form.country && form.board),
  Boolean(form.grade && form.subject && form.slot),
  Boolean(form.parent && form.student && form.email && form.phone),
 ];

 const submit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!valid[2]) return;
  setDone(true);
 };

 const recap = [
  { label: 'Country', value: form.country },
  { label: 'Board', value: form.board },
  { label: 'Grade', value: form.grade ? `Grade ${form.grade}` : '' },
  { label: 'Subject', value: form.subject },
  { label: 'Slot', value: form.slot },
 ];

 return (
  <>
   <PageHero
    crumb="Contact"
    eyebrow="Book a free demo"
    title="One Free Lesson"
    accent="One Matched Teacher."
    sub="50 real teaching minutes with a teacher chosen for your child's board and grade No card no commitment"
    icons={['rocket', 'teacher', 'calendar']}
   />

   <section className="py-12">
    <div className="container-tot grid items-start gap-6 lg:grid-cols-[1.35fr_1fr]">
     {/* ------------------------------- form ------------------------------- */}
     <div className="rounded-4xl border border-navy-100 bg-white p-5 shadow-clay sm:p-8">
      {done ? (
       <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-10 text-center"
       >
        <div className="relative">
         <ClayIcon name="trophy" size={92} />
         <PartyPopper className="absolute -right-3 -top-2 h-7 w-7 text-amber-500" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-navy-700 sm:text-3xl">
         Request received {form.parent.split(' ')[0]}
        </h2>
        <p className="mt-2.5 max-w-md text-[15.5px] leading-relaxed text-navy-500">
         An academic counsellor will call {form.phone} within 24 hours with a matched
         teacher for {form.student} {form.board}, Grade {form.grade}, {form.subject}.
        </p>
        <div className="mt-6 grid w-full max-w-md gap-2.5 text-left">
         {[
          'We shortlist teachers for your board and grade',
          'You pick the slot that suits your timezone',
          'The demo runs as a real 50-minute lesson',
         ].map((s, i) => (
          <div key={s} className="flex items-center gap-3 rounded-2xl bg-forest-50 px-4 py-3">
           <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-500 text-[12px] font-extrabold text-white">
            {i + 1}
           </span>
           <span className="text-[14px] font-bold text-navy-700">{s}</span>
          </div>
         ))}
        </div>
        <Button
         variant="outline"
         className="mt-7"
         onClick={() => {
          setDone(false);
          setForm(EMPTY);
          setStep(0);
         }}
        >
         Book another demo
        </Button>
       </motion.div>
      ) : (
       <form onSubmit={submit}>
        {/* progress */}
        <ol className="flex items-center gap-2">
         {STEP_META.map((s, i) => (
          <li key={s.key} className="flex flex-1 items-center gap-2.5">
           <span
            className={cn(
             'grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-extrabold transition-colors',
             i < step
              ? 'bg-forest-500 text-white'
              : i === step
               ? 'bg-amber-500 text-white'
               : 'bg-navy-100 text-navy-400',
            )}
            aria-current={i === step ? 'step' : undefined}
           >
            {i < step ? <Check className="h-4 w-4" /> : i + 1}
           </span>
           <span
            className={cn(
             'hidden text-[12px] font-extrabold uppercase tracking-[0.14em] transition-colors sm:block',
             i === step ? 'text-navy-800' : i < step ? 'text-forest-600' : 'text-navy-300',
            )}
           >
            {s.key}
           </span>
           {i < STEP_META.length - 1 && (
            <span
             className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i < step ? 'bg-forest-400' : 'bg-navy-100',
             )}
            />
           )}
          </li>
         ))}
        </ol>

        <div className="mt-6">
         <h2 className="font-display text-xl font-extrabold text-navy-700 sm:text-2xl">
          {STEP_META[step].title}
         </h2>
         <p className="mt-1 text-[14.5px] text-navy-500">{STEP_META[step].sub}</p>
        </div>

        <AnimatePresence mode="wait">
         <motion.div
          key={step}
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -22 }}
          transition={{ duration: 0.25 }}
          className="mt-6 space-y-6"
         >
          {step === 0 && (
           <>
            <CountryDropdown
             value={form.country}
             onChange={(v) => set('country', v)}
             options={COUNTRIES.map((c) => ({ value: c.name, label: c.name, flag: c.flag }))}
            />
            <Field
             label="Board / curriculum"
             value={form.board}
             onChange={(v) => set('board', v)}
             placeholder="e.g. CBSE, IGCSE"
            />
           </>
          )}

          {step === 1 && (
           <>
            <DropdownField
             label="Grade"
             value={form.grade}
             onChange={(v) => set('grade', v)}
             options={GRADES.map((g) => ({ value: g, label: `Grade ${g}` }))}
             placeholder="Select a grade"
            />
            <DropdownField
             label="Subject"
             value={form.subject}
             onChange={(v) => set('subject', v)}
             options={SUBJECTS.map((s) => ({ value: s, label: s }))}
             placeholder="Select a subject"
            />
            <Choices
             label="Preferred slot"
             value={form.slot}
             onChange={(v) => set('slot', v)}
             options={SLOTS.map((s) => ({ value: s, label: s }))}
            />
           </>
          )}

          {step === 2 && (
           <>
            <div className="grid gap-4 sm:grid-cols-2">
             <Field label="Parent name" value={form.parent} onChange={(v) => set('parent', v)} placeholder="Your full name" />
             <Field label="Student name" value={form.student} onChange={(v) => set('student', v)} placeholder="Your child's name" />
             <Field label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="you@example.com" />
             <Field label="Phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="+91 98765 43210" />
            </div>
            <div>
             <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
              Anything we should know? <span className="text-navy-300">(optional)</span>
             </p>
             <textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={3}
              placeholder="Topics they find hard, exam dates, previous tutoring…"
              className="w-full rounded-3xl border-2 border-navy-100 bg-navy-50/50 p-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300 focus:bg-white"
             />
            </div>
           </>
          )}
         </motion.div>
        </AnimatePresence>

        {/* live recap carries the earlier answers forward through the flow */}
        <div className="mt-8 rounded-3xl border border-navy-100 bg-navy-50/60 p-4">
         <p className="mb-3 flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
          <ClipboardList className="h-3.5 w-3.5" />
          Your request so far
         </p>
         <div className="flex flex-wrap gap-2">
          {recap.map((r) => (
           <span
            key={r.label}
            className={cn(
             'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-extrabold transition-colors',
             r.value
              ? 'border-forest-200 bg-white text-navy-700'
              : 'border-dashed border-navy-200 bg-transparent text-navy-300',
            )}
           >
            {r.value && <Check className="h-3.5 w-3.5 shrink-0 text-forest-500" />}
            <span className="text-[10px] uppercase tracking-wider text-navy-400">
             {r.label}
            </span>
            {r.value || ' '}
           </span>
          ))}
         </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-navy-100 pt-6">
         <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          icon={<ArrowLeft className="h-4 w-4" />}
         >
          Back
         </Button>

         {step < 2 ? (
          <Button
           type="button"
           onClick={() => valid[step] && setStep((s) => s + 1)}
           disabled={!valid[step]}
           iconRight={<ArrowRight className="h-4 w-4" />}
          >
           Continue
          </Button>
         ) : (
          <Button type="submit" size="lg" disabled={!valid[2]}>
           Book my free demo
          </Button>
         )}
        </div>


       </form>
      )}
     </div>

     {/* ------------------------------- aside ------------------------------- */}
     <div className="space-y-4">
      <Reveal>
       <div className="relative overflow-hidden rounded-4xl shadow-clay ring-8 ring-white">
        <SmartImage
         src="/totconre.jpeg"
         alt="A student in a live one-to-one lesson"
         fallbackIcon="laptop"
         className="w-full"
         imgClassName="!h-auto !object-contain"
        />
       </div>
      </Reveal>



     </div>
    </div>


   </section>
  </>
 );
}

/* -------------------------------------------------------------------------- */

function Choices({
 label,
 value,
 onChange,
 options,
}: {
 label: string;
 value: string;
 onChange: (v: string) => void;
 options: { value: string; label: string; flag?: string }[];
}) {
 return (
  <div>
   <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
    {label}
   </p>
   <div className="flex flex-wrap gap-2">
    {options.map((o) => (
     <button
      key={o.value}
      type="button"
      onClick={() => onChange(o.value)}
      className={cn(
       'inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-[14px] font-extrabold transition-all',
       value === o.value
        ? 'border-amber-400 bg-amber-50 text-amber-700 shadow-sm'
        : 'border-navy-100 bg-white text-navy-600 hover:border-navy-200 hover:bg-navy-50',
      )}
     >
      {o.flag && <Flag code={o.flag} size={18} />}
      {o.label}
     </button>
    ))}
   </div>
  </div>
 );
}

function Field({
 label,
 value,
 onChange,
 placeholder,
 type = 'text',
}: {
 label: string;
 value: string;
 onChange: (v: string) => void;
 placeholder?: string;
 type?: string;
}) {
 return (
  <label className="block">
   <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
    {label}
   </span>
   <input
    type={type}
    required
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className="h-13 w-full rounded-2xl border-2 border-navy-100 bg-navy-50/50 px-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300 focus:bg-white"
   />
  </label>
 );
}

function CountryDropdown({
 value,
 onChange,
 options,
}: {
 value: string;
 onChange: (v: string) => void;
 options: { value: string; label: string; flag?: string }[];
}) {
 const [open, setOpen] = useState(false);
 const ref = useRef<HTMLDivElement>(null);
 const selected = options.find((o) => o.value === value);

 useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
   if (ref.current && !ref.current.contains(event.target as Node)) {
    setOpen(false);
   }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 return (
  <div className="relative" ref={ref}>
   <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
    Country
   </span>
   <button
    type="button"
    onClick={() => setOpen(!open)}
    className="flex h-13 w-full items-center justify-between rounded-2xl border-2 border-navy-100 bg-navy-50/50 px-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors hover:bg-navy-50 focus:border-amber-300 focus:bg-white"
   >
    {selected ? (
     <div className="flex items-center gap-2">
      {selected.flag && <Flag code={selected.flag} size={18} />}
      <span>{selected.label}</span>
     </div>
    ) : (
     <span className="font-medium text-navy-300">Select a country</span>
    )}
    <ChevronDown className={cn('h-5 w-5 text-navy-400 transition-transform', open && 'rotate-180')} />
   </button>

   <AnimatePresence>
    {open && (
     <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-navy-100 bg-white p-2 shadow-lg"
     >
      <div className="max-h-60 overflow-y-auto pr-1">
       {options.map((o) => (
        <button
         key={o.value}
         type="button"
         onClick={() => {
          onChange(o.value);
          setOpen(false);
         }}
         className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition-colors',
          value === o.value ? 'bg-amber-50 text-amber-700' : 'text-navy-600 hover:bg-navy-50'
         )}
        >
         {o.flag && <Flag code={o.flag} size={20} />}
         {o.label}
         {value === o.value && <Check className="ml-auto h-4 w-4 text-amber-500" />}
        </button>
       ))}
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
}

function DropdownField({
 label,
 value,
 onChange,
 options,
 placeholder,
}: {
 label: string;
 value: string;
 onChange: (v: string) => void;
 options: { value: string; label: string }[];
 placeholder?: string;
}) {
 const [open, setOpen] = useState(false);
 const ref = useRef<HTMLDivElement>(null);
 const selected = options.find((o) => o.value === value);

 useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
   if (ref.current && !ref.current.contains(event.target as Node)) {
    setOpen(false);
   }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 return (
  <div className="relative" ref={ref}>
   <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
    {label}
   </span>
   <button
    type="button"
    onClick={() => setOpen(!open)}
    className="flex h-13 w-full items-center justify-between rounded-2xl border-2 border-navy-100 bg-navy-50/50 px-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors hover:bg-navy-50 focus:border-amber-300 focus:bg-white"
   >
    <span className={cn(!selected && "font-medium text-navy-300")}>
     {selected ? selected.label : placeholder || `Select ${label.toLowerCase()}`}
    </span>
    <ChevronDown className={cn('h-5 w-5 text-navy-400 transition-transform', open && 'rotate-180')} />
   </button>

   <AnimatePresence>
    {open && (
     <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-navy-100 bg-white p-2 shadow-lg"
     >
      <div className="max-h-60 overflow-y-auto pr-1">
       {options.map((o) => (
        <button
         key={o.value}
         type="button"
         onClick={() => {
          onChange(o.value);
          setOpen(false);
         }}
         className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition-colors',
          value === o.value ? 'bg-amber-50 text-amber-700' : 'text-navy-600 hover:bg-navy-50'
         )}
        >
         {o.label}
         {value === o.value && <Check className="ml-auto h-4 w-4 text-amber-500" />}
        </button>
       ))}
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
}
