import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function Terms() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-clip min-h-screen bg-mesh flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-16 pt-32 pb-24">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-on-surface-variant opacity-80 text-sm md:text-base font-body">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the BookIt application ("Service"), you agree to be bound by these Terms of Service. 
                If you disagree with any part of the terms, then you may not access the Service. These terms apply to all 
                visitors, users, society admins, residents, and others who access or use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">2. Description of Service</h2>
              <p>
                BookIt provides a comprehensive society management platform. This includes tools for facility booking, 
                visitor management, complaint tracking, and processing of maintenance payments via UPI. BookIt does not 
                hold any funds; all payments are processed directly between the resident and the society's registered UPI account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current 
                at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination 
                of your account on our Service. You are responsible for safeguarding the password and for any activities 
                or actions under your password.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">4. Acceptable Use</h2>
              <p>
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate BookIt, a BookIt employee, another user, or any other person or entity.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">5. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
                What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
