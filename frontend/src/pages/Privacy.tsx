import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function Privacy() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-clip min-h-screen bg-mesh flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-16 pt-32 pb-24">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-on-surface-variant opacity-80 text-sm md:text-base font-body">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">1. Information We Collect</h2>
              <p>
                At BookIt, we collect information you provide directly to us when you register for an account, 
                update your profile, use our interactive features, or communicate with us. This includes your name, 
                email address, phone number, and society details. We also automatically collect certain information 
                about your device and how you interact with our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services. Specifically, we use it to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Facilitate society management features like facility bookings and issue tracking.</li>
                <li>Process payments and generate receipts securely.</li>
                <li>Send you technical notices, updates, security alerts, and support messages.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">3. Sharing of Information</h2>
              <p>
                We do not share your personal information with third parties except as described in this privacy policy. 
                Information may be shared within your society organization (e.g., admins can see resident details) to 
                facilitate the core functionality of BookIt. We may also share information with vendors, consultants, 
                and other service providers who need access to such information to carry out work on our behalf.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">4. Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized 
                access, disclosure, alteration, and destruction. All data is encrypted in transit and at rest. 
                Data stays in India to comply with local regulations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at support@bookit.com or visit our Support page.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
