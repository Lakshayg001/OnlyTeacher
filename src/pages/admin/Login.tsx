import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import ClayIcon from '@/components/clay/ClayIcon';
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/Primitives';
import { Doodles } from '@/components/ui/Decor';

export default function Login() {
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState<string | null>(null);

 return (
  <div className="relative grid min-h-screen lg:grid-cols-2">
   {/* form */}
   <div className="flex items-center justify-center px-6 py-14">
    <motion.div
     initial={{ opacity: 0, y: 18 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
     className="w-full max-w-sm"
    >
     <Logo className="h-24" />

     <h1 className="mt-9 font-display text-3xl font-extrabold leading-tight text-navy-700">
      Welcome back
     </h1>
     <p className="mt-2 text-[15px] text-navy-500">
      Sign in to the TOT operations console.
     </p>

     <form
      className="mt-8 space-y-4"
      onSubmit={async (e) => {
       e.preventDefault();
       setIsSubmitting(true);
       setError(null);
       try {
        const response = await fetch(import.meta.env.PROD ? 'http://13.201.30.247/api/auth/login' : '/api/auth/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username: email, password })
        });
        const data = await response.json();
        if (data.success && data.data?.token) {
         localStorage.setItem('tot_admin_token', data.data.token);
         navigate('/admin');
        } else {
         setError(data.message || 'Login failed');
        }
       } catch (err) {
        console.error(err);
        setError('An error occurred during login.');
       } finally {
        setIsSubmitting(false);
       }
      }}
     >
      <label className="block">
       <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
        Work email
       </span>
       <span className="relative block">
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-navy-300" />
        <input
         type="email"
         required
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="you@tot.education"
         className="h-13 w-full rounded-2xl border-2 border-navy-100 bg-navy-50/50 pl-12 pr-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300 focus:bg-white"
        />
       </span>
      </label>

      <label className="block">
       <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
        Password
       </span>
       <span className="relative block">
        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-navy-300" />
        <input
         type="password"
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="••••••••"
         className="h-13 w-full rounded-2xl border-2 border-navy-100 bg-navy-50/50 pl-12 pr-4 text-[15px] font-semibold text-navy-700 outline-none transition-colors placeholder:font-medium placeholder:text-navy-300 focus:border-amber-300 focus:bg-white"
        />
       </span>
      </label>

      <div className="flex items-center justify-between text-[13px] font-bold">
       <label className="flex items-center gap-2 text-navy-500">
        <input type="checkbox" className="h-4 w-4 rounded border-navy-200 accent-amber-500" />
        Keep me signed in
       </label>
       <button type="button" className="text-amber-600 hover:underline">
        Forgot password?
       </button>
      </div>

      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
      <Button type="submit" size="lg" full iconRight={<ArrowRight className="h-4.5 w-4.5" />} disabled={isSubmitting}>
       {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
     </form>

     <p className="mt-6 text-center text-[12.5px] font-semibold text-navy-400">
      This is a demo console any credentials will sign you in.
     </p>
    </motion.div>
   </div>

   {/* brand side */}
   <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 lg:block">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
     <Doodles className="opacity-30" />
     <div className="wash wash-deep" />
     <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
     <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-forest-500/20 blur-3xl" />
    </div>

    <div className="relative flex h-full flex-col justify-center px-14">
     <div className="flex gap-4">
      {(['math', 'science', 'globe'] as const).map((n, i) => (
       <motion.div
        key={n}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + i * 0.12 }}
        className="animate-float"
        style={{ animationDelay: `${i * 0.9}s` }}
       >
        <ClayIcon name={n} size={64} />
       </motion.div>
      ))}
     </div>

     <h2 className="mt-8 max-w-md font-display text-4xl font-extrabold leading-[1.12] text-white">
      Every Student Deserves the{' '}
      <span className="text-gradient-amber">Best Teacher</span>
     </h2>

    </div>
   </div>
  </div>
 );
}
