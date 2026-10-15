import PageHero from '@/components/layout/PageHero';
import { BRAND } from '@/data/site';

export default function TermsOfUse() {
 return (
  <>
   <PageHero
    crumb="Terms of Use"
    title={<>Terms and <span className="text-amber-500">Conditions</span></>}
    compact={true}
   />
   <section className="py-12">
    <div className="container-tot max-w-4xl mx-auto space-y-8">

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">1. Acceptance of Terms</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "Teacher", "Student", "Parent", or "You") and Only Teacher ("Platform", "we", "our", or "us"). These Terms apply to all visitors, registered members, tutors, students, and any parties who access or use our online services, website, applications, and communications infrastructure. If you do not agree with any provision set forth in these Terms, you must immediately cease all access to and use of the platform. Continued access constitutes unambiguous acceptance of the version currently in force.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">2. Eligibility & Minor Accounts</h2>
      <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Age Requirement:</strong> You must be at least 18 years of age (or the legal age of contractual majority in your jurisdiction) to establish an account or initiate financial transactions independently.</li>
       <li><strong>Minors & Students:</strong> Minors under the age of 18 may only use the services with explicit verifiable consent and continuous supervision of a parent or legal guardian. The parent or guardian assumes full legal and financial responsibility for all actions performed by the minor on the platform.</li>
       <li><strong>Institutional Authority:</strong> If registering or executing agreements on behalf of a school, educational institution, coaching center, or corporate entity, you represent and warrant that you hold express authorization to bind that entity to these Terms.</li>
      </ul>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">3. Description of Platform Services & Intermediary Role</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       Only Teacher provides a specialized digital marketplace and educational matching infrastructure connecting independent educators, tutors, and instructors ("Teachers") with learners, parents, and academic seekers ("Students").
      </p>
      <p className="text-[15px] leading-relaxed text-navy-600">
       <strong>Independent Contractor Status:</strong> Unless explicitly agreed in writing, Teachers are independent contractors and not employees, agents, partners, or joint venturers of Only Teacher. Only Teacher acts solely as a technology facilitator and communication venue. We do not control, supervise, direct, or endorse the specific curriculum, lesson delivery, pedagogical accuracy, or personal conduct of individual Teachers.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">4. User Accounts, Verification, and Security</h2>
      <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Accuracy of Information:</strong> You agree to provide true, accurate, current, and complete details during profile creation, identity validation, and onboarding, and to update such information promptly.</li>
       <li><strong>Account Security:</strong> You are solely responsible for maintaining the confidentiality of your credentials, passwords, and two-factor authentication tokens. Any action executed through your account credentials will be deemed executed by you.</li>
       <li><strong>Unauthorized Access:</strong> You agree to notify Only Teacher support immediately upon discovery of any suspected compromise, unauthorized access, or breach of your credentials.</li>
       <li><strong>Right to Suspend or Terminate:</strong> We reserve the right to audit, suspend, restrict, or terminate any account that furnishes deceptive credentials, engages in abusive practices, or violates these Terms.</li>
      </ul>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">5. Specific Terms for Teachers and Instructors</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-3">Teachers registering or offering instruction on Only Teacher agree to the following obligations:</p>
      <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Credential Integrity:</strong> You warrant that all academic degrees, teaching certifications, years of experience, and achievements displayed on your public profile are authentic and verifiable.</li>
       <li><strong>Professional Conduct & Safety:</strong> You agree to conduct all virtual sessions with the highest standard of decorum, professionalism, and respect, observing strict child safety, non-harassment, and student protection guidelines.</li>
       <li><strong>Compliance with Educational Laws:</strong> You are solely responsible for complying with applicable regional tax, licensing, background check, and educational disclosure regulations applicable to private tutoring.</li>
       <li><strong>No Circumvention:</strong> You agree not to solicit students met via the platform to conduct off-platform payments or circumvent platform booking structures where prohibited.</li>
      </ol>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">6. Code of Conduct & Prohibited Activities</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-3">Users of Only Teacher strictly agree not to engage in any of the following prohibited behaviors:</p>
      <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed text-navy-600">
       <li>Harassing, abusing, demeaning, bullying, stalking, or discriminating against any student, tutor, administrator, or community member on any basis (including race, gender, religion, or nationality).</li>
       <li>Distributing, uploading, or linking to obscene, pornographic, violent, hateful, defamatory, or unlawful materials.</li>
       <li>Academic dishonesty: preparing graded submissions, taking live proctored exams on behalf of a student, or engaging in fraudulent academic assistance.</li>
       <li>Introducing malicious scripts, trojans, viruses, scraping tools, automated bots, or data extraction mechanisms without express authorization.</li>
       <li>Attempting to bypass access controls, penetrate server security, or intercept private student/teacher communications.</li>
      </ul>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">7. Payments, Fees, Rescheduling & Refunds</h2>
      <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Fees & Currency:</strong> All tutoring rates, package fees, or subscription amounts are presented clearly prior to booking. You authorize Only Teacher or its integrated third-party payment gateways to process charges to your chosen payment method.</li>
       <li><strong>Third-Party Payment Gateways:</strong> Payments are processed through secure external payment facilitators (e.g., Stripe, Razorpay, PayPal). We do not store complete payment card credentials on our servers.</li>
       <li><strong>Cancellations & Rescheduling:</strong> Class cancellations or rescheduling must adhere to the designated cancellation window specified during booking. Late cancellations or unattended sessions ("no-shows") may be billed at full price.</li>
       <li><strong>Refund Policy:</strong> Disputed sessions or refund requests must be filed within forty-eight (48) hours of the scheduled session. Completed classes and downloaded digital curriculum assets are non-refundable, except where mandatory consumer protection statutes dictate otherwise.</li>
      </ul>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">8. Intellectual Property Rights</h2>
      <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Platform Property:</strong> The platform design, logos, trademarks, visual interfaces, UI design, codebases, and brand assets at https://www.theonlyteacher.com/ are the exclusive property of Only Teacher and protected by copyright and intellectual property legislation.</li>
       <li><strong>User Content License:</strong> Users retain ownership of personal notes, study guides, and instructional media uploaded. However, by uploading content to Only Teacher, you grant us a worldwide, non-exclusive, royalty-free license to host, display, transcode, and transmit such media solely as required to provide platform functionality.</li>
      </ul>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">9. Third-Party Integrations & External Services</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       The platform may integrate third-party communications tools (e.g., Zoom, Google Meet, whiteboards, calendar synchronization, and cloud storage). Your usage of third-party tools is governed by their respective terms of service and privacy policies. Only Teacher bears no liability for outages or failures of external software providers.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">10. Disclaimer of Warranties</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 uppercase font-bold text-navy-800">
       THE PLATFORM AND ALL TUTORING CONTENT ARE PROVIDED STRICTLY ON AN "AS IS" AND "AS AVAILABLE" BASIS. ONLY TEACHER EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE MAKE NO GUARANTEES CONCERNING ACADEMIC RESULTS, EXAM SCORES, GRADE IMPROVEMENTS, OR CONTINUOUS UNINTERRUPTED UPTIME.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">11. Limitation of Liability</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 uppercase font-bold text-navy-800">
       TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL ONLY TEACHER, ITS DIRECTORS, FOUNDERS, EMPLOYEES, AFFILIATES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO ONLY TEACHER IN THE SIX (6) MONTHS PRECEDING THE CLAIM, OR $50.00 USD, WHICHEVER IS LESS.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">12. Indemnification</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       You agree to defend, indemnify, and hold harmless Only Teacher, its directors, officers, employees, contractors, and agents against any claims, liabilities, damages, awards, judgments, losses, costs, and expenses (including reasonable legal fees) resulting from your violation of these Terms, your breach of any third-party rights, or any content or actions submitted through your user profile.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">13. Governing Law & Dispute Resolution</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       These Terms shall be governed by, interpreted, and construed in accordance with the substantive laws of the applicable jurisdiction where the platform operator is registered, without giving effect to conflict of laws principles. In the event of a dispute, controversy, or claim arising out of these Terms, the parties agree to first seek informal dispute resolution in good faith before initiating formal legal or arbitration proceedings in courts of competent jurisdiction.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">14. Modifications to Terms</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       Only Teacher reserves the right to revise, supplement, or replace these Terms at its sole discretion. Any revision becomes effective immediately upon publication on the platform with an updated effective date. Continued utilization of the service following modifications constitutes binding acceptance of the updated Terms.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">15. Contact Information & Support</h2>
      <ul className="space-y-3 mt-4 text-[15px] font-medium text-navy-700">
       <li><strong>Platform URL:</strong> <a href="https://www.theonlyteacher.com/" className="text-amber-600 hover:underline">https://www.theonlyteacher.com/</a></li>
       <li><strong>Legal Inquiries:</strong> legal@theonlyteacher.com / support@theonlyteacher.com</li>
       <li><strong>Entity Operator:</strong> Only Teacher Platform Operations Team</li>
       <li><strong>Response Time:</strong> 2–3 business days for legal and compliance inquiries</li>
      </ul>
     </div>

    </div>
   </section>
  </>
 );
}
