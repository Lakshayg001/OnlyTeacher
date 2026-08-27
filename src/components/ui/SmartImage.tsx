import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ClayIconName } from '@/types';
import ClayIcon from '@/components/clay/ClayIcon';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Clay icon shown if the photo cannot load. */
  fallbackIcon?: ClayIconName;
  ratio?: string;
  priority?: boolean;
  overlay?: boolean;
}

/**
 * Photography with a graceful, on-brand fallback: if the remote asset is
 * unavailable the tile becomes a soft gradient with a clay illustration,
 * so the layout never shows a broken image.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  fallbackIcon = 'book',
  ratio,
  priority = false,
  overlay = false,
}: SmartImageProps) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

  return (
    <div
      className={cn('relative overflow-hidden bg-navy-50', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* skeleton / fallback bed */}
      <div
        className={cn(
          'absolute inset-0 grid place-items-center bg-gradient-to-br from-sky via-lilac to-peach transition-opacity duration-500',
          state === 'ok' ? 'opacity-0' : 'opacity-100',
        )}
      >
        {state === 'error' ? (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <ClayIcon name={fallbackIcon} size={64} />
            <span className="max-w-[80%] text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400">
              {alt}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        )}
      </div>

      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={cn(
            'h-full w-full object-cover transition-all duration-700',
            state === 'ok' ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
            imgClassName,
          )}
        />
      )}

      {overlay && state === 'ok' && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
      )}
    </div>
  );
}

export default SmartImage;
