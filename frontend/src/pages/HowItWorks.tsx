import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    title: 'Register your society',
    description: 'Enter basic details and instantly receive a secure 6-character registration code in under 2 minutes. No complicated forms or endless paperwork required.',
    icon: 'business',
    color: 'primary',
    mockTitle: 'Aura Urban Estate',
    mockDesc: 'Registration Code: X7B9M2'
  },
  {
    num: '02',
    title: 'Residents join themselves',
    description: 'Share the code via WhatsApp or email. Residents use it to seamlessly select their tower and flat, self-onboarding into the ecosystem.',
    icon: 'group_add',
    color: 'secondary',
    mockTitle: 'New Resident Joined',
    mockDesc: 'Aarav Patel • Tower A, Flat 402'
  },
  {
    num: '03',
    title: 'Everything runs on its own',
    description: 'Sit back as UPI payments, visitor tracking, and complaint management operate automatically. Your digital concierge handles the rest.',
    icon: 'smart_toy',
    color: 'tertiary',
    mockTitle: 'System Status: Active',
    mockDesc: 'Payments synced. Gates secured.'
  }
];

export function HowItWorks() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-clip min-h-screen bg-mesh">
      <Header />

      <main className="pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="relative px-6 md:px-8 lg:px-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-[1.1]">
              Streamline your society in <br />
              <span className="text-primary italic text-glow">three simple steps</span>
            </h1>
            <p className="text-on-surface-variant opacity-80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience seamless onboarding and automated operations with our minimalist, zero-hassle setup. We handle the complexity so you can focus on community.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="px-6 md:px-8 lg:px-16 relative">
          <div className="max-w-5xl mx-auto space-y-16 lg:space-y-24">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const colorClass = 
                step.color === 'primary' ? 'text-primary' :
                step.color === 'secondary' ? 'text-secondary' :
                'text-tertiary';
              
              const bgColorClass = 
                step.color === 'primary' ? 'bg-primary/10' :
                step.color === 'secondary' ? 'bg-secondary/10' :
                'bg-tertiary/10';

              return (
                <div key={step.num} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Step Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className={`text-6xl font-headline font-black ${colorClass} select-none`}>
                        {step.num}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-surface-container ${colorClass}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{step.icon}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
                      {step.title}
                    </h2>
                    
                    <p className="text-on-surface-variant opacity-80 text-lg leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>

                  {/* Abstract Visual Component */}
                  <div className="flex-1 w-full relative">
                    <div className="aspect-video lg:aspect-square max-h-[400px] w-full mx-auto relative rounded-[3rem] bg-surface-container-low overflow-hidden flex items-center justify-center border border-outline-variant/20 shadow-2xl">
                      {/* Ambient Glow */}
                      <div className={`absolute w-64 h-64 blur-[80px] rounded-full pointer-events-none opacity-40 ${
                        step.color === 'primary' ? 'bg-primary' :
                        step.color === 'secondary' ? 'bg-secondary' :
                        'bg-tertiary'
                      }`} />
                      
                      {/* Glass Element */}
                      <div className="relative z-10 w-3/4 h-1/2 bg-inverse-surface/10 backdrop-blur-md rounded-2xl border border-outline-variant/30 flex flex-col justify-center px-8 shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                           <div className={`w-8 h-8 rounded-full ${bgColorClass} flex items-center justify-center ${colorClass}`}>
                             <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{step.icon}</span>
                           </div>
                           <div className="text-on-surface font-headline font-bold text-sm tracking-wide">{step.mockTitle}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-on-surface-variant opacity-80 text-sm font-medium">{step.mockDesc}</div>
                          {index === 0 && <div className="text-primary text-xs font-label uppercase tracking-widest mt-2 animate-pulse">Waiting for residents...</div>}
                          {index === 1 && <div className="text-secondary text-xs font-label uppercase tracking-widest mt-2">Access Granted</div>}
                          {index === 2 && <div className="text-tertiary text-xs font-label uppercase tracking-widest mt-2">Automated Ops Running</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center bg-surface-container-highest rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-outline-variant/20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to upgrade your estate?
              </h2>
              <p className="text-on-surface-variant opacity-80 text-lg max-w-xl mx-auto mb-8">
                Join thousands of premium estates running efficiently on BookIt. Setup takes minutes.
              </p>
              
              <Link to="/signup">
                <button className="bg-primary text-background py-4 px-8 rounded-xl font-headline font-bold text-base hover:shadow-[0_0_30px_var(--color-primary)] active:scale-[0.98] transition-all inline-flex items-center gap-2 mt-4">
                  Register society
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
