import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS } from '@/data/site';
import { IMG } from '@/data/images';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

export function Faq() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-14 sm:py-18">
            <div className="container-tot">
                <Reveal>
                    <SectionHeading
                        eyebrow="Questions parents ask"
                        title={
                            <>
                                Everything You're Wondering<br className="hidden sm:block" />
                                <span className="text-gradient-amber">Answered With Clarity</span>
                            </>
                        }
                        sub="Clear answers about teachers, learning, personalisation and your child's journey"
                    />
                </Reveal>

                <div className="mt-11 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:gap-8">
                    {/* accordion */}
                    <div className="space-y-3">
                        {FAQS.map((f, i) => {
                            const on = open === i;
                            return (
                                <motion.div
                                    key={f.q}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.05 }}
                                    className={cn(
                                        'overflow-hidden rounded-4xl border-2 bg-white transition-all duration-300',
                                        on ? 'border-amber-300 shadow-clay' : 'border-navy-100 hover:border-navy-200',
                                    )}
                                >
                                    <button
                                        onClick={() => setOpen(on ? null : i)}
                                        aria-expanded={on}
                                        className="flex w-full items-center gap-4 p-5 text-left"
                                    >
                                        <span
                                            className={cn(
                                                'grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors',
                                                on ? 'bg-amber-50' : 'bg-navy-50',
                                            )}
                                        >
                                            <ClayIcon name={f.icon} size={32} shadow={false} />
                                        </span>

                                        <span className="flex-1 font-display text-[16.5px] font-extrabold leading-snug text-navy-800 sm:text-lg">
                                            {f.q}
                                        </span>

                                        <span
                                            className={cn(
                                                'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300',
                                                on ? 'rotate-45 bg-amber-500 text-white' : 'bg-navy-50 text-navy-500',
                                            )}
                                        >
                                            <Plus className="h-4.5 w-4.5" />
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 0.8, 0.3, 1] }}
                                            >
                                                <p
                                                    className="px-5 pb-5 pl-[4.75rem] text-[15px] leading-relaxed text-navy-500"
                                                    dangerouslySetInnerHTML={{ __html: f.a }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* aside */}
                    <Reveal delay={0.1}>
                        <div className="sticky top-28 space-y-4">
                            <div className="overflow-hidden rounded-4xl shadow-clay ring-8 ring-white">
                                <SmartImage
                                    src="/seclast.jpeg"
                                    alt="Student in an online class"
                                    fallbackIcon="student"
                                    ratio="4/3"
                                    className="w-full"
                                />
                            </div>


                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default Faq;
