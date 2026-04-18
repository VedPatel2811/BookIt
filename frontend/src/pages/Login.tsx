import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { fetchAPI } from '../lib/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      // Notice: In the design it says "Email or Mobile", but backend accepts username/email
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetchAPI('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      await loginUser(response.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full relative bg-background text-on-background overflow-hidden">
      {/* Light Leaks */}
      <div className="light-leak top-[-10%] left-[-10%]"></div>
      <div className="light-leak bottom-[-20%] right-[10%]"></div>

      {/* Left Side: 3D Architectural Render */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          alt="High-end modern villa" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7vhRlrMdHkv4jarsQNaeO40z1PA49OFCLv4I8mZhbutnq31zn-qwZJvMPM2Qm2eTglLzxVWl-VUNdPM7LzS9QWquVwkjoVfdys4Bjk33SQtD44IPApS5bmcM1kSclqrjmKIzhBjrA7le1yT8Sy2pJVy0VM_vCcx0WuGKyZsRvuUEhYQVevTd1hbzQ1PZtuzuJUDbAkT4IXGoPvy08ln8slfcK71SWn4oH-H_Cx5G-ODA1bpMO6pzWqMyGqqL4iVXOGisVBsaDzA"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>

        {/* Branding Overlay */}
        <div className="absolute top-12 left-12 z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center neon-glow">
            <span className="material-symbols-outlined text-on-primary-container font-bold">house</span>
          </div>
          <span className="text-3xl font-headline font-black tracking-tighter text-white">BookIt</span>
        </div>

        {/* Testimonial/Tagline Glass Card */}
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <div className="glass-panel p-8 rounded-[2rem] max-w-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <p className="text-2xl font-headline font-medium text-white leading-tight mb-4">
              "The intersection of luxury architecture and digital precision."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-sm font-label tracking-widest text-primary uppercase">Curated Estates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 z-10">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-on-surface-variant font-body">Access your exclusive portfolio and concierge services.</p>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined">error</span> {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Identity Input */}
            <div className="space-y-2">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Identity</label>
              <div className="relative group">
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-5 text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none transition-all duration-300" 
                  placeholder="Email or Mobile" 
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 opacity-50"></div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Security</label>
                <a className="text-xs font-label text-primary hover:text-primary-fixed transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative group">
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-5 text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none transition-all duration-300" 
                  placeholder="••••••••" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 opacity-50"></div>
              </div>
            </div>

            {/* Login Button */}
            <button 
              className="w-full bg-primary-container hover:bg-primary text-on-primary-container font-headline font-bold text-lg py-4 rounded-xl transition-all duration-300 transform active:scale-95 neon-glow disabled:opacity-50" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Login to Estate'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-[0.2em]">Or continue with</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>
            <div className="flex justify-center gap-6">
              <button className="w-14 h-14 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container-highest transition-colors group">
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                </svg>
              </button>
              <button className="w-14 h-14 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container-highest transition-colors group">
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05 1.61-3.2 1.61-1.18 0-1.55-.71-2.92-.71-1.35 0-1.78.71-2.92.71-1.14 0-2.27-.72-3.23-1.68-1.98-1.98-3.41-5.59-3.41-8.77 0-3.32 1.95-5.11 3.9-5.11.98 0 1.93.66 2.53.66.6 0 1.6-.71 2.76-.71 1.06 0 2.29.54 3.08 1.48-2.04 1.25-1.71 4.19.46 5.31-.89 1.94-2.05 3.96-3.05 5.23zm-3.24-15.63c0 2.18-1.64 3.94-3.66 3.94-.03-2.45 2.06-4.32 3.66-4.32-.1 0-.1 0 0 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-on-surface-variant font-body text-sm">
              New to The Estate? 
              <Link to="/signup" className="text-white font-semibold ml-1 hover:text-primary transition-colors underline underline-offset-4 decoration-primary-dim/30">
                Apply for Membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
