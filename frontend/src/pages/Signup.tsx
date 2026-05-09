import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../lib/api';
import { useAppDispatch } from '../hooks/redux';
import { loginSuccess } from '../store/slices/authSlice';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function Signup() {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddressChange = async (value: string) => {
    setOrgAddress(value);
    if (value.length > 2) {
      setIsSearchingAddress(true);
      setShowSuggestions(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1`);
        const data = await res.json();
        setAddressSuggestions(data || []);
      } catch (err) {
        console.error('Failed to fetch address suggestions', err);
      } finally {
        setIsSearchingAddress(false);
      }
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectAddress = (address: any) => {
    setOrgAddress(address.display_name);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
            email, 
            organization_name: orgName,
            organization_address: orgAddress,
            contact_number: contactNumber
        }),
      });

      setSuccessMsg(`Society has been registered. Check the email for login.`);

      // Send email via FormSubmit
      import('../lib/formSubmit').then(({ sendFormSubmitEmail }) => {
        sendFormSubmitEmail("vedpatel28112004@gmail.com", {
          _subject: `New Organization Registered: ${orgName}`,
          _template: "box",
          _cc: email,
          "Organization Name": orgName,
          "Organization ID": response.organization_id,
          "Email": email,
          "Address": orgAddress,
          "Contact Number": contactNumber,
          "Generated Security Key": response.generated_password
        });
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen relative overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Ambient Glow Backgrounds */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Editorial Context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-container-high outline outline-1 outline-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Onboarding Now</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-[0.95] text-on-surface">
                Scale your <br />
                <span className="text-primary italic">operations.</span>
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-md font-light">
                Join the elite ecosystem of managed estates. BookIt provides the architectural digital foundation for modern property management.
              </p>
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-3xl font-headline font-bold text-on-surface tracking-tight">40%</span>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Efficiency Gain</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-headline font-bold text-on-surface tracking-tight">12k+</span>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Residents Active</p>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 lg:p-12 rounded-[2rem] outline outline-1 outline-outline-variant/10 shadow-2xl relative overflow-hidden bg-surface-container/40 backdrop-blur-3xl">
              {/* Subtle Glass Highlight */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
              
              <div className="mb-8">
                <h2 className="text-3xl font-headline font-bold text-on-surface">Organization Registration</h2>
                <p className="text-on-surface-variant text-sm mt-2">Create your account to receive your unique Organization ID.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span> {error}
                </div>
              )}
              
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span> {successMsg}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Organization Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Organization Name</label>
                    <input 
                      className="w-full h-14 px-6 rounded-xl bg-surface-container-highest/50 border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none" 
                      placeholder="e.g. Skyline Residences" 
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Organization Email</label>
                    <input 
                      className="w-full h-14 px-6 rounded-xl bg-surface-container-highest/50 border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none" 
                      placeholder="admin@organization.com" 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Organization Address */}
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Organization Address</label>
                  <input 
                    className="w-full h-14 px-6 rounded-xl bg-surface-container-highest/50 border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none" 
                    placeholder="Full street address, City, Postal Code" 
                    type="text"
                    required
                    value={orgAddress}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    onFocus={() => { if (addressSuggestions.length > 0) setShowSuggestions(true); }}
                  />
                  {isSearchingAddress && (
                     <div className="absolute right-4 top-1/2 translate-y-[20%]">
                       <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block"></span>
                     </div>
                  )}
                  {showSuggestions && addressSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                      {addressSuggestions.map((suggestion, idx) => (
                        <div 
                          key={idx} 
                          className="px-4 py-3 hover:bg-surface-container-highest cursor-pointer text-sm text-on-surface transition-colors border-b border-outline-variant/10 last:border-0"
                          onClick={() => selectAddress(suggestion)}
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {/* Contact Number */}
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Contact Number</label>
                  <div className="flex space-x-3">
                    <div className="relative w-32 shrink-0">
                      <select className="w-full h-14 pl-4 pr-10 rounded-xl bg-surface-container-highest/50 border-none text-on-surface appearance-none focus:ring-2 focus:ring-primary/40 transition-all outline-none">
                        <option>🇮🇳 +91</option>
                        <option>🇺🇸 +1</option>
                        <option>🇬🇧 +44</option>
                        <option>🇦🇪 +971</option>
                        <option>🇸🇬 +65</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                    <input 
                      className="w-full h-14 px-6 rounded-xl bg-surface-container-highest/50 border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none" 
                      placeholder="Mobile number" 
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-6 space-y-8">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-outline-variant/10 pt-8">
                    <button 
                      className="flex-1 w-full h-14 bg-primary hover:bg-primary-fixed-dim text-on-primary-container font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_-5px_rgba(115,255,227,0.3)] disabled:opacity-50" 
                      type="submit"
                      disabled={isLoading}
                    >
                      <span className="material-symbols-outlined text-[20px]">domain_add</span>
                      <span>{isLoading ? 'Processing...' : 'Register Organization'}</span>
                    </button>
                    <button 
                      className="flex-1 w-full h-14 bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold rounded-xl transition-all flex items-center justify-center space-x-2 border border-outline-variant/20" 
                      type="button"
                      onClick={() => navigate('/login')}
                    >
                      <span className="material-symbols-outlined text-[20px]">login</span>
                      <span>Back to Login</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Asymmetric Background Elements */}
      <div className="fixed right-[5%] top-[15%] opacity-20 pointer-events-none hidden lg:block z-0">
        <div className="w-64 h-64 border border-outline-variant/30 rounded-full flex items-center justify-center">
          <div className="w-48 h-48 border border-outline-variant/20 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-4 h-4 bg-primary rounded-full absolute top-0 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
