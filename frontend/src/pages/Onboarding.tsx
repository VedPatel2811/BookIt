import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type RoleKey = 'resident' | 'owner' | 'admin' | 'guard';

interface RoleFeature {
  icon: string;
  title: string;
  desc: string;
}

interface RoleConfig {
  label: string;
  features: RoleFeature[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES: Record<RoleKey, RoleConfig> = {
  resident: {
    label: 'Resident',
    features: [
      { icon: 'qr_code_2', title: 'Pay with UPI in one tap', desc: 'Scan QR, pay your monthly contribution, get receipt instantly. No cash, no follow-up.' },
      { icon: 'badge', title: 'Register visitors with a QR pass', desc: 'Generate a pass for your guest. They show it at the gate. Guard scans. Done.' },
      { icon: 'build_circle', title: 'Raise and track issues', desc: 'Log a complaint, watch it get resolved in real time. No shouting required.' },
      { icon: 'event_seat', title: 'Book facilities in seconds', desc: 'Clubhouse, pool, terrace — pick a slot, confirm, show up.' },
    ],
  },
  owner: {
    label: 'Owner',
    features: [
      { icon: 'person_check', title: "See if your renter paid", desc: 'Know their contribution status in real time — even if you\'re in another city.' },
      { icon: 'monitoring', title: 'Track issues remotely', desc: 'Raise and monitor issues in your unit without being physically present.' },
      { icon: 'domain', title: 'Take over when flat is vacant', desc: 'No renter? You automatically get full access — visitors, bookings, payments.' },
      { icon: 'swap_horiz', title: 'Manage multiple properties', desc: 'Own flats in different societies? Switch between them in a single tap.' },
    ],
  },
  admin: {
    label: 'Admin',
    features: [
      { icon: 'analytics', title: 'Society fund dashboard', desc: 'See who paid, total collected, fund balance — all on one transparent screen.' },
      { icon: 'task_alt', title: 'Resolve issues end-to-end', desc: 'Assign, update status, close. Residents get notified automatically.' },
      { icon: 'group_add', title: 'Invite residents with a code', desc: 'Share one invite code. Residents onboard themselves — zero admin overhead.' },
      { icon: 'list_alt', title: 'Full visitor log visibility', desc: 'Every visitor across the society, searchable and exportable anytime.' },
    ],
  },
  guard: {
    label: 'Guard',
    features: [
      { icon: 'qr_code_scanner', title: 'Scan QR to check in visitors', desc: 'Visitor shows QR, you scan, gate opens. No paper register ever again.' },
      { icon: 'person_add', title: 'Register walk-in visitors', desc: 'Deliveries, service staff — log them in seconds from your phone.' },
      { icon: 'sensors', title: 'See who\'s inside right now', desc: 'Live list of current visitors. One tap to check them out.' },
    ],
  },
};

const PROBLEMS = [
  { old: 'WhatsApp groups for every complaint', new: 'Issues tracked with live status updates' },
  { old: 'Cash envelopes for maintenance', new: 'UPI QR in one tap, receipt auto-generated' },
  { old: 'Paper registers at the gate', new: 'QR visitor pass — guard just scans' },
  { old: 'No one knows who paid this month', new: 'Society fund transparent to all residents' },
  { old: 'Owners abroad with zero visibility', new: 'Owners track everything remotely' },
];

const STEPS = [
  { n: 'Step - 01', icon: 'corporate_fare', title: 'Register your society', desc: 'Enter your society name and UPI ID. Takes 2 minutes. You receive a unique invite code.' },
  { n: 'Step - 02', icon: 'group_add', title: 'Residents join themselves', desc: 'Share the code. Residents pick their tower, flat, and role. No admin bottleneck.' },
  { n: 'Step - 03', icon: 'auto_awesome', title: 'Everything just works', desc: 'Payments, visitors, issues, bookings — flowing automatically from day one.' },
];

const TRUST = [
  { icon: 'verified', label: 'Trusted by 120+ societies' },
  { icon: 'lock', label: 'Data stays in India' },
  { icon: 'currency_rupee', label: 'UPI-native payments' },
  { icon: 'location_city', label: 'Mumbai · Pune · Bangalore' },
];

const UPI_APPS = ['GPay', 'PhonePe', 'Paytm', 'BHIM'];

// ─── Sub-components ────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[240px]">
      {/* glow behind phone */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-[2.5rem] bg-primary/10 blur-[60px]" />
      <div className="rounded-[2.5rem] border-[6px] border-surface-container-highest bg-surface-container-lowest overflow-hidden shadow-2xl pb-6 relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-surface-container-high rounded-b-xl z-20" />
        
        {/* Top bar */}
        <div className="px-5 pt-8 pb-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-on-surface-variant text-[10px] opacity-80 mb-0.5">Good morning</span>
            <span className="text-on-surface text-[13px] font-headline font-bold tracking-wide">Arjun</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>person</span>
          </div>
        </div>
        
        {/* body */}
        <div className="px-4 space-y-3">
          {/* Maintenance card */}
          <div className="bg-surface-container rounded-[1rem] p-4 border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 blur-xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontSize: '15px' }}>receipt_long</span>
                <span className="text-on-surface-variant text-[9px] font-bold tracking-wider uppercase">Maintenance</span>
              </div>
              <span className="text-[7px] font-bold px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary tracking-widest">PAID</span>
            </div>
            <div className="text-on-surface text-lg font-headline font-bold relative z-10 tracking-tight">
              <span className="text-xs mr-0.5 opacity-60">₹</span>2,500
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container rounded-[1rem] py-4 px-2 border border-outline-variant/10 text-center flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: '16px' }}>warning</span>
              </div>
              <div className="text-on-surface text-[10px] font-bold tracking-wide">Raise issue</div>
            </div>
            <div className="bg-surface-container rounded-[1rem] py-4 px-2 border border-outline-variant/10 text-center flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary" style={{ fontSize: '16px' }}>pool</span>
              </div>
              <div className="text-on-surface text-[10px] font-bold tracking-wide">Book facility</div>
            </div>
          </div>

          {/* Expected Visitor card */}
          <div className="bg-surface-container rounded-[1rem] p-4 border border-outline-variant/10 flex justify-between items-center">
            <div className="flex flex-col gap-1.5">
              <div className="text-on-surface-variant text-[9px] opacity-80">Expected Visitor</div>
              <div className="text-on-surface text-xs font-bold tracking-wide">Priya (Guest)</div>
              <div className="text-primary text-[8px] font-bold mt-1 tracking-widest">OTP: 4920</div>
            </div>
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0">
               <div className="w-full h-full grid grid-cols-3 gap-[1px]">
                 {[1,0,1,0,1,0,1,1,1].map((v, i) => (
                   <div key={i} className={`rounded-[1px] ${v ? 'bg-black' : 'bg-transparent'}`} />
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="border-y border-white/5 py-4 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
        {TRUST.map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>{icon}</span>
            <span className="text-xs font-label tracking-wide whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top = -rect.top;
      // scrollable height is total height - viewport height
      const height = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, top / height));
      setProgress(p);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalSteps = PROBLEMS.length;
  const currentStepProgress = progress * totalSteps;
  const activeIndex = Math.min(totalSteps - 1, Math.floor(currentStepProgress));
  const stepFraction = currentStepProgress - activeIndex;

  // The transition point where problem switches to solution
  const isSolution = stepFraction > 0.45;

  return (
    <section ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-8 md:mb-16 relative z-10">
          <p className="text-primary text-xs font-label tracking-[0.2em] uppercase mb-3">The problem</p>
          <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
            Sound familiar?
          </h2>
          <p className="text-on-surface-variant opacity-80 max-w-md mx-auto text-sm md:text-base font-body leading-relaxed">
            Society management hasn't changed in decades. BookIt fixes all of it.
          </p>
        </div>

        <div className="relative w-full max-w-3xl h-64 md:h-80 flex items-center justify-center mt-4 md:mt-8">
          {PROBLEMS.map((item, i) => {
            const isActive = i === activeIndex;
            const status = i < activeIndex ? 'past' : i > activeIndex ? 'future' : 'current';
            const showOld = isActive && !isSolution;
            const showNew = isActive && isSolution;

            return (
              <div key={i} className={`absolute inset-0 flex flex-col items-center justify-center w-full transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                {/* Old way */}
                <div 
                  className={`absolute w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] bg-red-500/5 border border-red-500/20 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showOld ? 'opacity-100 scale-100 blur-0 translate-y-0 translate-x-0' : 
                    status === 'future' ? 'opacity-0 scale-95 translate-y-24 blur-md' : 
                    'opacity-0 scale-105 -translate-x-32 blur-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-red-400" style={{ fontSize: '24px' }}>cancel</span>
                    <span className="text-sm font-label uppercase tracking-[0.2em] text-red-400">The old way</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl text-center text-red-400 font-headline font-bold leading-tight">{item.old}</h3>
                </div>

                {/* BookIt way */}
                <div 
                  className={`absolute w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] bg-primary/10 border border-primary/30 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showNew ? 'opacity-100 scale-100 blur-0 translate-x-0 translate-y-0' : 
                    status === 'past' ? 'opacity-0 scale-105 -translate-y-24 blur-md' : 
                    'opacity-0 scale-95 translate-x-32 blur-md'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>check_circle</span>
                    <span className="text-sm font-label uppercase tracking-[0.2em] text-primary">With BookIt</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl text-center text-on-surface font-headline font-bold leading-tight relative z-10">{item.new}</h3>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Cinematic Progress indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {PROBLEMS.map((_, i) => (
            <div key={i} className="w-10 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-linear"
                style={{ 
                  width: activeIndex > i ? '100%' : activeIndex === i ? `${stepFraction * 100}%` : '0%' 
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-16">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-xs font-label tracking-[0.2em] uppercase mb-3">How it works</p>
          <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
            Up and running in 3 steps
          </h2>
          <p className="text-on-surface-variant opacity-80 max-w-md mx-auto text-sm md:text-base font-body leading-relaxed">
            No IT team. No training. If you can use WhatsApp, you can use BookIt.
          </p>
        </div>

        {/* Steps — stacked on mobile, horizontal on md+ */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-stretch max-w-4xl mx-auto">
          {STEPS.map(({ n, icon, title, desc }, i) => (
            <div key={n} className="flex flex-col md:flex-row flex-1 items-start md:items-stretch">
              <div className="flex-1 p-6 md:p-8 rounded-3xl bg-surface-container-low border border-primary/10 space-y-4 relative group hover:border-primary/40 transition-colors">
                {/* step number */}
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>{icon}</span>
                  </div>
                  <span className="text-primary/80 text-xs font-label tracking-[0.2em]">{n}</span>
                </div>
                <h3 className="text-lg md:text-xl font-headline font-bold text-on-surface">{title}</h3>
                <p className="text-on-surface-variant opacity-80 text-sm font-body leading-relaxed">{desc}</p>
              </div>
              {/* connector — arrow on md screens, line on mobile */}
              {i < STEPS.length - 1 && (
                <>
                  {/* mobile: vertical line */}
                  <div className="md:hidden flex justify-center py-2">
                    <div className="w-px h-6 bg-outline-variant/20" />
                  </div>
                  {/* desktop: horizontal arrow */}
                  <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0">
                    <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: '20px' }}>arrow_forward</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [active, setActive] = useState<RoleKey>('resident');
  const role = ROLES[active];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-16">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-xs font-label tracking-[0.2em] uppercase mb-3">Features</p>
          <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
            Built for everyone in your society
          </h2>
          <p className="text-on-surface-variant opacity-80 max-w-md mx-auto text-sm md:text-base font-body leading-relaxed">
            Each person sees only what's relevant to them — no clutter, no confusion.
          </p>
        </div>

        {/* Role tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(Object.keys(ROLES) as RoleKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2 rounded-full text-xs font-label tracking-widest uppercase transition-all cursor-pointer ${
                active === key
                  ? 'bg-primary text-background font-bold'
                  : 'border border-outline-variant/20 text-on-surface-variant hover:border-primary/30 hover:text-on-surface'
              }`}
            >
              {ROLES[key].label}
            </button>
          ))}
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {role.features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-3xl bg-surface-container-low border border-primary/10 space-y-4 hover:border-primary/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>{icon}</span>
              </div>
              <h3 className="text-sm md:text-base font-headline font-bold text-on-surface">{title}</h3>
              <p className="text-on-surface-variant opacity-80 text-xs md:text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* UPI apps row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          <span className="text-on-surface-variant opacity-50 text-xs font-label tracking-widest uppercase">Payments via</span>
          {UPI_APPS.map((app) => (
            <span
              key={app}
              className="text-[10px] font-label tracking-widest uppercase px-3 py-1.5 rounded-full border border-outline-variant text-on-surface-variant opacity-80"
            >
              {app}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="px-6 md:px-8 lg:px-16 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-primary/15 bg-primary/5 overflow-hidden p-10 md:p-20 text-center">
          {/* background glows */}
          <div className="absolute -top-20 left-1/4 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-secondary/8 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <p className="text-primary text-xs font-label tracking-[0.2em] uppercase">Get started free</p>
            <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface max-w-xl mx-auto leading-tight">
              Your society deserves better than a{' '}
              <span className="text-primary italic text-glow">WhatsApp group</span>
            </h2>
            <p className="text-on-surface-variant opacity-80 text-sm md:text-base font-body max-w-sm mx-auto leading-relaxed">
              Set up in 2 minutes. Free for societies under 20 units. No credit card.
            </p>

            {/* email + CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">

              <Link to="/signup">
                <button className="whitespace-nowrap bg-primary text-background px-6 py-3.5 rounded-xl font-headline font-bold text-sm hover:shadow-[0_0_30px_rgba(115,255,227,0.25)] active:scale-[0.98] transition-all">
                  Register society
                </button>
              </Link>
            </div>

            <p className="text-on-surface-variant opacity-40 text-[10px] font-label tracking-widest uppercase">
              Trusted by societies in Mumbai · Pune · Bangalore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function Onboarding() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-clip min-h-screen bg-mesh">
      <Header />

      {/* ── Hero ── */}
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20">
        {/* ambient glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/6 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-secondary/6 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative w-full max-w-7xl px-6 md:px-8 lg:px-16">

          {/* ── Mobile hero (stacked) ── */}
          <div className="flex flex-col items-center text-center lg:hidden pt-8 pb-16 space-y-10">
            {/* badge */}
            <span className="inline-flex items-center gap-2 text-[10px] font-label tracking-[0.2em] uppercase border border-primary/30 text-primary bg-primary/5 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Built for Indian societies
            </span>

            <h1 className="text-[2.75rem] sm:text-6xl font-headline font-extrabold tracking-tighter leading-[0.92]">
              Living in your society<br />
              should feel{' '}
              <span className="text-primary text-glow italic">effortless</span>
            </h1>

            <p className="text-on-surface-variant opacity-50 text-base font-body leading-relaxed max-w-sm">
              Pay contributions, track issues, welcome visitors — all from one place. No chasing, no confusion.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:justify-center">
              <Link to="/signup" className="flex-1 sm:flex-none">
                <button className="w-full sm:w-auto bg-primary text-background py-4 px-8 rounded-xl font-headline font-bold text-sm hover:shadow-[0_0_30px_rgba(115,255,227,0.3)] active:scale-[0.98] transition-all ">
                  Register society
                </button>
              </Link>
              <Link to="/login" className="flex-1 sm:flex-none">
                <button className="w-full sm:w-auto border border-outline-variant/30 text-on-surface py-4 px-8 rounded-xl font-headline font-bold text-sm hover:bg-white/5 active:scale-[0.98] transition-all">
                  I'm a resident
                </button>
              </Link>
            </div>

            {/* Phone mockup */}
            <PhoneMockup />
          </div>

          {/* ── Desktop hero (side by side) ── */}
          <div className="hidden lg:grid grid-cols-2 gap-20 items-center min-h-[calc(100vh-5rem)]">
            {/* Left */}
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 text-[10px] font-label tracking-[0.2em] uppercase border border-primary/30 text-primary bg-primary/5 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Built for Indian societies
              </span>

              <h1 className="text-[4.5rem] xl:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9]">
                Elevated Living<br />
                <span className="text-primary text-glow italic">Effortless</span><br />
                Management.
              </h1>

              <p className="text-on-surface-variant opacity-80 text-lg font-body leading-relaxed max-w-md">
                Pay contributions, track issues, welcome visitors — all from one place. No chasing, no confusion, no WhatsApp groups.
              </p>

              <div className="flex gap-4">
                <Link to="/signup">
                  <button className="bg-primary text-background py-4 px-8 rounded-xl font-headline font-bold text-base hover:shadow-[0_0_30px_rgba(115,255,227,0.3)] active:scale-[0.98] transition-all flex items-center gap-2">
                    Register society
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>corporate_fare</span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="border border-outline-variant/30 text-on-surface py-4 px-8 rounded-xl font-headline font-bold text-base hover:bg-white/5 active:scale-[0.98] transition-all flex items-center gap-2">
                    I'm a resident
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right — glass card + phone */}
            <div className="relative flex items-center justify-center">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="glass-panel p-10 xl:p-12 rounded-[2.5rem] border-white/5 relative z-10 space-y-8 w-full max-w-sm">
                <div>
                  <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight mb-1">Welcome</h2>
                  <p className="text-on-surface-variant text-xs opacity-80">Select your access portal to continue.</p>
                </div>

                <PhoneMockup />

                <div className="space-y-3">
                  <Link to="/signup" className="block">
                    <button className="w-full bg-primary text-background py-4 px-4 rounded-xl font-headline font-bold text-sm hover:shadow-[0_0_30px_rgba(115,255,227,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      Register as Organization
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>corporate_fare</span>
                    </button>
                  </Link>
                  <Link to="/login" className="block">
                    <button className="w-full border border-outline-variant/30 text-on-surface py-4 px-4 rounded-xl font-headline font-bold text-sm hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      Login as User
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>person</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Trust strip ── */}
      <TrustStrip />

      {/* ── Problem vs Solution ── */}
      <ProblemSection />

      {/* ── How it works ── */}
      <StepsSection />

      {/* ── Role-based features ── */}
      <FeaturesSection />

      {/* ── CTA ── */}
      <CtaSection />

      <Footer />
    </div>
  );
}