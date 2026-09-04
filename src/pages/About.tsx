import { motion } from 'framer-motion';
import Flag from '@/components/ui/Flag';
import { COUNTRIES, MANIFESTO, STATS } from '@/data/site';
import { IMG } from '@/data/images';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import PageHero from '@/components/layout/PageHero';
import { Button, Counter, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const VALUES = [
    { icon: 'heart' as const, title: 'Student first, always', body: 'Every decision starts with one question: does this help the child in the lesson?' },
    { icon: 'shield' as const, title: 'Honest over impressive', body: 'We tell parents what we actually see including when tuition is not the answer.' },
    { icon: 'globe' as const, title: 'Access without borders', body: 'A student in Sydney and one in Hyderabad get the same bench of teachers.' },
    { icon: 'bulb' as const, title: 'Understanding over marks', body: 'Marks follow understanding. We have never seen it work the other way round.' },
];

const GALLERY = [
    { src: IMG.onlineLesson, alt: 'One-to-one live class', icon: 'laptop' as const, span: 'col-span-2 row-span-2' },
    { src: IMG.chemistry, alt: 'Chemistry lab walkthrough', icon: 'chemistry' as const, span: '' },
    { src: IMG.mathBoard, alt: 'Working the whiteboard', icon: 'math' as const, span: '' },
    { src: IMG.exam, alt: 'Past-paper practice', icon: 'target' as const, span: '' },
    { src: IMG.coding, alt: 'Building a first app', icon: 'technology' as const, span: '' },
    { src: IMG.schoolKids, alt: 'Students, every curriculum', icon: 'student' as const, span: 'col-span-2' },
    { src: IMG.globeDesk, alt: 'Learning without borders', icon: 'globe' as const, span: '' },
    { src: IMG.notebook, alt: 'Notes after every lesson', icon: 'book' as const, span: '' },
];

const TIMELINE = [
    { year: '2019', title: 'One teacher, twelve students', body: 'TOT started as a single tutor taking one-to-one lessons after school hours.' },
    { year: '2021', title: 'Boards beyond CBSE', body: 'IGCSE, GCSE and IB teachers joined as families moved schools and countries.' },
    { year: '2023', title: 'Four countries', body: 'India, the UK, the UAE and Australia scheduled in four timezones.' },
    { year: '2026', title: '12,500 students later', body: 'Same promise, larger bench: every student deserves the best teacher.' },
];

export default function About() {
    return (
        <>
            <PageHero
                crumb="About"
                eyebrow="Our story"
                title="We Build TOT With One"
                accent="Belief"
                sub="That a child's progress depends less on the platform the app or the price and almost entirely on who is teaching them"
                icons={['graduation', 'heart', 'globe']}
            />

            {/* mission split */}
            <section className="py-14">
                <div className="container-tot grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <Reveal>
                        <div className="relative">
                            <div className="overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
                                <SmartImage src="/about01.jpeg" alt="A teacher working with a student" fallbackIcon="teacher" className="w-full" imgClassName="!h-auto !object-contain" />
                            </div>

                            <div className="absolute -left-5 -top-5 animate-float">
                                <ClayIcon name="bulb" size={62} />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <SectionHeading
                            align="left"
                            eyebrow="Why we exist"
                            className="mt-4"
                            title={<span className="font-medium">The Right <span className="text-gradient-amber">Teacher</span> Can Change Everything. We Make That <span className="text-gradient-amber">Match</span> Possible.</span>}
                        />
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {STATS.map((s) => (
                                <div key={s.label} className="rounded-3xl border border-navy-100 bg-white p-4 shadow-clay">
                                    <ClayIcon name={s.icon} size={40} />
                                    <p className="mt-2 font-display text-2xl font-extrabold text-navy-800">
                                        <Counter value={s.value} suffix={s.suffix} />
                                    </p>
                                    <p className="text-[12.5px] font-bold leading-snug text-navy-500">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <Button to="/contact" size="lg" className="mt-8">Book a Free Demo</Button>
                    </Reveal>
                </div>
            </section>

            {/* values */}
            <section className="py-14">
                <div className="container-tot">
                    <div className="panel bg-gradient-to-br from-mint via-white to-peach px-6 py-12 shadow-clay sm:px-10">
                        <div aria-hidden="true" className="wash wash-mint" />
                        <div className="relative">
                            <SectionHeading
                                eyebrow="What we hold to"
                                tone="forest"
                                title={<>Four Things We <span className="text-gradient-amber">Do Not Trade Away</span></>}
                            />
                            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {VALUES.map((v, i) => (
                                    <Reveal key={v.title} delay={i * 0.07}>
                                        <div className="h-full rounded-4xl border border-navy-100 bg-white p-5 shadow-clay transition-transform duration-300 hover:-translate-y-1.5">
                                            <ClayIcon name={v.icon} size={54} />
                                            <h3 className="mt-3.5 font-display text-lg font-extrabold leading-snug text-navy-800">{v.title}</h3>
                                            <p className="mt-1.5 text-[14px] leading-relaxed text-navy-500">{v.body}</p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* classroom gallery */}
            <section className="py-14">
                <div className="container-tot">
                    <SectionHeading
                        eyebrow="Inside a TOT lesson"
                        tone="navy"
                        title={<>A Teacher who knows <span className="text-gradient-amber">Inn & Out</span></>}
                        sub="Live whiteboards real experiments past papers and a teacher who knows the student's name"
                    />
                    <div className="mt-10 grid auto-rows-[168px] grid-cols-2 gap-4 sm:auto-rows-[190px] lg:grid-cols-4">
                        {GALLERY.map((g, i) => (
                            <motion.figure
                                key={g.alt}
                                initial={{ opacity: 0, scale: 0.94 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                                className={cn(
                                    'group relative overflow-hidden rounded-4xl shadow-clay transition-all duration-300 hover:-translate-y-1.5 hover:shadow-clay-lg',
                                    g.span,
                                )}
                            >
                                <SmartImage
                                    src={g.src}
                                    alt={g.alt}
                                    fallbackIcon={g.icon}
                                    className="h-full w-full"
                                    imgClassName="group-hover:scale-110"
                                    overlay
                                />
                                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                                    <span className="text-[13px] font-extrabold text-white drop-shadow">{g.alt}</span>
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* timeline */}
            <section className="py-14">
                <div className="container-tot">
                    <SectionHeading
                        eyebrow="How we got here"
                        title={<>From One Tutor to <span className="text-gradient-amber">Four Countries</span></>}
                    />
                    <div className="relative mt-12">
                        <span aria-hidden="true" className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-amber-300 via-forest-300 to-navy-200 lg:left-1/2 lg:block" />
                        <div className="space-y-5">
                            {TIMELINE.map((t, i) => (
                                <motion.div
                                    key={t.year}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className={cn(
                                        'relative lg:w-[calc(50%-2rem)]',
                                        i % 2 === 1 ? 'lg:ml-auto' : '',
                                    )}
                                >
                                    <div className="rounded-4xl border border-navy-100 bg-white p-5 shadow-clay sm:p-6">
                                        <span className="inline-flex rounded-full bg-navy-700 px-3.5 py-1.5 font-display text-sm font-extrabold text-white">
                                            {t.year}
                                        </span>
                                        <h3 className="mt-3 font-display text-xl font-extrabold text-navy-800">{t.title}</h3>
                                        <p className="mt-1.5 text-[15px] leading-relaxed text-navy-500">{t.body}</p>
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className={cn(
                                            'absolute top-8 hidden h-4 w-4 rounded-full bg-amber-500 ring-4 ring-white lg:block',
                                            i % 2 === 1 ? '-left-[2.5rem]' : '-right-[2.5rem]',
                                        )}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* manifesto recap */}
            <section className="py-14">
                <div className="container-tot">
                    <div className="panel bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-12 shadow-clay-lg sm:px-10">
                        <div aria-hidden="true" className="wash wash-deep" />
                        <div className="relative">
                            <SectionHeading
                                eyebrow="Our conviction"
                                title={<span className="text-white">Every Student Deserves the <span className="text-gradient-amber">Best Teacher</span></span>}
                                sub={<span className="text-navy-300">Five promises we make to every family, in every country we teach in.</span>}
                            />
                            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {MANIFESTO.map((m, i) => (
                                    <Reveal key={m.n} delay={i * 0.06}>
                                        <div className="h-full rounded-4xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                                            <div className="flex items-center justify-between">
                                                <ClayIcon name={m.icon} size={48} />
                                                <span className="font-display text-3xl font-extrabold text-white/15">{m.n}</span>
                                            </div>
                                            <h3 className="mt-3 font-display text-[17px] font-extrabold leading-snug text-white">{m.title}</h3>
                                            <p className="mt-1.5 text-[14px] leading-relaxed text-navy-300">{m.body}</p>
                                        </div>
                                    </Reveal>
                                ))}
                                <Reveal delay={0.3}>
                                    <div className="flex h-full flex-col justify-between rounded-4xl bg-gradient-to-br from-amber-400 to-amber-600 p-5 shadow-clay-amber">
                                        <ClayIcon name="rocket" size={52} tone="navy" />
                                        <div className="mt-4">
                                            <p className="font-display text-xl font-extrabold leading-snug text-navy-800">
                                                Meet a teacher this week.
                                            </p>
                                            <Button to="/contact" variant="dark" full className="mt-4">
                                                Book a Free Demo
                                            </Button>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                                {COUNTRIES.map((c) => (
                                    <span
                                        key={c.code}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-extrabold text-navy-200"
                                    >
                                        <Flag code={c.flag} size={20} />
                                        {c.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
