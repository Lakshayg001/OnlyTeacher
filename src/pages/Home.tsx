import Hero from '@/components/home/Hero';
import GlobalPresence from '@/components/home/GlobalPresence';
import DemoCta from '@/components/home/DemoCta';
import Manifesto from '@/components/home/Manifesto';
import ExploreCourses from '@/components/home/ExploreCourses';
import BoardsCurricula from '@/components/home/BoardsCurricula';
import DemoPromise from '@/components/home/DemoPromise';
import Faq from '@/components/home/Faq';
import KnowledgeHub from '@/components/home/KnowledgeHub';

export default function Home() {
  return (
    <>
      <Hero />
      <GlobalPresence />
      <DemoCta />
      <Manifesto />
      <ExploreCourses />
      <BoardsCurricula />
      <DemoPromise />
      <Faq />
      <KnowledgeHub />
    </>
  );
}
