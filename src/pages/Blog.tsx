import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Clock3, X } from 'lucide-react';
import { POSTS } from '@/data/site';
import SmartImage from '@/components/ui/SmartImage';
import ClayIcon from '@/components/clay/ClayIcon';
import PageHero from '@/components/layout/PageHero';
import { Button, Reveal } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

const CAT = {
 amber: 'bg-amber-500 text-white',
 forest: 'bg-forest-500 text-white',
 navy: 'bg-navy-700 text-white',
} as const;

const CATEGORIES = ['All', ...Array.from(new Set(POSTS.map((p) => p.category)))];

export default function Blog() {
 const [cat, setCat] = useState('All');
 const [selectedPost, setSelectedPost] = useState<any>(null);
 const list = cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat);

 return (
  <>
   <PageHero
    crumb="Blog"
    eyebrow="Knowledge hub"
    title={<>Helping Children <span className="text-forest-500">Learn</span> Without Losing</>}
    accent="Their Confidence"
    sub="Practical knowledge from educators who work with students every day."
    icons={['book', 'math', 'science']}
   />

   <section className="py-10">
    <div className="container-tot">
     <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:justify-center">
      {CATEGORIES.map((c) => (
       <button
        key={c}
        onClick={() => setCat(c)}
        className={cn(
         'shrink-0 rounded-full px-4 py-2.5 text-[13px] font-extrabold transition-all',
         cat === c
          ? 'bg-navy-700 text-white shadow-clay-navy'
          : 'border border-navy-100 bg-white text-navy-500 hover:border-amber-300 hover:text-amber-600',
        )}
       >
        {c}
       </button>
      ))}
     </div>

     <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
       <motion.article
        key={p.id}
        layout
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.06 }}
        onClick={() => setSelectedPost(p)}
        className="group flex flex-col overflow-hidden cursor-pointer rounded-4xl border border-navy-100 bg-white shadow-clay transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-clay-lg"
       >
        <div className="relative">
         <SmartImage
          src={p.image || '/napblog.jpeg'}
          alt={p.title}
          fallbackIcon="book"
          ratio="16/10"
          className="w-full"
          imgClassName="group-hover:scale-105"
         />
         <span className={cn('chip absolute left-4 top-4', CAT[p.accent])}>{p.category}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
         <h2 className="font-display text-lg font-extrabold leading-snug text-navy-800 transition-colors group-hover:text-amber-600">
          {p.title}
         </h2>
         <p className="mt-2 flex-1 text-[14px] leading-relaxed text-navy-500">{p.excerpt}</p>
         <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-navy-100 pt-4 text-[11.5px] font-bold text-navy-400">
          <span className="inline-flex items-center gap-1.5">
           <CalendarDays className="h-3.5 w-3.5" /> {p.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
           <Clock3 className="h-3.5 w-3.5" /> {p.readTime} min
          </span>
         </div>
         <p className="mt-3 text-[12.5px] font-extrabold text-navy-600">By {p.author}</p>
         <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-extrabold text-amber-600">
          Read article <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
         </span>
        </div>
       </motion.article>
      ))}
     </div>
    </div>
   </section>

   <section className="pb-16">
    <div className="container-tot">
     <Reveal>
      <div className="panel flex flex-col items-center gap-6 bg-gradient-to-br from-lilac via-white to-sky p-8 text-center shadow-clay sm:p-12">
       <ClayIcon name="chat" size={72} />
       <div>
        <h2 className="font-display text-2xl font-extrabold text-navy-800 sm:text-3xl">
         One useful email a month That is it
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-[15px] text-navy-500">
         Study strategy and exam-season reminders for your child&apos;s grade and board.
        </p>
       </div>
       <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row"
       >
        <input
         type="email"
         required
         placeholder="Parent email address"
         className="h-13 flex-1 rounded-full border-2 border-navy-100 bg-white px-5 text-[15px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300"
        />
        <Button type="submit" size="md" className="h-13">Subscribe</Button>
       </form>
      </div>
     </Reveal>
    </div>
   </section>

   {selectedPost && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
     <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="relative h-64 sm:h-80">
       <img src={selectedPost.image || '/napblog.jpeg'} alt={selectedPost.title} className="w-full h-full object-cover rounded-t-3xl" />
       <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 bg-white/50 hover:bg-white/90 p-2 rounded-full backdrop-blur transition">
        <X className="w-5 h-5 text-navy-900" />
       </button>
       <span className={cn('chip absolute left-4 top-4', CAT[selectedPost.accent as keyof typeof CAT])}>{selectedPost.category}</span>
      </div>
      <div className="p-6 sm:p-10">
       <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-navy-800 mb-4">{selectedPost.title}</h2>
       <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-navy-500 mb-8">
        <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {selectedPost.date}</span>
        <span className="flex items-center gap-1.5"><Clock3 className="w-4 h-4" /> {selectedPost.readTime} min read</span>
        <span className="text-amber-600">By {selectedPost.author}</span>
       </div>
       <div className="prose prose-navy max-w-none text-[15px] leading-relaxed">
        <p className="text-lg font-medium text-navy-700 mb-6">{selectedPost.excerpt}</p>
        {selectedPost.content ? (
         <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
        ) : (
         <p>The full blog content will be placed here. You can paste your word file content later.</p>
        )}
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
}
