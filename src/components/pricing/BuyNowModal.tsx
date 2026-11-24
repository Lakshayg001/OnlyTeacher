import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  User,
  Mail,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Globe,
  Check,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useLockBody } from '@/lib/hooks';
import { Button } from '@/components/ui/Primitives';
import Flag from '@/components/ui/Flag';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

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
  nationality: string;
  whatsappCode: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  phoneCode: string;
  phoneCountryCode: string;
  phoneNumber: string;
  email: string;
  year: string;
  subject: string;
  termsAccepted: boolean;
  planContext?: BuyNowPlanContext;
}

export interface CountryOption {
  code: string;
  name: string;
  dial: string;
}

export const FORM_COUNTRIES: CountryOption[] = [
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'AE', name: 'UAE', dial: '+971' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'US', name: 'USA', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'NZ', name: 'New Zealand', dial: '+64' },
  { code: 'QA', name: 'Qatar', dial: '+974' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { code: 'OM', name: 'Oman', dial: '+968' },
  { code: 'KW', name: 'Kuwait', dial: '+965' },
  { code: 'MY', name: 'Malaysia', dial: '+60' },
  { code: 'BR', name: 'Brazil', dial: '+55' },
  { code: 'MX', name: 'Mexico', dial: '+52' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'BH', name: 'Bahrain', dial: '+973' },
  { code: 'CH', name: 'Switzerland', dial: '+41' },
  { code: 'OTHER', name: 'Other', dial: '+' },
];

const SCHOOL_YEARS = [
  'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5',
  'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10',
  'Year 11', 'Year 12', 'Year 13',
];

export interface SubjectSection {
  category: string;
  options: string[];
}

export const SUBJECT_SECTIONS: SubjectSection[] = [
  {
    category: '1. Common Subjects (All Ages & Curricula)',
    options: [
      'Maths: Maths (General / Core)',
      'Maths: Further Maths',
      'Maths: Statistics',
      'Maths: Mental Maths',
      'Maths: Vedic Maths',
      'English: Language',
      'English: Literature',
      'English: Creative Writing',
      'English: Reading & Comprehension',
      'English: Phonics (Early Years)',
      'Science: Physics',
      'Science: Chemistry',
      'Science: Biology',
      'Science: General / Combined Science',
      'Science: Environmental Science',
      'Computing: Computer Science',
      'Computing: Coding (Python, Java, Scratch)',
      'Computing: Web Development',
      'Computing: AI Basics',
      'Computing: Robotics',
      'Commerce: Economics',
      'Commerce: Business Studies',
      'Commerce: Accounting',
      'Humanities: History',
      'Humanities: Geography',
      'Humanities: Social Studies',
      'Humanities: Civics / Global Politics',
      'Humanities: Psychology',
      'Humanities: Sociology',
      'Creative: Art & Design',
      'Creative: Music Theory (ABRSM, Trinity)',
    ],
  },
  {
    category: '2. Exam Preparation',
    options: [
      'International: IB (PYP, MYP, DP)',
      'International: Cambridge (IGCSE, AS & A Level)',
      'International: Pearson Edexcel',
      'International: Advanced Placement (AP)',
      'UK: KS1–KS3 SATs',
      'UK: 11+ & 13+ Entrance Exams',
      'UK: GCSE / IGCSE',
      'UK: A Level',
      'UK: University Admissions (UCAT, LNAT, TMUA, MAT, STEP)',
      'USA/Canada: SAT, PSAT & ACT',
      'USA/Canada: SSAT & ISEE',
      'USA/Canada: AMC Maths',
      'Canada: Provincial Exams (Ontario, BC, Alberta)',
      'Australia: NAPLAN & Selective School Tests',
      'Australia: HSC, VCE, QCE, WACE (ATAR)',
      'Australia/NZ: UCAT ANZ',
      'New Zealand: NCEA & NZ Scholarship',
      'India: CBSE Board',
      'India: ICSE / ISC Board',
      'India: State Boards',
      'India: JEE Main & Advanced',
      'India: NEET',
      'India: CUET & CLAT',
      'India: Olympiads (Maths / Science)',
      'Singapore: PSLE, O/N Level, SEC, A Level',
      'Malaysia: SPM, STPM, UEC',
      'Japan: Eiken',
      'China: Gaokao Support',
      'Germany: Abitur',
      'English Test: IELTS (Academic / General)',
      'English Test: TOEFL',
      'English Test: PTE Academic',
      'English Test: Duolingo English Test (DET)',
      'English Test: TOEIC',
      'English Test: Cambridge English (A2 Key to C1 Advanced)',
      'Higher Studies: GRE',
      'Higher Studies: GMAT',
      'Higher Studies: CAT',
    ],
  },
  {
    category: '3. Language Learning',
    options: [
      'French (DELF / DALF, TEF / TCF)',
      'German (Goethe-Zertifikat, TestDaF)',
      'Japanese (JLPT N5–N1)',
      'Chinese / Mandarin (HSK, YCT for Kids)',
      'Spanish (DELE, SIELE)',
      'Arabic (Conversational, Quranic, GCSE/IB)',
      'Hindi (School-level & Heritage Classes)',
      'Punjabi (School-level & Heritage Classes)',
      'Korean (TOPIK)',
      'Italian',
      'Portuguese',
      'Russian',
      'Urdu',
      'Tamil',
      'Gujarati',
      'Sanskrit',
    ],
  },
  {
    category: '4. Personality Development & Life Skills',
    options: [
      'Spoken English & Fluency',
      'English Grammar (Beginner to Advanced)',
      'Accent & Pronunciation',
      'Public Speaking & Presentation Skills',
      'Interview Cracking (School, University, Job)',
      'Debate & Elocution',
      'Confidence Building',
      'Communication & Soft Skills',
      'Leadership',
      'Study Skills & Time Management',
      'Critical Thinking',
      'Etiquette & Body Language',
      'CV / Resume & LinkedIn Profile Writing',
      'Other / Custom Subject Requirement',
    ],
  },
];

interface NationalitySelectorProps {
  value: string;
  onChange: (countryName: string) => void;
  error?: string;
}

function NationalitySelector({ value, onChange, error }: NationalitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const selectedCountry =
    FORM_COUNTRIES.find((c) => c.name.toLowerCase() === value.toLowerCase()) || FORM_COUNTRIES[0];

  return (
    <div className="relative min-w-0" ref={containerRef}>
      <label className="block text-[11px] font-bold text-navy-600 mb-1.5">
        Nationality <span className="text-rose-500">*</span>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center justify-between w-full min-w-0 rounded-xl border bg-navy-50/50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-navy-800 outline-none transition-all cursor-pointer',
          isOpen
            ? 'border-amber-500 bg-white ring-2 ring-amber-500/20'
            : 'border-navy-200 hover:border-navy-300',
          error ? 'border-rose-400 bg-rose-50/30' : '',
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          {selectedCountry.code === 'OTHER' ? (
            <Globe className="h-4 w-4 text-navy-600 shrink-0" />
          ) : (
            <Flag code={selectedCountry.code} size={18} className="rounded-[2px] shrink-0" />
          )}
          <span className="truncate">{selectedCountry.name}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-navy-400 shrink-0 ml-1 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-56 overflow-y-auto rounded-xl bg-white shadow-2xl border border-navy-100 z-50 py-1 divide-y divide-navy-50">
          {FORM_COUNTRIES.map((c) => {
            const isSelected = c.name === selectedCountry.name;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.name);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-amber-500/10 text-amber-950 font-black'
                    : 'text-navy-800 font-semibold hover:bg-navy-50',
                )}
              >
                {c.code === 'OTHER' ? (
                  <Globe className="h-4 w-4 text-navy-600 shrink-0" />
                ) : (
                  <Flag code={c.code} size={18} className="rounded-[2px] shrink-0" />
                )}
                <span className="flex-1 truncate">{c.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-amber-600 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="mt-1 text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}

interface CountryCodeInputProps {
  label: string;
  required?: boolean;
  countryCode: string;
  dialCode: string;
  numberValue: string;
  onCountryChange: (country: CountryOption) => void;
  onNumberChange: (number: string) => void;
  placeholder?: string;
  error?: string;
  rightAction?: React.ReactNode;
}

function CountryCodeInput({
  label,
  required,
  countryCode,
  dialCode,
  numberValue,
  onCountryChange,
  onNumberChange,
  placeholder,
  error,
  rightAction,
}: CountryCodeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const selectedCountry =
    FORM_COUNTRIES.find((c) => c.code === countryCode) ||
    FORM_COUNTRIES.find((c) => c.dial === dialCode) ||
    FORM_COUNTRIES[0];

  return (
    <div className="min-w-0" ref={containerRef}>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-[11px] font-bold text-navy-600">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {rightAction}
      </div>

      <div className="relative">
        <div
          className={cn(
            'flex items-center rounded-xl border bg-navy-50/50 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/20',
            error ? 'border-rose-400 bg-rose-50/30' : 'border-navy-200',
          )}
        >
          {/* Country Dial Code Trigger Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-2.5 bg-navy-50/80 hover:bg-navy-100/80 border-r border-navy-200 text-xs font-bold text-navy-800 shrink-0 transition-colors select-none rounded-l-xl cursor-pointer"
            aria-expanded={isOpen}
          >
            {selectedCountry.code === 'OTHER' ? (
              <Globe className="h-4 w-4 text-navy-600 shrink-0" />
            ) : (
              <Flag code={selectedCountry.code} size={18} className="rounded-[2px] shrink-0" />
            )}
            <span className="font-extrabold text-navy-900">{selectedCountry.dial}</span>
            <ChevronDown
              className={cn(
                'h-3 w-3 text-navy-400 transition-transform duration-200',
                isOpen && 'rotate-180',
              )}
            />
          </button>

          {/* Number Input */}
          <input
            type="tel"
            value={numberValue}
            onChange={(e) => onNumberChange(e.target.value)}
            placeholder={placeholder || 'e.g. 7884 981882'}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm font-semibold text-navy-800 outline-none placeholder:text-navy-400"
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-60 max-h-56 overflow-y-auto rounded-xl bg-white shadow-2xl border border-navy-100 z-50 py-1 divide-y divide-navy-50">
            {FORM_COUNTRIES.map((c) => {
              const isSelected = c.code === selectedCountry.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onCountryChange(c);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-amber-500/10 text-amber-950 font-black'
                      : 'text-navy-800 font-semibold hover:bg-navy-50',
                  )}
                >
                  {c.code === 'OTHER' ? (
                    <Globe className="h-4 w-4 text-navy-600 shrink-0" />
                  ) : (
                    <Flag code={c.code} size={18} className="rounded-[2px] shrink-0" />
                  )}
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-navy-400 font-mono text-[11px] font-bold shrink-0">
                    {c.dial}
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-amber-600 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}

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

  // Default country context resolution
  const getDefaultCountry = (): CountryOption => {
    if (!planContext?.countryCode && !planContext?.countryName) {
      return FORM_COUNTRIES[0]; // India
    }
    const match = FORM_COUNTRIES.find(
      (c) =>
        c.code.toUpperCase() === planContext.countryCode?.toUpperCase() ||
        c.name.toLowerCase() === planContext.countryName?.toLowerCase(),
    );
    return match || FORM_COUNTRIES[0];
  };

  // Resolve default school year from tier
  const resolveDefaultYear = (yearsStr?: string) => {
    if (!yearsStr) return 'Year 1';
    if (SCHOOL_YEARS.includes(yearsStr)) return yearsStr;
    const match = yearsStr.match(/(\d+)/);
    if (match) {
      const yearNum = match[1];
      const found = SCHOOL_YEARS.find((y) => y === `Year ${yearNum}`);
      if (found) return found;
    }
    return 'Year 1';
  };

  const defaultCountry = getDefaultCountry();

  const [formData, setFormData] = useState<BuyNowFormData>({
    parentFirstName: '',
    parentLastName: '',
    studentFirstName: '',
    studentLastName: '',
    studentRelation: '',
    nationality: defaultCountry.name,
    whatsappCode: defaultCountry.dial,
    whatsappCountryCode: defaultCountry.code,
    whatsappNumber: '',
    phoneCode: defaultCountry.dial,
    phoneCountryCode: defaultCountry.code,
    phoneNumber: '',
    email: '',
    year: resolveDefaultYear(planContext?.years),
    subject: SUBJECT_SECTIONS[0].options[0],
    termsAccepted: false,
    planContext: planContext || undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookedStudentId, setBookedStudentId] = useState<string | null>(null);

  // OTP Verification State
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Reset OTP state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsPhoneVerified(false);
      setOtpRequested(false);
      setOtpCode('');
      setOtpError(null);
      setConfirmationResult(null);
    }
  }, [isOpen]);

  const sendOtp = async () => {
    const rawNumber = formData.phoneNumber.replace(/\D/g, '');
    if (!formData.phoneNumber || rawNumber.length < 6) {
      setOtpError('Please enter a valid phone number before requesting OTP');
      return;
    }
    setIsSendingOtp(true);
    setOtpError(null);

    try {
      const fullPhoneNumber = formData.phoneCode + rawNumber;

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'buynow-recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          },
        });
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpRequested(true);
    } catch (err: any) {
      console.error('Error sending OTP', err);
      setOtpError(err.message || 'Failed to send OTP. Please check the number and try again.');
      if (window.recaptchaVerifier) {
        try {
          const widgetId = await window.recaptchaVerifier.render();
          if (window.grecaptcha) {
            window.grecaptcha.reset(widgetId);
          }
        } catch {}
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpCode || otpCode.trim().length < 4) {
      setOtpError('Please enter a valid OTP code');
      return;
    }
    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otpCode.trim());
        setIsPhoneVerified(true);
        setOtpError(null);
        if (errors.phoneNumber) {
          setErrors((prev) => ({ ...prev, phoneNumber: '' }));
        }
      }
    } catch (err: any) {
      console.error('Error verifying OTP', err);
      setOtpError('Invalid OTP code. Please check and try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Sync default country code when context changes
  useEffect(() => {
    if (planContext) {
      const country = getDefaultCountry();
      setFormData((prev) => ({
        ...prev,
        nationality: prev.nationality || country.name,
        whatsappCode: prev.whatsappNumber ? prev.whatsappCode : country.dial,
        whatsappCountryCode: prev.whatsappNumber ? prev.whatsappCountryCode : country.code,
        phoneCode: prev.phoneNumber ? prev.phoneCode : country.dial,
        phoneCountryCode: prev.phoneNumber ? prev.phoneCountryCode : country.code,
        year: resolveDefaultYear(planContext.years) || prev.year || 'Year 1',
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
    if (!formData.nationality.trim()) newErrors.nationality = 'Please select nationality';
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (formData.whatsappNumber.replace(/\D/g, '').length < 6) {
      newErrors.whatsappNumber = 'Please enter a valid phone number';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 6) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    } else if (!isPhoneVerified) {
      newErrors.phoneNumber = 'Please verify your phone number via OTP';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.year.trim()) newErrors.year = 'Please select a Year';
    if (!formData.subject.trim()) newErrors.subject = 'Please select or enter a subject';
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Please accept the Terms & Conditions to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const allowedPlanTypes = ['standard', 'flexicarry', 'membership'];
      const rawPlanType = (planContext?.planType || '').toLowerCase().trim();
      const normalizedPlanType = allowedPlanTypes.includes(rawPlanType) ? rawPlanType : 'standard';

      const resolvedPlanContext = {
        planName: planContext?.planName || 'Free Trial Class',
        tierTitle: planContext?.tierTitle || '',
        years: planContext?.years || formData.year,
        price: planContext?.price || 'Free Trial',
        planType: normalizedPlanType,
        countryName: planContext?.countryName || formData.nationality || 'India',
        countryCode: planContext?.countryCode || formData.phoneCountryCode || 'IN',
      };

      const payload = {
        parentFirstName: formData.parentFirstName.trim(),
        parentLastName: formData.parentLastName.trim(),
        studentFirstName: formData.studentFirstName.trim(),
        studentLastName: formData.studentLastName.trim(),
        studentRelation: formData.studentRelation,
        nationality: formData.nationality,
        whatsappCode: formData.whatsappCode,
        whatsappCountryCode: formData.whatsappCountryCode,
        whatsappNumber: formData.whatsappNumber.replace(/\D/g, ''),
        phoneCode: formData.phoneCode,
        phoneCountryCode: formData.phoneCountryCode,
        phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
        email: formData.email.trim(),
        year: formData.year,
        subject: formData.subject,
        termsAccepted: formData.termsAccepted,
        planContext: resolvedPlanContext,
      };

      const endpoint = import.meta.env.PROD
        ? 'https://api.theonlyteacher.com/api/demo-bookings'
        : '/api/demo-bookings';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok || (data && data.success === false)) {
        if (data && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const backendFieldErrors: Record<string, string> = {};
          const msgList: string[] = [];
          data.errors.forEach((err: { field?: string; message?: string }) => {
            if (err.field && err.message) {
              backendFieldErrors[err.field] = err.message;
              msgList.push(err.message);
            } else if (err.message) {
              msgList.push(err.message);
            }
          });
          if (Object.keys(backendFieldErrors).length > 0) {
            setErrors((prev) => ({ ...prev, ...backendFieldErrors }));
          }
          const finalMsg = msgList.length > 0
            ? msgList.join(' · ')
            : (data.message || 'Validation failed. Please check the entered fields.');
          throw new Error(finalMsg);
        }

        if (response.status === 429) {
          throw new Error('Too many booking requests. Please wait a moment and try again.');
        }

        throw new Error(data?.message || `Booking failed with status ${response.status}. Please try again.`);
      }

      if (data?.data?.studentId) {
        setBookedStudentId(data.data.studentId);
      }

      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(payload as unknown as BuyNowFormData);
      }
    } catch (err: any) {
      console.error('Error submitting free trial booking:', err);
      setSubmitError(err?.message || 'Failed to submit the booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setBookedStudentId(null);
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
                <span>Book Your Free Trial</span>
              </div>

              <h3 className="mt-1 font-display text-xl sm:text-2xl font-black text-white">
                Book a Free Trial — {planContext?.planName || 'Tuition Package'}
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
                    Free Trial Request Received!
                  </h4>
                  <p className="mt-2 text-sm text-navy-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-navy-800">{formData.parentFirstName}</strong>! We have received your free trial booking for{' '}
                    <strong className="text-navy-800">{planContext?.planName || 'Tuition Plan'}</strong> for{' '}
                    <strong className="text-navy-800">{formData.studentFirstName}</strong> ({formData.year}).
                  </p>

                  {bookedStudentId && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                      <span>Booking Reference ID:</span>
                      <span className="font-mono font-black text-emerald-950">{bookedStudentId}</span>
                    </div>
                  )}

                  <div className="mt-5 rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs font-semibold text-amber-900 text-left space-y-1.5 max-w-md mx-auto">
                    <p className="flex items-center gap-2 font-bold text-amber-950">
                      <span>⚡ What happens next?</span>
                    </p>
                    <p className="text-amber-800">
                      1. Our academic coordinator will connect with you via WhatsApp on{' '}
                      <span className="font-extrabold text-navy-900">
                        {formData.whatsappCode} {formData.whatsappNumber}
                      </span>{' '}
                      within a few hours to schedule your free trial session.
                    </p>
                    <p className="text-amber-800">
                      2. We will match the specialist tutor according to your preferred timing and subject.
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
                  {/* Invisible Recaptcha Container for Phone OTP */}
                  <div id="buynow-recaptcha-container"></div>
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

                    {/* Son / Daughter Selector & Nationality */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-navy-600 mb-1.5">
                          Child is your <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, studentRelation: 'Son' });
                              if (errors.studentRelation) {
                                setErrors((prev) => ({ ...prev, studentRelation: '' }));
                              }
                            }}
                            className={cn(
                              'flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-black transition-all border-2',
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
                              'flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-black transition-all border-2',
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

                      <NationalitySelector
                        value={formData.nationality}
                        onChange={(nationality) => {
                          setFormData((prev) => ({ ...prev, nationality }));
                          if (errors.nationality) {
                            setErrors((prev) => ({ ...prev, nationality: '' }));
                          }
                        }}
                        error={errors.nationality}
                      />
                    </div>
                  </div>

                  {/* Section 3: Contact Info */}
                  <div className="pt-1 border-t border-navy-100">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-navy-700 my-2.5">
                      <MessageCircle className="h-4 w-4 text-emerald-500" />
                      <span>Contact Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {/* WhatsApp Number with Country Code */}
                      <CountryCodeInput
                        label="WhatsApp Number"
                        required
                        countryCode={formData.whatsappCountryCode}
                        dialCode={formData.whatsappCode}
                        numberValue={formData.whatsappNumber}
                        onCountryChange={(country) => {
                          setFormData((prev) => ({
                            ...prev,
                            whatsappCountryCode: country.code,
                            whatsappCode: country.dial,
                          }));
                          if (errors.whatsappNumber) {
                            setErrors((prev) => ({ ...prev, whatsappNumber: '' }));
                          }
                        }}
                        onNumberChange={(num) => {
                          setFormData((prev) => ({ ...prev, whatsappNumber: num }));
                          if (errors.whatsappNumber) {
                            setErrors((prev) => ({ ...prev, whatsappNumber: '' }));
                          }
                        }}
                        placeholder="e.g. 7884 981882"
                        error={errors.whatsappNumber}
                      />

                      {/* Phone Number with Country Code & OTP Verification */}
                      <div className="flex flex-col">
                        <CountryCodeInput
                          label="Phone Number"
                          required
                          countryCode={formData.phoneCountryCode}
                          dialCode={formData.phoneCode}
                          numberValue={formData.phoneNumber}
                          onCountryChange={(country) => {
                            setFormData((prev) => ({
                              ...prev,
                              phoneCountryCode: country.code,
                              phoneCode: country.dial,
                            }));
                            setIsPhoneVerified(false);
                            setOtpRequested(false);
                            setOtpCode('');
                            setOtpError(null);
                          }}
                          onNumberChange={(num) => {
                            setFormData((prev) => ({ ...prev, phoneNumber: num }));
                            setIsPhoneVerified(false);
                            setOtpRequested(false);
                            setOtpCode('');
                            setOtpError(null);
                            if (errors.phoneNumber) {
                              setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                            }
                          }}
                          placeholder="e.g. 7884 981882"
                          error={errors.phoneNumber}
                          rightAction={
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  phoneCountryCode: prev.whatsappCountryCode,
                                  phoneCode: prev.whatsappCode,
                                  phoneNumber: prev.whatsappNumber,
                                }));
                                setIsPhoneVerified(false);
                                setOtpRequested(false);
                                setOtpCode('');
                                setOtpError(null);
                                if (errors.phoneNumber) {
                                  setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                                }
                              }}
                              className="text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                            >
                              Same as WhatsApp
                            </button>
                          }
                        />

                        {/* OTP Verification UI */}
                        <div className="mt-1.5">
                          {!isPhoneVerified && !otpRequested && (
                            <button
                              type="button"
                              onClick={sendOtp}
                              disabled={isSendingOtp || !formData.phoneNumber.trim()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                              <span>{isSendingOtp ? 'Sending OTP...' : 'Send OTP to Verify'}</span>
                            </button>
                          )}

                          {!isPhoneVerified && otpRequested && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 space-y-2 mt-1">
                              <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                                <span className="flex items-center gap-1.5 text-[11px]">
                                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                  <span>Enter OTP sent to phone</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={sendOtp}
                                  disabled={isSendingOtp}
                                  className="text-[11px] font-bold text-amber-700 underline hover:text-amber-800 disabled:opacity-50 cursor-pointer"
                                >
                                  {isSendingOtp ? 'Sending...' : 'Resend OTP'}
                                </button>
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  maxLength={6}
                                  value={otpCode}
                                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                  placeholder="6-digit OTP"
                                  className="w-full min-w-0 rounded-lg border border-navy-200 bg-white px-2.5 py-1.5 text-xs font-bold text-navy-900 tracking-wider placeholder:tracking-normal placeholder:font-normal focus:border-amber-500 focus:outline-none"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="primary"
                                  onClick={verifyOtp}
                                  disabled={isVerifyingOtp || otpCode.length < 4}
                                  className="shrink-0 px-3 py-1.5 text-xs font-bold"
                                >
                                  {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                                </Button>
                              </div>
                            </div>
                          )}

                          {isPhoneVerified && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span>Phone Number Verified</span>
                            </div>
                          )}

                          {otpError && (
                            <p className="mt-1 text-[11px] font-semibold text-rose-500">{otpError}</p>
                          )}
                        </div>
                      </div>
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
                          className="w-full min-w-0 rounded-xl border border-navy-200 bg-navy-50/50 px-3 py-2.5 text-xs sm:text-sm font-semibold text-navy-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 truncate"
                        >
                          {SUBJECT_SECTIONS.map((section) => (
                            <optgroup
                              key={section.category}
                              label={section.category}
                              className="font-bold text-navy-900 bg-navy-50"
                            >
                              {section.options.map((s) => (
                                <option
                                  key={s}
                                  value={s}
                                  className="font-normal text-navy-700 bg-white py-1"
                                >
                                  {s}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData((prev) => ({ ...prev, termsAccepted: checked }));
                          if (checked && errors.termsAccepted) {
                            setErrors((prev) => ({ ...prev, termsAccepted: '' }));
                          }
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy-300 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                      />
                      <span className="text-xs text-navy-600 font-medium leading-relaxed">
                        I agree to the{' '}
                        <a
                          href="/terms-of-use"
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-navy-800 underline hover:text-amber-600 transition-colors"
                        >
                          Terms &amp; Conditions
                        </a>{' '}
                        and{' '}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-navy-800 underline hover:text-amber-600 transition-colors"
                        >
                          Privacy Policy
                        </a>
                        . <span className="text-rose-500 font-bold">*</span>
                      </span>
                    </label>
                    {errors.termsAccepted && (
                      <p className="mt-1 text-[11px] text-rose-500 font-semibold pl-6.5">
                        {errors.termsAccepted}
                      </p>
                    )}
                  </div>

                  {/* Error Alert */}
                  {submitError && (
                    <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-semibold text-rose-700">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                      <p>{submitError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      full
                      size="md"
                      className="font-black text-sm shadow-md"
                    >
                      {isSubmitting ? 'Booking Free Trial...' : 'Book a Free Trial 🚀'}
                    </Button>
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
