import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useState } from 'react';

export function Support() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const formAction = "https://formsubmit.co/vedpatel28112004@gmail.com";

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-clip min-h-screen bg-mesh flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 md:px-8 lg:px-16 pt-32 pb-24">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-on-surface-variant opacity-80 text-sm md:text-base font-body max-w-md mx-auto">
              Have a question or need help with your BookIt account? Fill out the form below and our support team will get back to you shortly.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-container-low border border-primary/10 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>check_circle</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-on-surface">Message Sent!</h3>
                <p className="text-on-surface-variant opacity-80">
                  Thanks for reaching out. We've received your message and will respond as soon as possible.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-primary hover:text-primary/80 font-label tracking-wide uppercase text-sm font-bold transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form 
                action={formAction} 
                method="POST" 
                className="space-y-6 relative z-10"
                onSubmit={() => setStatus('submitting')}
              >
                {/* FormSubmit Configuration */}
                {/* Disable Captcha for smoother UX (optional) */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Redirect back to the support page after submission or show a success message */}
                <input type="hidden" name="_next" value={window.location.href + "?success=true"} />
                {/* Email Subject */}
                <input type="hidden" name="_subject" value="New Support Request from BookIt" />
                {/* Honeypot field to prevent spam */}
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-80">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-80">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="society" className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-80">
                      Society Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="society"
                      name="society"
                      placeholder="e.g. Green Valley Apartments"
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-80">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your issue or question..."
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30 resize-y"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-background py-4 px-6 rounded-xl font-headline font-bold text-sm hover:shadow-[0_0_30px_rgba(115,255,227,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {status === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-on-surface-variant/50 mt-4">
                  Note: The first time a message is sent, the site owner will need to confirm their email address via FormSubmit.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
