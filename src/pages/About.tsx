import { motion } from 'framer-motion';
import Flag from '@/components/ui/Flag';
import { COUNTRIES, MANIFESTO, STATS } from '@/data/site';
import { IMG } from '@/data/images';
import ClayIcon from '@/components/clay/ClayIcon';
import SmartImage from '@/components/ui/SmartImage';
import PageHero from '@/components/layout/PageHero';
import { Button, Counter, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const TEACHERS = [
    {
        name: 'Tr. Jiya Saxena',
        initials: 'JS',
        subject: 'Mathematics Educator',
        quote: undefined,
        bio: 'With over 10 years of teaching experience, Tr. Jiya Saxena specialises in Mathematics through personalised, concept-driven learning. She has taught Cambridge, MYP, British Curriculum, GCSE, OCR and Edexcel learners, focusing on conceptual clarity, reasoning and real-world application. Her one-to-one approach adapts to each student\'s learning style, helping them overcome foundational gaps, build confidence, think independently and approach challenging problems with greater clarity.',
    },
    {
        name: 'Tr. Sakshi Agarwal',
        initials: 'SA',
        subject: 'Mathematics Educator',
        quote: undefined,
        bio: 'My teaching journey began in 2017 with a belief that Mathematics becomes meaningful when students understand the "why" behind every concept. From traditional classrooms to EdTech, academic leadership, content development and personalised one-to-one learning, I have worked with diverse learners across CBSE, Cambridge, MYP, British Curriculum, GCSE, OCR and Edexcel International GCSE. My approach combines conceptual clarity, reasoning, application and confidence-building, helping every student move beyond memorisation to develop independent mathematical thinking and problem-solving skills.',
    },
    {
        name: 'Dr. Kritika',
        initials: 'DK',
        subject: 'English Educator',
        quote: undefined,
        bio: 'With extensive experience teaching English Language and Literature to Classes 6–12 across CBSE and Indian State Boards, Dr. Kritika believes English is more than grammar and examinations. Her teaching focuses on conceptual clarity, communication, critical thinking and confident expression. By simplifying complex concepts, using relatable examples, visual learning and structured practice, she adapts to different learning levels and needs. Her goal is to help students become independent, articulate and confident users of English, while developing skills that extend beyond the classroom.',
    },
    {
        name: 'Tr. Lavisha',
        initials: 'LV',
        subject: 'Biology & Chemistry Educator',
        quote: undefined,
        bio: 'Tr. Lavisha\'s journey into teaching began unexpectedly — from being a Radio Jockey to supporting her studies through teaching at NEETprep. A mentor\'s influence transformed teaching from a job into a purpose. Over the years, she has taught Biology, Chemistry and Geography across CBSE, Cambridge, IGCSE, GCSE and IB curricula, working with learners globally. Her student-centred approach focuses on understanding individual challenges, building confidence and encouraging curiosity. For her, teaching is about helping students recognise their potential.',
    },
    {
        name: 'Tr. Vanshikka Sharma',
        initials: 'VS',
        subject: 'English Educator',
        quote: undefined,
        bio: 'Tr. Vanshikka Sharma is an experienced English educator and TESOL/TEFL-certified Language Trainer with postgraduate qualifications in MBA and M.Com. She teaches learners globally, including students from Australia, the UK and the Middle East, across IB and Cambridge curricula. Her expertise spans English language, literature, grammar, communication, critical thinking and textual analysis, along with preparation for NAPLAN, SAT, AP English Language & Composition and other academic examinations.',
    },
    {
        name: 'Tr. Divya',
        initials: 'DM',
        subject: 'Science Educator',
        quote: undefined,
        bio: 'Tr. Divya Mittal is a passionate Science and Chemistry educator with 4+ years of online teaching experience across diverse age groups and learning levels. She has taught students following the Australian Curriculum, CBSE, ICSE and IGCSE curricula. Her student-centred, concept-based approach uses real-life examples, visual resources, demonstrations, quizzes and discussions to make complex concepts engaging and accessible. She focuses on building scientific thinking, curiosity, problem-solving and independent learning skills.',
    },
    {
        name: 'Tr. Pranavi',
        initials: 'PR',
        subject: 'Mathematics Educator',
        quote: 'I don\'t just teach Mathematics; I cultivate the confidence to think, question, and solve.',
        bio: 'Tr. Pranavi began her teaching journey in 2014, driven by her passion for Mathematics and Physics. Her experience across classrooms, EdTech, academic leadership, content creation and personalised learning includes Cambridge, MYP, GCSE, Edexcel, IB, AS and A Level curricula. Her student-centred approach combines conceptual clarity, questioning, real-world application and technology to help learners overcome challenges, build confidence and develop independent thinking. For her, the greatest achievement is turning "I can\'t do this" into "Let me try."',
    },
];

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
                                                <circle cx="12" cy="12" r="9" />
                                                <path d="m8 14 4-4 4 4" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-extrabold text-navy-800 sm:text-3xl">
                                            The Philosophy Behind <span className="text-amber-500">TOT</span>
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-extrabold text-navy-800">
                                            Inspired by the <span className="text-amber-500">Idea</span> of the "Only True <span className="text-forest-500">Teacher</span>"
                                        </h3>
                                        <p className="text-[15px] leading-relaxed text-navy-600">
                                            Swami Vivekananda described a true teacher not simply as someone who possesses knowledge, but as someone who can understand the learner deeply enough to teach from the learner's perspective.
                                        </p>
                                    </div>

                                    <div className="relative rounded-2xl bg-amber-500/10 px-6 py-4 border-l-4 border-amber-400">
                                        <p className="text-[15px] font-medium italic text-navy-700">
                                            <span className="text-3xl font-bold text-amber-500 leading-none">"</span> The only true teacher is he who can immediately come down to the level of the student.<span className="text-3xl font-bold text-amber-500 leading-none">"</span>
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-extrabold text-navy-800">
                                            For TOT, this idea becomes a guiding principle:
                                        </h3>

                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            </div>
                                            <div className="space-y-3">
                                                <h4 className="text-[17px] font-extrabold text-navy-800">
                                                    Don't Just <span className="text-amber-500">Teach</span> the Subject. Understand the <span className="text-forest-500">Student</span>.
                                                </h4>
                                                <p className="text-[14.5px] leading-relaxed text-navy-600">
                                                    A great teacher learns to see beyond the textbook to notice how a child thinks, where they hesitate, what excites them, what they already understand and what they need explained differently. Because teaching becomes powerful when knowledge meets empathy, patience and understanding.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 rounded-2xl bg-forest-50 p-5 border border-forest-100">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
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

            {/* founder */}
            <section className="py-14">
                <div className="container-tot">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-4xl bg-white p-8 shadow-clay sm:p-12 lg:p-16">
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-peach/20 blur-3xl" />
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-navy-50 blur-3xl" />

                            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 items-center relative z-10">
                                {/* Left Content */}
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl md:text-2xl font-medium text-navy-800">
                                            Meet Our Founder
                                        </h3>
                                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                                            <span className="text-navy-900">Anish </span>
                                            <span className="text-amber-500">Rajan</span>
                                        </h2>
                                    </div>

                                    <div className="relative py-2 flex gap-2 items-start">
                                        <span className="text-4xl md:text-5xl font-serif font-bold text-amber-500 leading-none mt-1">"</span>
                                        <p className="text-2xl md:text-3xl font-medium italic text-navy-800 leading-tight">
                                            Before we teach a child,<br />
                                            we must first understand the child.
                                            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-500 leading-none ml-2">"</span>
                                        </p>
                                    </div>

                                    <p className="text-[15px] md:text-[16px] leading-relaxed text-navy-600 font-medium max-w-2xl">
                                        Anish Rajan is an education-focused entrepreneur and recruitment professional with years of experience connecting people and opportunities across the education and EdTech ecosystem. His journey with educators, leaders, and learners inspired him to build The Only Teacher (TOT) a vision where education becomes more personal, empathetic, engaging, and truly learner-centric.
                                    </p>
                                </div>

                                {/* Right Image */}
                                <div className="relative flex justify-center lg:justify-end">
                                    <div className="relative w-full max-w-md">
                                        <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl" />
                                        <img
                                            src="/anishrep.png"
                                            alt="Anish Rajan - Founder"
                                            className="relative z-10 w-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* co-founder */}
            <section className="py-14">
                <div className="container-tot">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-4xl bg-white p-8 shadow-clay sm:p-12 lg:p-16">
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-peach/20 blur-3xl" />
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-navy-50 blur-3xl" />

                            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 items-center relative z-10">
                                {/* Left Image */}
                                <div className="relative flex justify-center lg:justify-start">
                                    <div className="relative w-full max-w-md">
                                        <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl" />
                                        <img
                                            src="/deep.png"
                                            alt="Deepika Rai - Co-Founder"
                                            className="relative z-10 w-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>

                                {/* Right Content */}
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl md:text-2xl font-medium text-navy-800">
                                            Meet Our Co-Founder
                                        </h3>
                                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                                            <span className="text-navy-900">Deepika </span>
                                            <span className="text-amber-500">Rai</span>
                                        </h2>
                                    </div>

                                    <div className="relative py-2 flex gap-2 items-start">
                                        <span className="text-4xl md:text-5xl font-serif font-bold text-amber-500 leading-none mt-1">"</span>
                                        <p className="text-xl md:text-2xl font-medium italic text-navy-800 leading-tight">
                                            When we understand the learner, we unlock the potential within.
                                            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-500 leading-none ml-2">"</span>
                                        </p>
                                    </div>

                                    <p className="text-[15px] md:text-[16px] leading-relaxed text-navy-600 font-medium max-w-2xl">
                                        With over 20 years of experience in Corporate HR, Recruitment, and Talent Management, Deepika Rai brings a deep understanding of people, potential, and purposeful guidance. Her journey into EdTech reflects a belief that education should go beyond academics. As Co-Founder of TOT, she is helping build a personalized, technology-enabled learning ecosystem that nurtures knowledge, confidence, critical thinking, and future-ready skills turning experience in nurturing talent into a mission to nurture the next generation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ceo */}
            <section className="py-14">
                <div className="container-tot">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-4xl bg-white p-8 shadow-clay sm:p-12 lg:p-16">
                            <div className="absolute top-0 left-0 -ml-20 -mt-20 h-[500px] w-[500px] rounded-full bg-navy-50 blur-3xl" />
                            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-[400px] w-[400px] rounded-full bg-peach/20 blur-3xl" />

                            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 items-center relative z-10">
                                {/* Left Content */}
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl md:text-2xl font-medium text-navy-800">
                                            Meet Our CEO
                                        </h3>
                                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                                            <span className="text-navy-900">Akhilesh </span>
                                            <span className="text-amber-500">Singh</span>
                                        </h2>
                                    </div>

                                    <div className="relative py-2 flex gap-2 items-start">
                                        <span className="text-4xl md:text-5xl font-serif font-bold text-amber-500 leading-none mt-1">"</span>
                                        <p className="text-xl md:text-2xl font-medium italic text-navy-800 leading-tight">
                                            The future of education is not about teaching every child the same way; it is about understanding every child deeply enough to help them learn their way.
                                            <span className="inline-block text-4xl md:text-5xl font-serif font-bold text-amber-500 leading-[0] ml-2 translate-y-2">"</span>
                                        </p>
                                    </div>

                                    <p className="text-[15px] md:text-[16px] leading-relaxed text-navy-600 font-medium max-w-2xl">
                                        Akhilesh is a Physics teacher at heart and an engineer by education, bringing 17 years of experience across India's evolving EdTech ecosystem. His journey with Unicorn EdTech companies, high growth startups, and leading education organizations has shaped his belief that technology must serve meaningful learning. As CEO of TOT, his vision is to bring together great teachers, strong pedagogy, technology, and learner understanding to help every child build knowledge, confidence, curiosity, and lifelong learning skills.
                                    </p>
                                </div>

                                {/* Right Image */}
                                <div className="relative flex justify-center lg:justify-end">
                                    <div className="relative w-full max-w-md">
                                        <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl" />
                                        <img
                                            src="/akhil.png"
                                            alt="Akhilesh Singh - CEO"
                                            className="relative z-10 w-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
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

            {/* teachers */}
            <section className="py-14">
                <div className="container-tot">
                    <div className="panel bg-gradient-to-br from-peach via-white to-mint px-6 py-12 shadow-clay sm:px-10">
                        <div aria-hidden="true" className="wash wash-brand" />
                        <div className="relative">
                            <SectionHeading
                                eyebrow="The people who teach"
                                tone="forest"
                                title={<>Meet Our <span className="text-gradient-amber">Teachers</span></>}
                                sub="Specialists across curricula, united by one belief — every child deserves a teacher who truly understands them."
                            />
                            <div className="mt-10 grid gap-6 sm:grid-cols-2">
                                {TEACHERS.map((t, i) => (
                                    <Reveal key={t.name} delay={i * 0.07}>
                                        <div className="clay-card h-full p-6 sm:p-7">
                                            {/* header */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 font-display text-xl font-extrabold shadow-inner-soft">
                                                    {t.initials}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-display text-[18px] font-extrabold leading-snug text-navy-800">
                                                        {t.name}
                                                    </h3>
                                                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-0.5 text-[12px] font-extrabold uppercase tracking-[0.1em] text-amber-600">
                                                        {t.subject}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* quote */}
                                            {t.quote && (
                                                <div className="mt-4 rounded-2xl border-l-4 border-forest-400 bg-forest-50 px-4 py-3">
                                                    <p className="text-[13.5px] font-medium italic leading-relaxed text-forest-700">
                                                        "{t.quote}"
                                                    </p>
                                                </div>
                                            )}

                                            {/* bio */}
                                            <p className="mt-4 text-[14px] leading-relaxed text-navy-500">
                                                {t.bio}
                                            </p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* mission split */}
            <section className="py-14">
                <div className="container-tot grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <Reveal>
                        <div className="relative">
                            <div className="overflow-hidden rounded-4xl shadow-clay-lg ring-8 ring-white">
                                <SmartImage src="/aboutvala.jpeg" alt="A teacher working with a student" fallbackIcon="teacher" className="w-full" imgClassName="!h-auto !object-contain" />
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

        </>
    );
}
