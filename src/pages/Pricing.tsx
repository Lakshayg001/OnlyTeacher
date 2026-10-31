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
  Headphones,
  Video,
  FileText,
  BarChart3,
  MessageSquare,
  UserCheck,
  Crown,
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
  MEMBERSHIP_FEATURES,
  UK_MEMBERSHIP_DATA,
  AUNZ_MEMBERSHIP_DATA,
  SubPlan,
  TierCategory,
} from '@/data/pricing';

export default function Pricing() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('AU');
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('flexicarry');
  const [uaeCurriculum, setUaeCurriculum] = useState<UAECurriculum>('international');

  const country = PRICING_DATA[selectedCountry];

  const handleCountryChange = (cCode: CountryCode) => {
    setSelectedCountry(cCode);
    if (cCode === 'AE' && selectedPlanType === 'membership') {
      setSelectedPlanType('flexicarry');
    }
  };

  // Determine tiers dynamically based on country and plan type
  let currentTiers: TierCategory[] = [];
  if (selectedPlanType !== 'membership') {
    if (selectedCountry === 'AE' && country.uaeCurriculumTiers) {
      currentTiers =
        selectedPlanType === 'flexicarry'
          ? country.uaeCurriculumTiers.flexicarry[uaeCurriculum]
          : country.uaeCurriculumTiers.standard[uaeCurriculum];
    } else {
      currentTiers =
        selectedPlanType === 'flexicarry' ? country.flexiTiers : country.standardTiers;
    }
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
        compact
        icons={[]}
        eyebrow={
          <div className="inline-flex items-center justify-center rounded-full border border-amber-200/80 bg-white/90 px-6 py-2 shadow-sm backdrop-blur-sm">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F07C00]">
              TRANSPARENT &amp; FLEXIBLE TUITION
            </span>
          </div>
        }
        title={
          <span className="font-display font-black text-navy-900 tracking-tight leading-[1.12]">
            Global Learning<br />
            <span className="text-[#F07C00]">Made Affordable</span>
          </span>
        }
        sub={
          <div className="space-y-1.5 text-center">
            <p className="font-display text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
              Choose Your Flexibility with <span className="text-[#F07C00] font-black">TriOrbit</span> or
            </p>
            <p className="font-display text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
              Your Long Term Advantage with <span className="text-[#16A34A] font-black">FlexiCarry</span>
            </p>
          </div>
        }
      />

      <section className="relative overflow-hidden py-8 sm:py-14 bg-gradient-to-b from-white via-cloud to-white">
        <div className="container-tot">
          {/* Controls Bar: Country Switcher & Plan Switcher */}
          <div className="mb-8 rounded-3xl border border-navy-100 bg-white/95 p-4 sm:p-5 lg:p-6 shadow-clay backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8">
              {/* Step 1: Choose Your Country */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E97714] text-xs font-black text-white shadow-sm">
                    1
                  </span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy-900">
                    CHOOSE YOUR COUNTRY
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {(['AU', 'GB', 'NZ', 'AE'] as CountryCode[]).map((cCode) => {
                    const cData = PRICING_DATA[cCode];
                    const isActive = selectedCountry === cCode;
                    return (
                      <button
                        key={cCode}
                        onClick={() => handleCountryChange(cCode)}
                        className={cn(
                          'flex items-center gap-2.5 rounded-2xl px-4 sm:px-5 py-2.5 text-sm font-extrabold transition-all duration-200 border-2',
                          isActive
                            ? 'bg-[#112340] text-white border-[#E97714] shadow-clay-navy scale-102'
                            : 'bg-navy-50/70 text-navy-800 border-transparent hover:bg-navy-100/80 hover:text-navy-900',
                        )}
                      >
                        <Flag code={cData.flagCode} size={20} />
                        <span>{cData.countryName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
              <div className="hidden lg:block w-px self-stretch bg-navy-100 my-1" />
              <div className="block lg:hidden h-px w-full bg-navy-100" />

              {/* Step 2: Choose Your Plan */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E97714] text-xs font-black text-white shadow-sm">
                    2
                  </span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy-900">
                    CHOOSE YOUR PLAN
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* TriOrbit Button - Solid Green when active */}
                  <button
                    onClick={() => setSelectedPlanType('standard')}
                    className={cn(
                      'flex items-center gap-2.5 rounded-2xl px-4 sm:px-5 py-2.5 text-sm font-extrabold transition-all duration-200 border-2',
                      selectedPlanType === 'standard'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-md scale-102'
                        : 'bg-navy-50/70 text-navy-800 border-transparent hover:bg-navy-100/80 hover:text-navy-900',
                    )}
                  >
                    <Award
                      className={cn(
                        'h-4.5 w-4.5 transition-colors',
                        selectedPlanType === 'standard' ? 'text-white' : 'text-emerald-600',
                      )}
                    />
                    <span>TriOrbit</span>
                  </button>

                  {/* FlexiCarry Button */}
                  <button
                    onClick={() => setSelectedPlanType('flexicarry')}
                    className={cn(
                      'flex items-center gap-2.5 rounded-2xl px-4 sm:px-5 py-2.5 text-sm font-extrabold transition-all duration-200 border-2',
                      selectedPlanType === 'flexicarry'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400 shadow-clay-amber scale-102'
                        : 'bg-navy-50/70 text-navy-800 border-transparent hover:bg-navy-100/80 hover:text-navy-900',
                    )}
                  >
                    <Sparkles
                      className={cn(
                        'h-4.5 w-4.5 transition-colors',
                        selectedPlanType === 'flexicarry' ? 'text-white' : 'text-[#E97714]',
                      )}
                    />
                    <span>FlexiCarry</span>
                  </button>

                  {/* Membership Button (UK, Australia & New Zealand) */}
                  {(selectedCountry === 'GB' || selectedCountry === 'AU' || selectedCountry === 'NZ') && (
                    <button
                      onClick={() => setSelectedPlanType('membership')}
                      className={cn(
                        'flex items-center gap-2.5 rounded-2xl px-4 sm:px-5 py-2.5 text-sm font-extrabold transition-all duration-200 border-2',
                        selectedPlanType === 'membership'
                          ? 'bg-[#112340] text-white border-amber-400 shadow-clay-navy scale-102'
                          : 'bg-navy-50/70 text-navy-800 border-transparent hover:bg-navy-100/80 hover:text-navy-900',
                      )}
                    >
                      <Crown
                        className={cn(
                          'h-4.5 w-4.5 transition-colors',
                          selectedPlanType === 'membership' ? 'text-amber-400' : 'text-amber-500',
                        )}
                      />
                      <span>Membership</span>
                    </button>
                  )}
                </div>
              </div>
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
                Curriculum Track:
              </span>
              <div className="inline-flex rounded-xl bg-navy-50 p-1">
                <button
                  onClick={() => setUaeCurriculum('international')}
                  className={cn(
                    'rounded-lg px-4 py-2 text-xs sm:text-sm font-black transition-all',
                    uaeCurriculum === 'international'
                      ? 'bg-navy-800 text-white shadow-sm'
                      : 'text-navy-600 hover:text-navy-900',
                  )}
                >
                  Track 1: IB / British / American Curriculum
                </button>
                <button
                  onClick={() => setUaeCurriculum('indian')}
                  className={cn(
                    'rounded-lg px-4 py-2 text-xs sm:text-sm font-black transition-all',
                    uaeCurriculum === 'indian'
                      ? 'bg-navy-800 text-white shadow-sm'
                      : 'text-navy-600 hover:text-navy-900',
                  )}
                >
                  Track 2: ICSE / CBSE Curriculum
                </button>
              </div>
            </motion.div>
          )}

          {/* Dynamic Hero Promo Header (matches reference image banners) - shown for standard & flexicarry */}
          {selectedPlanType !== 'membership' && (
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
                    selectedPlanType === 'flexicarry'
                      ? 'bg-amber-300'
                      : 'bg-amber-300/40',
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full blur-3xl opacity-50',
                    selectedPlanType === 'standard' || (selectedPlanType === 'flexicarry' && selectedCountry === 'GB')
                      ? 'bg-sky/60'
                      : 'bg-navy-100',
                  )}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {selectedPlanType === 'standard' && (selectedCountry === 'AU' || selectedCountry === 'GB' || selectedCountry === 'NZ' || selectedCountry === 'AE') ? (
                    <>
                      {/* Top Eyebrow Badge */}
                      <div className="mb-5 inline-flex items-center justify-center rounded-full border border-amber-200/80 bg-white/90 px-6 py-2 shadow-sm backdrop-blur-sm">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F07C00]">
                          {selectedCountry === 'NZ'
                            ? 'TRANSPARENT & FLEXIBLE TUITION · NEW ZEALAND'
                            : selectedCountry === 'AE'
                            ? `TRANSPARENT & FLEXIBLE TUITION · UAE (${uaeCurriculum === 'international' ? 'TRACK 1: IB / BRITISH / AMERICAN' : 'TRACK 2: ICSE / CBSE'})`
                            : 'TRANSPARENT & FLEXIBLE TUITION'}
                        </span>
                      </div>

                      {/* Main Heading */}
                      {selectedCountry === 'NZ' ? (
                        <>
                          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-[1.12]">
                            Online Tuition for<br />
                            <span className="text-[#F07C00]">New Zealand Students</span>
                          </h1>
                          <div className="mt-4 max-w-3xl mx-auto space-y-2">
                            <p className="text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
                              Personalised Online Tuition for Primary, Intermediate &amp; High School
                            </p>
                            <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-navy-800">
                              NCEA Levels 1–3 <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              Cambridge (CIE) <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              International Baccalaureate (IB)
                            </p>
                          </div>
                        </>
                      ) : selectedCountry === 'AE' ? (
                        <>
                          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-[1.12]">
                            Online Tuition for<br />
                            <span className="text-[#F07C00]">UAE Students</span>
                          </h1>
                          <div className="mt-4 max-w-3xl mx-auto space-y-2">
                            <p className="text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
                              {uaeCurriculum === 'international'
                                ? 'Track 1: IB, British & American Curriculum Excellence'
                                : 'Track 2: Dedicated ICSE & CBSE Curriculum Support'}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-navy-800">
                              Dubai <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              Abu Dhabi <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              Sharjah <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              All Emirates
                            </p>
                          </div>
                        </>
                      ) : selectedCountry === 'AU' ? (
                        <>
                          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-[1.12]">
                            Build Confidence<br />
                            <span className="text-[#F07C00]">Strengthen Knowledge</span><br />
                            and Achieve More
                          </h1>
                          <div className="mt-4 max-w-3xl mx-auto space-y-2">
                            <p className="text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
                              Australian Curriculum Support Kindergarten to Year 12
                            </p>
                            <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-navy-800">
                              ACT <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              NSW <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              NT <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              QLD <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              SA <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              TAS <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              VIC <span className="text-[#F07C00] font-black mx-1.5">•</span>{' '}
                              WA
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-[1.12]">
                            Build Confidence<br />
                            <span className="text-[#F07C00]">Strengthen Knowledge</span><br />
                            and Achieve More
                          </h1>
                          <p className="mt-4 text-base sm:text-lg md:text-xl font-bold text-navy-800 max-w-3xl mx-auto leading-relaxed">
                            Online Tuition Designed for KS1 to KS5 GCSE and A Level Excellence
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* FlexiCarry for AU, GB, NZ and AE */}
                      {(selectedCountry === 'NZ' || selectedCountry === 'AE') && (
                        <div className="mb-4 inline-flex items-center justify-center rounded-full border border-amber-200/80 bg-white/90 px-6 py-2 shadow-sm backdrop-blur-sm">
                          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F07C00]">
                            {selectedCountry === 'NZ'
                              ? 'ONLINE TUITION FOR NEW ZEALAND STUDENTS · FLEXICARRY'
                              : `ONLINE TUITION FOR UAE STUDENTS · FLEXICARRY (${uaeCurriculum === 'international' ? 'TRACK 1' : 'TRACK 2'})`}
                          </span>
                        </div>
                      )}
                      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-tight">
                        96 Sessions One Smarter Learning{' '}
                        <span className="text-[#F07C00]">Journey</span>
                      </h1>

                      <div className="mt-4 max-w-3xl mx-auto space-y-1.5">
                        <p className="text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
                          Plan ahead for the current term and enjoy the benefit of eligible unused sessions carried forward to the next term
                        </p>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-navy-800 leading-relaxed">
                          Explore multiple subjects with one convenient learning plan
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Main Content Area: Membership View (UK / AU / NZ) OR Tier Grid Categories */}
          {selectedPlanType === 'membership' && (selectedCountry === 'GB' || selectedCountry === 'AU' || selectedCountry === 'NZ') ? (
            selectedCountry === 'GB' ? (
              <div className="space-y-10">
                {/* Membership Top Promo Card - in clean text form matching other cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-4xl border border-navy-100 bg-white p-8 sm:p-12 lg:p-14 shadow-clay-lg text-center"
                >
                  {/* Decorative background glow blobs */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
                  <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-navy-200/40 blur-3xl" />

                  <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                    {/* Brand Title: TOT Privé */}
                    <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-none">
                      TOT <span className="text-[#F07C00]">Privé</span>
                    </h1>

                    {/* Subtitle: A Little More for Your Learning Journey. */}
                    <h2 className="mt-4 font-display text-xl sm:text-2xl lg:text-3xl font-black text-navy-900 tracking-tight">
                      <span className="text-[#F07C00]">A Little More</span> for Your Learning Journey.
                    </h2>

                    {/* Description text */}
                    <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg font-medium text-navy-600 leading-relaxed">
                      Extra focus and support, along with exclusive benefits, delivered at affordable prices.
                    </p>

                    {/* Limited Membership Available Pill Badge */}
                    <div className="mt-7">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#F07C00] px-7 py-3 text-sm sm:text-base font-black text-white shadow-clay-amber transition-transform hover:scale-102 cursor-default">
                        Limited Membership Available.
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Main Membership Showcase Card - Exactly matching Image 1 with TOT Circle -> TOT Privé */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="relative overflow-hidden rounded-4xl border-2 border-navy-100 bg-white p-6 sm:p-10 lg:p-12 shadow-clay-lg"
                >
                  {/* Top Row: Eyebrow + Title (left) & Logo (right) */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-navy-100 pb-8">
                    <div>
                      <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#F07C00]">
                        {UK_MEMBERSHIP_DATA.eyebrow}
                      </span>
                      <h1 className="mt-1 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-900">
                        {UK_MEMBERSHIP_DATA.brandTitle}
                      </h1>
                    </div>
                    <div className="shrink-0 pt-1">
                      <img
                        src="/TOT New l.png"
                        alt="The Only Teacher - Connect. Learn. Grow."
                        className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* TOP: Two Price Cards Side by Side */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* Card 1: Years 2-9 */}
                    <div className="relative flex flex-col justify-between rounded-3xl bg-[#08214D] p-6 sm:p-8 text-white shadow-clay-navy border-2 border-amber-500/30">
                      <div>
                        {/* Header: "15-WEEK MEMBERSHIP" */}
                        <div className="text-center">
                          <span className="inline-block rounded-full bg-[#F07C00] px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-sm">
                            15-WEEK MEMBERSHIP
                          </span>
                        </div>

                        {/* Struck price £99 with the label "TOT Priority Offer" */}
                        <div className="mt-5 flex items-center justify-center gap-3 text-sm sm:text-base font-black">
                          <span className="text-white/60 line-through text-lg sm:text-xl font-bold">
                            £99
                          </span>
                          <span className="text-white/30 font-normal">|</span>
                          <span className="text-[#F07C00] tracking-wider uppercase font-black">
                            TOT Priority Offer
                          </span>
                        </div>

                        {/* Price Body: Years 2-9: £65 for 15 weeks */}
                        <div className="mt-6 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
                          <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy-900">
                            YEARS 2–9
                          </div>
                          <div className="my-2 font-display text-5xl sm:text-6xl font-black tracking-tight text-[#F07C00]">
                            £65
                          </div>
                          <div className="text-sm sm:text-base font-extrabold text-navy-800">
                            for 15 weeks
                          </div>
                        </div>
                      </div>

                      {/* Note: "Limited availability: 50 families per tier" & Button */}
                      <div className="mt-6 pt-2 text-center">
                        <p className="text-xs sm:text-sm font-bold text-[#F07C00]">
                          Limited availability: 50 families per tier
                        </p>
                        <Button
                          to="/contact?country=United%20Kingdom&plan=TOT%20Priv%C3%A9%20(Years%202-9)&type=membership"
                          variant="primary"
                          full
                          size="md"
                          className="mt-4 bg-[#F07C00] hover:bg-[#d96e00] text-white font-black text-sm shadow-md"
                        >
                          Enquire for TOT Privé (Years 2–9)
                        </Button>
                        <p className="mt-2.5 text-center text-[10px] font-semibold text-white/60 select-none">
                          *Terms and conditions apply
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Years 10-13 */}
                    <div className="relative flex flex-col justify-between rounded-3xl bg-[#08214D] p-6 sm:p-8 text-white shadow-clay-navy border-2 border-emerald-500/30">
                      <div>
                        {/* Header: "15-WEEK MEMBERSHIP" */}
                        <div className="text-center">
                          <span className="inline-block rounded-full bg-[#16A34A] px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-sm">
                            15-WEEK MEMBERSHIP
                          </span>
                        </div>

                        {/* Struck price £99 with the label "TOT Priority Offer" */}
                        <div className="mt-5 flex items-center justify-center gap-3 text-sm sm:text-base font-black">
                          <span className="text-white/60 line-through text-lg sm:text-xl font-bold">
                            £99
                          </span>
                          <span className="text-white/30 font-normal">|</span>
                          <span className="text-emerald-400 tracking-wider uppercase font-black">
                            TOT Priority Offer
                          </span>
                        </div>

                        {/* Price Body: Years 10-13: £75 for 15 weeks */}
                        <div className="mt-6 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
                          <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy-900">
                            YEARS 10–13
                          </div>
                          <div className="my-2 font-display text-5xl sm:text-6xl font-black tracking-tight text-[#16A34A]">
                            £75
                          </div>
                          <div className="text-sm sm:text-base font-extrabold text-navy-800">
                            for 15 weeks
                          </div>
                        </div>
                      </div>

                      {/* Note: "Limited availability: 50 families per tier" & Button */}
                      <div className="mt-6 pt-2 text-center">
                        <p className="text-xs sm:text-sm font-bold text-emerald-400">
                          Limited availability: 50 families per tier
                        </p>
                        <Button
                          to="/contact?country=United%20Kingdom&plan=TOT%20Priv%C3%A9%20(Years%2010-13)&type=membership"
                          variant="primary"
                          full
                          size="md"
                          className="mt-4 bg-[#16A34A] hover:bg-[#13823b] text-white font-black text-sm shadow-md"
                        >
                          Enquire for TOT Privé (Years 10–13)
                        </Button>
                        <p className="mt-2.5 text-center text-[10px] font-semibold text-white/60 select-none">
                          *Terms and conditions apply
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BELOW: One Benefits Card */}
                  <div className="mt-10 rounded-3xl border-2 border-navy-100 bg-white p-6 sm:p-8 lg:p-10 shadow-clay">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-100 pb-6">
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-navy-900">
                          {UK_MEMBERSHIP_DATA.includedHeading}
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-navy-600">
                          Comprehensive academic support and priority privileges included across both membership tiers.
                        </p>
                      </div>
                      <span className="rounded-full bg-navy-100 px-3.5 py-1.5 text-xs font-black text-navy-700 tracking-wider">
                        T&amp;C apply
                      </span>
                    </div>

                    {/* Exact List of 8 Benefits */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {UK_MEMBERSHIP_DATA.benefits.map((benefit, idx) => {
                        const isAmber = benefit.color === 'amber';
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3.5 rounded-2xl border border-navy-100 bg-navy-50/30 p-4 sm:p-4.5 shadow-sm hover:border-navy-200 hover:shadow-md transition-all"
                          >
                            <div
                              className={cn(
                                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm',
                                isAmber ? 'bg-[#F07C00]' : 'bg-[#16A34A]',
                              )}
                            >
                              {benefit.icon === 'headphones' && <Headphones className="h-6 w-6" />}
                              {benefit.icon === 'workshop' && <Video className="h-6 w-6" />}
                              {benefit.icon === 'calendar' && <Calendar className="h-6 w-6" />}
                              {benefit.icon === 'reports' && <BarChart3 className="h-6 w-6" />}
                              {benefit.icon === 'plan' && <FileText className="h-6 w-6" />}
                              {benefit.icon === 'teacher' && <UserCheck className="h-6 w-6" />}
                              {benefit.icon === 'message' && <MessageSquare className="h-6 w-6" />}
                              {benefit.icon === 'star' && <Star className="h-6 w-6 fill-white" />}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-base font-extrabold text-navy-900 leading-snug">
                                {benefit.title}
                              </h3>
                              <p className="mt-1 text-xs sm:text-sm font-semibold text-navy-600 leading-relaxed">
                                {benefit.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Reassurance Card with T&C apply */}
                    <div className="mt-8 rounded-2xl bg-navy-50/70 border border-navy-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-navy-800">
                            Guaranteed Teacher Continuity
                          </div>
                          <div className="text-[11px] text-navy-500 font-medium">
                            Dedicated educator assigned throughout your 15-week journey.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-navy-500">
                          * T&amp;C apply
                        </span>
                        <Link
                          to="/contact?country=United%20Kingdom&plan=TOT%20Priv%C3%A9&type=membership"
                          className="text-xs font-black text-amber-600 hover:text-amber-700 underline shrink-0"
                        >
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Footer line */}
                  <div className="mt-10 border-t border-navy-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-navy-500 font-medium">
                    <p>{UK_MEMBERSHIP_DATA.footerTagline} · <span className="font-bold text-navy-700">T&amp;C apply</span></p>
                    <div className="flex items-center gap-2 text-navy-600 font-bold">
                      <Flag code="GB" size={16} />
                      <span>Exclusive to United Kingdom Families · T&amp;C apply</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* AUSTRALIA & NEW ZEALAND MEMBERSHIP VIEW (Item 6 format) */
              <div className="space-y-10">
                {/* AU/NZ Top Promo Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-4xl border border-navy-100 bg-white p-8 sm:p-12 lg:p-14 shadow-clay-lg text-center"
                >
                  {/* Decorative background glow blobs */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
                  <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-navy-200/40 blur-3xl" />

                  <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                    {/* Active Country Pill */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-50/90 border border-navy-200/80 px-4 py-1.5 text-xs font-black text-navy-800 shadow-xs">
                      <Flag code={selectedCountry === 'NZ' ? 'NZ' : 'AU'} size={16} />
                      <span>{selectedCountry === 'NZ' ? 'New Zealand (NZ$)' : 'Australia (A$)'}</span>
                    </div>

                    {/* Brand Title: TOT Privé */}
                    <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 leading-none">
                      TOT <span className="text-[#F07C00]">Privé</span>
                    </h1>

                    {/* Subtitle: Country-Specific Membership Plan */}
                    <div className="mt-3 text-xs sm:text-sm font-black uppercase tracking-widest text-[#F07C00]">
                      TOT Privé - Membership Plan, {selectedCountry === 'NZ' ? 'New Zealand' : 'Australia'}
                    </div>

                    {/* Tagline: A Little More for Your Learning Journey. */}
                    <h2 className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-black text-navy-900 tracking-tight">
                      <span className="text-[#F07C00]">A Little More</span> for Your Learning Journey.
                    </h2>

                    {/* Description text */}
                    <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg font-medium text-navy-600 leading-relaxed">
                      {AUNZ_MEMBERSHIP_DATA.description}
                    </p>

                    {/* Launch Notice Pill */}
                    <div className="mt-7">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#F07C00] px-6 sm:px-8 py-3 text-xs sm:text-sm font-black text-white shadow-clay-amber transition-transform hover:scale-102 cursor-default text-center">
                        {AUNZ_MEMBERSHIP_DATA.launchNotice}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Main Membership Showcase Card - Two Price Cards Top, Benefits Card Below, Terms Apply */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="relative overflow-hidden rounded-4xl border-2 border-navy-100 bg-white p-6 sm:p-10 lg:p-12 shadow-clay-lg"
                >
                  {/* Top Row: Eyebrow + Title (left) & Logo + Region toggle (right) */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-navy-100 pb-8">
                    <div>
                      <div className="flex items-center gap-2">
                        <Flag code={selectedCountry === 'NZ' ? 'NZ' : 'AU'} size={20} />
                        <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#F07C00]">
                          {selectedCountry === 'NZ'
                            ? AUNZ_MEMBERSHIP_DATA.regions.NZ.eyebrow
                            : AUNZ_MEMBERSHIP_DATA.regions.AU.eyebrow}
                        </span>
                      </div>
                      <h1 className="mt-1 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-900">
                        TOT Privé
                      </h1>
                      <p className="mt-1 text-sm sm:text-base font-extrabold text-navy-600">
                        {AUNZ_MEMBERSHIP_DATA.tagline}
                      </p>
                    </div>
                    <div className="shrink-0 pt-1">
                      <img
                        src="/TOT New l.png"
                        alt="The Only Teacher - Connect. Learn. Grow."
                        className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* TOP: Two Price Cards Side by Side */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* Card 1: Years 1–6 */}
                    {(() => {
                      const rData =
                        selectedCountry === 'NZ'
                          ? AUNZ_MEMBERSHIP_DATA.regions.NZ
                          : AUNZ_MEMBERSHIP_DATA.regions.AU;
                      const tier1 = rData.tiers[0];
                      const countryName =
                        selectedCountry === 'NZ' ? 'New Zealand' : 'Australia';
                      return (
                        <div className="relative flex flex-col justify-between rounded-3xl bg-[#08214D] p-6 sm:p-8 text-white shadow-clay-navy border-2 border-amber-500/30">
                          <div>
                            {/* Header: "15-WEEK MEMBERSHIP" */}
                            <div className="text-center">
                              <span className="inline-block rounded-full bg-[#F07C00] px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-sm">
                                {AUNZ_MEMBERSHIP_DATA.durationBadge}
                              </span>
                            </div>

                            {/* Struck regular price with Launch Price tag */}
                            <div className="mt-5 flex items-center justify-center gap-3 text-sm sm:text-base font-black">
                              <span className="text-white/60 line-through text-lg sm:text-xl font-bold">
                                {tier1.regularPrice}
                              </span>
                              <span className="text-white/30 font-normal">|</span>
                              <span className="text-[#F07C00] tracking-wider uppercase font-black">
                                Launch Price
                              </span>
                            </div>

                            {/* Price Body: Years 1–6 */}
                            <div className="mt-6 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy-900">
                                {tier1.years}
                              </div>
                              <div className="my-2 font-display text-5xl sm:text-6xl font-black tracking-tight text-[#F07C00]">
                                {tier1.price}
                              </div>
                              <div className="text-sm sm:text-base font-extrabold text-navy-800">
                                {tier1.duration}
                              </div>
                            </div>
                          </div>

                          {/* Note: "Limited availability: 50 families per tier" & Button */}
                          <div className="mt-6 pt-2 text-center">
                            <p className="text-xs sm:text-sm font-bold text-[#F07C00]">
                              {AUNZ_MEMBERSHIP_DATA.availabilityNote}
                            </p>
                            <Button
                              to={`/contact?country=${encodeURIComponent(countryName)}&plan=TOT%20Priv%C3%A9%20(Years%201-6)&type=membership`}
                              variant="primary"
                              full
                              size="md"
                              className="mt-4 bg-[#F07C00] hover:bg-[#d96e00] text-white font-black text-sm shadow-md"
                            >
                              Enquire for TOT Privé (Years 1–6)
                            </Button>
                            <p className="mt-2.5 text-center text-[10px] font-semibold text-white/60 select-none">
                              *Terms and conditions apply
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Card 2: Years 7–12 */}
                    {(() => {
                      const rData =
                        selectedCountry === 'NZ'
                          ? AUNZ_MEMBERSHIP_DATA.regions.NZ
                          : AUNZ_MEMBERSHIP_DATA.regions.AU;
                      const tier2 = rData.tiers[1];
                      const countryName =
                        selectedCountry === 'NZ' ? 'New Zealand' : 'Australia';
                      return (
                        <div className="relative flex flex-col justify-between rounded-3xl bg-[#08214D] p-6 sm:p-8 text-white shadow-clay-navy border-2 border-emerald-500/30">
                          <div>
                            {/* Header: "15-WEEK MEMBERSHIP" */}
                            <div className="text-center">
                              <span className="inline-block rounded-full bg-[#16A34A] px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-sm">
                                {AUNZ_MEMBERSHIP_DATA.durationBadge}
                              </span>
                            </div>

                            {/* Struck regular price with Launch Price tag */}
                            <div className="mt-5 flex items-center justify-center gap-3 text-sm sm:text-base font-black">
                              <span className="text-white/60 line-through text-lg sm:text-xl font-bold">
                                {tier2.regularPrice}
                              </span>
                              <span className="text-white/30 font-normal">|</span>
                              <span className="text-emerald-400 tracking-wider uppercase font-black">
                                Launch Price
                              </span>
                            </div>

                            {/* Price Body: Years 7–12 */}
                            <div className="mt-6 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-navy-900">
                                {tier2.years}
                              </div>
                              <div className="my-2 font-display text-5xl sm:text-6xl font-black tracking-tight text-[#16A34A]">
                                {tier2.price}
                              </div>
                              <div className="text-sm sm:text-base font-extrabold text-navy-800">
                                {tier2.duration}
                              </div>
                            </div>
                          </div>

                          {/* Note: "Limited availability: 50 families per tier" & Button */}
                          <div className="mt-6 pt-2 text-center">
                            <p className="text-xs sm:text-sm font-bold text-emerald-400">
                              {AUNZ_MEMBERSHIP_DATA.availabilityNote}
                            </p>
                            <Button
                              to={`/contact?country=${encodeURIComponent(countryName)}&plan=TOT%20Priv%C3%A9%20(Years%207-12)&type=membership`}
                              variant="primary"
                              full
                              size="md"
                              className="mt-4 bg-[#16A34A] hover:bg-[#13823b] text-white font-black text-sm shadow-md"
                            >
                              Enquire for TOT Privé (Years 7–12)
                            </Button>
                            <p className="mt-2.5 text-center text-[10px] font-semibold text-white/60 select-none">
                              *Terms and conditions apply
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* 2. Membership Prices Full Table */}
                  <div className="mt-10 rounded-3xl border border-navy-100 bg-navy-50/40 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-navy-200/70 pb-4 mb-4">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-extrabold text-navy-900">
                          2. Membership prices
                        </h3>
                        <p className="text-xs sm:text-sm text-navy-600 mt-0.5">
                          {AUNZ_MEMBERSHIP_DATA.launchNotice}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
                        <Check className="h-3.5 w-3.5" /> Launch Rates Active
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-navy-800 text-white font-bold">
                          <tr>
                            <th className="py-3 px-4">Region</th>
                            <th className="py-3 px-4">Tier</th>
                            <th className="py-3 px-4 text-center">Regular price</th>
                            <th className="py-3 px-4 text-right">Launch price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-100 font-semibold text-navy-700">
                          {selectedCountry === 'AU' ? (
                            <>
                              <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="py-3.5 px-4 flex items-center gap-2">
                                  <Flag code="AU" size={16} />
                                  <span className="font-bold text-navy-900">Australia</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-navy-900">Years 1–6</td>
                                <td className="py-3.5 px-4 text-center text-navy-400 line-through">A$169</td>
                                <td className="py-3.5 px-4 text-right font-display text-base font-extrabold text-[#F07C00]">
                                  A$129
                                </td>
                              </tr>
                              <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="py-3.5 px-4 flex items-center gap-2">
                                  <Flag code="AU" size={16} />
                                  <span className="font-bold text-navy-900">Australia</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-navy-900">Years 7–12</td>
                                <td className="py-3.5 px-4 text-center text-navy-400 line-through">A$199</td>
                                <td className="py-3.5 px-4 text-right font-display text-base font-extrabold text-[#16A34A]">
                                  A$149
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="py-3.5 px-4 flex items-center gap-2">
                                  <Flag code="NZ" size={16} />
                                  <span className="font-bold text-navy-900">New Zealand</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-navy-900">Years 1–6</td>
                                <td className="py-3.5 px-4 text-center text-navy-400 line-through">NZ$169</td>
                                <td className="py-3.5 px-4 text-right font-display text-base font-extrabold text-[#F07C00]">
                                  NZ$129
                                </td>
                              </tr>
                              <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="py-3.5 px-4 flex items-center gap-2">
                                  <Flag code="NZ" size={16} />
                                  <span className="font-bold text-navy-900">New Zealand</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-navy-900">Years 7–12</td>
                                <td className="py-3.5 px-4 text-center text-navy-400 line-through">NZ$199</td>
                                <td className="py-3.5 px-4 text-right font-display text-base font-extrabold text-[#16A34A]">
                                  NZ$149
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* BELOW: 1. What your family gets (Benefits Card) */}
                  <div className="mt-10 rounded-3xl border-2 border-navy-100 bg-white p-6 sm:p-8 lg:p-10 shadow-clay">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-100 pb-6">
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-navy-900">
                          {AUNZ_MEMBERSHIP_DATA.includedHeading}
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-navy-600">
                          Comprehensive academic support and priority privileges included across both membership tiers.
                        </p>
                      </div>
                      <span className="rounded-full bg-navy-100 px-3.5 py-1.5 text-xs font-black text-navy-700 tracking-wider">
                        T&amp;C apply
                      </span>
                    </div>

                    {/* Exact List of 8 Benefits */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {AUNZ_MEMBERSHIP_DATA.benefits.map((benefit, idx) => {
                        const isAmber = benefit.color === 'amber';
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3.5 rounded-2xl border border-navy-100 bg-navy-50/30 p-4 sm:p-4.5 shadow-sm hover:border-navy-200 hover:shadow-md transition-all"
                          >
                            <div
                              className={cn(
                                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm',
                                isAmber ? 'bg-[#F07C00]' : 'bg-[#16A34A]',
                              )}
                            >
                              {benefit.icon === 'headphones' && <Headphones className="h-6 w-6" />}
                              {benefit.icon === 'workshop' && <Video className="h-6 w-6" />}
                              {benefit.icon === 'calendar' && <Calendar className="h-6 w-6" />}
                              {benefit.icon === 'reports' && <BarChart3 className="h-6 w-6" />}
                              {benefit.icon === 'plan' && <FileText className="h-6 w-6" />}
                              {benefit.icon === 'teacher' && <UserCheck className="h-6 w-6" />}
                              {benefit.icon === 'message' && <MessageSquare className="h-6 w-6" />}
                              {benefit.icon === 'star' && <Star className="h-6 w-6 fill-white" />}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-base font-extrabold text-navy-900 leading-snug">
                                {benefit.title}
                              </h3>
                              <p className="mt-1 text-xs sm:text-sm font-semibold text-navy-600 leading-relaxed">
                                {benefit.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Terms Card (T&C apply) */}
                  <div className="mt-10 rounded-3xl border-2 border-navy-100 bg-white p-6 sm:p-8 lg:p-10 shadow-clay space-y-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-navy-100 pb-5">
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-black text-navy-900 flex items-center gap-2.5">
                          <ShieldCheck className="h-6 w-6 text-amber-500" />
                          3. Terms &amp; Conditions
                        </h2>
                        <p className="text-xs sm:text-sm text-navy-500 mt-1">
                          Clear, straightforward conditions for {selectedCountry === 'NZ' ? 'New Zealand' : 'Australia'} membership.
                        </p>
                      </div>
                      <span className="rounded-full bg-forest-50 border border-forest-200/60 px-3.5 py-1 text-xs font-bold text-forest-700">
                        Transparent Terms
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {AUNZ_MEMBERSHIP_DATA.terms.map((term, tIdx) => (
                        <div
                          key={tIdx}
                          className="flex items-start gap-3 rounded-2xl border border-navy-100 bg-navy-50/50 p-4"
                        >
                          <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-forest-100 text-forest-700 mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-navy-700 leading-relaxed">
                            {term}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Reassurance Bar */}
                    <div className="rounded-2xl bg-navy-50/70 border border-navy-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-navy-800">
                            Guaranteed Teacher Continuity
                          </div>
                          <div className="text-[11px] text-navy-500 font-medium">
                            Dedicated educator assigned throughout your 15-week journey.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-navy-500">
                          * T&amp;C apply
                        </span>
                        <Link
                          to={`/contact?country=${encodeURIComponent(selectedCountry === 'NZ' ? 'New Zealand' : 'Australia')}&plan=TOT%20Priv%C3%A9&type=membership`}
                          className="text-xs font-black text-amber-600 hover:text-amber-700 underline shrink-0"
                        >
                          Enquire for Membership →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Footer line */}
                  <div className="mt-10 border-t border-navy-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-navy-500 font-medium">
                    <p>
                      {AUNZ_MEMBERSHIP_DATA.footerTagline} · <span className="font-bold text-navy-700">T&amp;C apply</span>
                    </p>
                    <div className="flex items-center gap-2 text-navy-600 font-bold">
                      <Flag code={selectedCountry === 'NZ' ? 'NZ' : 'AU'} size={16} />
                      <span>
                        Exclusive to {selectedCountry === 'NZ' ? 'New Zealand' : 'Australia'} Families · T&amp;C apply
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          ) : (
            /* Tier Grid Categories (for Standard & FlexiCarry) OR NZ Dedicated View */
            <div className="space-y-12">
              {/* New Zealand Section Header with Exact Wording */}
              {selectedCountry === 'NZ' && (
                <div className="rounded-3xl border border-navy-100 bg-white p-5 sm:p-6 shadow-clay">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-1.5">
                        <Flag code="NZ" size={20} />
                        <span className="text-xs font-black uppercase tracking-widest text-[#F07C00]">
                          NEW ZEALAND TUITION RATES
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
                        Online Tuition for New Zealand Students
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-navy-600 font-medium">
                        {selectedPlanType === 'standard'
                          ? 'TriOrbit (NZD) · Transparent per-class rates & discounted multi-session packages'
                          : 'FlexiCarry (NZD) · 100 learning sessions designed for lasting academic consistency'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-4 py-2 text-xs font-black text-[#F07C00] shrink-0">
                      <span>Prices in NZD (per student)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* UAE Section Header with Exact Wording */}
              {selectedCountry === 'AE' && (
                <div className="rounded-3xl border border-navy-100 bg-white p-5 sm:p-6 shadow-clay">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-1.5">
                        <Flag code="AE" size={20} />
                        <span className="text-xs font-black uppercase tracking-widest text-[#F07C00]">
                          UAE TUITION RATES · {uaeCurriculum === 'international' ? 'TRACK 1 (IB / BRITISH / AMERICAN)' : 'TRACK 2 (ICSE / CBSE)'}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
                        Online Tuition for UAE Students
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-navy-600 font-medium">
                        {uaeCurriculum === 'international'
                          ? 'Track 1: IB / British / American curriculum'
                          : 'Track 2: ICSE / CBSE curriculum'} · {selectedPlanType === 'standard' ? 'TriOrbit (AED) plans' : 'FlexiCarry (AED) long-term plans'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-4 py-2 text-xs font-black text-[#F07C00] shrink-0">
                      <span>Prices in AED (per student)</span>
                    </div>
                  </div>
                </div>
              )}

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
                        {tier.plans.length} {tier.plans.length === 1 ? 'Learning Format' : 'Learning Formats'}
                      </div>
                    </div>

                    {/* Sub-Plans Cards: Alpha, Horizon, Apex */}
                    <div
                      className={cn(
                        'grid gap-6',
                        tier.plans.length === 1
                          ? 'grid-cols-1 max-w-md mx-auto'
                          : tier.plans.length === 2
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
                                            <div className="text-[10px] text-navy-500 font-medium">
                                              {pkg.rate ? (
                                                <span>
                                                  Rate: <strong className="text-navy-800 font-bold">{pkg.rate}</strong> · {plan.id === 'alpha' ? 'Live One-to-One' : 'Group Tuition'}
                                                </span>
                                              ) : (
                                                plan.id === 'alpha' ? 'Live One-to-One' : 'Group Tuition'
                                              )}
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
                                    <span>Customised syllabus &amp; school homework help</span>
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
                              <p className="mt-2.5 text-center text-[10px] font-semibold text-navy-400 select-none">
                                *Terms and conditions apply
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Highlights & Guarantees section (from reference footer icons) */}
          <div className="mt-16 rounded-4xl border border-navy-100 bg-white p-6 shadow-clay md:p-10">
            <div className="mb-8 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                {selectedPlanType === 'membership'
                  ? 'TOT PRIVÉ ADVANTAGES'
                  : selectedPlanType === 'flexicarry'
                  ? 'FLEXICARRY ADVANTAGES'
                  : 'WHY PARENTS CHOOSE TOT'}
              </span>
              <h2 className="mt-1 font-display text-2xl font-black text-navy-800 sm:text-3xl">
                {selectedPlanType === 'membership'
                  ? 'Extra Focus, Priority Support & Complete Peace of Mind'
                  : selectedPlanType === 'flexicarry'
                  ? 'Built For Continuity, Flexibility & Real Academic Growth'
                  : 'Personalised Learning Designed Around Your Child'}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(selectedPlanType === 'membership'
                ? MEMBERSHIP_FEATURES
                : selectedPlanType === 'flexicarry'
                ? FLEXICARRY_FEATURES
                : STANDARD_FEATURES
              ).map((feat, i) => (
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
              ))}
            </div>
          </div>

          {/* Bottom Call to Action Banner (matches the reference bottom banner) */}
          <div className="mt-12 overflow-hidden rounded-4xl bg-navy-800 p-8 text-white shadow-clay-navy md:p-12">
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300">
                  {selectedPlanType === 'membership' ? 'Exclusive Membership' : 'Zero Obligation Free Trial'}
                </span>
                <h2 className="mt-3 font-display text-2xl font-black uppercase text-white sm:text-3xl md:text-4xl">
                  {selectedPlanType === 'membership' ? (
                    <>
                      JOIN <span className="text-amber-400">TOT PRIVÉ</span> TODAY
                    </>
                  ) : selectedPlanType === 'flexicarry' ? (
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
                  {selectedPlanType === 'membership'
                    ? 'Limited to only 50 families per tier. Secure your priority membership benefits and personalised 15-week study plan today.'
                    : 'Experience a 45-minute live One-to-One diagnostic lesson with our matched subject expert before deciding. No upfront card required.'}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row shrink-0">
                <Button
                  to={
                    selectedPlanType === 'membership'
                      ? selectedCountry === 'GB'
                        ? '/contact?country=United%20Kingdom&plan=TOT%20Priv%C3%A9&type=membership'
                        : selectedCountry === 'NZ'
                        ? '/contact?country=New%20Zealand&plan=TOT%20Priv%C3%A9&type=membership'
                        : '/contact?country=Australia&plan=TOT%20Priv%C3%A9&type=membership'
                      : '/contact'
                  }
                  variant="primary"
                  size="lg"
                  iconRight={<ChevronRight className="h-5 w-5" />}
                >
                  {selectedPlanType === 'membership' ? 'Enquire for TOT Privé' : 'Book a Trial Class Today'}
                </Button>
                {country.supportPhone && (
                  <a
                    href={`https://wa.me/${country.supportPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-forest-400/40 bg-forest-900/40 px-8 text-base font-extrabold tracking-tight text-forest-300 shadow-sm transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:bg-forest-800/60"
                  >
                    <MessageCircle className="h-5 w-5 text-forest-400 shrink-0" />
                    <span>WhatsApp: {country.supportPhone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bottom disclaimer line */}
          <div className="mt-8 text-center">
            <p className="text-xs font-medium text-navy-400">
              *Terms and conditions apply. Please refer to terms and conditions below.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

