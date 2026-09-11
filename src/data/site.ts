import { IMG } from './images';
import type {
 Board,
 Country,
 Course,
 Faq,
 NavItem,
 Post,
 Spec,
 Stat,
 Teacher,
 Testimonial,
 Track,
} from '@/types';

 export const BRAND = {
  name: 'TOT',
  full: 'The Only Teacher',
  tagline: 'Every Student Deserves the Best Teacher.',
  email: 'Info@theonlyteacher.com',
  phone: '+91 9898632990',
  address: 'C30, C Block, Sector 63, Noida, UP, 201301',
};

export const NAV: NavItem[] = [
 { label: 'Home', href: '/' },
 { label: 'About', href: '/about' },
 {
  label: 'Courses',
  href: '/courses',
  children: [
   { label: 'Mathematics', href: '/courses?s=Mathematics', desc: 'Grades 3–12 · All boards', icon: 'math' },
   { label: 'Science', href: '/courses?s=Science', desc: 'Physics · Chemistry · Biology', icon: 'science' },
   { label: 'English', href: '/courses?s=English', desc: 'Language · Literature · Reading', icon: 'book' },
   { label: 'ExamEdge', href: '/courses?s=ExamEdge', desc: 'Olympiad · Entrance readiness', icon: 'engineering' },
   { label: 'Technology (Coming Soon)', href: '/courses?s=Technology', desc: 'Coding · AI · Computer Science', icon: 'technology' },
  ],
 },
 { label: 'Blog', href: '/blog' },
 { label: 'Contact', href: '/contact' },
];

export const STATS: Stat[] = [
 { value: 12500, suffix: '+', label: 'Students taught one-to-one', icon: 'student', accent: 'amber' },
 { value: 850, suffix: '+', label: 'Panel-tested expert teachers', icon: 'teacher', accent: 'forest' },
 { value: 4, suffix: '', label: 'Countries, one classroom', icon: 'globe', accent: 'navy' },
 { value: 98, suffix: '%', label: 'Parents recommend TOT', icon: 'heart', accent: 'amber' },
];

export const HERO_HIGHLIGHTS = [
 { icon: 'teacher' as const, label: '1-to-1 teaching' },
 { icon: 'shield' as const, label: 'ID-verified faculty' },
 { icon: 'support' as const, label: '24×7 live support' },
 { icon: 'globe' as const, label: '4 countries' },
];

export const COUNTRIES: Country[] = [
 {
  code: 'IN',
  name: 'India',
  flag: 'IN',
  lat: 22.5,
  lng: 79,
  curricula: ['CBSE', 'ICSE', 'IB', 'State Boards'],
  blurb: 'Board-aligned teaching for CBSE, ICSE and IB with exam-season intensives.',
  timezone: 'IST',
  students: '6,400+',
 },
 {
  code: 'GB',
  name: 'United Kingdom',
  flag: 'GB',
  lat: 54,
  lng: -2.5,
  curricula: ['GCSE', 'A-Level', 'IB'],
  blurb: 'GCSE and A-Level specialists who know every exam board mark scheme.',
  timezone: 'GMT',
  students: '1,900+',
 },
 {
  code: 'AE',
  name: 'UAE',
  flag: 'AE',
  lat: 24.2,
  lng: 54.2,
  curricula: ['IGCSE', 'CBSE', 'American', 'IB'],
  blurb: 'Multi-curriculum support for Dubai and Abu Dhabi schools, after school hours.',
  timezone: 'GST',
  students: '2,300+',
 },
 {
  code: 'AU',
  name: 'Australia',
  flag: 'AU',
  lat: -25.5,
  lng: 134,
  curricula: ['Australian Curriculum', 'IB', 'IGCSE'],
  blurb: 'ATAR-ready tutoring matched to state syllabi and NAPLAN checkpoints.',
  timezone: 'AEST',
  students: '1,100+',
 },
 {
  code: 'US',
  name: 'USA',
  flag: 'US',
  lat: 37,
  lng: -95,
  curricula: ['American', 'IB', 'AP'],
  blurb: 'Support for Common Core and AP track students.',
  timezone: 'EST/PST',
  students: '5,000+',
 },
 {
  code: 'CA',
  name: 'Canada',
  flag: 'CA',
  lat: 56,
  lng: -106,
  curricula: ['Canadian', 'IB'],
  blurb: 'Provincial curriculum and IB support.',
  timezone: 'EST/PST',
  students: '1,200+',
 },
 {
  code: 'SG',
  name: 'Singapore',
  flag: 'SG',
  lat: 1.3,
  lng: 103.8,
  curricula: ['IGCSE', 'IB', 'Singapore Math'],
  blurb: 'Rigorous math and science tutoring.',
  timezone: 'SGT',
  students: '3,000+',
 },
 {
  code: 'NZ',
  name: 'New Zealand',
  flag: 'NZ',
  lat: -40.9,
  lng: 174.8,
  curricula: ['NCEA', 'IB', 'Cambridge'],
  blurb: 'NCEA readiness and international curricula.',
  timezone: 'NZST',
  students: '800+',
 },
 {
  code: 'QA',
  name: 'Qatar',
  flag: 'QA',
  lat: 25.3,
  lng: 51.5,
  curricula: ['IGCSE', 'IB', 'CBSE'],
  blurb: 'Expat curriculum support across Doha.',
  timezone: 'AST',
  students: '1,500+',
 },
 {
  code: 'SA',
  name: 'Saudi Arabia',
  flag: 'SA',
  lat: 23.8,
  lng: 45,
  curricula: ['IGCSE', 'American', 'CBSE'],
  blurb: 'International schooling tutoring support.',
  timezone: 'AST',
  students: '2,100+',
 },
 {
  code: 'OM',
  name: 'Oman',
  flag: 'OM',
  lat: 21.5,
  lng: 55.9,
  curricula: ['IGCSE', 'CBSE'],
  blurb: 'After-school tutoring for all major boards.',
  timezone: 'GST',
  students: '900+',
 },
 {
  code: 'KW',
  name: 'Kuwait',
  flag: 'KW',
  lat: 29.3,
  lng: 47.4,
  curricula: ['American', 'IGCSE', 'CBSE'],
  blurb: 'American and British curriculum specialists.',
  timezone: 'AST',
  students: '1,100+',
 },
 {
  code: 'MY',
  name: 'Malaysia',
  flag: 'MY',
  lat: 4.2,
  lng: 109.2,
  curricula: ['IGCSE', 'IB'],
  blurb: 'Cambridge and IB DP expert tutors.',
  timezone: 'MYT',
  students: '1,800+',
 },
 {
  code: 'BR',
  name: 'Brazil',
  flag: 'BR',
  lat: -14.2,
  lng: -51.9,
  curricula: ['IB', 'American'],
  blurb: 'International school curriculum tutoring.',
  timezone: 'BRT',
  students: '700+',
 },
 {
  code: 'MX',
  name: 'Mexico',
  flag: 'MX',
  lat: 23.6,
  lng: -102.5,
  curricula: ['IB', 'American'],
  blurb: 'Bilingual support for international students.',
  timezone: 'CST',
  students: '600+',
 },
 {
  code: 'JP',
  name: 'Japan',
  flag: 'JP',
  lat: 36.2,
  lng: 138.2,
  curricula: ['IB', 'American'],
  blurb: 'After-school tutoring for international schools.',
  timezone: 'JST',
  students: '1,400+',
 },
 {
  code: 'BH',
  name: 'Bahrain',
  flag: 'BH',
  lat: 26,
  lng: 50.5,
  curricula: ['IGCSE', 'CBSE'],
  blurb: 'Focused exam preparation and regular support.',
  timezone: 'AST',
  students: '500+',
 },
 {
  code: 'CH',
  name: 'Switzerland',
  flag: 'CH',
  lat: 46.8,
  lng: 8.2,
  curricula: ['IB', 'IGCSE'],
  blurb: 'IB DP experts for European international schools.',
  timezone: 'CET',
  students: '900+',
 }
];

export const MANIFESTO_INTRO = {
 eyebrow: 'Our conviction',
 title: 'Every Student Deserves the Right Teacher.',
 body: 'Personalised online tuition that connects your child with the right teacher, the right learning approach, and one-to-one attention because every child learns differently.',
};

export const MANIFESTO = [
 {
  n: '01',
  title: 'One Student. One Teacher.',
  body: 'Focused attention for meaningful one-to-one learning.',
  icon: 'student' as const,
 },
 {
  n: '02',
  title: 'Teaching That Adapts.',
  body: 'Lessons shaped around your child\'s pace, level and needs.',
  icon: 'book' as const,
 },
 {
  n: '03',
  title: 'Connection Comes First.',
  body: 'The right teacher can make learning feel different.',
  icon: 'heart' as const,
 },
 {
  n: '04',
  title: 'Learning Without Boundaries.',
  body: 'Online tuition across subjects, grades and international curricula.',
  icon: 'globe' as const,
 },
];

export const TRACKS: Track[] = [
 { id: 'elementary', label: 'Elementary', grades: 'Grades 1–5', icon: 'puzzle' },
 { id: 'intermediate', label: 'Intermediate', grades: 'Grades 6–9', icon: 'book' },
 { id: 'advanced', label: 'Advanced', grades: 'Grades 10–12', icon: 'target' },
];

export const COURSE_SPECS: Spec[] = [
 { title: 'One-to-One Teaching', desc: 'A single student in every live class. Always.', icon: 'teacher', accent: 'amber' },
 { title: 'Best Teachers Offered', desc: 'Top 3% of applicants. Panel-tested, ID-verified.', icon: 'trophy', accent: 'forest' },
 { title: '24×7 Live Support', desc: 'Doubt help and scheduling, in your timezone.', icon: 'support', accent: 'navy' },
 { title: 'Easy Interactive Platform', desc: 'Whiteboard, recordings and notes in one place.', icon: 'laptop', accent: 'amber' },
 { title: 'Global Presence', desc: 'Four countries, every major curriculum.', icon: 'globe', accent: 'forest' },
 { title: 'Every Student Is Important', desc: 'Progress reviewed personally, every month.', icon: 'heart', accent: 'navy' },
];

export const COURSES: Course[] = [
 {
  id: 'c1',
  title: 'Maths Quest',
  subject: 'Mathematics',
  grade: 'Grades 3–5',
  track: 'elementary',
  image: '/classes/f5.jpeg',
  icon: 'math',
  blurb: 'Solve it. Discover it. Master it.',
  boards: ['CBSE', 'ICSE', 'IGCSE'],
  modules: 12,
  hours: 36,
  rating: 4.9,
  accent: 'amber',
 },
 {
  id: 'c2',
  title: 'Wonder Lab',
  subject: 'Science',
  grade: 'Grades 3–5',
  track: 'elementary',
  image: '/classes/f2.jpeg',
  icon: 'science',
  blurb: 'Ask. Explore. Discover.',
  boards: ['CBSE', 'IB PYP', 'American'],
  modules: 10,
  hours: 30,
  rating: 4.8,
  accent: 'forest',
 },
 {
  id: 'c3',
  title: 'Word World',
  subject: 'English',
  grade: 'Grades 3–5',
  track: 'elementary',
  image: '/classes/f3.jpeg',
  icon: 'book',
  blurb: 'Read it. Speak it. Own it.',
  boards: ['ICSE', 'IGCSE', 'American'],
  modules: 11,
  hours: 33,
  rating: 4.9,
  accent: 'navy',
 },
 {
  id: 'c4',
  title: 'Exam Edge',
  subject: 'Exam Edge',
  grade: 'Grades 6–8',
  track: 'intermediate',
  image: '/classes/f1.jpeg',
  icon: 'math',
  blurb: 'The middle-school bridge most students slip on rebuilt properly.',
  boards: ['CBSE', 'ICSE', 'IB MYP'],
  modules: 14,
  hours: 42,
  rating: 4.9,
  accent: 'amber',
 },
 {
  id: 'c5',
  title: 'Physics Foundations',
  subject: 'Physics',
  grade: 'Grades 6–8',
  track: 'intermediate',
  image: '/classes/phy1.jpeg',
  icon: 'physics',
  blurb: 'See it. Feel it. Understand it.',
  boards: ['CBSE', 'IGCSE', 'IB MYP'],
  modules: 12,
  hours: 36,
  rating: 4.8,
  accent: 'navy',
 },
 {
  id: 'c6',
  title: 'Code Your First App',
  subject: 'Technology',
  grade: 'Grades 6–8',
  track: 'intermediate',
  image: IMG.coding,
  icon: 'technology',
  blurb: 'From block coding to real Python, one working project at a time.',
  boards: ['All boards', 'American', 'IB'],
  modules: 10,
  hours: 30,
  rating: 5.0,
  accent: 'forest',
 },
 {
  id: 'c7',
  title: 'Board Mathematics Mastery',
  subject: 'Mathematics',
  grade: 'Grades 9–10',
  track: 'advanced',
  image: IMG.chalkboard,
  icon: 'math',
  blurb: 'Full syllabus coverage plus past-paper drills to exam standard.',
  boards: ['CBSE', 'ICSE', 'IGCSE', 'GCSE'],
  modules: 18,
  hours: 54,
  rating: 4.9,
  accent: 'amber',
 },
 {
  id: 'c8',
  title: 'Chemistry: Bonds & Reactions',
  subject: 'Chemistry',
  grade: 'Grades 9–10',
  track: 'advanced',
  image: '/classes/chem1.jpeg',
  icon: 'chemistry',
  blurb: 'Mix. React. Discover.',
  boards: ['CBSE', 'IGCSE', 'GCSE'],
  modules: 16,
  hours: 48,
  rating: 4.8,
  accent: 'forest',
 },
 {
  id: 'c9',
  title: 'Biology: Systems of Life',
  subject: 'Biology',
  grade: 'Grades 9–10',
  track: 'advanced',
  image: '/classes/bio1.jpeg',
  icon: 'biology',
  blurb: 'Explore the world of life',
  boards: ['ICSE', 'IGCSE', 'GCSE'],
  modules: 15,
  hours: 50,
  rating: 4.9,
  accent: 'navy',
 },
 {
  id: 'c10',
  title: 'Advanced Calculus & Vectors',
  subject: 'Mathematics',
  grade: 'Grades 11–12',
  track: 'advanced',
  image: '/classes/c1.jpeg',
  icon: 'math',
  blurb: 'Understand the reaction. Master the concept.',
  boards: ['A-Level', 'IB DP', 'CBSE'],
  modules: 20,
  hours: 60,
  rating: 5.0,
  accent: 'amber',
 },
 {
  id: 'c11',
  title: 'Physics for A-Level & IB HL',
  subject: 'Physics',
  grade: 'Grades 11–12',
  track: 'advanced',
  image: '/classes/p1.jpeg',
  icon: 'engineering',
  blurb: 'Understand why it works.',
  boards: ['A-Level', 'IB DP', 'American AP'],
  modules: 19,
  hours: 57,
  rating: 4.9,
  accent: 'navy',
 },
 {
  id: 'c12',
  title: 'Computer Science & AI',
  subject: 'Technology',
  grade: 'Grades 11–12',
  track: 'advanced',
  image: '/classes/b1.jpeg',
  icon: 'technology',
  blurb: 'Understand life. Explore its complexity.',
  boards: ['A-Level', 'IB DP', 'American AP'],
  modules: 17,
  hours: 51,
  rating: 5.0,
  accent: 'forest',
 },
];

export const BOARDS: Board[] = [
 { id: 'cbse', name: 'CBSE', full: 'Central Board of Secondary Education', region: 'India · UAE', color: 'amber', icon: 'book', subjects: 14, grades: '3–12' },
 { id: 'icse', name: 'ICSE', full: 'Indian Certificate of Secondary Education', region: 'India', color: 'forest', icon: 'graduation', subjects: 12, grades: '3–12' },
 { id: 'ib', name: 'IB', full: 'International Baccalaureate PYP · MYP · DP', region: 'Global', color: 'navy', icon: 'globe', subjects: 16, grades: '3–12' },
 { id: 'igcse', name: 'IGCSE', full: 'Cambridge International GCSE', region: 'UAE · Global', color: 'amber', icon: 'target', subjects: 15, grades: '6–10' },
 { id: 'gcse', name: 'GCSE', full: 'General Certificate of Secondary Education', region: 'United Kingdom', color: 'forest', icon: 'bulb', subjects: 13, grades: '9–11' },
 { id: 'alevel', name: 'A-Level', full: 'GCE Advanced Level', region: 'United Kingdom', color: 'navy', icon: 'rocket', subjects: 11, grades: '11–13' },
 { id: 'us', name: 'American', full: 'Common Core · AP · Honors', region: 'UAE · Global', color: 'amber', icon: 'trophy', subjects: 14, grades: '3–12' },
 { id: 'aus', name: 'Australian', full: 'ACARA · ATAR pathways', region: 'Australia', color: 'forest', icon: 'science', subjects: 12, grades: '3–12' },
];

export const TEACHERS: Teacher[] = [
 {
  id: 't1',
  name: 'Dr. Ananya Rao',
  photo: IMG.t1,
  headline: 'Turns calculus into common sense',
  subjects: ['Mathematics', 'Further Maths'],
  boards: ['A-Level', 'IB DP', 'CBSE'],
  grades: 'Grades 9–12',
  experience: 14,
  rating: 4.9,
  reviews: 412,
  languages: ['English', 'Hindi', 'Telugu'],
  country: 'India',
  flag: 'IN',
  verified: true,
  accent: 'amber',
 },
 {
  id: 't2',
  name: 'James Whitfield',
  photo: IMG.t2,
  headline: 'Examiner-trained, mark-scheme obsessed',
  subjects: ['Physics', 'Engineering'],
  boards: ['GCSE', 'A-Level'],
  grades: 'Grades 9–13',
  experience: 11,
  rating: 4.9,
  reviews: 287,
  languages: ['English'],
  country: 'United Kingdom',
  flag: 'GB',
  verified: true,
  accent: 'navy',
 },
 {
  id: 't3',
  name: 'Fatima Al Mansoori',
  photo: IMG.t3,
  headline: 'Multi-curriculum science specialist',
  subjects: ['Chemistry', 'Biology'],
  boards: ['IGCSE', 'IB', 'American'],
  grades: 'Grades 6–12',
  experience: 9,
  rating: 4.8,
  reviews: 233,
  languages: ['English', 'Arabic'],
  country: 'UAE',
  flag: 'AE',
  verified: true,
  accent: 'forest',
 },
 {
  id: 't4',
  name: 'Marcus Reid',
  photo: IMG.t4,
  headline: 'Computer science, taught by building',
  subjects: ['Technology', 'Computer Science'],
  boards: ['IB DP', 'American AP'],
  grades: 'Grades 7–12',
  experience: 8,
  rating: 5.0,
  reviews: 196,
  languages: ['English'],
  country: 'Australia',
  flag: 'AU',
  verified: true,
  accent: 'navy',
 },
 {
  id: 't5',
  name: 'Sarah Mitchell',
  photo: IMG.t5,
  headline: 'Makes primary maths click, early',
  subjects: ['Mathematics', 'English'],
  boards: ['Australian', 'IB PYP'],
  grades: 'Grades 3–7',
  experience: 12,
  rating: 4.9,
  reviews: 341,
  languages: ['English'],
  country: 'Australia',
  flag: 'AU',
  verified: true,
  accent: 'amber',
 },
 {
  id: 't6',
  name: 'Rohan Desai',
  photo: IMG.t6,
  headline: 'Board-exam strategy, not cramming',
  subjects: ['Mathematics', 'Physics'],
  boards: ['CBSE', 'ICSE'],
  grades: 'Grades 8–12',
  experience: 10,
  rating: 4.8,
  reviews: 305,
  languages: ['English', 'Hindi', 'Marathi'],
  country: 'India',
  flag: 'IN',
  verified: true,
  accent: 'forest',
 },
 {
  id: 't7',
  name: 'Priya Nair',
  photo: IMG.t7,
  headline: 'Biology diagrams that stay remembered',
  subjects: ['Biology', 'Science'],
  boards: ['ICSE', 'IGCSE', 'GCSE'],
  grades: 'Grades 6–12',
  experience: 13,
  rating: 4.9,
  reviews: 368,
  languages: ['English', 'Malayalam', 'Hindi'],
  country: 'India',
  flag: 'IN',
  verified: true,
  accent: 'navy',
 },
 {
  id: 't8',
  name: 'Daniel Okafor',
  photo: IMG.t8,
  headline: 'Engineering-minded problem solving',
  subjects: ['Physics', 'Mathematics'],
  boards: ['IGCSE', 'A-Level', 'IB'],
  grades: 'Grades 9–12',
  experience: 7,
  rating: 4.8,
  reviews: 154,
  languages: ['English', 'French'],
  country: 'UAE',
  flag: 'AE',
  verified: true,
  accent: 'amber',
 },
];

export const TESTIMONIALS: Testimonial[] = [
 {
  id: 'r1',
  quote: 'She went from dreading maths to asking for extra problems. The same teacher, every week that was the difference.',
  name: 'Meera Krishnan',
  role: 'Parent of Aarav, Grade 9',
  avatar: IMG.p1,
  country: 'India',
  flag: 'IN',
  curriculum: 'CBSE',
  subject: 'Mathematics',
  rating: 5,
 },
 {
  id: 'r2',
  quote: 'Our A-Level physics tutor knew the mark scheme better than the school did. Grade went from C to A in two terms.',
  name: 'Helen Carter',
  role: 'Parent of Sophie, Year 13',
  avatar: IMG.p2,
  country: 'United Kingdom',
  flag: 'GB',
  curriculum: 'A-Level',
  subject: 'Physics',
  rating: 5,
 },
 {
  id: 'r3',
  quote: 'We moved schools mid-year and the curriculum changed completely. TOT rematched us in three days.',
  name: 'Omar Haddad',
  role: 'Parent of Layla, Grade 10',
  avatar: IMG.p3,
  country: 'UAE',
  flag: 'AE',
  curriculum: 'IGCSE',
  subject: 'Chemistry',
  rating: 5,
 },
 {
  id: 'r4',
  quote: 'The lesson notes after every class mean I actually know what he is working on. No guessing.',
  name: 'Rebecca Lewis',
  role: 'Parent of Ethan, Year 8',
  avatar: IMG.p4,
  country: 'Australia',
  flag: 'AU',
  curriculum: 'Australian',
  subject: 'Science',
  rating: 5,
 },
 {
  id: 'r5',
  quote: 'A teacher who knew the IB Diploma biology syllabus, not just A-Level. It took one call.',
  name: 'Sarah Whitmore',
  role: 'Parent of Amelia, Grade 11',
  avatar: IMG.p5,
  country: 'United Kingdom',
  flag: 'GB',
  curriculum: 'IB DP',
  subject: 'Biology',
  rating: 5,
 },
 {
  id: 'r6',
  quote: 'I am the student, not the parent and I actually like my classes now. My tutor explains until I get it.',
  name: 'Aditi Sharma',
  role: 'Student, Grade 12',
  avatar: IMG.p6,
  country: 'India',
  flag: 'IN',
  curriculum: 'ICSE',
  subject: 'Computer Science',
  rating: 5,
 },
];

export const FAQS: Faq[] = [
 {
  q: 'How does one-to-one learning at TOT work?',
  a: 'Your child learns privately with one dedicated teacher who gets to know them not a crowded classroom. Every lesson is shaped around their pace, strengths and learning needs, with interactive teaching, personalised guidance and notes to support learning beyond the session.',
  icon: 'laptop',
 },
 {
  q: 'Which boards and curricula does TOT support?',
  a: 'TOT supports major international and Indian curricula, including <strong>CBSE, ICSE, IB (PYP, MYP & DP), IGCSE, GCSE, A-Levels, AP and Australian curricula</strong>, along with country, state and regional syllabuses.',
  icon: 'book',
 },
 {
  q: 'How are TOT teachers selected?',
  a: 'Every TOT teacher is carefully selected for subject expertise, teaching ability, experience, communication and genuine care for students. Each applicant goes through a rigorous subject assessment, live teaching demonstration, academic evaluation, identity and background verification, and curriculum-specific assessment before joining our teaching community.',
  icon: 'shield',
 },
 {
  q: 'Do you offer flexible learning plans?',
  a: 'Choose a schedule that works for your child, whether that means weekly lessons, monthly plans, full-term learning or focused exam preparation. Your academic counsellor helps shape the right plan around your child\'s school timetable, goals, pace and learning needs before anything is confirmed.',
  icon: 'calendar',
 },
 {
  q: 'What happens in the first free lesson?',
  a: 'We begin by understanding your child not simply starting with a textbook. The teacher observes how they think, explains concepts at their level, encourages questions and creates a comfortable space to learn.<br/>Afterwards, we share thoughtful feedback so you can understand where your child is today and how we can help them move forward.',
  icon: 'rocket',
 },
 {
  q: 'What if we need help between lessons?',
  a: 'Our support team is available to help with scheduling, lesson changes, questions, teacher coordination and anything else that keeps your child’s learning journey running smoothly.',
  icon: 'support',
 },
 {
  q: 'Can my child learn from a teacher in another country?',
  a: 'Absolutely. Great teaching shouldn’t stop at a border. TOT connects children with teachers from our global teaching community, while matching the learning experience to <strong>their curriculum, goals, level and preferred schedule.</strong>',
  icon: 'globe',
 },
];

export const POSTS: Post[] = [
 {
  id: 'b8',
  title: 'Why The Only Teacher Could Be the Right Learning Partner for Your Child',
  excerpt: 'Is your child receiving lessons, or actually learning?',
  category: 'Why TOT',
  date: '12 Sep 2026',
  readTime: 4,
  image: '/newblo.jpeg',
  accent: 'forest',
  author: 'The Only Teacher',
  content: `
<p>Choosing a tutor is not simply about finding someone who can complete a syllabus. It is about finding a teacher who understands how your child thinks, where they struggle, what motivates them, and how they learn best.</p>
<p>That is the difference we are building at The Only Teacher (TOT).</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">Premium Learning Without the Premium Price</h3>
<p>At TOT, we believe quality education should not be limited by a family’s budget. Our goal is to make personalised, high-quality tutoring affordable without compromising on teaching standards, academic expertise or learner experience.</p>
<p>Affordable does not mean ordinary. It means making better education accessible to more families.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">Why Does the Teacher Matter More Than the Platform?</h3>
<p>Technology can deliver a lesson, but only a great teacher can recognise hesitation, change an explanation, encourage a struggling learner and build genuine confidence.</p>
<p>That is why TOT focuses on bringing experienced, knowledgeable and passionate teachers onboard. Our educators are selected for their subject expertise, curriculum understanding, communication skills and ability to make learning clear, engaging and meaningful.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">Does Your Child Need More Than Marks?</h3>
<p>Of course, academic progress matters. But real learning also develops:</p>
<ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
 <li>Conceptual clarity</li>
 <li>Independent thinking</li>
 <li>Problem-solving ability</li>
 <li>Confidence</li>
 <li>Curiosity</li>
 <li>Communication</li>
 <li>Consistent learning habits</li>
</ul>
<p>TOT is designed to support the child behind the result, not just the result itself.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">One Platform. Global Curriculum Support.</h3>
<p>TOT is not limited to one board or one country. We support learners across a wide range of International curricula, including:</p>
<p>CBSE, Cambridge, IB, IGCSE, GCSE and other global curricula.</p>
<p>Whether your child is studying in New Zealand, the UK, Australia, the Middle East or another part of the world, our aim is to help families find the right teacher and the right learning approach for their curriculum and goals.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">What Makes TOT Different?</h3>
<p>We are not trying to make every child learn in the same way.</p>
<p>We believe every learner deserves:</p>
<ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
 <li>The right teacher</li>
 <li>Personalised attention</li>
 <li>Clear explanations</li>
 <li>Curriculum-aligned support</li>
 <li>Honest academic guidance</li>
 <li>Affordable access to quality education</li>
 <li>A learning environment built on trust</li>
</ul>
<p>Because education should not make children feel smaller.</p>
<p>It should help them understand more, ask better questions and believe they are capable of achieving more.</p>
<p>The Only Teacher where great teachers meet individual learners, and quality education becomes accessible to every child.</p>
`
 },
 {
  id: 'b9',
  title: 'Learning That Understands Every Child',
  excerpt: 'How TOT supports children with ADHD. Every child learns differently.',
  category: 'Special Education',
  date: '12 Sep 2026',
  readTime: 5,
  image: '/adhd.jpeg',
  accent: 'navy',
  author: 'The Only Teacher',
  content: `
<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">How TOT supports children with ADHD</h3>
<p>Every child learns differently. For children with ADHD, learning becomes more meaningful when their energy, attention, curiosity and individual strengths are understood rather than judged.</p>
<p>At The Only Teacher, we do not expect every child to sit, listen and learn in exactly the same way. We create learning experiences that are patient, structured, flexible and personalised to the child.</p>
<p>Our teachers focus on:</p>
<ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
 <li>Short, clear and manageable learning steps</li>
 <li>Simple explanations supported by examples and visual learning</li>
 <li>Interactive lessons that encourage participation</li>
 <li>Regular breaks and movement when appropriate</li>
 <li>Positive reinforcement instead of constant correction</li>
 <li>Clear routines and realistic learning goals</li>
 <li>Frequent feedback to help children recognise their progress</li>
 <li>Personalised strategies based on the child’s pace, interests and learning needs</li>
</ul>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">More Than Attention</h3>
<p>We understand that a child’s difficulty staying focused does not mean a lack of intelligence, effort or potential. Our aim is to help learners build confidence, understand concepts and develop practical learning habits without feeling pressured or labelled.</p>
<p>TOT teachers work closely with parents to understand what supports the child best. We encourage open communication about progress, challenges and strategies that can make learning more comfortable and productive.</p>
<p>Our approach is not about changing who the child is. It is about creating the right environment for the child to participate, understand and succeed.</p>
<p>Every child deserves a teacher who sees potential before difficulty.</p>
<p>With experienced educators, personalised tutoring and a supportive learning environment, TOT helps children with ADHD move from frustration to understanding, from hesitation to confidence, and from “I cannot do this” to “Let me try.”</p>
<p>At TOT, we do not teach every child the same way. We help every child discover their own way to learn.</p>
<p class="mt-6 italic text-navy-600">TOT provides educational support and does not replace professional medical, psychological or therapeutic care. Where appropriate, we encourage families to work with qualified healthcare or learning specialists alongside tutoring.</p>
`
 },
 {
  id: 'b7',
  title: 'How to Prepare Your Child for NAPLAN Without Creating Exam Stress',
  excerpt: 'NAPLAN is an important part of a child’s school journey, but preparing for it does not need to become stressful.',
  category: 'NAPLAN',
  date: '11 Sep 2026',
  readTime: 5,
  image: '/phelablo.jpeg',
  accent: 'amber',
  author: 'The Only Teacher',
  content: `
<p>NAPLAN is an important part of a child’s school journey, but preparing for it does not need to become stressful. The goal should be to help children feel familiar with the assessment, strengthen their skills and build confidence without putting unnecessary pressure on performance.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">1. Understand What NAPLAN Assesses</h3>
<p>NAPLAN assesses key areas of literacy and numeracy, including <em>reading, writing, conventions of language and numeracy</em>. Understanding these areas helps parents focus on meaningful preparation rather than simply making children complete endless practice papers.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">2. Strengthen the Foundations</h3>
<p>Good NAPLAN preparation begins with everyday learning.</p>
<p>Encourage your child to:</p>
<ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
  <li>Read regularly and discuss what they have read.</li>
  <li>Practise spelling, grammar and sentence construction.</li>
  <li>Solve age-appropriate Maths problems.</li>
  <li>Explain how they reached an answer rather than only giving the answer.</li>
</ul>
<p>Strong foundations make children more comfortable when they encounter unfamiliar questions.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">3. Practise Without Pressure</h3>
<p>Practice should help children become familiar with question formats and manage their time. However, too much testing can increase anxiety.</p>
<p>Keep practice sessions <em>short, consistent and purposeful</em>. Focus on understanding mistakes instead of counting how many questions were answered incorrectly.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">4. Build Confidence</h3>
<p>Children often perform better when they feel comfortable making mistakes.</p>
<p>Instead of saying, "You must get a high score," encourage them with: <em>"Do your best, read carefully and take your time."</em></p>
<p>Remind your child that one assessment does not define their intelligence or ability.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">5. Personalised Support Can Help</h3>
<p>Every child has different strengths and learning gaps. Some may need support with reading comprehension, while others may need more practice with numeracy, writing or time management.</p>
<p>A personalised learning approach allows teachers to identify specific challenges and provide targeted support at the right pace.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">Prepare the Child, Not Just for the Test</h3>
<p>The best NAPLAN preparation is not about creating exam pressure. It is about developing <em>skills, familiarity and confidence</em>.</p>
<p>At <strong>The Only Teacher (TOT)</strong>, we believe children learn best when they are understood as individuals. With the right guidance, preparation can become a positive learning experience rather than a source of stress.</p>
<p class="font-bold text-amber-600 mt-4"><em>Prepare with confidence. Learn with understanding. Perform at your best.</em></p>
`
 },
 {
  id: 'b8',
  title: 'Why Some Children Understand English but Struggle to Express Themselves',
  excerpt: 'Some children can understand English well but hesitate when they need to speak, write, or explain their thoughts.',
  category: 'English',
  date: '11 Sep 2026',
  readTime: 4,
  image: '/understandblog.jpeg',
  accent: 'navy',
  author: 'The Only Teacher',
  content: `
<p>Some children can understand English well but hesitate when they need to speak, write, or explain their thoughts. They may know the meaning of words and understand what they read, yet struggle to put their ideas into clear sentences.</p>
<p>This is more common than many parents realise, and it does not necessarily mean a child has weak English skills.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">1. Understanding Is Different From Expressing</h3>
<p>Listening and reading are receptive skills, while speaking and writing require children to actively organise their thoughts, choose vocabulary and construct sentences.</p>
<p>A child may understand a question perfectly but need more time to formulate an answer.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">2. Limited Vocabulary and Sentence Skills</h3>
<p>Children sometimes understand the general meaning of English but lack the vocabulary or sentence structures needed to express themselves accurately.</p>
<p>Regular reading, conversations and guided writing can help build these skills naturally.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">3. Fear of Making Mistakes</h3>
<p>Confidence plays a major role in communication. Children who worry about grammar mistakes, pronunciation or what others might think may choose to remain quiet.</p>
<p>A supportive environment where mistakes are treated as part of learning can make a significant difference.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">4. They May Need a Different Learning Approach</h3>
<p>Every child develops communication skills differently. Some respond well to conversations and storytelling, while others benefit from visual prompts, structured writing exercises, debates or real-life situations.</p>
<p>Personalised teaching helps identify what works best for each learner.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">5. Encourage Thinking, Not Just Correct Answers</h3>
<p>Strong communication is about more than grammar. Children need to learn how to <em>think, organise ideas, explain opinions and communicate with confidence</em>.</p>
<p>Parents can encourage this through simple everyday questions such as:</p>
<ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
  <li>“What do you think?”</li>
  <li>“Why do you feel that way?”</li>
  <li>“Can you explain it in your own words?”</li>
</ul>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">Building Confident Communicators</h3>
<p>With the right support, a child can gradually move from understanding English to using it confidently.</p>
<p>At <strong>The Only Teacher (TOT)</strong>, we believe English learning should go beyond textbooks and grammar rules. Our personalised approach focuses on helping children understand, express, communicate and think independently.</p>
<p class="font-bold text-amber-600 mt-4"><em>Because knowing English is important. Having the confidence to use it is even more powerful.</em></p>
`
 },
 {
  id: 'b9',
  title: 'Digital SAT Guide for Students and Parents: Everything You Need to Know',
  excerpt: 'The Digital SAT can feel overwhelming at first, but understanding the test and preparing with the right strategy can make the journey much more manageable.',
  category: 'Exam Prep',
  date: '11 Sep 2026',
  readTime: 6,
  image: '/satbl.jpeg',
  accent: 'amber',
  author: 'The Only Teacher',
  content: `
<p>The Digital SAT can feel overwhelming at first, but understanding the test and preparing with the right strategy can make the journey much more manageable.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">What Is the Digital SAT?</h3>
<p>The SAT is a digital college admissions test consisting of two sections: Reading and Writing and Math. The test takes 2 hours and 14 minutes, with 64 minutes for Reading and Writing and 70 minutes for Math. Each section has two timed modules, and the second module adapts based on performance in the first.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">What Does the SAT Test?</h3>
<p>The Reading and Writing section assesses comprehension, vocabulary, grammar, evidence, reasoning and effective written expression.</p>
<p>The Math section covers Algebra, Advanced Math, Problem-Solving and Data Analysis, Geometry and Trigonometry.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">How Should Students Prepare?</h3>
<p>Effective SAT preparation should begin with understanding the student's current strengths and weaknesses.</p>
<p>A strong preparation plan includes:</p>
<ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
  <li>Building core Maths and English skills</li>
  <li>Developing reading and reasoning abilities</li>
  <li>Learning SAT question patterns</li>
  <li>Practising time management</li>
  <li>Reviewing mistakes carefully</li>
  <li>Taking full-length practice tests</li>
  <li>Developing strategies for unfamiliar questions</li>
</ul>
<p>Because the SAT is adaptive, students should focus on accuracy as well as speed.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">How Can Parents Help?</h3>
<p>Parents can support preparation without creating unnecessary pressure. Encourage consistent study, healthy routines and progress rather than focusing only on scores.</p>
<p>The goal should be to help students become confident, independent learners who understand how to approach different types of questions.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">Personalised SAT Preparation</h3>
<p>Every student starts from a different level. A personalised approach can identify learning gaps, target specific skills and create a preparation plan around the student's goals and timeline.</p>
<p>At <strong>The Only Teacher (TOT)</strong>, we believe SAT preparation should go beyond solving practice papers. It should help students understand, reason, improve and approach the test with confidence.</p>
<p class="font-bold text-amber-600 mt-4"><em>Prepare with strategy. Learn with purpose. Perform with confidence.</em></p>
`
 },
 {
  id: 'b10',
  title: 'Why Children Struggle With Mathematics And How the Right Teacher Can Help',
  excerpt: 'Mathematics can be challenging for children, but struggling with Maths does not mean a child lacks ability. Often, the real issue is a combination of foundational gaps, confidence, learning style and practice.',
  category: 'Mathematics',
  date: '11 Sep 2026',
  readTime: 5,
  image: '/mathblog.jpeg',
  accent: 'forest',
  author: 'The Only Teacher',
  content: `
<p>Mathematics can be challenging for children, but struggling with Maths does not mean a child lacks ability. Often, the real issue is a combination of foundational gaps, confidence, learning style and practice.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">1. Foundational Gaps</h3>
<p>Maths is cumulative. If a child has difficulty with multiplication, fractions, place value or basic arithmetic, later topics such as algebra, percentages and equations can become much harder.</p>
<p>A good teacher first identifies where the difficulty begins instead of simply moving ahead with the syllabus.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">2. Confidence Can Change Everything</h3>
<p>Repeated mistakes can make children think, <em>"I'm not good at Maths."</em> This can lead to anxiety, avoidance and less practice.</p>
<p>The right teacher creates a safe environment where questions and mistakes are part of learning. Building confidence can be just as important as teaching the concept.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">3. Every Child Learns Differently</h3>
<p>Some children learn through visual explanations, others through practical examples, discussion or step-by-step guidance.</p>
<p>When one teaching method does not work, the solution is not always more practice. Sometimes the child needs the concept explained differently.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">4. Practice Should Build Understanding</h3>
<p>Effective Maths practice is not about solving hundreds of questions. Children need to understand why a method works, correct their mistakes and gradually apply their knowledge to unfamiliar problems.</p>
<p>The goal is to develop reasoning, problem-solving and independent thinking, not just memorisation.</p>

<h3 class="font-bold text-navy-700 text-lg mt-6 mb-2">5. The Right Teacher Understands the Child</h3>
<p>A great Maths teacher looks beyond the textbook. They observe where a child hesitates, what they understand, how they approach problems and where their confidence drops.</p>
<p>Personalised teaching allows the teacher to adjust the pace, explanation, examples and practice to the learner.</p>

<p class="mt-6">At <strong>The Only Teacher (TOT)</strong>, we believe the first question should not be, <em>"What chapter are we teaching?"</em> but:</p>
<p class="font-bold text-navy-800 italic mt-2">"What does this child need to understand and succeed?"</p>
<p class="mt-4">Because sometimes, a child doesn't need more Maths.</p>
<p class="font-bold text-amber-600 mt-2"><em>They need the right teacher to make Maths make sense.</em></p>
`
 }
];

export const STEPS = [
 {
  n: '01',
  title: 'Tell Us About Your Child',
  body: 'Share their grade, subjects, strengths and learning needs.',
  icon: 'student' as const,
  accent: 'amber' as const,
 },
 {
  n: '02',
  title: 'Meet Their Teacher',
  body: 'We carefully match your child with the right teacher for them.',
  icon: 'chat' as const,
  accent: 'forest' as const,
 },
 {
  n: '03',
  title: 'Experience TOT',
  body: 'A free 1:1 session designed to understand your child and their learning style.',
  icon: 'bulb' as const,
  accent: 'navy' as const,
 },
];

export const SUBJECT_MARQUEE = [
 'Mathematics',
 'Physics',
 'Chemistry',
 'Biology',
 'Computer Science',
 'English',
 'Economics',
 'Further Maths',
 'Environmental Science',
 'Statistics',
 'Robotics',
 'Geography',
];
