import React, { useEffect, useState, useRef } from 'react';
import { fetchAPI } from '../lib/api';
import { UserProfileWidget } from '../components/ui/UserProfileWidget';

interface Complaint {
  id: number;
  subject: string;
  category: string;
  urgency: string;
  description: string;
  status: string;
  assigned_to?: string | null;
  created_at: string;
  admin_comment?: string | null;
  attachment_url?: string | null;
}

interface ComplaintStats {
  avg_resolution_hours: number;
  resident_satisfaction: number;
  active_tickets: number;
  premium_tier: string;
}

const CustomDropdown = ({ value, onChange, options, className }: { value: string, onChange: (v: string) => void, options: string[], className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="w-full h-full flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <span className="material-symbols-outlined text-white/50 text-sm transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[max-content] bg-[#1a1919] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`px-5 py-3 text-sm cursor-pointer transition-colors ${value === opt ? 'bg-[#73ffe3]/10 text-[#73ffe3] font-bold' : 'text-white hover:bg-[#262626]'}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Complaints: React.FC = () => {
  const [stats, setStats] = useState<ComplaintStats | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);

  // Form & Filter states
  const [filter, setFilter] = useState('All Tickets');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Plumbing & Water');
  const [urgency, setUrgency] = useState('Low');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const statsData = await fetchAPI('/complaints/stats');
      const complaintsData = await fetchAPI('/complaints');
      setStats(statsData);
      setComplaints(complaintsData);
    } catch (error) {
      console.error('Failed to load complaints data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;
    setIsSubmitting(true);
    
    try {
      await fetchAPI('/complaints', {
        method: 'POST',
        body: JSON.stringify({
          subject,
          category,
          urgency,
          description
        })
      });
      // Reset form and reload
      setSubject('');
      setDescription('');
      setCategory('Plumbing & Water');
      setUrgency('Low');
      await loadData();
    } catch (error) {
      console.error('Failed to submit complaint', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-20 min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-[#73ffe3]/20 border-t-[#73ffe3] rounded-full animate-spin"></div>
        <p className="mt-6 text-[#adaaaa] font-body text-sm tracking-widest uppercase">Loading tickets...</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="relative pb-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10">
        <div className="lg:mt-8">
          <p className="text-[#73ffe3] font-headline font-bold text-sm tracking-[0.2em] uppercase mb-2">Concierge</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter mb-2 text-white">
            Complaint Management
          </h1>
        </div>
        
        <UserProfileWidget avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDcSmj5ZfksbYtP-atacXBqhndWaNDrU3SGSmkwmbJpfxhwPjHjBZbIFvdaiN4vTi325QpiVVcp5kxgkG6iSHpy-5DqQELjvS9RB_oG5d6LmRxAibFrltdEaliGTfGbUb5h7VjwpOROCPb_98DDlqsjfQe5LVnMP1_W2BFBynsrVbotxs9gnNeL0IKEqjfpD7yKK8Tv-ueYJima39l2nvUzB0_OxuB_L41Q2bl7vz1epKbBI2oElgWE7nwdDko7qcjsFzOf5-M0Pw" />
      </header>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#131313] p-6 rounded-3xl group hover:bg-[#1a1919] transition-colors duration-500 border border-white/5">
          <p className="text-[#adaaaa] text-xs font-bold uppercase tracking-widest mb-1">Avg Resolution</p>
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl font-headline font-extrabold">{stats?.avg_resolution_hours}</span>
            <span className="text-[#73ffe3] font-bold pb-1 text-sm">Hours</span>
          </div>
          <div className="mt-4 h-1 w-full bg-[#262626] rounded-full overflow-hidden">
            <div className="h-full bg-[#73ffe3] w-[85%]"></div>
          </div>
        </div>

        <div className="bg-[#131313] p-6 rounded-3xl group hover:bg-[#1a1919] transition-colors duration-500 border border-white/5">
          <p className="text-[#adaaaa] text-xs font-bold uppercase tracking-widest mb-1">Satisfaction</p>
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl font-headline font-extrabold">{stats?.resident_satisfaction}</span>
            <span className="text-[#6e9bff] font-bold pb-1 text-sm">%</span>
          </div>
          <div className="mt-4 h-1 w-full bg-[#262626] rounded-full overflow-hidden">
            <div className="h-full bg-[#6e9bff] w-[98%]"></div>
          </div>
        </div>

        <div className="bg-[#131313] p-6 rounded-3xl group hover:bg-[#1a1919] transition-colors duration-500 border border-white/5">
          <p className="text-[#adaaaa] text-xs font-bold uppercase tracking-widest mb-1">Active Tickets</p>
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl font-headline font-extrabold">{stats?.active_tickets}</span>
            <span className="text-[#ff6b98] font-bold pb-1 text-sm">Active</span>
          </div>
          <div className="mt-4 h-1 w-full bg-[#262626] rounded-full overflow-hidden">
             <div className="h-full bg-[#ff6b98]" style={{width: `${(stats?.active_tickets || 0) * 10}%`}}></div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        
        {/* Left Col: Complaint History */}
        <section className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-headline font-black tracking-tight text-white">Recent Activity & Tickets</h3>
            <div className="flex gap-4">
              <CustomDropdown 
                value={filter} 
                onChange={setFilter} 
                options={['All Tickets', 'In Progress', 'Completed']} 
                className="bg-[#131313] border border-white/10 rounded-full px-5 py-2.5 text-xs font-bold text-white w-40 z-20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {complaints.length === 0 ? (
               <div className="text-center py-10 text-[#adaaaa] italic border border-dashed border-white/5 rounded-3xl">
                 No tickets found. You're all caught up!
               </div>
            ) : (
              complaints.map(ticket => (
                <div key={ticket.id} className="bg-[#131313] p-6 rounded-3xl flex flex-col gap-6 group hover:bg-[#1a1919] transition-all border border-white/5 hover:border-white/10 cursor-pointer" onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl bg-[#0e0e0e] border border-white/5 flex items-center justify-center shrink-0 
                      ${ticket.status === 'COMPLETED' ? 'text-[#6e9bff]' : ticket.status === 'OPEN' ? 'text-[#ff716c]' : 'text-[#73ffe3]'}`}>
                      <span className="material-symbols-outlined text-2xl">
                        {ticket.category.includes('Plumbing') ? 'water_drop' : 
                         ticket.category.includes('Electrical') ? 'bolt' : 
                         ticket.category.includes('Access') ? 'security' : 'manufacturing'}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between sm:justify-start gap-4 mb-2 w-full">
                        <h4 className="text-lg font-bold text-white leading-none">{ticket.subject}</h4>
                        <span className={`inline-flex items-center justify-center pt-[2px] px-4 h-[24px] rounded-full text-[10px] font-black uppercase tracking-wider
                          ${ticket.status === 'COMPLETED' ? 'bg-[#6e9bff]/10 text-[#6e9bff]' : 
                            ticket.status === 'OPEN' ? 'bg-[#ff716c]/10 text-[#ff716c]' : 
                            'bg-[#73ffe3]/10 text-[#73ffe3]'}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[#adaaaa] text-xs">
                        <span className="font-bold">#TK-80{ticket.id}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#484847]"></span>
                        <span>{formatDate(ticket.created_at)}</span>
                        {ticket.assigned_to && (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#484847]"></span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">person</span> Assigned: {ticket.assigned_to}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <button className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-white/5 bg-[#0e0e0e] transition-all hover:text-[#73ffe3] text-[#adaaaa] group-hover:bg-[#1a1919]">
                      <span className={`material-symbols-outlined transition-transform duration-300 ${expandedTicketId === ticket.id ? 'rotate-90 text-[#73ffe3]' : 'group-hover:translate-x-1'}`}>chevron_right</span>
                    </button>
                  </div>
                  
                  {/* Expanded Content */}
                  {expandedTicketId === ticket.id && (
                    <div className="w-full pt-6 border-t border-white/5 animate-in slide-in-from-top-4 fade-in duration-300">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] mb-2">Description</p>
                          <p className="text-white text-sm leading-relaxed mb-6">{ticket.description}</p>
                          
                          {ticket.admin_comment && (
                            <div className="bg-[#0e0e0e]/50 p-5 rounded-2xl border border-[#73ffe3]/20 flex gap-4">
                              <span className="material-symbols-outlined text-[#73ffe3] text-xl mt-0.5">support_agent</span>
                              <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-[#73ffe3] mb-1">Admin Response</p>
                                <p className="text-white/90 text-sm leading-relaxed">{ticket.admin_comment}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {ticket.attachment_url ? (
                          <div className="lg:w-64 shrink-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] mb-2">Attachment</p>
                            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square bg-[#0e0e0e]">
                              <img src={ticket.attachment_url} alt="Attached Evidence" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        ) : (
                          <div className="lg:w-64 shrink-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] mb-2">Attachment</p>
                            <div className="rounded-2xl border border-white/5 bg-[#0e0e0e]/50 aspect-video lg:aspect-square flex items-center justify-center text-[#adaaaa]/50 text-xs italic">
                              No attachment provided
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Support Banner (Desktop Only) */}
          <div className="hidden lg:block mt-auto bg-gradient-to-br from-[#1a1919] to-[#0e0e0e] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
               <h4 className="font-headline font-bold text-xl text-white mb-2">Need Immediate Help?</h4>
               <p className="text-sm text-[#adaaaa] mb-6">Our premium concierge is available 24/7 for emergency residential services.</p>
               <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-[#0e0e0e] font-bold text-xs transition-all hover:scale-105 active:scale-95">
                 <span className="material-symbols-outlined text-lg">support_agent</span> Contact Manager
               </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#73ffe3] opacity-[0.03] rounded-full blur-[80px] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"></div>
          </div>

        </section>

        {/* Right Col: New Request Form */}
        <section className="lg:w-[400px] shrink-0">
          <div className="bg-[#1a1919]/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 sticky top-32 z-10">
            <h3 className="text-xl font-headline text-white font-black mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#73ffe3]">add_circle</span>
              New Request
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Subject</label>
                <input 
                  value={subject} 
                  onChange={e => setSubject(e.target.value)}
                  required
                  className="w-full bg-[#0e0e0e]/50 border border-white/5 rounded-xl py-3 px-5 text-sm text-white placeholder:text-[#adaaaa]/30 focus:outline-none focus:ring-1 focus:ring-[#73ffe3]/50 transition-all" 
                  placeholder="Brief subject..." 
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Category</label>
                <CustomDropdown 
                  value={category} 
                  onChange={setCategory} 
                  options={['Plumbing & Water', 'Electrical Systems', 'Security & Access', 'HVAC / Cooling', 'Housekeeping']} 
                  className="w-full bg-[#0e0e0e]/50 border border-white/5 rounded-xl py-3 px-5 text-sm text-white transition-all z-20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Urgency</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setUrgency('Low')}
                    type="button" 
                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${urgency === 'Low' ? 'bg-[#73ffe3]/10 text-[#73ffe3] border-[#73ffe3]/40' : 'bg-[#0e0e0e]/50 text-[#adaaaa] border-transparent hover:bg-white/5'}`}>
                    Low
                  </button>
                  <button 
                    onClick={() => setUrgency('Urgent')}
                    type="button" 
                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${urgency === 'Urgent' ? 'bg-[#ff716c]/10 text-[#ff716c] border-[#ff716c]/40' : 'bg-[#0e0e0e]/50 text-[#adaaaa] border-transparent hover:bg-white/5'}`}>
                    Urgent
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Description</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  className="w-full bg-[#0e0e0e]/50 border border-white/5 rounded-xl py-3 px-5 text-sm text-white placeholder:text-[#adaaaa]/30 focus:outline-none focus:ring-1 focus:ring-[#73ffe3]/50 resize-none transition-all" 
                  placeholder="Provide details..." 
                  rows={3}>
                </textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Attachment</label>
                <div className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-white/5 transition-all cursor-pointer group">
                  <span className="material-symbols-outlined text-[#73ffe3] text-xl">add_a_photo</span>
                  <p className="text-[10px] font-bold text-[#adaaaa] uppercase">Upload Photo</p>
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className={`w-full py-4 rounded-xl text-[#006152] font-black font-headline text-sm tracking-widest uppercase transition-all mt-4 
                  ${isSubmitting ? 'bg-slate-400 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-[#73ffe3] to-[#00f5d4] hover:shadow-[0_0_30px_-5px_rgba(115,255,227,0.5)] active:scale-[0.99]'}
                `}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};
