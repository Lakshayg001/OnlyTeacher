import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({
 className,
 to = '/',
}: {
 className?: string;
 to?: string;
}) {
 return (
  <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)} aria-label="TOT home">
   <img src="/TOT New l.png" alt="TOT Logo" className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
  </Link>
 );
}

export default Logo;
