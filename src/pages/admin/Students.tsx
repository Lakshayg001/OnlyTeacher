import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Flag from '@/components/ui/Flag';
import {
  Search,
  UserPlus,
  RefreshCw,
  CreditCard,
  Link2,
  Copy,
  Check,
  Mail,
  MessageCircle,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import ClayIcon from '@/components/clay/ClayIcon';
import { Button } from '@/components/ui/Primitives';
import { Panel, StatusPill, Table } from './AdminKit';
import { formatMoney } from '@/pages/Payment';
import { cn } from '@/lib/utils';

const STATUSES = ['all', 'active', 'trial'] as const;

export default function Students() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('all');
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Selected student modal
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // Plan assignment & link generation state
  const [existingAssignments, setExistingAssignments] = useState<any[]>([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [showPlanAssignSection, setShowPlanAssignSection] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<any | null>(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch students from GET /api/admin/students
  const fetchStudents = async () => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = import.meta.env.PROD
        ? 'https://api.theonlyteacher.com/api/admin/students?page=0&size=100'
        : '/api/admin/students?page=0&size=100';

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
          setStudents(json.data.content);
        } else {
          setStudents([]);
        }
      }
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setIsLoading(false);
    }
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

  // Fetch plan assignments for a student
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
      console.error('Failed to fetch assignments:', e);
      setExistingAssignments([]);
    } finally {
      setAssignmentsLoading(false);
    }
  };

  // Assign a plan via POST /api/admin/students/{studentId}/assign-plan
  const handleAssignPlan = async (studentId: string) => {
    const token = localStorage.getItem('tot_admin_token');
    if (!token) return;

    if (!selectedPlanId) {
      setLinkError('Please select a plan.');
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
          finalUrl = rawUrl.startsWith('http') ? rawUrl : `${window.location.origin}${finalUrl}`;
        }
      }

      setGeneratedLink({
        ...json.data,
        paymentUrl: finalUrl,
      });

      setShowPlanAssignSection(false);
      fetchPlanAssignments(studentId);
    } catch (err: any) {
      setLinkError(err?.message || 'Error assigning plan.');
    } finally {
      setLinkLoading(false);
    }
  };

  // Generate / refresh payment link via POST /api/admin/students/{studentId}/payment-link
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
        throw new Error(json?.message || `Failed to generate link (${res.status})`);
      }

      let rawUrl = json.data.paymentUrl || '';
      let finalUrl = rawUrl;
      if (rawUrl) {
        try {
          const parsed = new URL(rawUrl);
          finalUrl = `${window.location.origin}/payment${parsed.search}`;
        } catch {
          finalUrl = rawUrl.startsWith('http') ? rawUrl : `${window.location.origin}${finalUrl}`;
        }
      }

      setGeneratedLink({
        ...json.data,
        paymentUrl: finalUrl,
      });

      fetchPlanAssignments(studentId);
    } catch (err: any) {
      setLinkError(err?.message || 'Failed to refresh payment link.');
    } finally {
      setLinkLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [navigate]);

  const closeStudentModal = () => {
    setSelectedStudent(null);
    setExistingAssignments([]);
    setShowPlanAssignSection(false);
    setGeneratedLink(null);
    setLinkError(null);
    setCopiedLink(false);
  };

  const openStudentModal = (s: any) => {
    setSelectedStudent(s);
    fetchPlanAssignments(s.id);
  };

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const hasPaid = s.payments?.some((p: any) => p.status === 'SUCCESS');
      const studentStatus = hasPaid ? 'active' : 'trial';

      if (status !== 'all' && studentStatus !== status) return false;

      if (query) {
        const q = query.toLowerCase();
        const fullName = `${s.studentFirstName || ''} ${s.studentLastName || ''}`.toLowerCase();
        const parentName = `${s.parentFirstName || ''} ${s.parentLastName || ''}`.toLowerCase();
        const sId = (s.id || '').toLowerCase();
        const sub = (s.subject || '').toLowerCase();
        const yr = (s.year || '').toLowerCase();
        return fullName.includes(q) || parentName.includes(q) || sId.includes(q) || sub.includes(q) || yr.includes(q);
      }
      return true;
    });
  }, [students, status, query]);

  const activeCount = useMemo(() => {
    return students.filter((s) => s.payments?.some((p: any) => p.status === 'SUCCESS')).length;
  }, [students]);

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-3xl border border-amber-200/70 bg-white p-5 shadow-sm">
          <ClayIcon name="student" size={48} />
          <div>
            <p className="font-display text-2xl font-extrabold leading-none text-navy-700">
              {students.length}
            </p>
            <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
              Total Enrolled Students
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-emerald-200/70 bg-white p-5 shadow-sm">
          <ClayIcon name="trophy" size={48} />
          <div>
            <p className="font-display text-2xl font-extrabold leading-none text-emerald-700">
              {activeCount}
            </p>
            <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
              Active / Paid Enrollments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-navy-200/70 bg-white p-5 shadow-sm">
          <ClayIcon name="target" size={48} />
          <div>
            <p className="font-display text-2xl font-extrabold leading-none text-navy-700">
              {students.length - activeCount}
            </p>
            <p className="mt-1 text-[12px] font-extrabold uppercase tracking-wider text-navy-400">
              Pending / Trial Students
            </p>
          </div>
        </div>
      </div>

      {/* Main Student Roster Panel */}
      <Panel
        title="Student Roster &amp; Plan Assignments"
        sub={`${filteredStudents.length} of ${students.length} students`}
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={fetchStudents}
            disabled={isLoading}
            icon={<RefreshCw className={cn('h-3.5 w-3.5', isLoading && 'animate-spin')} />}
          >
            Refresh
          </Button>
        }
      >
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-extrabold capitalize transition-all',
                  status === s
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'border border-navy-100 bg-white text-navy-500 hover:border-amber-300 hover:text-amber-600',
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by student, ID, subject…"
              className="h-10 w-full rounded-full border border-navy-100 bg-navy-50/70 pl-10 pr-4 text-xs font-semibold text-navy-700 outline-none focus:border-amber-300 focus:bg-white"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-navy-400">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-amber-500" />
            <p className="mt-2 text-xs font-bold">Loading student records…</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-200 py-12 text-center">
            <ClayIcon name="student" size={40} className="mx-auto opacity-40" />
            <p className="mt-2 text-sm font-extrabold text-navy-700">No students found</p>
            <p className="text-xs font-semibold text-navy-400">
              {query ? 'No matching student records.' : 'No students in this view.'}
            </p>
          </div>
        ) : (
          <Table head={['Student', 'Student ID', 'Parent', 'Grade · Subject', 'Status', 'Joined', 'Actions']}>
            {filteredStudents.map((s) => {
              const fullName = `${s.studentFirstName || ''} ${s.studentLastName || ''}`.trim() || 'Student';
              const parentName = `${s.parentFirstName || ''} ${s.parentLastName || ''}`.trim() || '-';
              const hasPaid = s.payments?.some((p: any) => p.status === 'SUCCESS');
              const studentStatus = hasPaid ? 'active' : 'trial';

              return (
                <tr key={s.id} className="transition-colors hover:bg-navy-50/50">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-extrabold text-white">
                        {fullName
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </span>
                      <div>
                        <span className="block text-xs font-extrabold text-navy-800">{fullName}</span>
                        <span className="block text-[11px] font-semibold text-navy-400 truncate max-w-[180px]">
                          {s.email || '-'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 font-mono text-xs font-bold text-navy-700">
                    {s.id}
                  </td>

                  <td className="px-3 py-3 text-xs font-semibold text-navy-700">
                    {parentName}
                  </td>

                  <td className="px-3 py-3 text-xs font-semibold text-navy-600">
                    {s.year || '-'} · <strong className="text-navy-800">{s.subject || '-'}</strong>
                  </td>

                  <td className="px-3 py-3">
                    <StatusPill status={studentStatus} />
                  </td>

                  <td className="px-3 py-3 text-xs text-navy-500 whitespace-nowrap">
                    {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '-'}
                  </td>

                  <td className="px-3 py-3">
                    <button
                      onClick={() => openStudentModal(s)}
                      className="rounded-xl bg-navy-100 px-3 py-1.5 text-xs font-extrabold text-navy-800 hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      Plan &amp; Payment
                    </button>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Panel>

      {/* Student Details & Plan Assignment Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-clay overflow-hidden border border-navy-100 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-navy-100 bg-navy-50/50 shrink-0">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-400">
                    Student Profile &amp; Plan Management
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="font-display text-xl font-extrabold text-navy-800">
                      {`${selectedStudent.studentFirstName || ''} ${selectedStudent.studentLastName || ''}`.trim() || 'Student'}
                    </h3>
                    <span className="rounded-full bg-navy-100 px-2.5 py-0.5 font-mono text-xs font-bold text-navy-700">
                      {selectedStudent.id}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeStudentModal}
                  className="w-8 h-8 rounded-full bg-white text-navy-400 hover:text-navy-700 flex items-center justify-center shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[65vh]">
                {/* Student Info Box */}
                <div className="grid grid-cols-2 gap-4 text-xs rounded-2xl bg-navy-50/60 p-4 border border-navy-100">
                  <div>
                    <span className="font-bold text-navy-400">Parent / Guardian:</span>
                    <p className="font-extrabold text-navy-800">
                      {`${selectedStudent.parentFirstName || ''} ${selectedStudent.parentLastName || ''}`.trim() || '-'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">Email:</span>
                    <p className="font-extrabold text-navy-800 truncate">{selectedStudent.email || '-'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">WhatsApp / Calling:</span>
                    <p className="font-extrabold text-navy-800">
                      {selectedStudent.whatsappCode} {selectedStudent.whatsapp}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-navy-400">Academic Target:</span>
                    <p className="font-extrabold text-navy-800">
                      {selectedStudent.subject} ({selectedStudent.year})
                    </p>
                  </div>
                </div>

                {/* Plan Assignment & Payment Link Manager */}
                <div className="rounded-2xl border border-amber-300 bg-amber-50/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                      <h4 className="font-display text-base font-extrabold text-navy-800">
                        Academic Plan &amp; Payment Link
                      </h4>
                    </div>

                    {!showPlanAssignSection && !generatedLink && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setShowPlanAssignSection(true);
                          fetchPlans();
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs"
                        icon={<Link2 className="w-3.5 h-3.5" />}
                      >
                        {existingAssignments.length > 0 ? 'Change / Reassign Plan' : 'Assign Plan & Generate Link'}
                      </Button>
                    )}
                  </div>

                  {linkError && (
                    <div className="rounded-xl bg-rose-100 p-3 text-xs font-bold text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{linkError}</span>
                    </div>
                  )}

                  {/* Existing Plan Assignments list */}
                  {assignmentsLoading ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-navy-400 py-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                      Checking plan assignments…
                    </div>
                  ) : existingAssignments.length > 0 && !showPlanAssignSection ? (
                    <div className="space-y-3">
                      {existingAssignments.map((a: any, idx: number) => {
                        const isPaid = a.paymentStatus === 'SUCCESS';
                        return (
                          <div key={a.planId || idx} className="rounded-2xl bg-white border border-navy-200 p-4 space-y-3 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-display font-extrabold text-navy-800 text-sm">
                                    {a.planName || a.planId}
                                  </h5>
                                  <StatusPill status={a.paymentStatus || 'PENDING'} />
                                </div>
                                {a.planDescription && (
                                  <p className="text-xs text-navy-500 mt-0.5">{a.planDescription}</p>
                                )}
                                <p className="text-[11px] font-semibold text-navy-400 mt-1">
                                  Duration: {a.durationMonths || 1} mo · Assigned by {a.assignedBy || 'Admin'} on{' '}
                                  {a.assignedAt ? new Date(a.assignedAt).toLocaleDateString() : '-'}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-display text-base font-extrabold text-navy-800">
                                  {formatMoney(a.finalAmount, a.currency)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-navy-100 pt-3">
                              <span className="font-mono text-[11px] text-navy-400">
                                Payment ID: {a.paymentId || '-'}
                              </span>
                              {!isPaid ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleRefreshPaymentLink(selectedStudent.id)}
                                  disabled={linkLoading}
                                  className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs"
                                  icon={linkLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Link2 className="w-3.5 h-3.5" />}
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

                  {/* Assign Plan Form */}
                  {showPlanAssignSection && !generatedLink && (
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold text-navy-700">
                        Select Academic Plan to Assign:
                      </label>
                      {plansLoading ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-navy-400 py-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                          Loading available plans…
                        </div>
                      ) : plans.length === 0 ? (
                        <div className="text-xs text-navy-500">No active plans found on server.</div>
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

                          <div className="flex justify-end gap-2 pt-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowPlanAssignSection(false)}
                              disabled={linkLoading}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAssignPlan(selectedStudent.id)}
                              disabled={linkLoading || !selectedPlanId}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold"
                              icon={linkLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                            >
                              {linkLoading ? 'Assigning…' : 'Assign Plan & Generate Link'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Generated Payment Link Display */}
                  {generatedLink && (
                    <div className="rounded-2xl bg-white p-4 border border-emerald-200 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Payment Link Ready
                        </span>
                        <span className="text-[11px] font-bold text-navy-400">
                          Plan: {generatedLink.planName} · {formatMoney(generatedLink.finalAmount, generatedLink.currency)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={generatedLink.paymentUrl}
                          className="flex-1 rounded-xl border border-navy-200 bg-navy-50/70 px-3 py-2 text-xs font-mono font-semibold text-navy-800 outline-none"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedLink.paymentUrl);
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

                      {/* Share shortcuts */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-navy-100">
                        {selectedStudent.email && (
                          <a
                            href={`mailto:${selectedStudent.email}?subject=${encodeURIComponent(
                              `Enrollment & Secure Payment Link — The Only Teacher`,
                            )}&body=${encodeURIComponent(
                              `Dear Parent,\n\nPlease find below your secure enrollment & tuition payment link for The Only Teacher:\n\nPlan: ${generatedLink.planName}\nPayment Link: ${generatedLink.paymentUrl}\n\nWarm regards,\nAdmissions Team\nThe Only Teacher`,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5" icon={<Mail className="w-3.5 h-3.5" />}>
                              Email Link
                            </Button>
                          </a>
                        )}

                        {selectedStudent.whatsapp && (
                          <a
                            href={`https://wa.me/${(selectedStudent.whatsappCode + selectedStudent.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hi, here is your secure enrollment & tuition payment link for The Only Teacher:\n\nPlan: ${generatedLink.planName}\nPayment Link: ${generatedLink.paymentUrl}`,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50" icon={<MessageCircle className="w-3.5 h-3.5 text-emerald-600" />}>
                              WhatsApp Link
                            </Button>
                          </a>
                        )}

                        <a href={generatedLink.paymentUrl} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                            Open Link
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end p-4 border-t border-navy-100 bg-navy-50/50 shrink-0">
                <Button size="sm" variant="dark" onClick={closeStudentModal}>
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
