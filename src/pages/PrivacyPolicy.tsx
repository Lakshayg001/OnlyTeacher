import PageHero from '@/components/layout/PageHero';
import { BRAND } from '@/data/site';

export default function PrivacyPolicy() {
 return (
  <>
   <PageHero
    crumb="Privacy Policy"
    title={<>Privacy <span className="text-amber-500">Policy</span></>}
    compact={true}
   />
   <section className="py-12">
    <div className="container-tot max-w-4xl mx-auto space-y-8">
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       <strong>Platform:</strong> The Only Teachers (https://www.theonlyteachers.com/) <br/>
       <strong>Effective Date:</strong> September 14, 2026
      </p>
      <p className="text-[15px] leading-relaxed text-navy-600">
       <strong>Commitment to Privacy:</strong> At The Only Teachers, we respect your privacy and are committed to protecting personal data. This Privacy Policy outlines how we collect, process, store, and safeguard data when you visit or use our platform at https://www.theonlyteachers.com/.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">1. Scope and Controller Information</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       This Privacy Policy applies to all students, parents, guardians, tutors, educators, and visitors accessing The Only Teachers ("Platform", "we", "us", or "our"). For applicable data protection laws (such as GDPR, DPDP Act, or state privacy laws), The Only Teachers operates as the data controller regarding personal details collected through platform interactions.
      </p>
     </div>

     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">2. Information We Collect</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       We collect personal information in several categories depending on how you engage with our platform:
      </p>
      <div className="overflow-x-auto">
       <table className="min-w-full border-collapse border border-navy-100 text-[14px]">
        <thead>
         <tr className="bg-navy-50/50">
          <th className="border border-navy-100 p-3 text-left font-bold text-navy-700">Data Category</th>
          <th className="border border-navy-100 p-3 text-left font-bold text-navy-700">Specific Data Points</th>
          <th className="border border-navy-100 p-3 text-left font-bold text-navy-700">Source & Method</th>
         </tr>
        </thead>
        <tbody className="text-navy-600">
         <tr>
          <td className="border border-navy-100 p-3 font-medium">Account & Profile</td>
          <td className="border border-navy-100 p-3">Full name, email address, password hash, phone number, profile photo, bio, and time zone.</td>
          <td className="border border-navy-100 p-3">Directly submitted during user sign up and profile updates.</td>
         </tr>
         <tr>
          <td className="border border-navy-100 p-3 font-medium">Teacher Qualifications</td>
          <td className="border border-navy-100 p-3">Degrees, certifications, resumes, subject proficiencies, hourly rates, and verification documents.</td>
          <td className="border border-navy-100 p-3">Submitted during teacher onboarding and credential verification.</td>
         </tr>
         <tr>
          <td className="border border-navy-100 p-3 font-medium">Billing & Transactions</td>
          <td className="border border-navy-100 p-3">Transaction records, booking dates, payment IDs, billing address. (Card tokens managed by processor).</td>
          <td className="border border-navy-100 p-3">Generated during class purchase via secure payment gateways.</td>
         </tr>
         <tr>
          <td className="border border-navy-100 p-3 font-medium">Communications & Sessions</td>
          <td className="border border-navy-100 p-3">In-app messaging, class notes, tutoring session schedules, student feedback, and support inquiries.</td>
          <td className="border border-navy-100 p-3">Interactive platform tools, chat boards, and customer service.</td>
         </tr>
         <tr>
          <td className="border border-navy-100 p-3 font-medium">Technical & Telemetry</td>
          <td className="border border-navy-100 p-3">IP address, browser type, device information, operating system, session logs, and cookie identifiers.</td>
          <td className="border border-navy-100 p-3">Automatically gathered via standard server logs and cookies.</td>
         </tr>
        </tbody>
       </table>
      </div>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">3. Legal Bases and Purposes of Processing</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       We process personal data only when permitted by law, including for the following purposes:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
       <li><strong>To Provide Educational Services:</strong> Facilitating teacher-student discovery, lesson booking, scheduling, profile management, and account administration (Contractual Necessity).</li>
       <li><strong>Payment Processing:</strong> Handling fee transactions, escrow payouts, invoices, and accounting compliance (Contractual & Legal Obligation).</li>
       <li><strong>Trust, Safety & Credential Verification:</strong> Validating teacher identities, preventing abusive actions, ensuring pupil safety, and protecting integrity (Legitimate Interests).</li>
       <li><strong>Platform Analytics & Optimization:</strong> Monitoring site performance, resolving bugs, and improving UI/UX flow on Vercel infrastructure (Legitimate Interests).</li>
       <li><strong>Legal & Regulatory Compliance:</strong> Satisfying tax obligations, responding to subpoenas, and preventing financial fraud (Legal Obligation).</li>
      </ul>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">4. Children's Privacy & Minor Protection (COPPA / GDPR-K)</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       The educational nature of tutoring often touches younger learners. We uphold strict safeguards for minor privacy:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Parental Consent:</strong> Children under 13 (or under the age of digital consent in relevant jurisdictions) may not establish accounts independently. Accounts must be registered and managed under parent or legal guardian supervision.</li>
       <li><strong>Minimization:</strong> We do not condition a child's participation on revealing more personal information than is strictly necessary to participate in educational lessons.</li>
       <li><strong>Parental Rights:</strong> Parents and guardians have the right to inspect, review, correct, or request the deletion of their child's collected profile information by contacting our privacy desk.</li>
      </ul>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">5. Cookies and Tracking Technologies</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       We use strictly necessary and performance cookies. Essential cookies ensure session authentication, CSRF security, and basic navigation functionality. Analytical cookies assist us in measuring platform loading times, navigation friction, and error frequencies. Users can control cookie settings directly in their browser settings.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">6. Sharing and Disclosure of Information</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       We never sell your personal information. We only share information under strict terms with:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Tutors and Students:</strong> Once a lesson or contact request is confirmed, relevant profile names, subjects, and schedules are shared between parties to deliver instruction.</li>
       <li><strong>Third-Party Service Providers:</strong> Trusted vendors assisting our operations, including cloud hosting (e.g., Vercel), video conferencing (e.g., Zoom/Meet), payment processors (e.g., Stripe), and transactional email providers.</li>
       <li><strong>Law Enforcement & Legal Authorities:</strong> Disclosures made when required by lawful subpoenas, court orders, or to protect the vital interests and personal safety of users.</li>
      </ul>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">7. Data Retention and Deletion</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       We retain personal data as long as your account remains active and as needed to fulfill pedagogical services, settle fee disputes, and comply with statutory retention laws (such as tax and accounting mandates, typically 5 to 7 years). You may request the deletion of your account and associated profile information at any time.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">8. Data Security Safeguards</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       We employ technical and organizational measures to safeguard your information, including TLS encryption in transit, strict database access controls, salted password hashing, and regular vulnerability monitoring. While we maintain rigorous security standards, no online data transmission can guarantee absolute security.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">9. Your Legal Rights</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       Depending on your geographic location, you may hold the following statutory privacy rights:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Right of Access & Portability:</strong> Request a copy of the personal information we maintain concerning you in an accessible format.</li>
       <li><strong>Right to Rectification:</strong> Request correction of inaccurate, incomplete, or outdated personal records.</li>
       <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal records, subject to statutory retention limits.</li>
       <li><strong>Right to Restrict or Object:</strong> Restrict or object to the processing of your data under specific conditions.</li>
       <li><strong>Right to Withdraw Consent:</strong> Revoke previously granted consent for marketing or non-essential data processing at any time.</li>
      </ul>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">10. International Transfers</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       Information collected may be stored and processed on secure cloud servers distributed internationally (including United States and European Union facilities). Where data is transferred cross-border, we utilize appropriate safeguards such as Standard Contractual Clauses (SCCs) to guarantee equivalent data protection levels.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">11. Updates to this Policy</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       We may revise this Privacy Policy periodically to reflect changes in legal mandates or service functionalities. Any updates will be published on this page with an updated "Effective Date". Continued use of The Only Teachers indicates agreement with the amended terms.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">12. Privacy Contact & Data Protection Desk</h2>
      <ul className="space-y-2 text-[15px] leading-relaxed text-navy-600">
       <li><strong>Platform URL:</strong> https://www.theonlyteachers.com/</li>
       <li><strong>Data Privacy Officer:</strong> privacy@theonlyteachers.com</li>
       <li><strong>General Inquiries:</strong> {BRAND.email}</li>
       <li><strong>Response Timeline:</strong> Subject access requests responded to within thirty (30) days.</li>
      </ul>
     </div>
    </div>
   </section>
  </>
 );
}
