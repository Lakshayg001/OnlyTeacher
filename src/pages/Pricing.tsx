import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  GraduationCap,
  Lightbulb,
  RefreshCw,
  Sparkles,
  TrendingUp,
  User,
  Users,
  BookOpen,
  Gift,
  Star,
  Award,
  ShieldCheck,
  Shield,
  MessageCircle,
} from 'lucide-react';
import Flag from '@/components/ui/Flag';
import PageHero from '@/components/layout/PageHero';
import { Button, Reveal } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';
import {
  CountryCode,
  PlanType,
  UAECurriculum,
  PRICING_DATA,
  STANDARD_FEATURES,
  FLEXICARRY_FEATURES,
  SubPlan,
  TierCategory,
} from '@/data/pricing';

export default function Pricing() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('AU');
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('flexicarry');
  const [uaeCurriculum, setUaeCurriculum] = useState<UAECurriculum>('international');

  const country = PRICING_DATA[selectedCountry];

  // Determine tiers dynamically based on country and plan type
  let currentTiers: TierCategory[] = [];
  if (selectedCountry === 'AE' && country.uaeCurriculumTiers) {
    currentTiers =
      selectedPlanType === 'flexicarry'
        ? country.uaeCurriculumTiers.flexicarry[uaeCurriculum]
        : country.uaeCurriculumTiers.standard[uaeCurriculum];
  } else {
    currentTiers =
      selectedPlanType === 'flexicarry' ? country.flexiTiers : country.standardTiers;
  }

  const getSubPlanHeaderGradient = (color: SubPlan['color']) => {
    switch (color) {
      case 'amber':
        return 'bg-gradient-to-r from-[#F07C00] via-[#E06A00] to-[#C95900] text-white shadow-sm';
      case 'sky':
        return 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-sm';
      case 'emerald':
        return 'bg-gradient-to-r from-[#16A34A] via-[#15803D] to-[#166534] text-white shadow-sm';
      default:
        return 'bg-navy-700 text-white';
    }
  };

  const getSubPlanBorderColor = (color: SubPlan['color']) => {
    switch (color) {
      case 'amber':
        return 'border-[#F07C00]/40 hover:border-[#F07C00] shadow-[0_4px_20px_rgba(240,124,0,0.07)]';
      case 'sky':
        return 'border-[#0284C7]/40 hover:border-[#0284C7] shadow-[0_4px_20px_rgba(2,132,199,0.08)]';
      case 'emerald':
        return 'border-[#16A34A]/40 hover:border-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.07)]';
      default:
        return 'border-navy-200';
    }
  };

  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Transparent & Flexible Tuition"
        title="More Learning."
        accent="Total Transparency."
        sub="Choose between our flexible TriOrbit packages or our flagship FlexiCarry long-term learning plan. Available across Australia, the UK, and UAE."
        icons={['math', 'science', 'technology']}
        compact
      />

      <section className="relative overflow-hidden py-8 sm:py-14 bg-gradient-to-b from-white via-cloud to-white">
        <div className="container-tot">
          {/* Controls Bar: Country Switcher & Plan Switcher */}
          <div className="mb-8 flex flex-col items-center justify-between gap-6 rounded-3xl border border-navy-100 bg-white/90 p-4 shadow-clay backdrop-blur-md lg:flex-row lg:p-6">
            {/* Country Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(['AU', 'GB', 'AE'] as CountryCode[]).map((cCode) => {
                const cData = PRICING_DATA[cCode];
                const isActive = selectedCountry === cCode;
                return (
                  <button
                    key={cCode}
                    onClick={() => setSelectedCountry(cCode)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200',
                      isActive
                        ? 'bg-navy-800 text-white shadow-clay-navy scale-102 ring-2 ring-amber-400'
                        : 'bg-navy-50/70 text-navy-700 hover:bg-navy-100/70 hover:text-navy-900',
                    )}
                  >
                    <Flag code={cData.flagCode} size={20} />
                    <span>{cData.countryName}</span>
                  </button>
                );
              })}
            </div>

            {/* Plan Type Selector */}
            <div className="inline-flex rounded-2xl border-2 border-navy-100 bg-navy-50/60 p-1 shadow-inner">
              <button
                onClick={() => setSelectedPlanType('standard')}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition-all duration-200',
                  selectedPlanType === 'standard'
                    ? 'bg-white text-navy-800 shadow-md ring-1 ring-black/5'
                    : 'text-navy-500 hover:text-navy-800',
                )}
              >
                <Award className="h-4 w-4 text-amber-500" />
                <span>TriOrbit</span>
              </button>
              <button
                onClick={() => setSelectedPlanType('flexicarry')}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition-all duration-200',
                  selectedPlanType === 'flexicarry'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-navy-500 hover:text-navy-800',
                )}
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span>FlexiCarry</span>
              </button>
            </div>
          </div>

          {/* UAE Curriculum Sub-Switcher (when UAE is selected) */}
          {selectedCountry === 'AE' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 rounded-2xl border border-navy-200 bg-white p-3 shadow-sm"
            >
              <span className="text-xs font-black uppercase tracking-wider text-navy-500">
                UAE Curriculum Track:
              </span>
              <div className="inline-flex rounded-xl bg-navy-50 p-1">
                <button
                  onClick={() => setUaeCurriculum('international')}
                  className={cn(
                    'rounded-lg px-4 py-1.5 text-xs font-black transition-all',
                    uaeCurriculum === 'international'
                      ? 'bg-navy-800 text-white shadow-sm'
                      : 'text-navy-600 hover:text-navy-900',
                  )}
                >
                  IB / British / American Curriculum
                </button>
                <button
                  onClick={() => setUaeCurriculum('indian')}
                  className={cn(
                    'rounded-lg px-4 py-1.5 text-xs font-black transition-all',
                    uaeCurriculum === 'indian'
                      ? 'bg-navy-800 text-white shadow-sm'
                      : 'text-navy-600 hover:text-navy-900',
                  )}
                >
                  ICSE / CBSE Curriculum
                </button>
              </div>
            </motion.div>
          )}

          {/* Dynamic Hero Promo Header (matches reference image banners) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCountry}-${selectedPlanType}-${selectedCountry === 'AE' ? uaeCurriculum : ''}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative mb-12 overflow-hidden rounded-4xl border border-navy-100 bg-white p-6 shadow-clay-lg md:p-8 lg:p-10"
            >
              {/* Soft decorative background tint */}
              <div
                className={cn(
                  'pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl opacity-40',
                  selectedPlanType === 'flexicarry' ? 'bg-amber-300' : 'bg-[#0284C7]/20',
                )}
              />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-navy-100 blur-3xl opacity-50" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Country Pill badge with flag */}
                <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-navy-200/80 bg-navy-50/80 px-4 py-1.5 shadow-sm">
                  <Flag code={country.flagCode} size={18} />
                  <span className="text-xs font-black uppercase tracking-wider text-navy-700">
                    {country.countryName} ·{' '}
                    {selectedPlanType === 'flexicarry' ? 'FlexiCarry' : 'TriOrbit'}
                    {selectedCountry === 'AE' &&
                      ` (${uaeCurriculum === 'international' ? 'IB/British/American' : 'ICSE/CBSE'})`}
                  </span>
                </div>

                {selectedPlanType === 'flexicarry' ? (
                  <>
                    <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-800 sm:text-4xl md:text-5xl lg:text-6xl">
                      {selectedCountry === 'GB' ? (
                        <>
                          CONSISTENT LEARNING.{' '}
                          <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                            LASTING VALUE.
                          </span>
                        </>
                      ) : (
                        <>
                          INTRODUCING{' '}
                          <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                            FLEXICARRY
                          </span>
                        </>
                      )}
                    </h1>
                    <p className="mt-2 text-lg font-extrabold text-navy-600 sm:text-xl md:text-2xl">
                      {country.flexiSubtitle}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm font-medium text-navy-500 sm:text-base">
                      {country.flexiDescription}
                    </p>

                    {/* Highlight Sessions Box (from reference) */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50/70 px-5 py-3.5 shadow-sm sm:gap-6">
                      <div className="flex items-center gap-2 font-display text-xl font-black text-navy-800 sm:text-2xl">
                        <Calendar className="h-6 w-6 text-amber-500 shrink-0" />
                        <span>
                          {selectedCountry === 'GB' ? (
                            '96 LEARNING SESSIONS'
                          ) : (
                            <>
                              96 + <span className="text-amber-600">4 FREE</span> SESSIONS
                            </>
                          )}
                        </span>
                      </div>
                      <div className="hidden h-6 w-px bg-amber-300 sm:block" />
                      <div className="text-xs sm:text-sm font-extrabold text-navy-700">
                        {selectedCountry === 'GB'
                          ? 'Carry-Forward Flexibility | Price Protection'
                          : '100 Learning Sessions. One Consistent Learning Journey.'}
                      </div>
                      <div className="hidden h-6 w-px bg-amber-300 sm:block" />
                      <div className="flex items-center gap-2 text-xs font-bold text-navy-600">
                        <Flag code={country.flagCode} size={18} />
                        <span>{country.countryName}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-800 sm:text-4xl md:text-5xl lg:text-6xl">
                      {selectedCountry === 'AE' ? (
                        <>
                          FIND THE RIGHT{' '}
                          <span className="text-amber-600">LEARNING PLAN</span> FOR YOUR CHILD
                        </>
                      ) : (
                        <>
                          <span className="text-amber-600">{country.countryName.toUpperCase()}</span>{' '}
                          ONLINE TUITION PLANS
                        </>
                      )}
                    </h1>
                    <p className="mt-2 text-lg font-extrabold text-navy-600 sm:text-xl md:text-2xl">
                      {country.standardSubtitle}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-[#0284C7]/30 bg-[#0284C7]/10 px-5 py-2.5 text-xs font-bold text-[#0369A1] sm:text-sm">
                      <Sparkles className="h-4 w-4 text-[#0284C7] shrink-0" />
                      <span>{country.standardBanner}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tier Grid Categories */}
          <div className="space-y-12">
            {currentTiers.map((tier, idx) => (
              <Reveal key={tier.id} delay={idx * 0.1}>
                <div className="rounded-4xl border border-navy-100 bg-white p-5 shadow-clay md:p-8">
                  {/* Category Header */}
                  <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-navy-800 px-6 py-4.5 text-white shadow-clay-navy md:flex-row md:items-center">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                        {tier.icon === 'book' && <BookOpen className="h-6 w-6" />}
                        {tier.icon === 'graduation' && <GraduationCap className="h-6 w-6" />}
                        {tier.icon === 'chart' && <TrendingUp className="h-6 w-6" />}
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
                          {tier.title}{' '}
                          <span className="text-amber-400 font-extrabold">| {tier.years}</span>
                        </h2>
                        <p className="text-xs font-medium text-navy-200 sm:text-sm">
                          {tier.blurb}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-navy-200">
                      {tier.plans.length} Learning Formats
                    </div>
                  </div>

                  {/* Sub-Plans Cards: Alpha, Horizon, Apex */}
                  <div
                    className={cn(
                      'grid gap-6',
                      tier.plans.length === 2
                        ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                        : 'grid-cols-1 md:grid-cols-3',
                    )}
                  >
                    {tier.plans.map((plan) => {
                      const isFlexi = selectedPlanType === 'flexicarry';

                      return (
                        <div
                          key={plan.id}
                          className={cn(
                            'group flex flex-col justify-between overflow-hidden rounded-3xl border-2 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg',
                            getSubPlanBorderColor(plan.color),
                          )}
                        >
                          {/* Plan Card Header */}
                          <div>
                            <div className={cn('p-4 text-center', getSubPlanHeaderGradient(plan.color))}>
                              <div className="inline-flex items-center gap-1.5 font-display text-lg font-black tracking-wider uppercase">
                                {plan.icon === 'user' && <User className="h-5 w-5" />}
                                {plan.icon === 'users' && <Users className="h-5 w-5" />}
                                {plan.icon === 'group' && <Users className="h-5 w-5" />}
                                <span>{plan.name}</span>
                              </div>
                              <div className="text-[11px] font-black uppercase tracking-widest text-white/90">
                                {plan.tagline}
                              </div>
                            </div>

                            <div className="p-5">
                              {/* Short description */}
                              <p className="mb-4 min-h-[38px] text-center text-xs font-semibold leading-relaxed text-navy-600">
                                {plan.blurb}
                              </p>

                              {isFlexi ? (
                                /* FLEXICARRY VIEW */
                                <div className="space-y-3 rounded-2xl bg-navy-50/60 p-4 text-center border border-navy-100">
                                  <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-800">
                                    {plan.flexiSessions || '96 + 4 FREE SESSIONS'}
                                  </div>

                                  {plan.flexiPerSessionRate && (
                                    <div className="text-xs font-bold text-navy-600">
                                      Rate: <span className="font-extrabold text-navy-800">{plan.flexiPerSessionRate}</span>
                                    </div>
                                  )}

                                  <div>
                                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-navy-400">
                                      Total Package Price
                                    </div>
                                    <div className="mt-1 font-display text-3xl font-black text-navy-800 sm:text-4xl">
                                      {plan.flexiPrice}
                                    </div>
                                    <div className="mt-1 text-[11px] font-bold text-forest-600 flex items-center justify-center gap-1">
                                      <Check className="h-3.5 w-3.5" /> Eligible Unused Sessions Carry Forward
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                /* STANDARD TUITION VIEW */
                                <div className="space-y-3">
                                  {/* Standard Hourly Rate if available */}
                                  {plan.standardRate && (
                                    <div className="flex items-center justify-between rounded-xl bg-navy-50 px-3.5 py-2">
                                      <span className="text-xs font-bold text-navy-500 uppercase tracking-wider">
                                        Standard Rate:
                                      </span>
                                      <span className="font-display text-base font-black text-navy-800">
                                        {plan.standardRate}
                                      </span>
                                    </div>
                                  )}

                                  {/* Packages */}
                                  <div className="space-y-2">
                                    {plan.standardPackages?.map((pkg, i) => (
                                      <div
                                        key={i}
                                        className={cn(
                                          'relative flex items-center justify-between rounded-2xl border p-3.5 transition-colors',
                                          pkg.popular
                                            ? 'border-amber-300 bg-amber-50/50'
                                            : 'border-navy-100 bg-white hover:border-navy-200',
                                        )}
                                      >
                                        {pkg.popular && (
                                          <span className="absolute -top-2.5 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                                            Popular
                                          </span>
                                        )}
                                        <div>
                                          <div className="text-xs font-extrabold text-navy-700">
                                            {pkg.sessions}
                                          </div>
                                          <div className="text-[10px] text-navy-400">
                                            Live One-to-One / Group Tuition
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-display text-lg font-black text-navy-800">
                                            {pkg.totalPrice}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Guarantee Bullet Points */}
                              <ul className="mt-5 space-y-2 border-t border-navy-100 pt-4 text-xs font-medium text-navy-600">
                                <li className="flex items-center gap-2">
                                  <Check className="h-3.5 w-3.5 text-forest-500 shrink-0" />
                                  <span>Dedicated specialist matched tutor</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Check className="h-3.5 w-3.5 text-forest-500 shrink-0" />
                                  <span>Customised syllabus & school homework help</span>
                                </li>
                                {isFlexi && (
                                  <li className="flex items-center gap-2 text-amber-700 font-bold">
                                    <RefreshCw className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                    <span>Session carry-forward eligible</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Card Footer Button */}
                          <div className="p-5 pt-0">
                            <Button
                              to={`/contact?country=${encodeURIComponent(country.countryName)}&plan=${plan.name}&type=${selectedPlanType}`}
                              variant={plan.color === 'amber' ? 'primary' : 'outline'}
                              full
                              size="sm"
                              className={cn(
                                'w-full text-xs font-extrabold transition-all duration-200',
                                plan.color === 'sky' &&
                                  'hover:border-[#0284C7] hover:text-[#0284C7] hover:bg-[#0284C7]/5',
                                plan.color === 'emerald' &&
                                  'hover:border-[#16A34A] hover:text-[#16A34A] hover:bg-[#16A34A]/5',
                              )}
                            >
                              Book a Free Trial Class
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Note for ICSE/CBSE mapping */}
                  {selectedCountry === 'AE' && uaeCurriculum === 'indian' && (
                    <div className="mt-4 rounded-xl bg-amber-50/70 border border-amber-200 p-3 text-center text-xs font-semibold text-amber-900">
                      ℹ️ Academic level mapping for ICSE / CBSE packages is to be confirmed.
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Highlights & Guarantees section (from reference footer icons) */}
          <div className="mt-16 rounded-4xl border border-navy-100 bg-white p-6 shadow-clay md:p-10">
            <div className="mb-8 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                {selectedPlanType === 'flexicarry' ? 'FLEXICARRY ADVANTAGES' : 'WHY PARENTS CHOOSE TOT'}
              </span>
              <h2 className="mt-1 font-display text-2xl font-black text-navy-800 sm:text-3xl">
                {selectedPlanType === 'flexicarry'
                  ? 'Built For Continuity, Flexibility & Real Academic Growth'
                  : 'Personalised Learning Designed Around Your Child'}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(selectedPlanType === 'flexicarry' ? FLEXICARRY_FEATURES : STANDARD_FEATURES).map(
                (feat, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 rounded-2xl border border-navy-100 bg-navy-50/40 p-4.5 transition-all hover:bg-white hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      {feat.icon === 'calendar' && <Calendar className="h-5 w-5" />}
                      {feat.icon === 'clock' && <Clock className="h-5 w-5" />}
                      {feat.icon === 'refresh' && <RefreshCw className="h-5 w-5" />}
                      {feat.icon === 'user' && <User className="h-5 w-5" />}
                      {feat.icon === 'users' && <Users className="h-5 w-5" />}
                      {feat.icon === 'group' && <Users className="h-5 w-5" />}
                      {feat.icon === 'lightbulb' && <Lightbulb className="h-5 w-5" />}
                      {feat.icon === 'gift' && <Gift className="h-5 w-5" />}
                      {feat.icon === 'book' && <BookOpen className="h-5 w-5" />}
                      {feat.icon === 'star' && <Star className="h-5 w-5" />}
                      {feat.icon === 'shield' && <Shield className="h-5 w-5" />}
                    </div>
                    <h3 className="font-display text-base font-bold text-navy-800">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-medium leading-relaxed text-navy-600">
                      {feat.desc}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Bottom Call to Action Banner (matches the reference bottom banner) */}
          <div className="mt-12 overflow-hidden rounded-4xl bg-navy-800 p-8 text-white shadow-clay-navy md:p-12">
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300">
                  Zero Obligation Free Trial
                </span>
                <h2 className="mt-3 font-display text-2xl font-black uppercase text-white sm:text-3xl md:text-4xl">
                  {selectedPlanType === 'flexicarry' ? (
                    <>
                      MAKE EVERY <span className="text-amber-400">LEARNING SESSION</span> COUNT
                    </>
                  ) : (
                    <>
                      READY TO FIND YOUR CHILD'S{' '}
                      <span className="text-amber-400">LEARNING PLAN?</span>
                    </>
                  )}
                </h2>
                <p className="mt-2 text-sm text-navy-200">
                  Experience a 45-minute live One-to-One diagnostic lesson with our matched subject expert
                  before deciding. No upfront card required.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row shrink-0">
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  iconRight={<ChevronRight className="h-5 w-5" />}
                >
                  Book a Trial Class Today
                </Button>
                {country.supportPhone && (
                  <a
                    href={`https://wa.me/${country.supportPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-forest-400/40 bg-forest-900/40 px-5 py-3 text-xs font-bold text-forest-300 hover:bg-forest-800/60 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-forest-400" />
                    <span>WhatsApp: {country.supportPhone}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-navy-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>The Only Teacher (TOT) · Connect. Learn. Grow.</span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/about" className="hover:text-white transition-colors">About TOT</Link>
                <span>·</span>
                <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
                <span>·</span>
                <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
