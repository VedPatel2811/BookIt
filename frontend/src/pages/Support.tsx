import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useState } from 'react';
import { sendFormSubmitEmail } from '../lib/formSubmit';

export function Support() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const adminEmail = "vedpatel28112004@gmail.com";

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
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setStatus('submitting');
                  
                  const success = await sendFormSubmitEmail(adminEmail, {
                    ...formData,
                    _subject: `New Support Request: ${formData.subject}`,
                    _template: "box"
                  });

                  if (success) {
                    setStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  } else {
                    setStatus('error');
                  }
                }}
              >
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                
                {/* Honeypot for spam protection */}
                <input type="text" name="_honey" style={{display: 'none'}} />
                {/* Disable Captcha */}
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-surface-container-highest border border-outline-variant/10 focus:border-primary/50 rounded-xl py-4 px-4 text-on-surface placeholder:text-white/20 transition-all outline-none" 
                      placeholder="Your name" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-surface-container-highest border border-outline-variant/10 focus:border-primary/50 rounded-xl py-4 px-4 text-on-surface placeholder:text-white/20 transition-all outline-none" 
                      placeholder="you@example.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-surface-container-highest border border-outline-variant/10 focus:border-primary/50 rounded-xl py-4 px-4 text-on-surface placeholder:text-white/20 transition-all outline-none" 
                    placeholder="How can we help?" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-surface-container-highest border border-outline-variant/10 focus:border-primary/50 rounded-xl py-4 px-4 text-on-surface placeholder:text-white/20 transition-all outline-none resize-none" 
                    placeholder="Tell us more about your issue..." 
                  ></textarea>
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
