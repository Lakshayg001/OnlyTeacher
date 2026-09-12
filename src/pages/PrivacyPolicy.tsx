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
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">Information We Collect</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       We collect information that you provide directly to us when you request a free class or contact us. This includes:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-navy-600 mb-4">
       <li>Parent's and Student's names</li>
       <li>Contact information such as email address, phone number, and WhatsApp number</li>
       <li>Educational details such as country, board, grade, and subject</li>
      </ul>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">How We Secure Your Data</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       We take the security of your personal information very seriously. We implement strict security measures to protect your data from unauthorized access, alteration, or disclosure.
      </p>
      <p className="text-[15px] leading-relaxed text-navy-600">
       Your data is stored on secure servers, and access is restricted only to authorized personnel who need it to provide our services to you. We do not sell or share your personal data with third parties for marketing purposes.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">Contact Us</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       If you have any questions about this Privacy Policy, please contact us at {BRAND.email} or call us at {BRAND.phone}.
      </p>
     </div>
    </div>
   </section>
  </>
 );
}
