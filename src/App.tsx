import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import RouteFallback from '@/components/layout/RouteFallback';

/* The home page ships in the main bundle; everything else loads on demand. */
const About = lazy(() => import('@/pages/About'));
const Courses = lazy(() => import('@/pages/Courses'));
const Teachers = lazy(() => import('@/pages/Teachers'));
const Blog = lazy(() => import('@/pages/Blog'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Bookings = lazy(() => import('@/pages/admin/Bookings'));
const Students = lazy(() => import('@/pages/admin/Students'));
const ManageTeachers = lazy(() => import('@/pages/admin/ManageTeachers'));
const ManageCourses = lazy(() => import('@/pages/admin/ManageCourses'));
const Content = lazy(() => import('@/pages/admin/Content'));
const Reports = lazy(() => import('@/pages/admin/Reports'));
const Settings = lazy(() => import('@/pages/admin/Settings'));
const Login = lazy(() => import('@/pages/admin/Login'));

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public website */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin console */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="content" element={<Content />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
