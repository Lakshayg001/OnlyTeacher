import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Doodles } from '@/components/ui/Decor';

export default function NotFound() {
  return (
    <section className="relative py-16">
      <div className="container-tot">
        <div className="panel bg-gradient-to-br from-sky via-white to-peach px-6 py-20 text-center shadow-clay">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="wash wash-brand" />
            <Doodles />
          </div>
          <div className="relative flex flex-col items-center">
            <div className="flex gap-4">
              {(['puzzle', 'globe', 'bulb'] as const).map((n, i) => (
                <span key={n} className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
                  <ClayIcon name={n} size={64} />
                </span>
              ))}
            </div>
            <p className="mt-8 font-display text-6xl font-extrabold text-navy-800 sm:text-8xl">404</p>
            <h1 className="mt-3 font-display text-2xl font-extrabold text-navy-800 sm:text-3xl">
              This lesson is not on the timetable.
            </h1>
            <p className="mt-3 max-w-md text-[16px] text-navy-500">
              The page you were looking for has moved or never existed. Let&apos;s get you back to
              something useful.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/" size="lg">Back to home</Button>
              <Button to="/courses" variant="outline" size="lg">Browse courses</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
