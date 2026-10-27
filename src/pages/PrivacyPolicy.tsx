import PageHero from '@/components/layout/PageHero';
import Flag from '@/components/ui/Flag';
import { Mail, Phone, MessageSquare, MapPin, Building2, Globe, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
	return (
		<>
			<PageHero
				crumb="Privacy Policy"
				title={<>Privacy <span className="text-amber-500">Policy</span></>}
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
									<ShieldCheck className="h-3.5 w-3.5 text-amber-500" /> Official Legal Notice
								</span>
								<h2 className="font-display text-2xl font-extrabold text-navy-800 mt-2">Privacy Policy</h2>
								<p className="text-sm font-semibold text-navy-500">The Only Teacher • TOT Edtech Private Limited</p>
							</div>
							<div className="text-right">
								<span className="text-xs font-bold uppercase tracking-wider text-navy-400">Effective</span>
								<p className="text-sm font-bold text-navy-700">2026 Edition</p>
							</div>
						</div>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We are committed to respecting and protecting the privacy of students, parents, guardians, and visitors across all jurisdictions we serve.
						</p>
					</div>

					{/* 1. Who we are */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">1</span>
							Who we are
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600 mb-4">
							We are TOT Edtech Private Limited, the company behind The Only Teacher. We run the website <a href="https://www.theonlyteacher.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.theonlyteacher.com</a> and provide online tutoring for students in the United Kingdom, the United Arab Emirates, Australia and India.
						</p>
						<ul className="space-y-3 rounded-2xl bg-navy-50/60 p-4 sm:p-5 text-[14px] text-navy-700">
							<li className="flex items-start gap-2.5">
								<MapPin className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
								<span><strong>Our registered office:</strong> C30, Crystaa Tower, Sector 63, Noida, Uttar Pradesh 201301, India</span>
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
								<span><strong>Privacy contact:</strong> <a href="mailto:info@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">info@theonlyteacher.com</a>, <a href="tel:+919898632990" className="hover:text-amber-600 font-semibold">+91 9898632990</a> (India)</span>
							</li>
						</ul>
						<p className="text-[15px] leading-relaxed text-navy-600 mt-4">
							When we talk about data protection in this policy, we are the ones responsible for your personal information (legally called the data controller or data fiduciary).
						</p>
					</div>

					{/* 2. Who this policy is for */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">2</span>
							Who this policy is for
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600 mb-3">
							This policy is for parents and guardians, students, and anyone who visits our website. It explains what information we collect when you browse the site, book a free trial class, buy a tutoring plan (Alpha, Horizon or Apex), or get in touch with us.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Section 11 has extra details about your rights in the UK, UAE, Australia and India. If your local law gives you stronger protection, that law applies.
						</p>
					</div>

					{/* 3. What information we collect */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-6">
						<div>
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-3 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">3</span>
								What information we collect
							</h2>
							<p className="text-[15px] leading-relaxed text-navy-600">
								We collect information in three ways: what you tell us directly, what gets created when you use our services, and some technical details that are collected automatically.
							</p>
						</div>

						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5">
							<h3 className="font-display text-base font-extrabold text-navy-800 mb-3">3.1 What you share with us</h3>
							<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
								<li><strong>About you (the parent or guardian):</strong> your name, email address, phone or WhatsApp number, country, and how you are related to the student.</li>
								<li><strong>About the student:</strong> first name, school year, subjects, and anything about their learning needs that you would like us to know, so we can match the right tutor.</li>
								<li><strong>Bookings and plans:</strong> which plan you chose (Alpha, Horizon or Apex), subjects, session timings and attendance.</li>
								<li><strong>Payments:</strong> transaction references, amounts and plan history. Your card or bank details are handled securely by our payment providers, so we never see or store your full card number. In India we use Cashfree and ICICI Bank, and for international payments we use Skydo and PayPal.</li>
								<li><strong>Messages:</strong> emails, WhatsApp chats and any feedback or questions you send us.</li>
							</ul>
						</div>

						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5">
							<h3 className="font-display text-base font-extrabold text-navy-800 mb-3">3.2 Collected automatically</h3>
							<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
								<li>Technical details like your IP address, device and browser type, which pages you visit and how long you stay.</li>
								<li>Cookies and similar technologies (see section 6).</li>
							</ul>
						</div>

						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5">
							<h3 className="font-display text-base font-extrabold text-navy-800 mb-2">3.3 Notes from tutors</h3>
							<p className="text-[15px] leading-relaxed text-navy-600">
								Tutors sometimes share short session notes and attendance records with us so we can keep an eye on progress and quality. Parents can ask to see these at any time.
							</p>
						</div>
					</div>

					{/* 4. Why we use your information */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">4</span>
							Why we use your information
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600 mb-4">
							Here is what we do with your information, in plain terms:
						</p>
						<ul className="list-disc pl-5 space-y-2.5 text-[15px] leading-relaxed text-navy-600 mb-5">
							<li><strong>Running your tutoring:</strong> setting up trial classes, matching the right tutor, scheduling sessions and sharing progress updates with you.</li>
							<li><strong>Handling bookings and payments:</strong> taking plan payments, sending invoices and receipts, and processing refunds.</li>
							<li><strong>Staying in touch:</strong> answering your questions, sending booking confirmations, session reminders and service updates.</li>
							<li><strong>Keeping everyone safe:</strong> checking identities, protecting the children who use our service, and stopping misuse or fraud.</li>
							<li><strong>Making things better:</strong> understanding how people use our website and classes so we can improve them.</li>
							<li><strong>Following the law:</strong> tax, accounting and other legal duties, and cooperating with lawful requests from authorities.</li>
							<li><strong>Sharing news and offers:</strong> but only if you have said yes. You can opt out whenever you like (see section 12).</li>
						</ul>
						<p className="text-[15px] leading-relaxed text-navy-600 bg-navy-50/70 rounded-2xl p-4 border border-navy-100">
							Where the law asks us to name a legal reason for using your data (for example under UK data protection law), we rely on our contract with you, our legal obligations, our legitimate interests in running a safe tutoring service, and your consent where we have asked for it.
						</p>
					</div>

					{/* 5. Children and safeguarding */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-4">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">5</span>
							Children and safeguarding
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Our plans are bought and managed by a parent or guardian. We do not knowingly collect information directly from children on their own.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							As a parent or guardian, please make sure the details you share about your child are accurate, and that you are happy for us to have them.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							The rules about children's ages are a little different everywhere. In the UK, a child of 13 or older can give their own consent for online services. In Australia we generally expect a parent's consent for younger children. In the UAE and India, anyone under 18 counts as a child and we need clear, verifiable consent from a parent.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We never use children's information for targeted advertising or behaviour tracking, and we never use it in a way that could harm a child's wellbeing.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Keeping children safe matters deeply to us. Our tutors go through background verification as required by law. We also encourage parents to keep an eye on sessions, especially for younger children.
						</p>
						<div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-[15px] text-navy-700">
							If something ever worries you about a child's safety, please tell us straight away at <a href="mailto:safeguarding@theonlyteacher.com" className="font-bold text-amber-700 underline">safeguarding@theonlyteacher.com</a>.
						</div>
					</div>

					{/* 6. Cookies */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">6</span>
							Cookies
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We use cookies, which are small files stored on your device. Some keep the website working properly (like remembering where you got to in the booking form), some help us understand in general how the site is used, and some (only with your permission, where the law requires it) help with marketing. You can switch cookies off in your browser settings, but parts of the site might not work as well.
						</p>
					</div>

					{/* 7. Who we share your information with */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">7</span>
							Who we share your information with
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600 mb-4">
							We do not sell your personal information, full stop. We only share it in these situations:
						</p>
						<ul className="list-disc pl-5 space-y-2.5 text-[15px] leading-relaxed text-navy-600">
							<li><strong>With your tutor:</strong> only what they need to teach, like the student's first name, year, subjects and session timings.</li>
							<li><strong>With companies that help us run things:</strong> website hosting, our class platform (wise.live), email and WhatsApp tools, and our payment providers (Cashfree, ICICI Bank, Skydo and PayPal). They are only allowed to use the information to do their job for us.</li>
							<li><strong>When the law requires it:</strong> for example a court order, or to protect the safety and rights of our students, team and business.</li>
							<li><strong>If our business is ever sold or restructured:</strong> information could move across as part of that, but it would stay protected.</li>
						</ul>
					</div>

					{/* 8. Information crossing borders */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">8</span>
							Information crossing borders
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We are based in India, so your information may be stored and processed in India and in the countries where our service providers operate. Whenever information crosses a border, we make sure proper safeguards are in place, such as strong contracts, and we follow the transfer rules of each region.
						</p>
					</div>

					{/* 9. How long we keep your information */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-3">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">9</span>
							How long we keep your information
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We keep your account and booking records while your account is active, and for a reasonable time after that to deal with questions, refunds or legal matters.
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Financial and tax records stay for as long as the law says they must (for example under Indian tax law).
						</p>
						<p className="text-[15px] leading-relaxed text-navy-600">
							When we no longer need information, we delete it or anonymise it. You can also ask us to delete it sooner (see section 11), and we will unless the law says we must keep it.
						</p>
					</div>

					{/* 10. Keeping your information secure */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">10</span>
							Keeping your information secure
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We protect your information with sensible technical and organisational measures, like limiting who can access it, using secure connections, and making sure our staff and tutors understand confidentiality. No system is perfect though, so we cannot promise absolute security. If a breach ever puts you at risk, we will tell you and the relevant authority as the law requires.
						</p>
					</div>

					{/* 11. Your rights, by region */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-6">
						<div>
							<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-3 flex items-center gap-3">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">11</span>
								Your rights, by region
							</h2>
							<p className="text-[15px] leading-relaxed text-navy-600">
								To use any of these rights, just email us at <a href="mailto:info@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">info@theonlyteacher.com</a>. We might need to check your identity first. We aim to reply within one month, or sooner if your local law says so.
							</p>
						</div>

						{/* 11.1 United Kingdom */}
						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5 sm:p-6">
							<div className="flex items-center gap-2.5 mb-3">
								<Flag code="GB" size={18} />
								<h3 className="font-display text-lg font-extrabold text-navy-800">11.1 United Kingdom</h3>
							</div>
							<p className="text-[14px] font-semibold text-navy-500 mb-3">Under the UK GDPR and the Data Protection Act 2018, you can:</p>
							<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600 mb-4">
								<li>Ask for a copy of the information we hold about you.</li>
								<li>Ask us to fix anything that is wrong.</li>
								<li>Ask us to delete your information.</li>
								<li>Ask us to limit how we use it, or to give it to you in a portable format.</li>
								<li>Object to how we use it, including saying no to direct marketing at any time.</li>
								<li>Withdraw your consent, where we were relying on it.</li>
								<li>Complain to the Information Commissioner's Office (ICO) at <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.ico.org.uk</a> if you feel we have not handled things well.</li>
							</ul>
						</div>

						{/* 11.2 United Arab Emirates */}
						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5 sm:p-6">
							<div className="flex items-center gap-2.5 mb-3">
								<Flag code="AE" size={18} />
								<h3 className="font-display text-lg font-extrabold text-navy-800">11.2 United Arab Emirates</h3>
							</div>
							<p className="text-[14px] font-semibold text-navy-500 mb-3">Under the UAE's data protection law (Federal Decree-Law No. 45 of 2021), you can:</p>
							<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
								<li>See the personal data we hold about you, and ask us to correct or delete it.</li>
								<li>Get your data in a portable format.</li>
								<li>Ask us to limit how we use it, and object to automated decisions or profiling.</li>
								<li>Withdraw your consent at any time.</li>
								<li>Complain to the UAE Data Office.</li>
							</ul>
						</div>

						{/* 11.3 Australia */}
						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5 sm:p-6">
							<div className="flex items-center gap-2.5 mb-3">
								<Flag code="AU" size={18} />
								<h3 className="font-display text-lg font-extrabold text-navy-800">11.3 Australia</h3>
							</div>
							<p className="text-[14px] font-semibold text-navy-500 mb-3">Under the Privacy Act 1988 and the Australian Privacy Principles, you can:</p>
							<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600 mb-3">
								<li>Ask for access to the personal information we hold about you, and ask us to correct it.</li>
							</ul>
							<p className="text-[15px] leading-relaxed text-navy-600">
								If you think we have breached your privacy, please contact us first at <a href="mailto:info@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">info@theonlyteacher.com</a> so we can look into it. If you are still unhappy, you can complain to the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.oaic.gov.au</a>.
							</p>
						</div>

						{/* 11.4 India */}
						<div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-5 sm:p-6">
							<div className="flex items-center gap-2.5 mb-3">
								<Flag code="IN" size={18} />
								<h3 className="font-display text-lg font-extrabold text-navy-800">11.4 India</h3>
							</div>
							<p className="text-[14px] font-semibold text-navy-500 mb-3">Under the Digital Personal Data Protection Act, 2023, you can:</p>
							<ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
								<li>Ask for a summary of the personal data we hold, what we do with it, and who we have shared it with.</li>
								<li>Ask us to correct, complete or update your data, and to erase it unless the law requires us to keep it.</li>
								<li>Raise a grievance with our Grievance Officer, Ashish Sharma, at <a href="mailto:grievance@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">grievance@theonlyteacher.com</a> (<a href="tel:+919898632990" className="hover:text-amber-600 font-semibold">+91 9898632990</a>). We will respond within the timelines the law sets.</li>
								<li>Nominate someone to exercise your rights for you if you are unable to.</li>
								<li>Complain to the Data Protection Board of India.</li>
							</ul>
						</div>
					</div>

					{/* 12. Marketing messages */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">12</span>
							Marketing messages
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We only send marketing messages if you have agreed to them or the law otherwise allows it. Every marketing message has an unsubscribe option, and you can opt out any time by contacting us. Opting out of marketing will not stop essential messages like booking confirmations and session reminders.
						</p>
					</div>

					{/* 13. Links to other websites */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">13</span>
							Links to other websites
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							Our website sometimes links to other sites, such as payment providers or social media. This policy does not cover them, so please check their privacy policies before sharing your information there.
						</p>
					</div>

					{/* 14. If we change this policy */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 mb-4 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">14</span>
							If we change this policy
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							We may update this policy when our services or legal duties change. We will post the new version on this page with a fresh 'Last updated' date, and we will tell you about important changes where the law requires it.
						</p>
					</div>

					{/* 15. Contact us */}
					<div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-clay space-y-5">
						<h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-800 flex items-center gap-3">
							<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 font-display text-sm font-bold text-amber-800">15</span>
							Contact us
						</h2>
						<p className="text-[15px] leading-relaxed text-navy-600">
							If you have any privacy question or request, here is how to reach us:
						</p>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Mail className="h-4 w-4 text-amber-500" /> General Privacy Inquiries
								</div>
								<a href="mailto:info@theonlyteacher.com" className="text-sm font-bold text-navy-800 hover:text-amber-600">info@theonlyteacher.com</a>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<ShieldCheck className="h-4 w-4 text-amber-500" /> Safeguarding Concerns
								</div>
								<a href="mailto:safeguarding@theonlyteacher.com" className="text-sm font-bold text-navy-800 hover:text-amber-600">safeguarding@theonlyteacher.com</a>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Flag code="IN" size={14} /> Grievance Officer (India)
								</div>
								<p className="text-sm font-bold text-navy-800">Ashish Sharma</p>
								<div className="flex flex-col gap-0.5 mt-1 text-xs text-navy-600">
									<a href="mailto:grievance@theonlyteacher.com" className="text-amber-600 font-semibold hover:underline">grievance@theonlyteacher.com</a>
									<a href="tel:+919898632990" className="hover:text-amber-600 font-medium">+91 9898632990</a>
								</div>
							</div>

							<div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
									<Phone className="h-4 w-4 text-amber-500" /> Phone & WhatsApp Support
								</div>
								<div className="flex flex-col gap-1 text-xs">
									<div>
										<span className="text-navy-500">Phone (India): </span>
										<a href="tel:+919898632990" className="font-bold text-navy-800 hover:text-amber-600">+91 9898632990</a>
									</div>
									<div>
										<span className="text-navy-500">WhatsApp (UK): </span>
										<a href="https://wa.me/447741271981" target="_blank" rel="noopener noreferrer" className="font-bold text-forest-600 hover:underline">+44 7741 271981</a>
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

						<p className="text-[14px] leading-relaxed text-navy-600 bg-navy-50/70 rounded-2xl p-4 border border-navy-100">
							If we cannot sort out your concern, you can complain to your local data protection authority: the ICO in the UK (<a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.ico.org.uk</a>), the UAE Data Office, the OAIC in Australia (<a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">www.oaic.gov.au</a>), or the Data Protection Board of India.
						</p>
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
