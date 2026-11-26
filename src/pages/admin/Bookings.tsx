import { useMemo, useState, useEffect } from 'react';
import { COUNTRIES } from '@/data/site';
import { useNavigate } from 'react-router-dom';
import Flag from '@/components/ui/Flag';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Filter,
  Search,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  MessageCircle,
  Mail,
  Phone,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  CreditCard,
  Link2,
  Copy,
  Check,
  Share2,
} from 'lucide-react';
import { formatMoney } from '@/pages/Payment';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Panel, StatusPill, Table } from './AdminKit';
import { cn } from '@/lib/utils';

type FilterTab = 'all' | 'PENDING' | 'ACCEPTED' | 'REJECTED';

const TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Requests' },
  { id: 'PENDING', label: 'Pending Review' },
  { id: 'ACCEPTED', label: 'Accepted' },
  { id: 'REJECTED', label: 'Rejected' },
];

function mapBooking(b: any) {
  return {
    id: b.studentId || b.id,
    studentId: b.studentId || b.id,
    student: `${b.studentFirstName || ''} ${b.studentLastName || ''}`.trim() || 'Unknown Student',
    studentFirstName: b.studentFirstName || '',
    studentLastName: b.studentLastName || '',
    parent: `${b.parentFirstName || ''} ${b.parentLastName || ''}`.trim() || 'Unknown Parent',
    parentFirstName: b.parentFirstName || '',
    parentLastName: b.parentLastName || '',
    studentRelation: b.studentRelation || 'Child',
    nationality: b.nationality || 'International',
    grade: b.year || '-',
    year: b.year || '-',
    subject: b.subject || '-',
    planName: b.planContext?.planName || '-',
    planPrice: b.planContext?.price || '-',
    planTier: b.planContext?.tierTitle || '',
    planType: b.planContext?.planType || '',
    status: (b.bookingStatus || b.status || 'PENDING').toUpperCase(),
    phoneCode: b.phoneCode || '',
    phone: b.phoneNumber || b.phone || '',
    whatsappCode: b.whatsappCode || '',
    whatsapp: b.whatsappNumber || b.whatsapp || '',
    email: b.email || '',
    createdAt: b.createdAt,
    termsAcceptedAt: b.termsAcceptedAt,
    termsVersion: b.termsVersion,
    acceptedBy: b.acceptedBy,
    acceptedAt: b.acceptedAt,
    rejectedBy: b.rejectedBy,
    rejectedAt: b.rejectedAt,
    rejectionReason: b.rejectionReason,
    flag:
      COUNTRIES.find(
        (c) => c.name.toLowerCase() === (b.nationality || '').toLowerCase()
      )?.flag ||
      b.phoneCountryCode ||
      b.whatsappCountryCode ||
      'UN',
    raw: b,
  };
}

export default function Bookings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<FilterTab>('all');
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Accept / Reject Action States
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('Subject not offered for this year group.');

  // Payment link generation & plan assignment states
  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [showPaymentLinkSection, setShowPaymentLinkSection] = useState(false);
  const [generatedPaymentLink, setGeneratedPaymentLink] = useState<any | null>(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Existing assignments for current selected student
  const [existingAssignments, setExistingAssignments] = useState<any[]>([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);

  const closeBookingModal = () => {
    setSelectedBooking(null);
    setShowRejectInput(false);
    setActionMessage(null);
    setShowPaymentLinkSection(false);
    setGeneratedPaymentLink(null);
    setLinkError(null);
    setCopiedLink(false);
    setExistingAssignments([]);
  };

  // Fetch plans from GET /api/admin/plans
  const fetchPlans = async () => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;
    setPlansLoading(true);
    try {
      const endpoint = import.meta.env.PROD
        ? 'https://api.theonlyteacher.com/api/admin/plans'
        : '/api/admin/plans';

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const activePlans = json.data.filter((p: any) => p.active !== false);
          setPlans(activePlans);
          if (activePlans.length > 0 && !selectedPlanId) {
            setSelectedPlanId(activePlans[0].planId);
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch admin plans:', e);
    } finally {
      setPlansLoading(false);
    }
  };

  // Fetch student's plan assignments from GET /api/admin/students/{studentId}/plan-assignments
  const fetchPlanAssignments = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;
    setAssignmentsLoading(true);
    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/students/${studentId}/plan-assignments`
        : `/api/admin/students/${studentId}/plan-assignments`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setExistingAssignments(json.data);
        } else {
          setExistingAssignments([]);
        }
      }
    } catch (e) {
      console.error('Failed to fetch student plan assignments:', e);
      setExistingAssignments([]);
    } finally {
      setAssignmentsLoading(false);
    }
  };

  // Generate / Refresh a payment link for current plan assignment via POST /api/admin/students/{studentId}/payment-link
  const handleRefreshPaymentLink = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    setLinkLoading(true);
    setLinkError(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/students/${studentId}/payment-link`
        : `/api/admin/students/${studentId}/payment-link`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        throw new Error(json?.message || `Failed to generate payment link (${res.status})`);
      }

      let rawUrl = json.data.paymentUrl || '';
      let finalUrl = rawUrl;
      if (rawUrl) {
        try {
          const parsed = new URL(rawUrl);
          finalUrl = `${window.location.origin}/payment${parsed.search}`;
        } catch {
          finalUrl = rawUrl.startsWith('http') ? rawUrl : `${window.location.origin}${rawUrl}`;
        }
      }

      setGeneratedPaymentLink({
        ...json.data,
        paymentUrl: finalUrl,
      });

      fetchPlanAssignments(studentId);
    } catch (err: any) {
      console.error('Error refreshing payment link:', err);
      setLinkError(err?.message || 'Failed to refresh payment link.');
    } finally {
      setLinkLoading(false);
    }
  };

  // Assign a new plan via POST /api/admin/students/{studentId}/assign-plan
  const handleAssignPlan = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    if (!selectedPlanId) {
      setLinkError('Please select a plan to assign.');
      return;
    }

    setLinkLoading(true);
    setLinkError(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/students/${studentId}/assign-plan`
        : `/api/admin/students/${studentId}/assign-plan`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({ planId: selectedPlanId }),
      });

      let json = await res.json().catch(() => null);

      // If already assigned (409), automatically generate a fresh payment link
      if (res.status === 409) {
        return await handleRefreshPaymentLink(studentId);
      }

      if (!res.ok || !json?.success) {
        throw new Error(json?.message || `Failed to assign plan (${res.status})`);
      }

      let rawUrl = json.data.paymentUrl || '';
      let finalUrl = rawUrl;
      if (rawUrl) {
        try {
          const parsed = new URL(rawUrl);
          finalUrl = `${window.location.origin}/payment${parsed.search}`;
        } catch {
          finalUrl = rawUrl.startsWith('http') ? rawUrl : `${window.location.origin}${rawUrl}`;
        }
      }

      setGeneratedPaymentLink({
        ...json.data,
        paymentUrl: finalUrl,
      });

      setShowPaymentLinkSection(false);
      fetchPlanAssignments(studentId);
    } catch (err: any) {
      console.error('Error assigning plan:', err);
      setLinkError(err?.message || 'Error communicating with server.');
    } finally {
      setLinkLoading(false);
    }
  };

  // Fetch all bookings or filtered by status using GET /api/admin/demo-bookings
  const fetchBookings = async (statusFilter?: FilterTab) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setIsLoading(true);
    try {
      const activeTab = statusFilter !== undefined ? statusFilter : tab;
      const params = new URLSearchParams();
      params.append('page', '0');
      params.append('size', '200');
      if (activeTab && activeTab !== 'all') {
        params.append('status', activeTab);
      }

      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/demo-bookings?${params.toString()}`
        : `/api/admin/demo-bookings?${params.toString()}`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('tot_admin_token');
        navigate('/admin/login');
        return;
      }

      let items: any[] = [];
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.content) {
          items = json.data.content.map(mapBooking);
        }
      } else {
        // Fallback to legacy contacts if demo-bookings endpoint is unavailable
        const legacyEndpoint = import.meta.env.PROD
          ? 'https://api.theonlyteacher.com/api/admin/contacts?page=0&size=100&sort=createdAt,desc'
          : '/api/admin/contacts?page=0&size=100&sort=createdAt,desc';

        const legacyRes = await fetch(legacyEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (legacyRes.ok) {
          const ljson = await legacyRes.json();
          if (ljson.success && ljson.data?.content) {
            items = ljson.data.content.map((b: any) => ({
              ...b,
              studentId: b.id,
              status: (b.status || 'PENDING').toUpperCase(),
              flag: COUNTRIES.find((c) => c.name === b.country)?.flag || 'UN',
            }));
          }
        }
      }

      setBookings(items);
    } catch (e) {
      console.error('Failed to fetch demo bookings:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch full details of one demo booking using GET /api/admin/demo-bookings/{studentId}
  const fetchSingleBooking = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    setIsDetailLoading(true);
    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/demo-bookings/${studentId}`
        : `/api/admin/demo-bookings/${studentId}`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const fresh = mapBooking(json.data);
          setSelectedBooking(fresh);
          // Also update in list if present
          setBookings((prev) =>
            prev.map((b) => (b.studentId === studentId ? { ...b, ...fresh } : b))
          );
          // Fetch existing plan assignments for this student
          fetchPlanAssignments(studentId);
        }
      }
    } catch (e) {
      console.error(`Failed to fetch details for student ${studentId}:`, e);
    } finally {
      setIsDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings('all');
  }, [navigate]);

  const handleTabChange = (newTab: FilterTab) => {
    setTab(newTab);
    fetchBookings(newTab);
  };

  // Handle Accept Booking via POST /api/admin/demo-bookings/{studentId}/accept
  const handleAcceptBooking = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    setActionLoading(true);
    setActionMessage(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/demo-bookings/${studentId}/accept`
        : `/api/admin/demo-bookings/${studentId}/accept`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || (json && json.success === false)) {
        throw new Error(json?.message || `Failed to accept booking (${res.status})`);
      }

      const now = new Date().toISOString();
      setBookings((prev) =>
        prev.map((b) =>
          b.studentId === studentId ? { ...b, status: 'ACCEPTED', acceptedAt: now } : b
        )
      );

      if (selectedBooking && selectedBooking.studentId === studentId) {
        setSelectedBooking((prev: any) => ({
          ...prev,
          status: 'ACCEPTED',
          acceptedAt: now,
        }));
      }

      setActionMessage({ type: 'success', text: 'Booking successfully ACCEPTED!' });
      // Refresh single booking record
      fetchSingleBooking(studentId);
    } catch (err: any) {
      console.error('Error accepting booking:', err);
      setActionMessage({ type: 'error', text: err.message || 'Could not accept booking.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Reject Booking via POST /api/admin/demo-bookings/{studentId}/reject
  const handleRejectBooking = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    setActionLoading(true);
    setActionMessage(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/demo-bookings/${studentId}/reject`
        : `/api/admin/demo-bookings/${studentId}/reject`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ reason: rejectReason.trim() }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || (json && json.success === false)) {
        throw new Error(json?.message || `Failed to reject booking (${res.status})`);
      }

      const now = new Date().toISOString();
      setBookings((prev) =>
        prev.map((b) =>
          b.studentId === studentId
            ? { ...b, status: 'REJECTED', rejectedAt: now, rejectionReason: rejectReason }
            : b
        )
      );

      if (selectedBooking && selectedBooking.studentId === studentId) {
        setSelectedBooking((prev: any) => ({
          ...prev,
          status: 'REJECTED',
          rejectedAt: now,
          rejectionReason: rejectReason,
        }));
      }

      setShowRejectInput(false);
      setActionMessage({ type: 'success', text: 'Booking status set to REJECTED.' });
      // Refresh single booking record
      fetchSingleBooking(studentId);
    } catch (err: any) {
      console.error('Error rejecting booking:', err);
      setActionMessage({ type: 'error', text: err.message || 'Could not reject booking.' });
    } finally {
      setActionLoading(false);
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: bookings.length, PENDING: 0, ACCEPTED: 0, REJECTED: 0 };
    for (const b of bookings) {
      const s = (b.status || 'PENDING').toUpperCase();
      c[s] = (c[s] ?? 0) + 1;
    }
    return c;
  }, [bookings]);

  const rows = bookings.filter((b) => {
    if (tab !== 'all' && (b.status || '').toUpperCase() !== tab) return false;
    if (
      query &&
      !`${b.id} ${b.student} ${b.parent} ${b.subject} ${b.planName} ${b.email} ${b.phone} ${b.whatsapp}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <Panel
        title="Demo Bookings & Enrolments"
        sub={`${rows.length} of ${bookings.length} demo requests listed`}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchBookings(tab)}
            icon={<RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />}
          >
            Refresh
          </Button>
        }
      >
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-extrabold transition-all',
                  tab === t.id
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'border border-navy-100 text-navy-500 hover:border-amber-300 hover:text-amber-600',
                )}
              >
                {t.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[10.5px]',
                    tab === t.id ? 'bg-white/20' : 'bg-navy-100 text-navy-500',
                  )}
                >
                  {counts[t.id] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search student, parent, ID..."
              className="h-11 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-[13.5px] font-semibold text-navy-700 outline-none transition-colors focus:border-amber-300 focus:bg-white"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center py-14 text-center">
            <ClayIcon name="calendar" size={48} className="animate-spin" />
            <p className="mt-3 font-display text-lg font-extrabold text-navy-700">Loading demo bookings...</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center py-14 text-center">
            <ClayIcon name="calendar" size={64} />
            <p className="mt-3 font-display text-lg font-extrabold text-navy-700">No demo bookings found</p>
            <p className="text-[13.5px] font-semibold text-navy-400">
              {tab !== 'all' ? `No bookings with status ${tab}.` : 'There are no demo bookings in the system yet.'}
            </p>
          </div>
        ) : (
          <Table head={['Ref ID', 'Student & Parent', 'Year · Subject', 'Plan / Price', 'Status', 'Contact Info', 'Created', 'Actions']}>
            {rows.map((b) => (
              <tr key={b.id} className="transition-colors hover:bg-navy-50/60">
                <td className="whitespace-nowrap px-3 py-3 font-mono text-[12px] font-bold text-navy-500">
                  {b.studentId || b.id}
                </td>
                <td className="px-3 py-3">
                  <span className="block text-[13.5px] font-extrabold text-navy-800">
                    {b.student}
                  </span>
                  <span className="block text-[11.5px] font-bold text-navy-400">
                    <Flag code={b.flag} size={14} /> {b.parent} ({b.studentRelation})
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[13px] font-bold text-navy-600">
                  <span className="block">{b.year}</span>
                  <span className="block text-[11.5px] text-navy-400">{b.subject}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-navy-600">
                  <span className="block font-bold text-navy-800">{b.planName}</span>
                  <span className="block text-[11px] text-amber-600 font-extrabold">{b.planPrice}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <StatusPill status={b.status} />
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold text-navy-600">
                  <div className="flex items-center gap-2">
                    <span>{b.phoneCode} {b.phone}</span>
                    {b.whatsapp && (
                      <a
                        href={`https://wa.me/${(b.whatsappCode + b.whatsapp).replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 hover:text-emerald-700"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <span className="block text-navy-400 text-[11px]">{b.email}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold text-navy-500">
                  {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-3 py-3 text-right">
                  <button
                    onClick={() => {
                      setSelectedBooking(b);
                      setActionMessage(null);
                      setShowRejectInput(false);
                      fetchSingleBooking(b.studentId || b.id);
                    }}
                    className="rounded-full border border-navy-100 px-3 py-1.5 text-[12px] font-extrabold text-navy-600 transition-colors hover:border-amber-300 hover:text-amber-600"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}

        <p className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-navy-400">
          <Filter className="h-3.5 w-3.5" />
          Live queue connected with GET /api/admin/demo-bookings. Review requests, inspect details, accept or reject.
        </p>
      </Panel>

      {/* Booking Detail Modal (Inspect GET /api/admin/demo-bookings/{studentId}) */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm"
              onClick={closeBookingModal}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-clay-navy pointer-events-auto flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-navy-100 bg-navy-50/50 p-6 shrink-0">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-display text-2xl font-extrabold text-navy-800">
                        {selectedBooking.student}
                      </h2>
                      <StatusPill status={selectedBooking.status} />
                      {isDetailLoading && (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-500" />
                      )}
                    </div>
                    <p className="mt-1 flex items-center gap-2 text-sm font-bold text-navy-500">
                      <Flag code={selectedBooking.flag || 'UN'} size={14} />
                      Parent: {selectedBooking.parent} ({selectedBooking.studentRelation}) · {selectedBooking.nationality}
                    </p>
                  </div>
                  <button
                    onClick={closeBookingModal}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy-400 shadow-sm transition-colors hover:bg-navy-50 hover:text-navy-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
                  {actionMessage && (
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-2xl p-4 text-xs font-bold',
                        actionMessage.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200',
                      )}
                    >
                      {actionMessage.type === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                      )}
                      <span>{actionMessage.text}</span>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Academic Details */}
                    <div className="space-y-4 rounded-2xl bg-navy-50 p-5">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-400">
                        Academic Details
                      </h3>
                      <dl className="space-y-3 text-sm">
                        <div>
                          <dt className="font-bold text-navy-500">Student Year / Grade</dt>
                          <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.year}</dd>
                        </div>
                        <div>
                          <dt className="font-bold text-navy-500">Requested Subject</dt>
                          <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.subject}</dd>
                        </div>
                        <div>
                          <dt className="font-bold text-navy-500">Selected Plan / Package</dt>
                          <dd className="mt-0.5 font-extrabold text-navy-800">
                            {selectedBooking.planName}
                            {selectedBooking.planPrice !== '-' && (
                              <span className="ml-2 font-bold text-amber-600">({selectedBooking.planPrice})</span>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4 rounded-2xl bg-navy-50 p-5">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-400">
                        Contact Details
                      </h3>
                      <dl className="space-y-3 text-sm">
                        <div>
                          <dt className="font-bold text-navy-500">Email Address</dt>
                          <dd className="mt-0.5 font-extrabold text-navy-800">{selectedBooking.email}</dd>
                        </div>
                        <div>
                          <dt className="font-bold text-navy-500">Verified Calling Phone</dt>
                          <dd className="mt-0.5 font-extrabold text-navy-800">
                            {selectedBooking.phoneCode} {selectedBooking.phone}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-bold text-navy-500">WhatsApp Number</dt>
                          <dd className="mt-0.5 font-extrabold text-navy-800 flex items-center gap-2">
                            <span>{selectedBooking.whatsappCode} {selectedBooking.whatsapp}</span>
                            {selectedBooking.whatsapp && (
                              <a
                                href={`https://wa.me/${(selectedBooking.whatsappCode + selectedBooking.whatsapp).replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-emerald-700 transition-colors"
                              >
                                Chat <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Metadata & Audit */}
                    <div className="col-span-full space-y-3 rounded-2xl border border-navy-100 bg-white p-5 text-xs">
                      <h3 className="font-extrabold uppercase tracking-wider text-navy-400">
                        Booking Record &amp; Audit (ID: {selectedBooking.studentId || selectedBooking.id})
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <span className="font-bold text-navy-400">Booked On:</span>
                          <span className="ml-1 font-bold text-navy-800">
                            {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString() : '-'}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-navy-400">T&amp;C Agreed:</span>
                          <span className="ml-1 font-bold text-navy-800">
                            {selectedBooking.termsAcceptedAt ? new Date(selectedBooking.termsAcceptedAt).toLocaleString() : '-'}
                          </span>
                        </div>
                        {selectedBooking.termsVersion && (
                          <div>
                            <span className="font-bold text-navy-400">Terms Version:</span>
                            <span className="ml-1 font-bold text-navy-800">{selectedBooking.termsVersion}</span>
                          </div>
                        )}
                        {selectedBooking.acceptedBy && (
                          <div>
                            <span className="font-bold text-emerald-600">Accepted By:</span>
                            <span className="ml-1 font-bold text-navy-800">{selectedBooking.acceptedBy}</span>
                          </div>
                        )}
                        {selectedBooking.acceptedAt && (
                          <div>
                            <span className="font-bold text-emerald-600">Accepted At:</span>
                            <span className="ml-1 font-bold text-navy-800">
                              {new Date(selectedBooking.acceptedAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {selectedBooking.rejectedBy && (
                          <div>
                            <span className="font-bold text-rose-600">Rejected By:</span>
                            <span className="ml-1 font-bold text-navy-800">{selectedBooking.rejectedBy}</span>
                          </div>
                        )}
                        {selectedBooking.rejectedAt && (
                          <div>
                            <span className="font-bold text-rose-600">Rejected At:</span>
                            <span className="ml-1 font-bold text-navy-800">
                              {new Date(selectedBooking.rejectedAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {selectedBooking.rejectionReason && (
                          <div className="col-span-full">
                            <span className="font-bold text-rose-600">Rejection Reason:</span>
                            <span className="ml-1 font-medium text-rose-900">{selectedBooking.rejectionReason}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rejection input box */}
                  {showRejectInput && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 space-y-2">
                      <label className="block text-xs font-bold text-rose-900">
                        Rejection Reason (Max 500 characters):
                      </label>
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="e.g. Subject not offered for this year group."
                        maxLength={500}
                        className="w-full rounded-xl border border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-navy-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowRejectInput(false)}
                          disabled={actionLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleRejectBooking(selectedBooking.studentId)}
                          disabled={actionLoading}
                          className="bg-rose-600 hover:bg-rose-700 text-white"
                        >
                          Confirm Rejection
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Plan Assignment & Payment Link Section */}
                  {selectedBooking.status === 'ACCEPTED' && (
                    <div className="rounded-2xl border border-amber-300 bg-amber-50/50 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-amber-600" />
                          <h3 className="font-display text-base font-extrabold text-navy-800">
                            Student Enrollment &amp; Payment Link
                          </h3>
                        </div>
                        {!showPaymentLinkSection && !generatedPaymentLink && existingAssignments.length === 0 && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setShowPaymentLinkSection(true);
                              fetchPlans();
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold"
                            icon={<Link2 className="w-4 h-4" />}
                          >
                            Assign Plan &amp; Generate Link
                          </Button>
                        )}
                        {!showPaymentLinkSection && existingAssignments.length > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowPaymentLinkSection(true);
                              fetchPlans();
                            }}
                            className="border-amber-400 text-amber-700 hover:bg-amber-100/60 font-bold text-xs"
                          >
                            Change / Reassign Plan
                          </Button>
                        )}
                      </div>

                      {linkError && (
                        <div className="rounded-xl bg-rose-100 p-3 text-xs font-bold text-rose-800 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{linkError}</span>
                        </div>
                      )}

                      {/* Display Existing Plan Assignments */}
                      {assignmentsLoading ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-navy-400 py-3">
                          <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                          Checking student plan assignment status…
                        </div>
                      ) : existingAssignments.length > 0 && !showPaymentLinkSection ? (
                        <div className="space-y-3">
                          {existingAssignments.map((assignment: any, idx: number) => {
                            const isPaid = assignment.paymentStatus === 'SUCCESS';
                            return (
                              <div
                                key={assignment.planId || idx}
                                className="rounded-2xl border border-navy-200/80 bg-white p-4 space-y-3 shadow-sm"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-display font-extrabold text-navy-800 text-sm">
                                        {assignment.planName || assignment.planId}
                                      </h4>
                                      <StatusPill status={assignment.paymentStatus || 'PENDING'} />
                                    </div>
                                    {assignment.planDescription && (
                                      <p className="text-xs text-navy-500 mt-0.5">{assignment.planDescription}</p>
                                    )}
                                    <p className="text-[11px] font-semibold text-navy-400 mt-1">
                                      Duration: {assignment.durationMonths || 1} Months · Assigned by{' '}
                                      {assignment.assignedBy || 'Admin'} on{' '}
                                      {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleDateString() : '-'}
                                    </p>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="font-display text-base font-extrabold text-navy-800">
                                      {formatMoney(assignment.finalAmount, assignment.currency)}
                                    </span>
                                    {assignment.discountAmount > 0 && (
                                      <p className="text-[10px] text-emerald-600 font-bold">
                                        Saved {formatMoney(assignment.discountAmount, assignment.currency)}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-navy-100 pt-3">
                                  <span className="text-[11px] font-mono text-navy-400">
                                    Payment ID: {assignment.paymentId || '-'}
                                  </span>
                                  {!isPaid ? (
                                    <Button
                                      size="sm"
                                      onClick={() => handleRefreshPaymentLink(selectedBooking.studentId)}
                                      disabled={linkLoading}
                                      className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs"
                                      icon={
                                        linkLoading ? (
                                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                          <Link2 className="w-3.5 h-3.5" />
                                        )
                                      }
                                    >
                                      {linkLoading ? 'Generating…' : 'Generate Fresh Payment Link'}
                                    </Button>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Paid &amp; Enrolled
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}

                      {/* Plan Selection Form */}
                      {showPaymentLinkSection && !generatedPaymentLink && (
                        <div className="space-y-3 pt-2">
                          <label className="block text-xs font-bold text-navy-700">
                            Select Academic Plan / Package to Assign:
                          </label>
                          {plansLoading ? (
                            <div className="flex items-center gap-2 text-xs font-semibold text-navy-400 py-2">
                              <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                              Loading available plans…
                            </div>
                          ) : plans.length === 0 ? (
                            <div className="text-xs text-navy-500">
                              No active plans found on the server.
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <select
                                value={selectedPlanId}
                                onChange={(e) => setSelectedPlanId(e.target.value)}
                                className="w-full rounded-xl border border-navy-200 bg-white p-2.5 text-xs font-semibold text-navy-800 outline-none focus:border-amber-400"
                              >
                                {plans.map((p) => (
                                  <option key={p.planId} value={p.planId}>
                                    {p.name} — {formatMoney(p.finalAmount, p.currency)} ({p.durationMonths || 1} mo)
                                  </option>
                                ))}
                              </select>

                              {/* Selected Plan Details preview */}
                              {(() => {
                                const activeP = plans.find((p) => p.planId === selectedPlanId);
                                if (!activeP) return null;
                                return (
                                  <div className="rounded-xl bg-white p-3 border border-navy-100 text-xs flex items-center justify-between">
                                    <div>
                                      <span className="font-extrabold text-navy-800">{activeP.name}</span>
                                      {activeP.description && (
                                        <p className="text-[11px] text-navy-400 mt-0.5">{activeP.description}</p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <span className="font-display font-extrabold text-amber-600 text-sm">
                                        {formatMoney(activeP.finalAmount, activeP.currency)}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })()}

                              <div className="flex justify-end gap-2 pt-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setShowPaymentLinkSection(false)}
                                  disabled={linkLoading}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAssignPlan(selectedBooking.studentId)}
                                  disabled={linkLoading || !selectedPlanId}
                                  className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold"
                                  icon={linkLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                                >
                                  {linkLoading ? 'Assigning…' : 'Assign Plan & Generate Payment Link'}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Generated Link Display & Share Actions */}
                      {generatedPaymentLink && (
                        <div className="rounded-2xl bg-white p-4 border border-emerald-200 space-y-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Payment Link Ready
                            </span>
                            <span className="text-[11px] font-bold text-navy-400">
                              Plan: {generatedPaymentLink.planName} · {formatMoney(generatedPaymentLink.finalAmount, generatedPaymentLink.currency)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={generatedPaymentLink.paymentUrl}
                              className="flex-1 rounded-xl border border-navy-200 bg-navy-50/70 px-3 py-2 text-xs font-mono font-semibold text-navy-800 outline-none"
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedPaymentLink.paymentUrl);
                                setCopiedLink(true);
                                setTimeout(() => setCopiedLink(false), 2000);
                              }}
                              className={cn(
                                'font-bold shrink-0',
                                copiedLink ? 'bg-emerald-600 text-white' : 'bg-navy-800 text-white hover:bg-navy-900',
                              )}
                              icon={copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            >
                              {copiedLink ? 'Copied!' : 'Copy Link'}
                            </Button>
                          </div>

                          {/* Quick Share buttons */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-navy-100">
                            {/* Email Mailto */}
                            {selectedBooking.email && (
                              <a
                                href={`mailto:${selectedBooking.email}?subject=${encodeURIComponent(
                                  `Enrollment & Secure Payment Link — The Only Teacher (${selectedBooking.student})`,
                                )}&body=${encodeURIComponent(
                                  `Dear ${selectedBooking.parent},\n\nThank you for completing the demo session with The Only Teacher. We are pleased to confirm ${selectedBooking.student}'s admission for ${selectedBooking.subject} (${selectedBooking.year}).\n\nPlease use the secure link below to review your enrollment plan (${generatedPaymentLink.planName}) and complete the tuition fee payment:\n\n${generatedPaymentLink.paymentUrl}\n\nIf you have any questions, feel free to reply to this email or reach us on WhatsApp.\n\nWarm regards,\nAdmissions Team\nThe Only Teacher`,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5" icon={<Mail className="w-3.5 h-3.5" />}>
                                  Email to Parent
                                </Button>
                              </a>
                            )}

                            {/* WhatsApp share */}
                            {selectedBooking.whatsapp && (
                              <a
                                href={`https://wa.me/${(selectedBooking.whatsappCode + selectedBooking.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Hi ${selectedBooking.parent}, here is your secure enrollment & payment link for ${selectedBooking.student} at The Only Teacher:\n\nPlan: ${generatedPaymentLink.planName}\nLink: ${generatedPaymentLink.paymentUrl}\n\nPlease click to complete the enrollment payment.`,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50" icon={<MessageCircle className="w-3.5 h-3.5 text-emerald-600" />}>
                                  Send on WhatsApp
                                </Button>
                              </a>
                            )}

                            {/* Open in new tab */}
                            <a
                              href={generatedPaymentLink.paymentUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                                Open Link
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Footer Actions */}
                <div className="border-t border-navy-100 bg-navy-50/50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    {selectedBooking.status === 'PENDING' ? (
                      <>
                        <Button
                          onClick={() => handleAcceptBooking(selectedBooking.studentId)}
                          disabled={actionLoading}
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-sm"
                          icon={<CheckCircle2 className="h-4 w-4" />}
                        >
                          {actionLoading ? 'Processing...' : 'Accept Demo Booking'}
                        </Button>
                        {!showRejectInput && (
                          <Button
                            onClick={() => setShowRejectInput(true)}
                            disabled={actionLoading}
                            size="sm"
                            variant="outline"
                            className="border-rose-300 text-rose-700 hover:bg-rose-50 font-bold"
                            icon={<XCircle className="h-4 w-4" />}
                          >
                            Reject
                          </Button>
                        )}
                      </>
                    ) : selectedBooking.status === 'ACCEPTED' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" /> This booking is ACCEPTED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-700">
                        <XCircle className="h-4 w-4" /> This booking is REJECTED
                      </span>
                    )}
                  </div>

                  <Button size="sm" variant="dark" onClick={closeBookingModal}>
                    Close
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
