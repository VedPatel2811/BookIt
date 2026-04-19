import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';
import { useAppDispatch } from '../hooks/redux';
import { loginSuccess } from '../store/slices/authSlice';

export function Signup() {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [propertyRef, setPropertyRef] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Backend expects email & password. We'll map mobile to email, or require an email format. 
      // Wait, the design mocks "Mobile Number". Let's assume the user types an email or we use a dummy email if it's not a standard email for MVP.
      // But the best approach since it's an exact replica: the design has "Mobile Number" but we know `email` is required. 
      // I will visually keep the mock 'Mobile Number' placeholder but rename it internally to email, or just send it as email.
      // Let's use `mobile` as the email field to maintain the backend connection.
      
      let payloadEmail = mobile;
      if (!payloadEmail.includes('@')) {
          payloadEmail = `${mobile.replace(/\s+/g, '')}@estate.com`; // mock email conversion
      }

      await fetchAPI('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email: payloadEmail, password }),
      });

      // Automatically login
      const formData = new URLSearchParams();
      formData.append('username', payloadEmail);
      formData.append('password', password);

      const loginResponse = await fetchAPI('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const user = {
        id: '1',
        name: fullName || payloadEmail.split('@')[0],
        email: payloadEmail,
      };

      dispatch(loginSuccess({ user, token: loginResponse.access_token }));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-primary/30 font-body relative">
      {/* Top Navigation Bar */}
      <header className="bg-transparent backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-black tracking-tighter text-[#73ffe3] drop-shadow-[0_0_10px_rgba(115,255,227,0.4)] font-headline">
          BookIt
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <span className="material-symbols-outlined text-white/60 hover:text-[#73ffe3] transition-colors cursor-pointer">help_outline</span>
        </div>
      </header>

      <main className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full"></div>

        <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
          {/* Branding/Value Prop Section */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-headline font-bold tracking-widest uppercase text-sm">Elevated Living</span>
              <h1 className="text-6xl font-headline font-extrabold tracking-tight leading-[1.1]">
                Welcome to the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-container">Next Generation</span> <br/>
                of Residential Luxury.
              </h1>
            </div>
            <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
              Join an exclusive community where architectural precision meets modern convenience. Your premium lifestyle journey begins here.
            </p>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnOpDIIjJzqrgY3XBncKbdlabEyygA-4_RKzfYhNaMlwOKZoqHv6dmf9amH5lbMobJfU_oeXYPMRNoFvM6gBYTfhaQxTorL25-5lAXfzbrquCPrLI865kAJzBr_fUgF9TsxKZImhhgozILTrl1qXsR95l9Iicn8h0eZofHUVAbHU3_MCt24_l4YHnQs3yMCA_D4jIBX5hIHtx4aM-w3HBlQxBqvlcYQ_qD93Mlc1s_2Q8YI0iMDq1rpmZK2wdbwbdtd7QlFAm9CA" alt="Avatar 1"/>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFCbz4rf3LgZ4gvlqKfSwGhiWb4X6zx_iJDNgcIn4LEfSnoLfFmRq59WkvVgWcfsxTQ0soPJcoJIPvfL1QZ4ajIWjWhtAkktPNWJQoiTkPcICA-hp0PsEJw-3Yxiu5wC_6n1abS2KNynN2sNEm1WpaJryGSDqgx2rkcwgFqAEAwoNYRWFTipjdTof8KiB2qq5Iz4pagtWJAWyO2fnM95y1Yapo4IHFVMt_tIeLZ9ydxQ73ENN67Xc3QZ_lpkDhdwnlX5Nqp0It2A" alt="Avatar 2"/>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgKDeTN_GFdP9ttv-Y7G_6Do_4FoBr8mrTD7xmWAyvNhuVgkxavSNdilqRFKZEV0UDVehwT9T1EsBcy8NPTnCG_sQyRj5gY5OjkBFtPnPvp8JfOIhOl2itYJuJq0Ob-5Kitw0ETX7OctgEpF_xppOLB5g4c4FCYkV7CMBqJu5BX3dBL-gOKUrLs1tXEizUFXdgU3QNsb5-MvVO_bWAzSYJqiH6ZmLfMi_e9TvsVwxyPlslluijzOkeOHcgves47ZQlNCh8D0TUgw" alt="Avatar 3"/>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant">
                <span className="text-on-surface font-bold">5,000+</span> homeowners already <br/>enjoying BookIt.
              </p>
            </div>
          </div>

          {/* Signup Form Container */}
          <div className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up">
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] inner-light relative overflow-hidden group">
              {/* Subtle Glow Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl font-headline font-bold mb-2 text-white">Create Account</h2>
                <p className="text-on-surface-variant text-sm">Enter your details to register your property.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span> {error}
                </div>
              )}

              <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                  <div className="relative group/field">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">person</span>
                    <input 
                      className="w-full bg-surface-container-highest border-0 focus:ring-0 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-white/20 transition-all focus:bg-surface-container-highest outline-none" 
                      placeholder="Aditya Sharma" 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-focus-within/field:w-full transition-all duration-300 shadow-[0_0_10px_rgba(115,255,227,0.5)]"></div>
                  </div>
                </div>

                {/* Email / Mobile */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Email / Mobile</label>
                  <div className="relative group/field">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">call</span>
                    <input 
                      className="w-full bg-surface-container-highest border-0 focus:ring-0 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-white/20 transition-all focus:bg-surface-container-highest outline-none" 
                      placeholder="user@example.com" 
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-focus-within/field:w-full transition-all duration-300 shadow-[0_0_10px_rgba(115,255,227,0.5)]"></div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Security Key</label>
                  <div className="relative group/field">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">lock</span>
                    <input 
                      className="w-full bg-surface-container-highest border-0 focus:ring-0 rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-white/20 transition-all focus:bg-surface-container-highest outline-none" 
                      placeholder="••••••••••••" 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-focus-within/field:w-full transition-all duration-300 shadow-[0_0_10px_rgba(115,255,227,0.5)]"></div>
                  </div>

                {/* Property Reference */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Flat / Villa Number</label>
                  <div className="relative group/field">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">home_work</span>
                    <input 
                      className="w-full bg-surface-container-highest border-0 focus:ring-0 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-white/20 transition-all focus:bg-surface-container-highest outline-none" 
                      placeholder="B-1204, Crystal Heights" 
                      type="text"
                      value={propertyRef}
                      onChange={(e) => setPropertyRef(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-focus-within/field:w-full transition-all duration-300 shadow-[0_0_10px_rgba(115,255,227,0.5)]"></div>
                  </div>
                </div>

                
                </div>

                {/* Terms */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative flex items-center justify-center">
                    <input className="appearance-none h-5 w-5 rounded bg-surface-container-highest border border-outline-variant/30 checked:bg-primary checked:border-primary transition-all cursor-pointer peer" id="terms" type="checkbox" required />
                    <span className="material-symbols-outlined absolute text-on-primary pointer-events-none text-sm scale-0 transition-transform peer-checked:scale-100">check</span>
                  </div>
                  <label className="text-xs text-on-surface-variant cursor-pointer" htmlFor="terms">
                    I agree to the <Link to="#" className="text-primary hover:underline underline-offset-4">Terms of Service</Link> and <Link to="#" className="text-primary hover:underline underline-offset-4">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  className="w-full bg-primary text-on-primary font-headline font-bold py-4 rounded-xl neon-glow hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 flex items-center justify-center gap-2 group disabled:opacity-50" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Profile...' : 'Create Account'}
                  {!isLoading && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>}
                </button>

                <div className="text-center pt-6">
                  <p className="text-on-surface-variant text-sm">
                    Already have an account? 
                    <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4 ml-1">Login</Link>
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
