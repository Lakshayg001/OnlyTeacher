import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  X,
  Filter,
  DollarSign,
  Building2,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Primitives';
import { Panel, StatusPill, Table } from './AdminKit';
import { formatMoney } from '@/pages/Payment';
import { cn } from '@/lib/utils';

type PaymentFilterTab = 'all' | 'PENDING' | 'INITIATED' | 'SUCCESS' | 'EXPIRED' | 'REFUNDED';

const TABS: { id: PaymentFilterTab; label: string }[] = [
  { id: 'all', label: 'All Payments' },
  { id: 'PENDING', label: 'Pending Links' },
  { id: 'INITIATED', label: 'Initiated' },
  { id: 'SUCCESS', label: 'Completed' },
  { id: 'EXPIRED', label: 'Expired' },
  { id: 'REFUNDED', label: 'Refunded' },
];

export default function Payments() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<PaymentFilterTab>('all');
  const [query, setQuery] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Selected payment modal
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Mark Paid Modal & Form
  const [showMarkPaidModal, setShowMarkPaidModal] = useState(false);
  const [markPaidLoading, setMarkPaidLoading] = useState(false);
  const [markPaidMessage, setMarkPaidMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [markMethod, setMarkMethod] = useState('SKYDO');
  const [markRef, setMarkRef] = useState('');
  const [markNote, setMarkNote] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Fetch payments list
  const fetchPayments = async (statusFilter?: PaymentFilterTab) => {
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
      params.append('size', '100');
      if (activeTab && activeTab !== 'all') {
        params.append('status', activeTab);
      }

      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/payments?${params.toString()}`
        : `/api/admin/payments?${params.toString()}`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('tot_admin_token');
        navigate('/admin/login');
        return;
      }

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.content) {
          setPayments(json.data.content);
        } else {
          setPayments([]);
        }
      }
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch full details of one payment
  const fetchSinglePayment = async (paymentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    setDetailLoading(true);
    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/payments/${paymentId}`
        : `/api/admin/payments/${paymentId}`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setSelectedPayment(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load payment detail:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments('all');
  }, [navigate]);

  const handleTabChange = (newTab: PaymentFilterTab) => {
    setTab(newTab);
    fetchPayments(newTab);
  };

  // Submit Mark as Paid (Manual recording)
  const handleMarkAsPaid = async () => {
    if (!selectedPayment) return;
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    if (!markRef.trim()) {
      setMarkPaidMessage({ type: 'error', text: 'Please enter a unique transaction reference.' });
      return;
    }

    setMarkPaidLoading(true);
    setMarkPaidMessage(null);

    try {
      const endpoint = import.meta.env.PROD
        ? `https://api.theonlyteacher.com/api/admin/payments/${selectedPayment.id}/mark-paid`
        : `/api/admin/payments/${selectedPayment.id}/mark-paid`;

      const payload = {
        method: markMethod,
        reference: markRef.trim(),
        amount: selectedPayment.amount,
        currency: selectedPayment.currency,
        paidAt: new Date().toISOString(),
        note: markNote.trim() || undefined,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMarkPaidMessage({ type: 'success', text: 'Payment successfully marked as PAID!' });
        // Update current selected payment
        setSelectedPayment((prev: any) => ({
          ...prev,
          status: 'SUCCESS',
          manualMethod: markMethod,
          markedPaidBy: 'Admin',
          markedPaidAt: new Date().toISOString(),
          manualNote: markNote,
        }));
        // Refresh list
        fetchPayments(tab);
        setTimeout(() => setShowMarkPaidModal(false), 1500);
      } else {
        setMarkPaidMessage({
          type: 'error',
          text: json.message || 'Failed to record manual payment.',
        });
      }
    } catch (err: any) {
      setMarkPaidMessage({ type: 'error', text: err.message || 'Server error.' });
    } finally {
      setMarkPaidLoading(false);
    }
  };

  // Filter payments by search query
  const filteredPayments = useMemo(() => {
    if (!query) return payments;
    const q = query.toLowerCase();
    return payments.filter((p) => {
      const matchId = (p.id || '').toLowerCase().includes(q);
      const matchStudentId = (p.studentId || '').toLowerCase().includes(q);
      const matchStudentName = (p.studentName || '').toLowerCase().includes(q);
      const matchGateway = (p.gateway || '').toLowerCase().includes(q);
      const matchOrderId = (p.gatewayOrderId || '').toLowerCase().includes(q);
      return matchId || matchStudentId || matchStudentName || matchGateway || matchOrderId;
    });
  }, [payments, query]);

  // Quick stats
  const totalCompletedAmount = useMemo(() => {
    return payments
      .filter((p) => p.status === 'SUCCESS')
      .reduce((acc, p) => acc + (p.amount || 0), 0);
  }, [payments]);

  const pendingCount = useMemo(() => {
    return payments.filter((p) => p.status === 'PENDING' || p.status === 'INITIATED').length;
  }, [payments]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-3xl border border-amber-200/70 bg-white p-5 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-navy-800">
              {payments.length}
            </p>
            <p className="text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
              Total Recorded Payments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-emerald-200/70 bg-white p-5 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-emerald-700">
              {formatMoney(totalCompletedAmount, 'INR')}
            </p>
            <p className="text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
              Settled Collections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-sky-200/70 bg-white p-5 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-navy-800">
              {pendingCount}
            </p>
            <p className="text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
              Active / Pending Links
            </p>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <Panel
        title="Payment Transactions"
        sub="Monitor student payment links, Cashfree/PayPal checkouts, and offline bank settlements."
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() => fetchPayments()}
            disabled={isLoading}
            icon={<RefreshCw className={cn('h-3.5 w-3.5', isLoading && 'animate-spin')} />}
          >
            Refresh
          </Button>
        }
      >
        {/* Filter Tabs & Search */}
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all',
                  tab === t.id
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'border border-navy-100 bg-white text-navy-500 hover:border-amber-300 hover:text-amber-600',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by student, ID, gateway…"
              className="h-10 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-xs font-semibold text-navy-700 outline-none focus:border-amber-300 focus:bg-white"
            />
          </div>
        </div>

        {/* Payments Table */}
        {isLoading ? (
          <div className="py-16 text-center text-navy-400">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-amber-500" />
            <p className="mt-2 text-xs font-bold">Loading payment records…</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-200 py-12 text-center">
            <CreditCard className="mx-auto h-8 w-8 text-navy-300" />
            <p className="mt-2 text-sm font-extrabold text-navy-700">No payments found</p>
            <p className="text-xs font-semibold text-navy-400">
              {query ? 'No records matching your search.' : 'No payment records for this filter.'}
            </p>
          </div>
        ) : (
          <Table head={['Payment ID', 'Student', 'Amount & Currency', 'Gateway', 'Status', 'Date', 'Action']}>
            {filteredPayments.map((p) => {
              const paymentStatus = p.status || 'PENDING';
              return (
                <tr key={p.id} className="transition-colors hover:bg-navy-50/50">
                  {/* Payment ID */}
                  <td className="px-3 py-3 font-mono text-xs font-bold text-navy-800">
                    <span className="flex items-center gap-1.5">
                      {p.id}
                      <button
                        onClick={() => handleCopy(p.id, p.id)}
                        title="Copy ID"
                        className="text-navy-300 hover:text-navy-700"
                      >
                        {copiedId === p.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </span>
                  </td>

                  {/* Student */}
                  <td className="px-3 py-3">
                    <span className="block text-xs font-extrabold text-navy-800">
                      {p.studentName || 'Student'}
                    </span>
                    <span className="block text-[11px] font-mono text-navy-400">
                      {p.studentId}
                    </span>
                  </td>

                  {/* Amount & Currency */}
                  <td className="px-3 py-3">
                    <span className="block text-xs font-extrabold text-navy-800">
                      {formatMoney(p.amount, p.currency || 'INR')}
                    </span>
                    {p.capturedAmount && p.capturedAmount !== p.amount && (
                      <span className="block text-[10px] font-bold text-emerald-600">
                        Captured: {formatMoney(p.capturedAmount, p.capturedCurrency || p.currency)}
                      </span>
                    )}
                  </td>

                  {/* Gateway */}
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-navy-100 px-2 py-0.5 text-[11px] font-extrabold uppercase text-navy-700">
                      {p.gateway || p.manualMethod || 'PENDING SELECTION'}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    <StatusPill status={paymentStatus} />
                  </td>

                  {/* Date */}
                  <td className="px-3 py-3 text-xs font-semibold text-navy-500 whitespace-nowrap">
                    {p.paidAt
                      ? new Date(p.paidAt).toLocaleDateString()
                      : p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : '-'}
                  </td>

                  {/* Action */}
                  <td className="px-3 py-3">
                    <button
                      onClick={() => {
                        setSelectedPayment(p);
                        fetchSinglePayment(p.id);
                      }}
                      className="rounded-xl bg-navy-100 px-3 py-1.5 text-xs font-extrabold text-navy-800 hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Panel>

      {/* Payment Details Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white rounded-3xl shadow-clay overflow-hidden border border-navy-100 space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-navy-100 bg-navy-50/50">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-400">
                    Payment Details
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="font-mono text-base font-extrabold text-navy-800">
                      {selectedPayment.id}
                    </h3>
                    <StatusPill status={selectedPayment.status || 'PENDING'} />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedPayment(null);
                    setShowMarkPaidModal(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white text-navy-400 hover:text-navy-700 flex items-center justify-center shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-navy-400">Student Name</span>
                    <p className="font-extrabold text-navy-800 text-sm">{selectedPayment.studentName || '-'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">Student ID</span>
                    <p className="font-mono font-bold text-navy-800">{selectedPayment.studentId}</p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">Payable Amount</span>
                    <p className="font-display text-lg font-extrabold text-navy-800">
                      {formatMoney(selectedPayment.amount, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">Payment Gateway</span>
                    <p className="font-extrabold text-navy-700">
                      {selectedPayment.gateway || selectedPayment.manualMethod || 'Awaiting Student Gateway Pick'}
                    </p>
                  </div>
                  {selectedPayment.gatewayOrderId && (
                    <div className="col-span-2">
                      <span className="font-bold text-navy-400">Gateway Order ID</span>
                      <p className="font-mono text-navy-700">{selectedPayment.gatewayOrderId}</p>
                    </div>
                  )}
                  {selectedPayment.gatewayPaymentId && (
                    <div className="col-span-2">
                      <span className="font-bold text-navy-400">Gateway Transaction ID</span>
                      <p className="font-mono text-navy-700">{selectedPayment.gatewayPaymentId}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-navy-400">Created At</span>
                    <p className="font-semibold text-navy-700">
                      {selectedPayment.createdAt ? new Date(selectedPayment.createdAt).toLocaleString() : '-'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">Paid At</span>
                    <p className="font-semibold text-navy-700">
                      {selectedPayment.paidAt ? new Date(selectedPayment.paidAt).toLocaleString() : 'Not paid yet'}
                    </p>
                  </div>
                </div>

                {/* Manual settlement audit if available */}
                {selectedPayment.manualMethod && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs space-y-2">
                    <span className="font-extrabold uppercase text-emerald-800">
                      Recorded Manually Outside Gateway
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-emerald-900 font-semibold">
                      <div>Method: <strong>{selectedPayment.manualMethod}</strong></div>
                      <div>Marked By: <strong>{selectedPayment.markedPaidBy || 'Admin'}</strong></div>
                      {selectedPayment.manualNote && (
                        <div className="col-span-2">Note: {selectedPayment.manualNote}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mark as paid box */}
                {showMarkPaidModal && (
                  <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-4 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-amber-900">
                      Record Offline / Wire Payment
                    </h4>
                    <p className="text-[11px] font-semibold text-amber-800">
                      Use this if the parent paid directly via Skydo, Bank Transfer, or Cash. The payment will transition to SUCCESS.
                    </p>

                    {markPaidMessage && (
                      <div
                        className={cn(
                          'p-3 rounded-xl text-xs font-bold',
                          markPaidMessage.type === 'success'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800',
                        )}
                      >
                        {markPaidMessage.text}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-bold text-navy-600 block mb-1">Method</label>
                        <select
                          value={markMethod}
                          onChange={(e) => setMarkMethod(e.target.value)}
                          className="w-full rounded-xl border border-navy-200 bg-white p-2 font-semibold text-navy-800 outline-none"
                        >
                          <option value="SKYDO">Skydo International Wire</option>
                          <option value="BANK_TRANSFER">Direct Bank Transfer</option>
                          <option value="ICICI_DIRECT">ICICI Bank</option>
                          <option value="CASH">Cash Deposit</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-navy-600 block mb-1">Unique Reference</label>
                        <input
                          type="text"
                          value={markRef}
                          onChange={(e) => setMarkRef(e.target.value)}
                          placeholder="e.g. SKY-2026-000123"
                          className="w-full rounded-xl border border-navy-200 bg-white p-2 font-semibold text-navy-800 outline-none"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="font-bold text-navy-600 block mb-1">Internal Note (Optional)</label>
                        <input
                          type="text"
                          value={markNote}
                          onChange={(e) => setMarkNote(e.target.value)}
                          placeholder="e.g. Received via Skydo from parent UK account."
                          className="w-full rounded-xl border border-navy-200 bg-white p-2 font-semibold text-navy-800 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowMarkPaidModal(false)}
                        disabled={markPaidLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleMarkAsPaid}
                        disabled={markPaidLoading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
                      >
                        {markPaidLoading ? 'Recording…' : 'Confirm Mark as Paid'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-t border-navy-100 bg-navy-50/50">
                <div>
                  {(selectedPayment.status === 'PENDING' || selectedPayment.status === 'EXPIRED') && !showMarkPaidModal && (
                    <Button
                      size="sm"
                      onClick={() => setShowMarkPaidModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
                      icon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Mark Paid (Offline Wire)
                    </Button>
                  )}
                </div>

                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => {
                    setSelectedPayment(null);
                    setShowMarkPaidModal(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
