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
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">Our Services</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-4">
       Currently, we are offering one free trial class to new students. This allows the student to experience our teaching methodology.
      </p>
      <p className="text-[15px] leading-relaxed text-navy-600">
       If the student likes the free class and wishes to continue, we will assign a dedicated tutor to them for their ongoing learning journey.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">Legal Compliance</h2>
      <p className="text-[15px] leading-relaxed text-navy-600">
       We operate in strict accordance with the provisions of the Family Educational Rights and Privacy Act ("FERPA"), the Children's Online Privacy Protection Act ("COPPA") and applicable state laws, including without limitation, the Illinois Student Online Personal Protection Act ("SOPPA"). We are committed to safeguarding the privacy and educational records of our students.
      </p>
     </div>
     
     <div className="rounded-4xl border border-navy-100 bg-white p-8 shadow-clay">
      <h2 className="font-display text-2xl font-extrabold text-navy-700 mb-4">Contact Information</h2>
      <p className="text-[15px] leading-relaxed text-navy-600 mb-2">
       For any questions regarding these terms, you can contact us at:
      </p>
      <ul className="space-y-2 mt-4 text-[15px] font-medium text-navy-700">
       <li><strong>Email:</strong> {BRAND.email}</li>
       <li><strong>Phone:</strong> {BRAND.phone}</li>
       <li><strong>Address:</strong> {BRAND.address}</li>
      </ul>
     </div>
    </div>
   </section>
  </>
 );
}
