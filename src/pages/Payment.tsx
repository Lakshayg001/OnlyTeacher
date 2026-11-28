import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Printer,
  ChevronRight,
  CreditCard,
  Building2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

interface StudentInfo {
  studentId: string;
  parentName?: string;
  studentName?: string;
  year?: string;
  subject?: string;
  email?: string;
}

interface PlanInfo {
  planId: string;
  name: string;
  description?: string;
  durationMonths?: number;
}

interface GatewayInfo {
  name: string;
  currency: string;
}

interface PaymentDetails {
  paymentId: string;
  status: 'PENDING' | 'INITIATED' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'EXPIRED';
  gateway?: string;
  student?: StudentInfo;
  plan?: PlanInfo;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  currency: string;
  linkExpiresAt?: string;
  paidAt?: string;
  availableGateways?: GatewayInfo[];
}

export function formatMoney(amountMinor: number, currency: string = 'INR'): string {
  if (amountMinor === undefined || amountMinor === null || isNaN(amountMinor)) {
    return `${currency} 0`;
  }
  const major = amountMinor / 100;
  try {
    return new Intl.NumberFormat(currency.toUpperCase() === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: major % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(major);
  } catch {
    return `${currency.toUpperCase()} ${major.toLocaleString()}`;
  }
}

// Dynamically load the Cashfree v3 JavaScript SDK
function loadCashfreeSDK(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).Cashfree) {
      resolve((window as any).Cashfree);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).Cashfree) {
        resolve((window as any).Cashfree);
      } else {
        reject(new Error('Cashfree SDK loaded but Cashfree constructor not found.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Cashfree checkout SDK.'));
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student_id') || searchParams.get('studentId') || '';
  const rawToken = searchParams.get('token') || '';

  // Cache token in sessionStorage so returning from PayPal (where PayPal might pass its own token=EC-...) doesn't lose authorization
  const effectiveToken = useMemo(() => {
    if (rawToken && !rawToken.startsWith('EC-')) {
      try {
        sessionStorage.setItem(`tot_payment_token_${studentId}`, rawToken);
      } catch {}
      return rawToken;
    }
    try {
      const cached = sessionStorage.getItem(`tot_payment_token_${studentId}`);
      if (cached) return cached;
    } catch {}
    return rawToken;
  }, [rawToken, studentId]);

  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);

  // Fetch payment details
  const fetchPaymentDetails = useCallback(async () => {
    if (!studentId || !effectiveToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorStatus(null);
    setErrorMessage(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/payments/details?student_id=${encodeURIComponent(studentId)}&token=${encodeURIComponent(effectiveToken)}`
        : `/api/payments/details?student_id=${encodeURIComponent(studentId)}&token=${encodeURIComponent(effectiveToken)}`;

      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        setErrorStatus(res.status);
        if (res.status === 410) {
          setErrorMessage('This payment link has expired. Please contact us to receive an updated link.');
        } else if (res.status === 403) {
          setErrorMessage('Invalid or unauthorized payment link. Please verify the URL from your email.');
        } else if (res.status === 429) {
          setErrorMessage('Too many requests. Please wait a moment and refresh.');
        } else {
          setErrorMessage(`Unable to retrieve payment information (Status: ${res.status}).`);
        }
        setIsLoading(false);
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        const d: PaymentDetails = json.data;
        setDetails(d);

        // Pre-select gateway if order is initiated, or choose the first available
        if (d.gateway) {
          setSelectedGateway(d.gateway);
        } else if (d.availableGateways && d.availableGateways.length > 0) {
          setSelectedGateway(d.availableGateways[0].name);
        } else {
          setSelectedGateway('CASHFREE');
        }
      } else {
        setErrorMessage(json.message || 'Payment details could not be loaded.');
      }
    } catch (err: any) {
      console.error('Failed to load payment details:', err);
      setErrorMessage(err.message || 'Network error while loading payment details.');
    } finally {
      setIsLoading(false);
    }
  }, [studentId, effectiveToken]);

  useEffect(() => {
    fetchPaymentDetails();
  }, [fetchPaymentDetails]);

  // Auto-verify if returning from PayPal (e.g. searchParams has PayerID or order is INITIATED with PayPal)
  useEffect(() => {
    if (!details?.paymentId || details.status !== 'INITIATED') return;

    const payerId = searchParams.get('PayerID');
    if (payerId || details.gateway === 'PAYPAL') {
      const verifyEndpoint = import.meta.env.PROD
        ? 'https://api.theonlyteacher.com/api/payments/verify'
        : '/api/payments/verify';

      fetch(verifyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: details.paymentId }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.success) {
            fetchPaymentDetails();
          }
        })
        .catch(() => {});
    }
  }, [details?.paymentId, details?.status, details?.gateway, searchParams, fetchPaymentDetails]);

  // Handle gateway cancellation to switch gateway
  const handleCancelInitiatedOrder = async () => {
    if (!details?.paymentId || !effectiveToken) return;
    setIsProcessing(true);
    setProcessError(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/payments/${details.paymentId}/cancel`
        : `/api/payments/${details.paymentId}/cancel`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-Payment-Token': effectiveToken,
        },
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setDetails(json.data);
      } else {
        setProcessError(json.message || 'Failed to change payment method.');
      }
    } catch (err: any) {
      setProcessError(err.message || 'Error communicating with server.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Initiate Payment
  const handleInitiatePayment = async () => {
    if (!details?.paymentId || !effectiveToken) return;
    if (!selectedGateway) {
      setProcessError('Please select a payment gateway.');
      return;
    }

    setIsProcessing(true);
    setProcessError(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/payments/${details.paymentId}/initiate`
        : `/api/payments/${details.paymentId}/initiate`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Payment-Token': effectiveToken,
        },
        body: JSON.stringify({ gateway: selectedGateway }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || `Payment initiation failed (${res.status}).`);
      }

      const initData = json.data;

      // Handle PayPal: Redirect to PayPal checkout URL
      if (selectedGateway === 'PAYPAL' || initData.checkoutUrl) {
        if (initData.checkoutUrl) {
          window.location.href = initData.checkoutUrl;
          return;
        } else {
          throw new Error('PayPal checkout URL was not provided by the server.');
        }
      }

      // Handle Cashfree: Open Cashfree Dropin / Modal Checkout
      if (selectedGateway === 'CASHFREE' || initData.paymentSessionId) {
        if (!initData.paymentSessionId) {
          throw new Error('Cashfree payment session ID not received.');
        }

        const Cashfree = await loadCashfreeSDK();
        const cashfree = Cashfree({
          mode: import.meta.env.PROD ? 'production' : 'sandbox',
        });

        // Launch modal checkout
        await cashfree.checkout({
          paymentSessionId: initData.paymentSessionId,
          redirectTarget: '_modal',
        });

        // Verify status server-side after modal closure
        try {
          const verifyEndpoint = import.meta.env.PROD
            ? 'https://api.theonlyteacher.com/api/payments/verify'
            : '/api/payments/verify';

          await fetch(verifyEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: details.paymentId }),
          });
        } catch {
          // Verify call is best effort; refresh details next
        }

        // Refresh latest payment details
        await fetchPaymentDetails();
      }
    } catch (err: any) {
      console.error('Initiate payment error:', err);
      setProcessError(err.message || 'Payment initiation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // --------------------------------------------------------------------------
  // Missing or Invalid URL Parameters
  // --------------------------------------------------------------------------
  if (!studentId || !effectiveToken) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-navy-50/50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-navy-100 shadow-clay text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-navy-800">
              Payment Link Required
            </h1>
            <p className="mt-2 text-sm font-semibold text-navy-500 leading-relaxed">
              To proceed with your enrollment, please click the secure payment link provided in your email or WhatsApp message from The Only Teacher admissions team.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/">
              <Button size="md" variant="dark" className="w-full justify-center">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-navy-50/40">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
          <p className="font-display text-lg font-extrabold text-navy-700">
            Loading your enrollment details…
          </p>
          <p className="text-xs font-semibold text-navy-400">
            Authorizing secure link for Student ID: {studentId}
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Expired / Error State
  // --------------------------------------------------------------------------
  if (errorMessage || !details) {
    const isExpired = errorStatus === 410;
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-navy-50/50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-navy-100 shadow-clay text-center space-y-5">
          <div
            className={cn(
              'w-16 h-16 rounded-full mx-auto flex items-center justify-center',
              isExpired ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600',
            )}
          >
            {isExpired ? <Clock className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-navy-800">
              {isExpired ? 'Payment Link Expired' : 'Unable to Load Payment'}
            </h1>
            <p className="mt-2 text-sm font-semibold text-navy-500 leading-relaxed">
              {errorMessage || 'This payment link is invalid or no longer active.'}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href="https://wa.me/919977323370?text=Hi%2C%20I%20need%20a%20new%20payment%20link%20for%20my%20student%20enrollment."
              target="_blank"
              rel="noreferrer"
            >
              <Button size="md" className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold">
                Request New Link on WhatsApp
              </Button>
            </a>
            <Button
              size="md"
              variant="outline"
              onClick={fetchPaymentDetails}
              className="w-full justify-center"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Success / Paid State
  // --------------------------------------------------------------------------
  if (details.status === 'SUCCESS' || details.paidAt) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-navy-50/60 via-white to-navy-50/30 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-emerald-100 bg-white p-8 sm:p-10 shadow-clay space-y-8"
          >
            {/* Header Celebration */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50/60">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-emerald-800">
                <Sparkles className="w-3.5 h-3.5" /> Enrollment Confirmed
              </span>
              <h1 className="font-display text-3xl font-extrabold text-navy-800">
                Payment Received Successfully!
              </h1>
              <p className="text-sm font-semibold text-navy-500 max-w-md mx-auto">
                Thank you! We have verified your payment. A confirmation receipt and class onboarding pack have been sent to your registered email.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="rounded-3xl bg-navy-50/70 border border-navy-100 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-navy-200/50 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-navy-400">
                  Payment Reference
                </span>
                <span className="font-mono text-xs font-bold text-navy-800">
                  {details.paymentId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="block font-bold text-navy-400">Student Name</span>
                  <span className="font-extrabold text-navy-800">{details.student?.studentName || '-'}</span>
                </div>
                <div>
                  <span className="block font-bold text-navy-400">Student ID</span>
                  <span className="font-extrabold text-navy-800">{details.student?.studentId || studentId}</span>
                </div>
                <div>
                  <span className="block font-bold text-navy-400">Enrolled Course</span>
                  <span className="font-extrabold text-navy-800">{details.plan?.name || 'Academic Program'}</span>
                </div>
                <div>
                  <span className="block font-bold text-navy-400">Subject / Year</span>
                  <span className="font-extrabold text-navy-800">
                    {details.student?.subject || ''} ({details.student?.year || ''})
                  </span>
                </div>
                <div>
                  <span className="block font-bold text-navy-400">Paid Amount</span>
                  <span className="text-base font-extrabold text-emerald-700">
                    {formatMoney(details.finalAmount, details.currency)}
                  </span>
                </div>
                <div>
                  <span className="block font-bold text-navy-400">Paid Date</span>
                  <span className="font-bold text-navy-700">
                    {details.paidAt ? new Date(details.paidAt).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                onClick={() => window.print()}
                icon={<Printer className="w-4 h-4" />}
              >
                Print Receipt
              </Button>
              <a
                href="https://wa.me/919977323370?text=Hi%2C%20I%20have%20completed%20the%20payment%20for%20my%20enrollment.%20Please%20guide%20me%20for%20the%20onboarding."
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button size="md" className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-sm">
                  Connect with Academic Mentor
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Pending / Initiated Checkout Screen
  // --------------------------------------------------------------------------
  const availableGateways = details.availableGateways && details.availableGateways.length > 0
    ? details.availableGateways
    : [
        { name: 'CASHFREE', currency: details.currency || 'INR' },
        { name: 'PAYPAL', currency: 'USD' },
      ];

  const isInitiatedWithOther = details.status === 'INITIATED' && details.gateway;

  return (
    <div className="min-h-screen bg-navy-50/40 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Breadcrumb / Trust Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-3xl p-4 sm:px-6 border border-navy-100 shadow-sm">
          <div className="flex items-center gap-3">
            <Logo to="/" className="h-10 w-10 rounded-full bg-navy-800 p-1 flex items-center justify-center" imgClassName="h-full w-full object-contain" />
            <div>
              <h2 className="font-display text-base font-extrabold text-navy-800 leading-tight">
                The Only Teacher — Secure Checkout
              </h2>
              <p className="text-[11px] font-bold text-navy-400">
                Official Student Enrollment &amp; Payment Gateway
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            256-bit Encrypted
          </div>
        </div>

        {/* Process error alert */}
        {processError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{processError}</span>
          </div>
        )}

        {/* Active Order Notice */}
        {isInitiatedWithOther && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-bold text-amber-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                You have an active session with <strong>{details.gateway}</strong>. You can resume checkout or change your payment method.
              </span>
            </div>
            <button
              onClick={handleCancelInitiatedOrder}
              disabled={isProcessing}
              className="text-amber-800 underline hover:text-amber-950 font-extrabold shrink-0"
            >
              Change Gateway
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Left: Student Details + Gateway Selection */}
          <div className="space-y-6 lg:col-span-7">
            {/* Student & Course Summary */}
            <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-navy-100 pb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-400">
                    Enrolling Student
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-navy-800">
                    {details.student?.studentName || 'Student'}
                  </h3>
                </div>
                <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-mono font-bold text-navy-700">
                  {details.student?.studentId || studentId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-navy-400">Parent / Guardian:</span>
                  <p className="font-extrabold text-navy-800">{details.student?.parentName || '-'}</p>
                </div>
                <div>
                  <span className="font-bold text-navy-400">Notification Email:</span>
                  <p className="font-extrabold text-navy-800 truncate">{details.student?.email || '-'}</p>
                </div>
                <div>
                  <span className="font-bold text-navy-400">Year / Grade:</span>
                  <p className="font-extrabold text-navy-800">{details.student?.year || '-'}</p>
                </div>
                <div>
                  <span className="font-bold text-navy-400">Primary Subject:</span>
                  <p className="font-extrabold text-navy-800">{details.student?.subject || '-'}</p>
                </div>
              </div>

              {/* Course Plan Card */}
              <div className="rounded-2xl bg-navy-50 p-4 border border-navy-100/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-amber-600">
                      Selected Plan
                    </span>
                    <h4 className="font-display text-base font-extrabold text-navy-800">
                      {details.plan?.name || 'Academic Package'}
                    </h4>
                    {details.plan?.description && (
                      <p className="mt-1 text-xs font-semibold text-navy-500">
                        {details.plan.description}
                      </p>
                    )}
                  </div>
                  {details.plan?.durationMonths && (
                    <span className="rounded-xl bg-white px-2.5 py-1 text-xs font-extrabold text-navy-700 shadow-sm shrink-0">
                      {details.plan.durationMonths} Months
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-display text-lg font-extrabold text-navy-800">
                  Select Payment Method
                </h3>
                <p className="text-xs font-semibold text-navy-400">
                  All transactions are secured by 256-bit SSL encryption.
                </p>
              </div>

              <div className="space-y-3">
                {availableGateways.map((gw) => {
                  const isSelected = selectedGateway === gw.name;
                  const isCashfree = gw.name.toUpperCase() === 'CASHFREE';
                  const isPayPal = gw.name.toUpperCase() === 'PAYPAL';

                  return (
                    <label
                      key={gw.name}
                      onClick={() => setSelectedGateway(gw.name)}
                      className={cn(
                        'flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-all duration-200',
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400/20 shadow-sm'
                          : 'border-navy-100 bg-white hover:border-navy-200 hover:bg-navy-50/30',
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentGateway"
                        value={gw.name}
                        checked={isSelected}
                        onChange={() => setSelectedGateway(gw.name)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-navy-300"
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold text-navy-800">
                            {isCashfree
                              ? 'UPI, Cards & NetBanking (Cashfree)'
                              : isPayPal
                              ? 'PayPal & International Cards'
                              : gw.name}
                          </span>
                          <span className="rounded-full bg-navy-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-navy-600">
                            {gw.currency}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs font-semibold text-navy-400">
                          {isCashfree
                            ? 'Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard, NetBanking'
                            : isPayPal
                            ? 'Credit/Debit Cards, PayPal Balance, Multi-currency'
                            : `Pay securely in ${gw.currency}`}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-navy-400">
                        {isCashfree ? (
                          <Building2 className="w-5 h-5 text-amber-600" />
                        ) : (
                          <CreditCard className="w-5 h-5 text-navy-700" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Pay Button */}
              <div className="pt-2">
                <Button
                  onClick={handleInitiatePayment}
                  disabled={isProcessing || !selectedGateway}
                  size="lg"
                  className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-clay-amber"
                  icon={
                    isProcessing ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )
                  }
                >
                  {isProcessing
                    ? 'Connecting to Gateway…'
                    : `Pay ${formatMoney(details.finalAmount, details.currency)} Now`}
                </Button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] font-bold text-navy-400 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-navy-300" />
                  Your payment data is securely tokenized and never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Support */}
          <div className="space-y-6 lg:col-span-5">
            {/* Price Breakdown Card */}
            <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm space-y-5">
              <h3 className="font-display text-lg font-extrabold text-navy-800 border-b border-navy-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-navy-600 font-bold">
                  <span>Standard Tuition Fee</span>
                  <span>{formatMoney(details.originalAmount, details.currency)}</span>
                </div>

                {details.discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-extrabold">
                    <span>Scholarship / Academic Discount</span>
                    <span>-{formatMoney(details.discountAmount, details.currency)}</span>
                  </div>
                )}

                <div className="border-t border-navy-100 pt-3 flex items-center justify-between">
                  <span className="font-display text-base font-extrabold text-navy-800">
                    Total Payable Amount
                  </span>
                  <span className="font-display text-2xl font-extrabold text-amber-600">
                    {formatMoney(details.finalAmount, details.currency)}
                  </span>
                </div>
              </div>

              {/* Expiry Badge if provided */}
              {details.linkExpiresAt && (
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200/50 p-3 text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Link valid until:{' '}
                    {new Date(details.linkExpiresAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Support / Help Card */}
            <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-navy-800">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h4 className="font-display text-base font-extrabold">Need Help with Payment?</h4>
              </div>
              <p className="text-xs font-semibold text-navy-500 leading-relaxed">
                If you encounter any gateway issues or would like to make payment via alternate international wire (Skydo / SWIFT), our admissions desk is here to assist.
              </p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/919977323370?text=Hi%2C%20I%20am%20making%20payment%20for%20Student%20ID%20${encodeURIComponent(studentId)}%20and%20need%20assistance.`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold"
                  >
                    Chat on WhatsApp (+91 99773 23370)
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

