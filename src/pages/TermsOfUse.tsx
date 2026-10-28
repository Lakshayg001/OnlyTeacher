import { Link } from 'react-router-dom';
import PageHero from '@/components/layout/PageHero';
import { Mail, Phone, MapPin, Building2, Globe, FileText, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function TermsOfUse() {
	return (
		<>
			<PageHero
				crumb="Terms of Use"
				title={<>Terms of <span className="text-amber-500">Use</span></>}
				sub="The Only Teacher • TOT Edtech Private Limited"
				compact={true}
			/>

			<section className="py-12 sm:py-16 bg-navy-50/40">
				<div className="container-tot max-w-4xl mx-auto space-y-8">

					{/* Header Summary Card */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 pb-5 mb-5">
							<div>
								<span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
									<FileText className="h-3.5 w-3.5 text-amber-500" /> Terms & Service Agreement
								</span>
								<h2 className="font-display text-2xl font-extrabold text-navy-800 mt-2">Terms of Use</h2>
								<p className="text-sm font-semibold text-navy-500">The Only Teacher • TOT Edtech Private Limited</p>
							</div>
							<div className="text-right">
								<span className="text-xs font-bold uppercase tracking-wider text-navy-400">Effective</span>
								<p className="text-sm font-bold text-navy-700">2026 Edition</p>
							</div>
						</div>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Please review these Terms of Use carefully. By accessing or using our tutoring services, you agree to be bound by these ground rules.
						</p>
					</div>

					{/* 1. Welcome */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">1</span>
							Welcome
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							These Terms of Use are the ground rules for using our website and our online tutoring services. When you use <a href="https://www.theonlyteacher.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.theonlyteacher.com</a>, book a trial class or buy a plan, you agree to these terms. If you do not agree with them, please do not use our services.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							If you are a parent or guardian buying on behalf of a child, you accept these terms for yourself and for your child.
						</p>
					</div>

					{/* 2. Who we are */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">2</span>
							Who we are
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600 mb-4">
							We are TOT Edtech Private Limited, the company behind The Only Teacher (tagline: Connect. Learn. Grow.).
						</p>
						<ul className="space-y-3 rounded-2xl bg-navy-50/60 p-4 sm:p-5 text-[14px] text-navy-700">
							<li className="flex items-start gap-2.5">
								<MapPin className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
								<span><strong>Registered office:</strong> C30, Crystaa Tower, Sector 63, Noida, Uttar Pradesh 201301, India</span>
							</li>
							<li className="flex items-start gap-2.5">
								<Building2 className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
								<span><strong>Company registration (CIN):</strong> U85500UW2026PTC258596</span>
							</li>
							<li className="flex items-start gap-2.5">
								<Globe className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
								<span><strong>Website:</strong> <a href="https://www.theonlyteacher.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.theonlyteacher.com</a></span>
							</li>
							<li className="flex items-start gap-2.5">
								<Mail className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
								<span><strong>Support:</strong> <a href="mailto:support@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">support@theonlyteacher.com</a></span>
							</li>
							<li className="flex items-start gap-2.5">
								<Phone className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
								<span><strong>WhatsApp (UK):</strong> <a href="https://wa.me/447741271981" target="_blank" rel="noopener noreferrer" className="text-forest-600 font-semibold hover:underline">+44 7741 271981</a> | <strong>Phone (India):</strong> <a href="tel:+919898632990" className="hover:text-amber-600 font-semibold">+91 9898632990</a></span>
							</li>
						</ul>
					</div>

					{/* 3. What we offer */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">3</span>
							What we offer
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We provide live online tutoring for school students, serving families mainly in the United Kingdom, the United Arab Emirates, Australia and India.
						</p>
						<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
							<li><strong>Subjects:</strong> Mathematics, English and Science for Years 2 to 13, plus Physics, Chemistry, Biology and Computer Science where applicable.</li>
							<li><strong>Plans:</strong> Alpha (one-to-one), Horizon (two students learning together) and Apex (a small group of up to four).</li>
							<li><strong>Delivery:</strong> all classes are taught live online through our class platform.</li>
						</ul>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Our current plans, subjects and prices are shown on our website. We may add or change plans over time, and we will tell you about any important changes.
						</p>
					</div>

					{/* 4. Accounts and eligibility */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">4</span>
							Accounts and eligibility
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Plans must be purchased by a parent or guardian, or by an adult student. You must be 18 or older to create an account and make payments.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Please give us accurate information and keep it up to date.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Keep your login details private. You are responsible for anything done through your account, so let us know straight away at <a href="mailto:support@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">support@theonlyteacher.com</a> if you think someone else has used it.
						</p>
					</div>

					{/* 5. Free trial class */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">5</span>
							Free trial class
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We offer a free trial class so you can experience our teaching before you buy anything. One trial class per student. After the trial there is no obligation to purchase.
						</p>
					</div>

					{/* 6. Bookings, payments and plans */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">6</span>
							Bookings, payments and plans
						</h2>
						<ul className="list-disc pl-5 space-y-2.5 text-[15px] leading-relaxed text-navy-600">
							<li>Prices are shown on our website at the time of booking, in the applicable currency.</li>
							<li>For payments within India we use Cashfree and ICICI Bank. For international payments we use Skydo and PayPal.</li>
							<li>A plan is for the student named at the time of booking and cannot be shared with others, unless we have agreed otherwise in writing.</li>
							<li>Sessions should be used within the plan validity shown at the time of purchase. If you need an extension for a genuine reason, just talk to us.</li>
							<li>We will email you a receipt or invoice for every payment.</li>
							<li><strong>No joining or leaving fee:</strong> we do not charge any onboarding fee when you join, and there is no resignation or cancellation fee when you stop. You only pay for the plan you choose, as shown on our website.</li>
						</ul>
					</div>

					{/* 7. Scheduling, rescheduling and missed sessions */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">7</span>
							Scheduling, rescheduling and missed sessions
						</h2>
						<ul className="list-disc pl-5 space-y-2.5 text-[15px] leading-relaxed text-navy-600">
							<li>Session timings are fixed by mutual agreement between you and us.</li>
							<li><strong>Need to reschedule?</strong> Tell us at least 24 hours before the session and we will do our best to find another slot for you. In a genuine emergency, we will consider requests made at least 6 hours before the session.</li>
							<li>If a student misses a session without telling us in time, that session will be counted as taken.</li>
							<li>If a tutor misses a session, or if we have to cancel, we will reschedule it or credit it back to you. You will never lose a session because of a problem on our side.</li>
						</ul>
					</div>

					{/* 8. Conduct and safeguarding */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">8</span>
							Conduct and safeguarding
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We want every session to be safe, respectful and productive:
						</p>
						<ul className="list-disc pl-5 space-y-2.5 text-[15px] leading-relaxed text-navy-600">
							<li>Students should join on time and come prepared. Keeping the camera on helps the tutor teach better, wherever possible.</li>
							<li>Please treat our tutors and team with respect. Abusive or threatening behaviour towards a tutor or staff member can lead to suspension of sessions.</li>
							<li>We encourage parents and guardians to supervise sessions, especially for younger children.</li>
							<li>Keeping children safe matters deeply to us. Our tutors go through background verification as required by law. If something ever worries you about a child's safety, please tell us straight away at <a href="mailto:safeguarding@theonlyteacher.com" className="font-bold text-amber-700 underline">safeguarding@theonlyteacher.com</a>.</li>
							<li>Please do not record sessions without our written permission.</li>
						</ul>
					</div>

					{/* 9. Refunds and cancellations */}
					<div id="refunds" className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<div className="flex flex-wrap items-center justify-between gap-3 mb-2">
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">9</span>
								Refunds and cancellations
							</h2>
							<Link
								to="/refund-policy"
								className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors"
							>
								View Dedicated Policy <ArrowUpRight className="h-3.5 w-3.5" />
							</Link>
						</div>
						<p className="text-[15px] leading-relaxed text-navy-600">
							<strong>Changed your mind early?</strong> If you cancel within the first 2 sessions or within 7 days of purchase (whichever comes first), we refund what you paid minus a small processing fee charged by the payment gateway.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							After that, we refund only the unused sessions. Sessions already taken are charged at the single-session rate, and a 10% administration fee applies on the refundable balance.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Refunds are processed within 7 to 10 working days to your original payment method.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Full details are in our{' '}
							<Link
								to="/refund-policy"
								className="text-amber-600 font-bold hover:underline inline-flex items-center gap-1"
							>
								Refund and Cancellation Policy
								<ArrowUpRight className="h-3.5 w-3.5 inline" />
							</Link>
							, which forms part of these terms.
						</p>
						<div className="mt-4 pt-4 border-t border-navy-100 flex flex-wrap items-center justify-between gap-3">
							<span className="text-xs font-semibold text-navy-500">
								One unified policy applies in the UK, UAE, Australia, New Zealand and India.
							</span>
							<Link
								to="/refund-policy"
								className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-amber-600 shadow-sm"
							>
								Read Full Refund &amp; Cancellation Policy →
							</Link>
						</div>
					</div>

					{/* 10. Our content and intellectual property */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">10</span>
							Our content and intellectual property
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Everything on our website, including text, images, videos, our logo and the name The Only Teacher, belongs to us or our licensors. Please do not copy or reuse it without our written permission.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Study materials shared during sessions are for the student's personal learning only and must not be shared publicly or used commercially.
						</p>
					</div>

					{/* 11. Using the website fairly */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">11</span>
							Using the website fairly
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Please use our website lawfully and fairly. Do not try to hack it, scrape its content, introduce viruses, or do anything that could harm the site or other users.
						</p>
					</div>

					{/* 12. No guarantees */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">12</span>
							No guarantees
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Our tutors work hard and give their best in every session, but learning depends on many things, including the student's own effort and consistency. So while we promise quality teaching, we cannot guarantee specific grades, marks or exam results.
						</p>
					</div>

					{/* 13. Disclaimers and our liability */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">13</span>
							Disclaimers and our liability
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We provide our website and services on an 'as is' basis and work hard to keep everything running smoothly, but we cannot promise the site will always be error-free or uninterrupted.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							To the maximum extent allowed by law, our total liability for any claim connected to our services is limited to the fees you paid for the plan or services the claim relates to.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Nothing in these terms limits rights you have under consumer protection laws that cannot be excluded.
						</p>
					</div>

					{/* 14. Suspending or ending the service */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">14</span>
							Suspending or ending the service
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							You can stop using our services at any time. The refund terms in section 9 will apply.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We may suspend or end your access if these terms are seriously breached, for example for non-payment or abusive behaviour. We will tell you before we do so, wherever practical.
						</p>
					</div>

					{/* 15. Governing law */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">15</span>
							Governing law
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							These terms are governed by the laws of India. If a disagreement arises, we will first try to resolve it through friendly discussion. If that does not work, the courts at Noida, Uttar Pradesh will have jurisdiction.
						</p>
					</div>

					{/* 16. Changes to these terms */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">16</span>
							Changes to these terms
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We may update these terms from time to time. We will post the new version on this page with a fresh 'Last updated' date, and we will tell you about important changes before they take effect. Continuing to use our services after the changes means you accept the updated terms.
						</p>
					</div>

					{/* 17. Contact us */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-5">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">17</span>
							Contact us
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							For anything about these terms, your plan, or your sessions:
						</p>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Mail className="h-4 w-4 text-amber-500" /> Customer Support
								</div>
								<a href="mailto:support@theonlyteacher.com" className="text-sm font-bold text-navy-800 hover:text-amber-600">support@theonlyteacher.com</a>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Mail className="h-4 w-4 text-amber-500" /> Privacy Team
								</div>
								<a href="mailto:info@theonlyteacher.com" className="text-sm font-bold text-navy-800 hover:text-amber-600">info@theonlyteacher.com</a>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<ShieldAlert className="h-4 w-4 text-amber-500" /> Safeguarding Concerns
								</div>
								<a href="mailto:safeguarding@theonlyteacher.com" className="text-sm font-bold text-navy-800 hover:text-amber-600">safeguarding@theonlyteacher.com</a>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Phone className="h-4 w-4 text-amber-500" /> Phone & WhatsApp Support
								</div>
								<div className="flex flex-col gap-1 text-xs">
									<div>
										<span className="text-navy-500">WhatsApp (UK): </span>
										<a href="https://wa.me/447741271981" target="_blank" rel="noopener noreferrer" className="font-bold text-forest-600 hover:underline">+44 7741 271981</a>
									</div>
									<div>
										<span className="text-navy-500">Phone (India): </span>
										<a href="tel:+919898632990" className="font-bold text-navy-800 hover:text-amber-600">+91 9898632990</a>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
							<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
								<MapPin className="h-4 w-4 text-amber-500" /> Postal Address
							</div>
							<p className="text-sm text-navy-700 font-medium">
								TOT Edtech Private Limited, C30, Crystaa Tower, Sector 63, Noida, Uttar Pradesh 201301, India
							</p>
						</div>
					</div>

					{/* Bottom Copyright */}
					<div className="text-center pt-4 pb-8 border-t border-navy-100 text-sm font-semibold text-navy-500">
						Copyright 2026 TOT Edtech Private Limited. All rights reserved.
					</div>

				</div>
			</section>
		</>
	);
}
