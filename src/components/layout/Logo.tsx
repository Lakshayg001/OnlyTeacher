import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({
 className,
 imgClassName,
 to = '/',
}: {
 className?: string;
 imgClassName?: string;
 to?: string;
}) {
 return (
  <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)} aria-label="TOT home">
   <img
    src="/TOT New l.png"
    alt="TOT Logo"
    className={cn('transition-transform duration-300 group-hover:scale-105', imgClassName || 'h-full w-auto object-contain')}
   />
  </Link>
 );
}

export default Logo;
