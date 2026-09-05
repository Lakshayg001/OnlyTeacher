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
    { icon: 'heart' as const, title: 'The Child Comes First', body: 'Personalised learning built around the child not the average.' },
    { icon: 'bulb' as const, title: 'Understanding Comes Before Marks', body: 'When a child truly understands, confidence grows and results follow.' },
    { icon: 'globe' as const, title: 'Great Teaching Has No Borders', body: 'Connecting children with exceptional teachers across countries, curricula and time zones.' },
    { icon: 'laptop' as const, title: 'Technology enhanced Learning', body: 'Every Tot Lesson is supported by latest and adaptive digital platform to make every lesson memorable and everlasting.' },
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
                                <SmartImage src="/aboutv.jpeg" alt="A teacher working with a student" fallbackIcon="teacher" className="w-full" imgClassName="!h-auto !object-contain" />
                            </div>

                            <div className="absolute -left-5 -top-5 animate-float">
                                <ClayIcon name="bulb" size={62} />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <SectionHeading
                            align="left"
                            className="mt-4"
                            title={<span className="font-bold text-navy-800">The Right <span className="text-amber-500">Teacher</span> and perfect <span className="text-forest-500">pedagogy</span> can Change Everything.</span>}
                            sub="Every child deserves a teacher who sees more than a grade, a teacher who understands how they think, how they learn, and what helps them believe in themselves."
                        />
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: 'teacher' as const,
                                    title: 'A Teacher Who Gets You',
                                    body: "Find a teacher who understands your child's questions, strengths, challenges and learning style and makes them feel comfortable.",
                                },
                                {
                                    icon: 'target' as const,
                                    title: 'Learning That Feels Like Yours',
                                    body: "No two children learn in exactly the same way. Learning is always personalised.",
                                },
                                {
                                    icon: 'globe' as const,
                                    title: 'Great Teaching Without Borders',
                                    body: "TOT connects children with experienced teachers across the world.",
                                },
                                {
                                    icon: 'rocket' as const,
                                    title: 'From "I Can\'t" to "I Can."',
                                    body: "We help children build knowledge, confidence, curiosity and independent learning skills.",
                                },
                            ].map((card) => (
                                <div key={card.title} className="flex flex-col sm:flex-row gap-4 rounded-3xl border border-navy-100 bg-white p-5 shadow-clay">
                                    <div className="shrink-0">
                                        <ClayIcon name={card.icon} size={48} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-[17px] font-extrabold leading-snug text-navy-800">{card.title}</h3>
                                        <p className="mt-1.5 text-[14px] leading-relaxed text-navy-500">{card.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                title={<>Four Promises Behind Every <span className="text-gradient-amber">TOT Class</span></>}
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

            {/* philosophy */}
            <section className="py-14">
                <div className="container-tot">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#FFF9F2] to-[#FFF0E0] p-8 shadow-clay sm:p-12 lg:p-16">
                            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 items-center">
                                {/* Left Content */}
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="9"/>
                                                <path d="m8 14 4-4 4 4"/>
                                            </svg>
                                        </div>
                                        <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-navy-800 sm:text-3xl">
                                            The Philosophy Behind <span className="text-amber-500">TOT</span>
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[17px] font-extrabold text-navy-800">
                                            Inspired by the Idea of the "Only True Teacher"
                                        </h3>
                                        <p className="text-[15px] leading-relaxed text-navy-600">
                                            Swami Vivekananda described a true teacher not simply as someone who possesses knowledge, but as someone who can <span className="font-bold text-amber-600">understand the learner deeply enough to teach from the learner's perspective.</span>
                                        </p>
                                    </div>

                                    <div className="relative rounded-2xl bg-amber-500/10 px-6 py-4 border-l-4 border-amber-400">
                                        <p className="text-[15px] font-medium italic text-navy-700">
                                            <span className="font-display text-3xl font-bold text-amber-500 leading-none">"</span> The only true teacher is he who can immediately come down to the level of the student...
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[15px] font-extrabold text-navy-800">
                                            For TOT, this idea becomes a guiding principle:
                                        </p>
                                        
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                            </div>
                                            <div className="space-y-3">
                                                <h4 className="text-[17px] font-extrabold text-amber-600">
                                                    Don't Just Teach the Subject. Understand the Student.
                                                </h4>
                                                <p className="text-[14.5px] leading-relaxed text-navy-600">
                                                    A great teacher learns to see beyond the textbook to notice <span className="font-bold text-amber-600">how a child thinks, where they hesitate, what excites them</span>, what they already understand and <span className="font-bold text-amber-600">what they need explained differently.</span>
                                                </p>
                                                <p className="text-[14.5px] leading-relaxed text-navy-600">
                                                    Because teaching becomes powerful when knowledge meets <span className="font-bold text-amber-600">empathy, patience and understanding.</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 rounded-2xl bg-forest-50 p-5 border border-forest-100">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-extrabold text-navy-800">
                                                That is the spirit behind The Only Teacher.
                                            </h4>
                                            <p className="text-[14px] font-bold text-forest-600">
                                                One teacher. One child. One deeply personal learning relationship.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="relative flex justify-center lg:justify-end">
                                    <div className="relative w-full max-w-sm flex flex-col items-center">
                                        <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl" />
                                        <img 
                                            src="/swamiji.png" 
                                            alt="Swami Vivekananda"
                                            className="relative z-10 w-full object-contain drop-shadow-2xl"
                                            style={{ maxHeight: '600px', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                                        />
                                        <p className="relative z-20 mt-4 text-center font-display text-2xl text-navy-800/40 italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                                            Swami Vivekananda
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
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


        </>
    );
}
