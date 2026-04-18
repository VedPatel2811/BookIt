import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { GlassPanel } from '../components/ui/GlassPanel';

export function Onboarding() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-hidden min-h-screen">
      <Header />
      
      {/* Main Content Canvas */}
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24">
        {/* Hero Image Section */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="Modern Indian Luxury Complex" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZwqo0YvHwhxaG-ezWyHbSb9tl1HEu3xX5C8u-bzibUfsmsm50-nPlY3Q2EbFY3Yc44_yT5zpozZDOYYlZ0ZvbJa8DxTw8SbLDmW1WGUqsnYT5hMTGb_lxgywiKL8J4fEs6sQv3G9C8VP9f2pycNAtfr4bhXjTaoEP31htoqhWp6mttz0A1D9zaTsICgXuyHOrrUhG1t-YhoRIpBHMTg_G9rSjNLg2acQkN95Px5WPnzZ_oTMOzhCwKZrO6pDDex8O_F5ulIVGlg"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Centered Content Section (Responsive Desktop/Mobile Layout) */}
        <section className="relative z-10 w-full max-w-7xl px-6 md:px-8 pb-16 pt-8 flex flex-col lg:flex-row items-end justify-between gap-12 flex-1 lg:pb-32">
          {/* Headline Column */}
          <div className="flex-1 space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase font-label mt-0.5">The Gold Standard</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] text-on-surface mb-6">
              Elevated Living, <br/>
              <span className="text-primary text-glow italic">Effortlessly</span> <br/>
              Managed.
            </h1>
            
            <p className="text-on-surface-variant text-base md:text-lg lg:text-xl max-w-lg font-body leading-relaxed">
              Experience a digital concierge designed for the modern resident. From facility bookings to community building, every detail is at your fingertips.
            </p>
          </div>

          {/* Action Area (Glassmorphic Interaction Card) */}
          <div className="w-full lg:w-[420px]">
            <GlassPanel className="p-8 md:p-10 shadow-2xl relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Welcome to BookIt</h2>
                  <p className="text-on-surface-variant text-sm font-label leading-relaxed">Join the most exclusive residential network in the city.</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <Button variant="primary" className="w-full gap-3">
                    Get Started
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </Button>
                  
                  <Button variant="glass" className="w-full">
                    Login
                  </Button>
                </div>
                
                <div className="pt-4 flex flex-col gap-5">
                  <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest flex justify-center items-center gap-3">
                    <span className="h-px w-8 bg-outline-variant/30"></span>
                    Trusted by leading estates
                    <span className="h-px w-8 bg-outline-variant/30"></span>
                  </span>
                  
                  <div className="flex items-center justify-center gap-6 opacity-40">
                    <span className="text-[10px] md:text-sm font-black italic">SIGNATURE</span>
                    <span className="text-[10px] md:text-sm font-black italic">VANTAGE</span>
                    <span className="text-[10px] md:text-sm font-black italic">LUXE_CO</span>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* Asymmetric Detail Section (Bottom Left Anchor - Hidden on small screens) */}
        <div className="absolute bottom-12 left-12 z-10 hidden lg:flex items-center gap-12">
          <div className="flex flex-col">
            <span className="text-4xl font-headline font-extrabold text-primary">₹ 14.5<span className="text-2xl font-medium">Cr+</span></span>
            <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest mt-1">Managed Assets Value</span>
          </div>
          <div className="w-px h-10 bg-outline-variant/30"></div>
          <div className="flex flex-col">
            <span className="text-4xl font-headline font-extrabold text-on-surface">520<span className="text-2xl font-medium">+</span></span>
            <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest mt-1">Premium Residences</span>
          </div>
        </div>
      </main>

      {/* Contextual "Why BookIt" Section using Bento Layout */}
      <section className="relative z-10 bg-background py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-primary font-label text-xs md:text-sm font-bold tracking-widest uppercase">The Experience</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter leading-tight">Beyond management. <br/>Digital concierge.</h2>
            </div>
            <p className="max-w-xs text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
              We've redesigned every interaction from the ground up to ensure your lifestyle is as seamless as it is sophisticated.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
            
            {/* Bento Item 1: Facilities */}
            <div className="md:col-span-8 glass-panel rounded-[2rem] overflow-hidden relative group p-6 md:p-8 flex flex-col justify-end min-h-[300px]">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                alt="Gym interior" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaadqu5EwVaMrfD5lc0zxErIkztIFAoBaozIMTS0ZYWQVsEGZmQprQjU4Gfeq9tRKmSALZj2vIWH4g0ZnKDfJG3WuV17iN-1NwU-EwlKFmjeSYSLOc8w5EPzDeT6acAQ-lAdUd1TvdVcJN_pKOVd_h-yokbKcf4I-jWUAJKg3BP5OCc-xGsdebvCBGWYlyOWTEgEHmyFD2PsQniow2EAA-ymw6feOzIhcCJsVospxKeMKT6hNENGeIF4SjrH0mroQFRMy9ZfS3cA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary mb-4">
                  <span className="material-symbols-outlined">sports_cricket</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">Priority Bookings</h3>
                <p className="text-on-surface-variant max-w-sm text-sm md:text-base">Secure elite amenities from courts to private dining rooms with a single tap.</p>
              </div>
            </div>

            {/* Bento Item 2: Community */}
            <div className="md:col-span-4 bg-surface-container-low rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border-t border-white/5">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-primary text-4xl">group</span>
                <h3 className="text-xl md:text-2xl font-headline font-bold">Vibrant Community</h3>
                <p className="text-on-surface-variant text-xs md:text-sm font-body leading-relaxed">Connect with verified neighbors and join exclusive estate events organized through our smart calendar.</p>
              </div>
              <div className="flex -space-x-3 mt-4">
                <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" alt="Avatar 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY8pAK7sY66S8yaXA3L-bWfNDF4KxT4HfZuLyHm2Rd9yqFREpa71IjUflCm4Uk1MgvgD5CAYz3q2vWpzfLvBTiHlyPOkVuD3yXhTi01U_xLonhRQgI9lVpaY2IXdAtrNVhxFFqtXXOeEmq3j4pn4nE8bU8iwl7mRHxgXjHlFnQqpBcMOul5_b8OqSJ0s4PN677Z3wrh2KVVdjc6G5_SZd_pY1JC1OftAjAHUJKCDETo6fcXfy-u4ohszsWduPD7lAgd31I91rqAw"/>
                <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" alt="Avatar 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvGRQDaZKkTUdbjK55Dpb1_7s1u0mxyFHbDU_CL78wousZsnt5rdD-sd3sCP9P_dPLbSmrX2mPuRHP0s0jYnRpZpgVtI11mPFtBefV6EZRuG8lHUHo0Qxv7LQiVNzggNHkfHa0VuUfgzppwVC1ll56FlZ27hVN6UL5pYyliBKz7OM9eqZZI8_I0b0bRW9Z5qUEGlt2AkZhj7tVATtu3y_A7fFkqiCjzPqfot1b5YzFGwO7QvzpD0rTT_RVkXI7wqaEQ3XH03fLow"/>
                <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" alt="Avatar 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLVu4uo6PVt0bmAIAJvzfACUVHGKsEpqFgTDuVs_M6wLi-S5vtsFpoAu23rxH8NSB97CgfLH9XpCrQKhCqkpZZ1qOCRKT4wxSCOTvcaPfGoSQFAWivlbujzaqduMUxo7hevGRWL0dghDtrgaZRSKiAwm50-qtBYqKjlas-_R_aD6tljbxAvjvsClGfVl2u2YD-peHLsCrIHmmF7W0DzAyUSyZ9CPWPPmr_o2FN8KG2WhG0aZscVzgI0pl3HyTVeyWim3D9qqPeWA"/>
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface flex items-center justify-center text-[10px] font-bold">+240</div>
              </div>
            </div>

            {/* Bento Item 3: Maintenance */}
            <div className="md:col-span-4 glass-panel rounded-[2rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden relative min-h-[250px]">
              <div className="absolute -right-4 -top-4 opacity-5">
                <span className="material-symbols-outlined text-[160px]">build</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-headline font-bold leading-tight">One-Touch <br/>Maintenance</h3>
                <p className="text-on-surface-variant text-xs md:text-sm mt-4">Predictive alerts and instant service requests for your home's infrastructure.</p>
              </div>
              <div className="relative z-10 mt-8 p-4 bg-surface-container-highest/50 rounded-xl flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-label uppercase tracking-widest opacity-60">Status: System Normal</span>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#73ffe3]"></div>
              </div>
            </div>

            {/* Bento Item 4: High-End Visual */}
            <div className="md:col-span-8 rounded-[2rem] overflow-hidden relative hidden md:block">
              <img 
                className="w-full h-full object-cover" 
                alt="Architecture" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7tHsq8xAy1amyFqoXDKsE5KR8FOtgqrwlivzYUUcMtvB8x_MKxeq-YZLJO9MCt30eY2voSauKryRWSo_eADaemRnqYHY-D1kp987yHlVDxH_V-Fh-5JxrqRFZjo5GuTp6709o95xMv4xCSL9voi-ehGXGV3XO-EhHemafuWCHPREHJQd6MlnGcgcZUtG3Hp7dbFmyUpl2js2Q8bQN3Yi20eMbrV5wPBB43X2ZZOIYJqM5S1cMeAedW_BujrvVPzSl3RPzwqLCNw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center p-12">
                <div className="max-w-xs space-y-4">
                  <h3 className="text-4xl font-headline font-extrabold tracking-tighter">Architecture Meets Intelligence.</h3>
                  <div className="h-1 w-12 bg-primary"></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Decorative Blur Orbs */}
      <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <Footer />
    </div>
  );
}
