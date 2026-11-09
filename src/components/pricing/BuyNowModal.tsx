import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, User, Mail, MessageCircle, BookOpen, GraduationCap, Sparkles, AlertCircle } from 'lucide-react';
import { useLockBody } from '@/lib/hooks';
import { Button } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

export interface BuyNowPlanContext {
  planName: string;
  tierTitle?: string;
  years?: string;
  price?: string;
  planType?: string;
  countryName?: string;
  countryCode?: string;
}

export interface BuyNowFormData {
  parentFirstName: string;
  parentLastName: string;
  studentFirstName: string;
  studentLastName: string;
  studentRelation: 'Son' | 'Daughter' | '';
  whatsappCode: string;
  whatsappNumber: string;
  email: string;
  year: string;
  subject: string;
  planContext?: BuyNowPlanContext;
}

const COUNTRY_DIAL_CODES = [
  { code: 'GB', dial: '+44', label: 'UK (+44)' },
  { code: 'AU', dial: '+61', label: 'Australia (+61)' },
  { code: 'NZ', dial: '+64', label: 'New Zealand (+64)' },
  { code: 'AE', dial: '+971', label: 'UAE (+971)' },
  { code: 'IN', dial: '+91', label: 'India (+91)' },
  { code: 'US', dial: '+1', label: 'USA / Canada (+1)' },
  { code: 'SG', dial: '+65', label: 'Singapore (+65)' },
  { code: 'QA', dial: '+974', label: 'Qatar (+974)' },
  { code: 'SA', dial: '+966', label: 'Saudi Arabia (+966)' },
  { code: 'OM', dial: '+968', label: 'Oman (+968)' },
  { code: 'KW', dial: '+965', label: 'Kuwait (+965)' },
  { code: 'OTHER', dial: '+', label: 'Other (+)' },
];

const SCHOOL_YEARS = [
  'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5',
  'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10',
  'Year 11', 'Year 12', 'Year 13',
];

const POPULAR_SUBJECTS = [
  'Mathematics',
  'English (Language & Literature)',
  'Science (Combined)',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics & Business',
  'ExamEdge / 11+ / Entrance',
  'Other / Multiple Subjects',
];

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  planContext: BuyNowPlanContext | null;
  onSubmitSuccess?: (data: BuyNowFormData) => void;
}

export default function BuyNowModal({
  isOpen,
  onClose,
  planContext,
  onSubmitSuccess,
}: BuyNowModalProps) {
  useLockBody(isOpen);

  // Default dial code based on country
  const getDefaultDialCode = () => {
    if (!planContext?.countryCode) return '+44';
    const match = COUNTRY_DIAL_CODES.find((c) => c.code === planContext.countryCode);
    return match ? match.dial : '+44';
  };

  const [formData, setFormData] = useState<BuyNowFormData>({
    parentFirstName: '',
    parentLastName: '',
    studentFirstName: '',
    studentLastName: '',
    studentRelation: '',
    whatsappCode: getDefaultDialCode(),
    whatsappNumber: '',
    email: '',
    year: planContext?.years || 'Year 1',
    subject: 'Mathematics',
    planContext: planContext || undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync default country code when context changes
  useEffect(() => {
    if (planContext) {
      setFormData((prev) => ({
        ...prev,
        whatsappCode: getDefaultDialCode(),
        year: planContext.years || prev.year || 'Year 1',
        planContext,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planContext]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'Parent first name is required';
    if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Parent last name is required';
    if (!formData.studentFirstName.trim()) newErrors.studentFirstName = 'Student first name is required';
    if (!formData.studentLastName.trim()) newErrors.studentLastName = 'Student last name is required';
    if (!formData.studentRelation) newErrors.studentRelation = 'Please select Son or Daughter';
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (formData.whatsappNumber.replace(/\D/g, '').length < 6) {
      newErrors.whatsappNumber = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.year.trim()) newErrors.year = 'Please select a Year';
    if (!formData.subject.trim()) newErrors.subject = 'Please select or enter a subject';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Prepared payload for the backend team
      const payload: BuyNowFormData = {
        ...formData,
        planContext: planContext || undefined,
      };

      console.log('[Buy Now Form Submission Payload]:', payload);

      // =========================================================================
      // TODO: BACKEND TEAM INTEGRATION
      // Once the backend API endpoint is ready, uncomment and plug in endpoint:
      //
      // const response = await fetch('/api/orders/buy-now', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // if (!response.ok) throw new Error('Failed to submit order request');
      // =========================================================================

      // Simulate a brief network call for UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(payload);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-navy-100 z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="relative border-b border-navy-100 bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 p-5 sm:p-6 text-white shrink-0">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Complete Your Enrolment</span>
              </div>

              <h3 className="mt-1 font-display text-xl sm:text-2xl font-black text-white">
                Buy Now — {planContext?.planName || 'Tuition Package'}
              </h3>

              {/* Plan context pill */}
              {planContext && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">
                  {planContext.countryName && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
                      📍 {planContext.countryName}
                    </span>
                  )}
                  {planContext.years && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
                      🎓 {planContext.years}
                    </span>
                  )}
                  {planContext.price && (
                    <span className="rounded-full bg-amber-400/20 px-3 py-1 text-amber-300 font-extrabold border border-amber-400/30">
                      💰 {planContext.price}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {isSubmitted ? (
                /* Success View */
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mt-5 font-display text-2xl font-black text-navy-800">
                    Order Request Received!
                  </h4>
                  <p className="mt-2 text-sm text-navy-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-navy-800">{formData.parentFirstName}</strong>! We have received your purchase request for{' '}
                    <strong className="text-navy-800">{planContext?.planName || 'Tuition Plan'}</strong> for{' '}
                    <strong className="text-navy-800">{formData.studentFirstName}</strong> ({formData.year}).
                  </p>

                  <div className="mt-5 rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs font-semibold text-amber-900 text-left space-y-1.5 max-w-md mx-auto">
                    <p className="flex items-center gap-2 font-bold text-amber-950">
                      <span>⚡ What happens next?</span>
                    </p>
                    <p className="text-amber-800">
                      1. Our academic coordinator will connect with you via WhatsApp on{' '}
                      <span className="font-extrabold text-navy-900">
                        {formData.whatsappCode} {formData.whatsappNumber}
                      </span>{' '}
                      within a few hours.
                    </p>
                    <p className="text-amber-800">
                      2. We will confirm your schedule and teacher match before sending the secure payment link.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Button
                      onClick={handleResetAndClose}
                      variant="primary"
                      size="md"
                      className="px-8 font-black"
                    >
                      Done / Close
                    </Button>
                  </div>
                </div>
              ) : (
                /* Form View */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Section 1: Parents Details */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-navy-700 mb-2.5">
                      <User className="h-4 w-4 text-amber-500" />
                      <span>Parent's Details</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Parent First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.parentFirstName}
                          onChange={(e) => setFormData({ ...formData, parentFirstName: e.target.value })}
                          placeholder="e.g. David"
                          className={cn(
                            'w-full min-w-0 rounded-xl border bg-navy-50/50 px-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20',
                            errors.parentFirstName ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
                          )}
                        />
                        {errors.parentFirstName && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.parentFirstName}</p>
                        )}
                      </div>

                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Parent Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.parentLastName}
                          onChange={(e) => setFormData({ ...formData, parentLastName: e.target.value })}
                          placeholder="e.g. Miller"
                          className={cn(
                            'w-full min-w-0 rounded-xl border bg-navy-50/50 px-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20',
                            errors.parentLastName ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
                          )}
                        />
                        {errors.parentLastName && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.parentLastName}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Student Details */}
                  <div className="pt-1 border-t border-navy-100">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-navy-700 my-2.5">
                      <GraduationCap className="h-4 w-4 text-emerald-500" />
                      <span>Student's Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Student First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.studentFirstName}
                          onChange={(e) => setFormData({ ...formData, studentFirstName: e.target.value })}
                          placeholder="e.g. Leo"
                          className={cn(
                            'w-full min-w-0 rounded-xl border bg-navy-50/50 px-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20',
                            errors.studentFirstName ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
                          )}
                        />
                        {errors.studentFirstName && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.studentFirstName}</p>
                        )}
                      </div>

                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Student Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.studentLastName}
                          onChange={(e) => setFormData({ ...formData, studentLastName: e.target.value })}
                          placeholder="e.g. Miller"
                          className={cn(
                            'w-full min-w-0 rounded-xl border bg-navy-50/50 px-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20',
                            errors.studentLastName ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
                          )}
                        />
                        {errors.studentLastName && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.studentLastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Son / Daughter Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-navy-600 mb-1.5">
                        Child is your <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, studentRelation: 'Son' });
                            if (errors.studentRelation) {
                              setErrors((prev) => ({ ...prev, studentRelation: '' }));
                            }
                          }}
                          className={cn(
                            'flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-black transition-all border-2',
                            formData.studentRelation === 'Son'
                              ? 'border-[#0284C7] bg-[#0284C7]/10 text-[#0284C7] shadow-sm'
                              : 'border-navy-200 bg-white text-navy-600 hover:border-navy-300',
                          )}
                        >
                          <span className="text-base">👦</span>
                          <span>Son</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, studentRelation: 'Daughter' });
                            if (errors.studentRelation) {
                              setErrors((prev) => ({ ...prev, studentRelation: '' }));
                            }
                          }}
                          className={cn(
                            'flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-black transition-all border-2',
                            formData.studentRelation === 'Daughter'
                              ? 'border-[#D946EF] bg-[#D946EF]/10 text-[#D946EF] shadow-sm'
                              : 'border-navy-200 bg-white text-navy-600 hover:border-navy-300',
                          )}
                        >
                          <span className="text-base">👧</span>
                          <span>Daughter</span>
                        </button>
                      </div>
                      {errors.studentRelation && (
                        <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.studentRelation}</p>
                      )}
                    </div>
                  </div>

                  {/* Section 3: Contact Info */}
                  <div className="pt-1 border-t border-navy-100">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-navy-700 my-2.5">
                      <MessageCircle className="h-4 w-4 text-emerald-500" />
                      <span>Contact Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {/* WhatsApp Number with Country Code */}
                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          WhatsApp Number <span className="text-rose-500">*</span>
                        </label>
                        <div
                          className={cn(
                            'flex rounded-xl border bg-navy-50/50 overflow-hidden transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/20',
                            errors.whatsappNumber ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
                          )}
                        >
                          <select
                            value={formData.whatsappCode}
                            onChange={(e) => setFormData({ ...formData, whatsappCode: e.target.value })}
                            className="w-[95px] shrink-0 border-r border-navy-200 bg-transparent px-2.5 py-2.5 text-xs font-bold text-navy-800 outline-none cursor-pointer"
                          >
                            {COUNTRY_DIAL_CODES.map((c) => (
                              <option key={c.code} value={c.dial}>
                                {c.dial} ({c.code})
                              </option>
                            ))}
                          </select>

                          <input
                            type="tel"
                            value={formData.whatsappNumber}
                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                            placeholder="e.g. 7884 981882"
                            className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm font-semibold text-navy-800 outline-none placeholder:text-navy-400"
                          />
                        </div>
                        {errors.whatsappNumber && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.whatsappNumber}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative min-w-0">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. parent@example.com"
                            className={cn(
                              'w-full min-w-0 rounded-xl border bg-navy-50/50 pl-9 pr-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20',
                              errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
                            )}
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-navy-400 pointer-events-none" />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Academic Details (Year & Subject) */}
                  <div className="pt-1 border-t border-navy-100">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-navy-700 my-2.5">
                      <BookOpen className="h-4 w-4 text-sky-500" />
                      <span>Academic Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Year */}
                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Student Year / Grade <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="w-full min-w-0 rounded-xl border border-navy-200 bg-navy-50/50 px-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none focus:border-amber-500 focus:bg-white"
                        >
                          {planContext?.years && (
                            <option value={planContext.years}>Selected Tier: {planContext.years}</option>
                          )}
                          {SCHOOL_YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subject */}
                      <div className="min-w-0">
                        <label className="block text-[11px] font-bold text-navy-600 mb-1">
                          Primary Subject <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full min-w-0 rounded-xl border border-navy-200 bg-navy-50/50 px-3.5 py-2.5 text-sm font-semibold text-navy-800 outline-none focus:border-amber-500 focus:bg-white"
                        >
                          {POPULAR_SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submission note & submit button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      full
                      size="md"
                      className="font-black text-sm shadow-md"
                    >
                      {isSubmitting ? 'Submitting Details...' : 'Confirm & Buy Now 🚀'}
                    </Button>

                    <div className="mt-3 flex items-start gap-1.5 text-center justify-center text-[11px] text-navy-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      <span>
                        No immediate card payment needed. Our academic coordinator will verify your teacher match &amp; timetable before sending your official enrollment invoice.
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
