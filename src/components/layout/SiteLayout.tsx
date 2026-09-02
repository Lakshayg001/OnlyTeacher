import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollTop from './ScrollTop';
import RouteFallback from './RouteFallback';

export default function SiteLayout() {
 const { pathname } = useLocation();

 useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
 }, [pathname]);

 return (
  <div className="flex min-h-screen flex-col bg-white">
   <Navbar />
   {/* Suspense sits inside the shell so the nav and footer never flash away
     while a route chunk is fetched. */}
   <main className="flex-1">
    <Suspense fallback={<RouteFallback />}>
     <Outlet />
    </Suspense>
   </main>
   <Footer />
   <ScrollTop />
  </div>
 );
}
