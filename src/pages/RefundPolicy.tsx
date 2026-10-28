import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	AlertCircle,
	ArrowRight,
	Calculator,
	Calendar,
	CheckCircle2,
	Clock,
	DollarSign,
	FileText,
	HelpCircle,
	Mail,
	MessageCircle,
	Phone,
	RotateCcw,
	ShieldCheck,
	Sparkles,
	XCircle,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Flag from '@/components/ui/Flag';
import { BRAND } from '@/data/site';

interface RegionCurrencyData {
	code: string;
	countryName: string;
	flag: string;
	currencyCode: string;
	symbol: string;
	examplePackPrice: number;
	exampleSingleRate: number;
	exampleGatewayFee: string;
}

const REGIONS: RegionCurrencyData[] = [
	{
		code: 'GB',
		countryName: 'United Kingdom',
		flag: 'GB',
		currencyCode: 'GBP',
		symbol: '£',
		examplePackPrice: 450,
		exampleSingleRate: 18,
		exampleGatewayFee: 'payment gateway fee',
	},
	{
		code: 'AE',
		countryName: 'United Arab Emirates',
		flag: 'AE',
		currencyCode: 'AED',
		symbol: 'AED ',
		examplePackPrice: 2100,
		exampleSingleRate: 84,
		exampleGatewayFee: 'payment gateway fee',
	},
	{
		code: 'AU',
		countryName: 'Australia',
		flag: 'AU',
		currencyCode: 'AUD',
		symbol: 'A$',
		examplePackPrice: 850,
		exampleSingleRate: 34,
		exampleGatewayFee: 'payment gateway fee',
	},
	{
		code: 'NZ',
		countryName: 'New Zealand',
		flag: 'NZ',
		currencyCode: 'NZD',
		symbol: 'NZ$',
		examplePackPrice: 900,
		exampleSingleRate: 36,
		exampleGatewayFee: 'payment gateway fee',
	},
	{
		code: 'IN',
		countryName: 'India',
		flag: 'IN',
		currencyCode: 'INR',
		symbol: '₹',
		examplePackPrice: 25000,
		exampleSingleRate: 1000,
		exampleGatewayFee: 'payment gateway fee',
	},
];

export default function RefundPolicy() {
	const [activeRegionIndex, setActiveRegionIndex] = useState<number>(0);
	const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

	const activeRegion = REGIONS[activeRegionIndex];

	// Calculations for dynamic demonstration
	const packPrice = activeRegion.examplePackPrice;
	const singleRate = activeRegion.exampleSingleRate;
	const sym = activeRegion.symbol;

	const demo1Deduction = singleRate;
	const demo3Deduction = singleRate * 3;

	const unusedSessions = 15;
	const unusedValue = unusedSessions * singleRate;
	const adminFee = Math.round(unusedValue * 0.1);
	const laterRefund = unusedValue - adminFee;

	const handleCopyTemplate = () => {
		const template = `To: support@theonlyteacher.com
Subject: Refund Request - [Student Name]

Dear Support Team,

I would like to request a cancellation and refund for the following tutoring plan:

• Student Name: [Student Full Name]
• Registered Email: [Your Email]
• Plan Purchased: [e.g. 25-Session Pack / Alpha Plan]
• Date of Purchase: [Purchase Date]
• Reason for Cancellation: [Brief reason]

Please confirm the calculated refund amount and the timeline for processing.

Thank you,
[Your Name]
[Your Phone/WhatsApp]`;

		navigator.clipboard.writeText(template);
		setCopiedTemplate(true);
		setTimeout(() => setCopiedTemplate(false), 3000);
	};

	return (
		<>
			{/* Page Hero */}
			<PageHero
				crumb="Refund and Cancellation Policy"
				title={
					<>
						Refund &amp; Cancellation <span className="text-amber-500">Policy</span>
					</>
				}
				sub="Clear, straightforward and fair. One policy for the United Kingdom, the United Arab Emirates, Australia, New Zealand and India."
				compact={true}
			/>

			<section className="py-12 sm:py-16 bg-navy-50/40">
				<div className="container-tot max-w-4xl mx-auto space-y-8">

					{/* Header Summary Card */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 pb-5 mb-5">
							<div>
								<span className="inline-flex items-center gap-2 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
									<ShieldCheck className="h-3.5 w-3.5 text-forest-600" /> Transparent Guarantee
								</span>
								<h1 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-800 mt-2">
									REFUND AND CANCELLATION POLICY
								</h1>
								<p className="text-sm font-semibold text-navy-500">
									The Only Teacher • TOT Edtech Private Limited
								</p>
							</div>
							<div className="text-right">
								<span className="text-xs font-bold uppercase tracking-wider text-navy-400">Policy Edition</span>
								<p className="text-sm font-bold text-navy-700">2026 Unified Policy</p>
							</div>
						</div>

						{/* Introductory Note */}
						<div className="rounded-2xl bg-amber-500/10 border border-amber-200/60 p-5 sm:p-6 mb-6">
							<p className="text-[15px] sm:text-base leading-relaxed text-navy-800 font-medium">
								We want you to feel confident when you join The Only Teacher. If things change and you need to cancel, this policy explains clearly what happens to your money. The same policy applies in the <strong>United Kingdom</strong>, the <strong>United Arab Emirates</strong>, <strong>Australia</strong>, <strong>New Zealand</strong> and <strong>India</strong>. The only difference is the currency you paid in.
							</p>
						</div>

						{/* Five Regions Bar */}
						<div>
							<div className="flex items-center justify-between mb-3">
								<p className="text-xs font-bold uppercase tracking-wider text-navy-400">
									Active across 5 regions • Identical rules everywhere
								</p>
								<span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
									Same Rules Everywhere
								</span>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
								{REGIONS.map((region, idx) => (
									<button
										key={region.code}
										onClick={() => setActiveRegionIndex(idx)}
										className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
											activeRegionIndex === idx
												? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
												: 'border-navy-100 bg-navy-50/40 hover:bg-white hover:border-navy-200'
										}`}
										title={`Click to view calculations in ${region.currencyCode}`}
									>
										<Flag code={region.flag} size={22} className="mb-1.5 shadow-sm" />
										<span className="text-xs font-bold text-navy-800 leading-tight">
											{region.countryName}
										</span>
										<span className="text-[11px] font-semibold text-navy-500 mt-0.5">
											{region.currencyCode} ({region.symbol.trim()})
										</span>
									</button>
								))}
							</div>
							<p className="text-xs text-navy-400 mt-2.5 text-center sm:text-left">
								💡 <em>Tip: Tap any country above to preview calculation examples in your local currency.</em>
							</p>
						</div>
					</div>

					{/* Policy Highlights at a Glance */}
					<div className="grid gap-4 sm:grid-cols-3">
						<div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm flex items-start gap-3.5">
							<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
								<Clock className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-display text-sm font-bold text-navy-800">Early Protection</h3>
								<p className="text-xs text-navy-500 mt-0.5 leading-relaxed">
									Cancel within first 2 sessions or 7 days for full refund less gateway fee.
								</p>
							</div>
						</div>

						<div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm flex items-start gap-3.5">
							<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
								<RotateCcw className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-display text-sm font-bold text-navy-800">Fair Unused Credit</h3>
								<p className="text-xs text-navy-500 mt-0.5 leading-relaxed">
									Only pay for sessions taken. Unused balance refunded less 10% admin fee.
								</p>
							</div>
						</div>

						<div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm flex items-start gap-3.5">
							<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700">
								<Calendar className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-display text-sm font-bold text-navy-800">7–10 Days Turnaround</h3>
								<p className="text-xs text-navy-500 mt-0.5 leading-relaxed">
									Credited directly to your original payment method in your local currency.
								</p>
							</div>
						</div>
					</div>

					{/* 1. Cancelling early */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									1
								</span>
								Cancelling early
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
								<CheckCircle2 className="h-3.5 w-3.5 text-forest-600" /> First 2 Sessions or 7 Days
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							If you cancel within the first 2 sessions or within 7 days of purchase, whichever comes first, we will refund what you paid, minus the small processing fee charged by the payment gateway. The payment gateway keeps that fee, so we cannot return it.
						</p>

						<div className="rounded-2xl border border-amber-200/70 bg-amber-50/50 p-4 sm:p-5">
							<h3 className="font-display text-sm font-extrabold text-navy-800 mb-1.5 flex items-center gap-2">
								<Sparkles className="h-4 w-4 text-amber-600" />
								Free demo sessions accounted for:
							</h3>
							<p className="text-[14px] leading-relaxed text-navy-700">
								Free demo sessions you took are counted as well. For each demo session you took, we deduct one session's cost at the single session rate, plus the payment gateway charges, and refund the rest.
							</p>
						</div>
					</div>

					{/* 2. Cancelling later */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									2
								</span>
								Cancelling later
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-700">
								<Calculator className="h-3.5 w-3.5 text-navy-600" /> Unused Sessions Refunded
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							After the early period, we refund only the sessions you have not used. Sessions you have already taken are charged at the single session rate. A 10% administration fee applies to the refundable balance.
						</p>

						{/* Visual Formula Card */}
						<div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-4 sm:p-5">
							<p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-2">
								How Later Cancellations Are Calculated:
							</p>
							<div className="flex flex-wrap items-center gap-2 text-sm font-bold text-navy-800">
								<span className="rounded-lg bg-white px-3 py-1.5 border border-navy-100 shadow-xs">
									Value of Unused Sessions
								</span>
								<span className="text-amber-500 font-extrabold">−</span>
								<span className="rounded-lg bg-white px-3 py-1.5 border border-navy-100 shadow-xs text-rose-700">
									10% Administration Fee
								</span>
								<span className="text-amber-500 font-extrabold">=</span>
								<span className="rounded-lg bg-forest-600 px-3 py-1.5 text-white shadow-xs">
									Your Net Refund
								</span>
							</div>
						</div>
					</div>

					{/* 3. How and when you get your refund */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									3
								</span>
								How and when you get your refund
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
								<CheckCircle2 className="h-3.5 w-3.5 text-forest-600" /> 7–10 Working Days
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							Refunds go back to your original payment method, in the currency you paid in. We process refunds within 7 to 10 working days of confirming your cancellation.
						</p>

						<div className="grid gap-3 sm:grid-cols-2 pt-2">
							<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<RotateCcw className="h-4 w-4 text-amber-500" /> Destination
								</div>
								<p className="text-sm font-bold text-navy-800">Original Payment Method</p>
								<p className="text-xs text-navy-500 mt-0.5">Credited back in the exact currency you paid in</p>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Clock className="h-4 w-4 text-amber-500" /> Timeline
								</div>
								<p className="text-sm font-bold text-navy-800">7 to 10 Working Days</p>
								<p className="text-xs text-navy-500 mt-0.5">From the date our support team confirms your request</p>
							</div>
						</div>
					</div>

					{/* 4. What we cannot refund */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									4
								</span>
								What we cannot refund
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
								<AlertCircle className="h-3.5 w-3.5 text-rose-600" /> Non-Refundable Items
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							For complete clarity and transparency, the following cannot be refunded:
						</p>

						<div className="grid gap-3 sm:grid-cols-3">
							<div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
								<div className="flex items-center gap-2 text-xs font-bold text-rose-700 mb-1">
									<XCircle className="h-4 w-4 text-rose-500 shrink-0" />
									Payment Gateway Fee
								</div>
								<p className="text-xs text-navy-600 leading-relaxed">
									The payment gateway processing fee on early cancellations (retained by payment processors).
								</p>
							</div>

							<div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
								<div className="flex items-center gap-2 text-xs font-bold text-rose-700 mb-1">
									<XCircle className="h-4 w-4 text-rose-500 shrink-0" />
									Completed Sessions
								</div>
								<p className="text-xs text-navy-600 leading-relaxed">
									Sessions you have already taken with your teacher.
								</p>
							</div>

							<div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
								<div className="flex items-center gap-2 text-xs font-bold text-rose-700 mb-1">
									<XCircle className="h-4 w-4 text-rose-500 shrink-0" />
									10% Administration Fee
								</div>
								<p className="text-xs text-navy-600 leading-relaxed">
									The 10% administration fee on later cancellations, which covers our banking and operational costs.
								</p>
							</div>
						</div>
					</div>

					{/* 5. Rescheduling instead of cancelling */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									5
								</span>
								Rescheduling instead of cancelling
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
								<Calendar className="h-3.5 w-3.5 text-forest-600" /> Flexible Options
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							If you only need a different time, you do not need to cancel. Tell us at least 24 hours before the session and we will do our best to find another slot. In a genuine emergency, we will consider requests made at least 6 hours before the session.
						</p>

						<div className="grid gap-3 sm:grid-cols-2 pt-1">
							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
									<Clock className="h-3.5 w-3.5" /> Standard Rescheduling
								</span>
								<h3 className="text-sm font-bold text-navy-800">At least 24 hours in advance</h3>
								<p className="text-xs text-navy-500 mt-1 leading-relaxed">
									Contact your student coordinator or our support team to reassign your slot with zero penalty.
								</p>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
									<AlertCircle className="h-3.5 w-3.5" /> Genuine Emergencies
								</span>
								<h3 className="text-sm font-bold text-navy-800">At least 6 hours in advance</h3>
								<p className="text-xs text-navy-500 mt-1 leading-relaxed">
									We understand unforeseen emergencies arise and will do our best to accommodate short-notice adjustments.
								</p>
							</div>
						</div>
					</div>

					{/* 6. No joining or leaving fee */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									6
								</span>
								No joining or leaving fee
							</h2>
							<span className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
								<CheckCircle2 className="h-3.5 w-3.5 text-forest-600" /> Zero Hidden Charges
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							We do not charge any fee for joining, and there is no fee for stopping. You only pay for the plan you choose.
						</p>

						<div className="flex flex-wrap gap-2 pt-2">
							<span className="inline-flex items-center gap-1.5 rounded-xl bg-forest-50 border border-forest-200/60 px-3 py-1.5 text-xs font-bold text-forest-800">
								✓ No registration fees
							</span>
							<span className="inline-flex items-center gap-1.5 rounded-xl bg-forest-50 border border-forest-200/60 px-3 py-1.5 text-xs font-bold text-forest-800">
								✓ No termination penalties
							</span>
							<span className="inline-flex items-center gap-1.5 rounded-xl bg-forest-50 border border-forest-200/60 px-3 py-1.5 text-xs font-bold text-forest-800">
								✓ No lock-in contracts
							</span>
						</div>
					</div>

					{/* 7. How to ask for a refund */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									7
								</span>
								How to ask for a refund
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
								<Mail className="h-3.5 w-3.5 text-amber-600" /> Quick Email Process
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							Email us at{' '}
							<a
								href="mailto:support@theonlyteacher.com?subject=Refund%20Request"
								className="text-amber-600 font-bold hover:underline"
							>
								support@theonlyteacher.com
							</a>{' '}
							with the student's name and the plan you bought. We will confirm your refund amount and timing.
						</p>

						<div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-4 sm:p-5 space-y-3">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<span className="text-xs font-bold uppercase tracking-wider text-navy-500">
									Required Information in your Email:
								</span>
								<button
									onClick={handleCopyTemplate}
									className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-white border border-amber-200 px-2.5 py-1 rounded-lg transition-colors"
								>
									{copiedTemplate ? '✓ Copied Template!' : '📋 Copy Ready-to-Send Template'}
								</button>
							</div>

							<ul className="text-xs sm:text-sm text-navy-700 space-y-1.5 list-disc pl-5">
								<li>
									<strong>Student's Full Name:</strong> As registered on your account
								</li>
								<li>
									<strong>Plan Purchased:</strong> e.g. 25-Session Pack, Alpha One-to-One, etc.
								</li>
								<li>
									<strong>Registered Email / Phone:</strong> For verification
								</li>
							</ul>

							<div className="pt-2 flex flex-wrap gap-3">
								<a
									href="mailto:support@theonlyteacher.com?subject=Refund%20Request"
									className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-amber-600 shadow-sm"
								>
									<Mail className="h-3.5 w-3.5" /> Send Refund Request Email
								</a>
								<a
									href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, '')}?text=Hi,%20I%20have%20a%20question%20regarding%20my%20refund.`}
									target="_blank"
									rel="noreferrer noopener"
									className="inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-700 transition-all hover:bg-navy-50"
								>
									<MessageCircle className="h-3.5 w-3.5 text-forest-600" /> WhatsApp Support
								</a>
							</div>
						</div>
					</div>

					{/* 8. One policy, every region */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">
									8
								</span>
								One policy, every region
							</h2>
							<span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
								<ShieldCheck className="h-3.5 w-3.5 text-forest-600" /> Universal Standard
							</span>
						</div>

						<p className="text-[15px] leading-relaxed text-navy-700">
							This policy applies equally in the <strong>United Kingdom</strong>, the <strong>United Arab Emirates</strong>, <strong>Australia</strong>, <strong>New Zealand</strong> and <strong>India</strong>. This policy also forms part of our Terms of Use.
						</p>

						<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4 flex flex-wrap items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								<FileText className="h-5 w-5 text-amber-500" />
								<div>
									<p className="text-xs font-bold uppercase tracking-wider text-navy-400">Incorporated by Reference</p>
									<p className="text-sm font-bold text-navy-800">Terms of Use • Section 9 (Refunds &amp; Cancellations)</p>
								</div>
							</div>
							<Link
								to="/terms-of-use"
								className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
							>
								View Terms of Use <ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</div>

					{/* WORKED EXAMPLES SECTION */}
					<div className="rounded-3xl border-2 border-amber-300/80 bg-gradient-to-b from-amber-50/30 to-white p-6 sm:p-8 shadow-clay space-y-6">
						<div>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-800">
									<Calculator className="h-3.5 w-3.5" /> Worked Examples
								</span>
								<span className="text-xs font-bold text-navy-500">
									Active Currency: <strong className="text-navy-800">{activeRegion.countryName} ({activeRegion.currencyCode})</strong>
								</span>
							</div>

							<h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-800 mt-2">
								How Refund Calculations Work
							</h2>
							<p className="text-xs sm:text-sm text-navy-500 mt-1">
								(Example figures only, to show how the calculation works; actual refunds use the plan's real prices)
							</p>
						</div>

						{/* Currency switcher for examples */}
						<div className="rounded-2xl bg-white border border-navy-100 p-3 sm:p-4">
							<p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-2.5">
								Select Currency to View Example Figures:
							</p>
							<div className="flex flex-wrap gap-2">
								{REGIONS.map((r, i) => (
									<button
										key={r.code}
										onClick={() => setActiveRegionIndex(i)}
										className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
											activeRegionIndex === i
												? 'bg-amber-500 text-white shadow-sm'
												: 'bg-navy-50 text-navy-700 hover:bg-navy-100'
										}`}
									>
										<Flag code={r.flag} size={16} />
										<span>{r.currencyCode}</span>
										<span className="opacity-80">({r.symbol.trim()})</span>
									</button>
								))}
							</div>
						</div>

						{/* Example 1 */}
						<div className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 shadow-sm space-y-3">
							<div className="flex items-center justify-between gap-2 border-b border-navy-100 pb-3">
								<h3 className="font-display text-base sm:text-lg font-bold text-navy-800 flex items-center gap-2">
									<span className="grid h-6 w-6 place-items-center rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
										E1
									</span>
									Example 1: Cancelling early (No sessions taken)
								</h3>
								<span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-bold text-forest-700">
									Within 7 Days
								</span>
							</div>

							<div className="rounded-xl bg-navy-50/50 p-4 border border-navy-100/80 text-sm leading-relaxed text-navy-700">
								<strong>Policy Text:</strong> Suppose you paid{' '}
								<span className="font-bold text-navy-900">£450</span> for a plan and you cancel within 7 days of purchase without taking any session. Your refund is{' '}
								<span className="font-bold text-forest-700">£450 minus the payment gateway processing fee</span>.
							</div>

							{activeRegion.currencyCode !== 'GBP' && (
								<div className="rounded-xl bg-amber-50/60 p-3.5 border border-amber-200/60 text-xs sm:text-sm text-navy-700">
									<span className="font-bold text-amber-800">
										In {activeRegion.currencyCode} ({activeRegion.countryName}):
									</span>{' '}
									If you paid {sym}{packPrice.toLocaleString()} and cancel within 7 days without taking any session, your refund is{' '}
									<strong>{sym}{packPrice.toLocaleString()} minus the {activeRegion.exampleGatewayFee}</strong>.
								</div>
							)}

							<div className="flex items-center gap-2 text-xs text-navy-500 pt-1">
								<CheckCircle2 className="h-4 w-4 text-forest-600 shrink-0" />
								<span>Full principal returned — only third-party gateway fee retained by processor.</span>
							</div>
						</div>

						{/* Example 2 */}
						<div className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 shadow-sm space-y-3">
							<div className="flex items-center justify-between gap-2 border-b border-navy-100 pb-3">
								<h3 className="font-display text-base sm:text-lg font-bold text-navy-800 flex items-center gap-2">
									<span className="grid h-6 w-6 place-items-center rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
										E2
									</span>
									Example 2: Cancelling early after demo sessions
								</h3>
								<span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
									Demos Deducted
								</span>
							</div>

							<div className="rounded-xl bg-navy-50/50 p-4 border border-navy-100/80 text-sm leading-relaxed text-navy-700 space-y-2">
								<p>
									<strong>Policy Text:</strong> Suppose you paid{' '}
									<span className="font-bold text-navy-900">£450</span> and you took 1 free demo session before cancelling within 7 days. We deduct 1 session at the single session rate (£18) plus the payment gateway charges, and refund the rest (<strong>£450 minus £18 minus the gateway charges</strong>).
								</p>
								<p>
									If you took 3 free demo sessions, we deduct 3 sessions (3 × £18 = £54) plus the payment gateway charges, and refund the rest (<strong>£450 minus £54 minus the gateway charges</strong>).
								</p>
							</div>

							{activeRegion.currencyCode !== 'GBP' && (
								<div className="rounded-xl bg-amber-50/60 p-3.5 border border-amber-200/60 text-xs sm:text-sm text-navy-700 space-y-1.5">
									<p className="font-bold text-amber-800">
										In {activeRegion.currencyCode} ({activeRegion.countryName}):
									</p>
									<p>
										• <strong>1 Demo taken:</strong> Deduct 1 session ({sym}{demo1Deduction}) + gateway charges. Refund: <strong>{sym}{packPrice.toLocaleString()} − {sym}{demo1Deduction} − gateway fee</strong>.
									</p>
									<p>
										• <strong>3 Demos taken:</strong> Deduct 3 sessions (3 × {sym}{singleRate} = {sym}{demo3Deduction}) + gateway charges. Refund: <strong>{sym}{packPrice.toLocaleString()} − {sym}{demo3Deduction} − gateway fee</strong>.
									</p>
								</div>
							)}

							<div className="grid sm:grid-cols-2 gap-2.5 pt-1">
								<div className="rounded-xl border border-navy-100 bg-navy-50/40 p-3 text-xs">
									<p className="font-bold text-navy-800">1 Demo Taken Calculation</p>
									<p className="text-navy-600 mt-0.5">
										{sym}{packPrice.toLocaleString()} − {sym}{singleRate} (single session) − gateway charges
									</p>
								</div>
								<div className="rounded-xl border border-navy-100 bg-navy-50/40 p-3 text-xs">
									<p className="font-bold text-navy-800">3 Demos Taken Calculation</p>
									<p className="text-navy-600 mt-0.5">
										{sym}{packPrice.toLocaleString()} − {sym}{singleRate * 3} (3 × {sym}{singleRate}) − gateway charges
									</p>
								</div>
							</div>
						</div>

						{/* Example 3 */}
						<div className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 shadow-sm space-y-4">
							<div className="flex items-center justify-between gap-2 border-b border-navy-100 pb-3">
								<h3 className="font-display text-base sm:text-lg font-bold text-navy-800 flex items-center gap-2">
									<span className="grid h-6 w-6 place-items-center rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
										E3
									</span>
									Example 3: Cancelling later (10 of 25 sessions attended)
								</h3>
								<span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-bold text-forest-700">
									Standard Refund
								</span>
							</div>

							<div className="rounded-xl bg-navy-50/50 p-4 border border-navy-100/80 text-sm leading-relaxed text-navy-700">
								<strong>Policy Text:</strong> Suppose you bought a 25 session pack for{' '}
								<span className="font-bold text-navy-900">£450</span>. The single session rate is{' '}
								<span className="font-bold text-navy-900">£18</span>. You attended 10 sessions and then cancel.
								<ul className="mt-2 space-y-1 list-disc pl-5">
									<li>Unused sessions: <strong>15</strong></li>
									<li>Value of unused sessions: 15 × £18 = <strong>£270</strong></li>
									<li>Less 10% administration fee: <strong>£27</strong></li>
									<li>Your refund is: <strong className="text-forest-700 text-base">£243</strong></li>
								</ul>
							</div>

							{activeRegion.currencyCode !== 'GBP' && (
								<div className="rounded-xl bg-amber-50/60 p-4 border border-amber-200/60 text-xs sm:text-sm text-navy-700">
									<p className="font-bold text-amber-800 mb-2">
										In {activeRegion.currencyCode} ({activeRegion.countryName}):
									</p>
									<p>Suppose you bought a 25 session pack for {sym}{packPrice.toLocaleString()} at single session rate {sym}{singleRate}:</p>
									<ul className="mt-1.5 space-y-1 list-disc pl-5">
										<li>Unused sessions: <strong>15</strong></li>
										<li>Value of unused sessions: 15 × {sym}{singleRate} = <strong>{sym}{unusedValue.toLocaleString()}</strong></li>
										<li>Less 10% admin fee: <strong>{sym}{adminFee.toLocaleString()}</strong></li>
										<li>Your refund is: <strong className="text-forest-700 font-bold">{sym}{laterRefund.toLocaleString()}</strong></li>
									</ul>
								</div>
							)}

							{/* Summary Calculation Table */}
							<div className="overflow-hidden rounded-xl border border-navy-100">
								<table className="w-full text-left text-xs sm:text-sm">
									<thead className="bg-navy-800 text-white font-bold">
										<tr>
											<th className="py-2.5 px-3">Item Breakdown</th>
											<th className="py-2.5 px-3 text-right">Calculation</th>
											<th className="py-2.5 px-3 text-right">GBP Baseline</th>
											{activeRegion.currencyCode !== 'GBP' && (
												<th className="py-2.5 px-3 text-right bg-amber-600">
													{activeRegion.currencyCode}
												</th>
											)}
										</tr>
									</thead>
									<tbody className="divide-y divide-navy-100 bg-white">
										<tr>
											<td className="py-2.5 px-3 font-medium text-navy-800">Total Pack Purchased</td>
											<td className="py-2.5 px-3 text-right text-navy-600">25 sessions</td>
											<td className="py-2.5 px-3 text-right font-semibold text-navy-800">£450</td>
											{activeRegion.currencyCode !== 'GBP' && (
												<td className="py-2.5 px-3 text-right font-semibold text-amber-700">
													{sym}{packPrice.toLocaleString()}
												</td>
											)}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-medium text-navy-800">Sessions Attended</td>
											<td className="py-2.5 px-3 text-right text-navy-600">10 sessions</td>
											<td className="py-2.5 px-3 text-right text-navy-500">10 × £18 = £180</td>
											{activeRegion.currencyCode !== 'GBP' && (
												<td className="py-2.5 px-3 text-right text-navy-500">
													10 × {sym}{singleRate}
												</td>
											)}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-medium text-navy-800">Unused Sessions Remaining</td>
											<td className="py-2.5 px-3 text-right text-navy-600">15 sessions</td>
											<td className="py-2.5 px-3 text-right font-semibold text-navy-800">
												15 × £18 = £270
											</td>
											{activeRegion.currencyCode !== 'GBP' && (
												<td className="py-2.5 px-3 text-right font-semibold text-amber-700">
													15 × {sym}{singleRate} = {sym}{unusedValue.toLocaleString()}
												</td>
											)}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-medium text-rose-700">Less 10% Administration Fee</td>
											<td className="py-2.5 px-3 text-right text-rose-600">10% of unused balance</td>
											<td className="py-2.5 px-3 text-right font-semibold text-rose-700">−£27</td>
											{activeRegion.currencyCode !== 'GBP' && (
												<td className="py-2.5 px-3 text-right font-semibold text-rose-700">
													−{sym}{adminFee.toLocaleString()}
												</td>
											)}
										</tr>
										<tr className="bg-forest-50/70 font-bold">
											<td className="py-3 px-3 text-forest-900 font-display">Net Refund Returned</td>
											<td className="py-3 px-3 text-right text-forest-700">Credited to original card/bank</td>
											<td className="py-3 px-3 text-right text-base text-forest-800 font-extrabold">
												£243
											</td>
											{activeRegion.currencyCode !== 'GBP' && (
												<td className="py-3 px-3 text-right text-base text-forest-800 font-extrabold">
													{sym}{laterRefund.toLocaleString()}
												</td>
											)}
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					{/* Have questions card */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="space-y-1">
								<h2 className="font-display text-xl font-bold text-navy-800">
									Questions about your plan or a cancellation?
								</h2>
								<p className="text-sm text-navy-500">
									Our support team is here to help 24×7 across all time zones.
								</p>
							</div>

							<div className="flex flex-wrap gap-2.5">
								<a
									href="mailto:support@theonlyteacher.com"
									className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-amber-600 shadow-sm"
								>
									<Mail className="h-4 w-4" /> Email Support
								</a>
								<Link
									to="/terms-of-use"
									className="inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-xs font-bold text-navy-700 transition-all hover:bg-navy-50"
								>
									<FileText className="h-4 w-4 text-amber-500" /> Full Terms of Use
								</Link>
							</div>
						</div>
					</div>

					{/* Bottom Copyright and Legal Notice */}
					<div className="text-center pt-2 pb-6 text-xs sm:text-sm font-semibold text-navy-400">
						© {new Date().getFullYear()} TOT Edtech Private Limited. All rights reserved.
					</div>

				</div>
			</section>
		</>
	);
}
