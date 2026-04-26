import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../lib/api';
import { UserProfileWidget } from '../components/ui/UserProfileWidget';
import { StatsWidget } from '../components/ui/StatsWidget';
import { CustomDropdown } from '../components/ui/CustomDropdown';
import { CustomDatePicker } from '../components/ui/CustomDatePicker';
import { CustomTimePicker } from '../components/ui/CustomTimePicker';

interface Visitor {
  id: number;
  visitor_name: string;
  contact_number: string;
  reason: string;
  expected_start_date: string;
  expected_end_date: string;
  status: string;
  created_at: string;
  checked_in_at?: string | null;
  checked_out_at?: string | null;
}

interface VisitorStats {
  expected_today: number;
  in_premises: number;
  total_monthly: number;
}

export const Visitors: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [visitorName, setVisitorName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [reason, setReason] = useState('Guest');
  const [expectedStartDate, setExpectedStartDate] = useState('');
  const [expectedStartTime, setExpectedStartTime] = useState('');
  const [expectedEndDate, setExpectedEndDate] = useState('');
  const [expectedEndTime, setExpectedEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const statsData = await fetchAPI('/visitors/stats');
      const visitorsData = await fetchAPI('/visitors');
      setStats(statsData);
      setVisitors(visitorsData);
    } catch (error) {
      console.error('Failed to load visitors data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !contactNumber || !expectedStartDate || !expectedStartTime || !expectedEndDate || !expectedEndTime) return;
    setIsSubmitting(true);
    
    try {
      // Combine date and time
      const startDatetime = new Date(`${expectedStartDate}T${expectedStartTime}:00`).toISOString();
      const endDatetime = new Date(`${expectedEndDate}T${expectedEndTime}:00`).toISOString();

      await fetchAPI('/visitors', {
        method: 'POST',
        body: JSON.stringify({
          visitor_name: visitorName,
          contact_number: contactNumber,
          reason: reason,
          expected_start_date: startDatetime,
          expected_end_date: endDatetime,
        })
      });
      // Reset form and reload
      setVisitorName('');
      setContactNumber('');
      setReason('Guest');
      setExpectedStartDate('');
      setExpectedStartTime('');
      setExpectedEndDate('');
      setExpectedEndTime('');
      await loadData();
    } catch (error) {
      console.error('Failed to submit visitor', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-20 min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-[#73ffe3]/20 border-t-[#73ffe3] rounded-full animate-spin"></div>
        <p className="mt-6 text-[#adaaaa] font-body text-sm tracking-widest uppercase">Loading visitors...</p>
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
          <p className="text-[#73ffe3] font-headline font-bold text-sm tracking-[0.2em] uppercase mb-2">Gatehouse</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter mb-2 text-white">
            Visitor Registration
          </h1>
        </div>
        
        <UserProfileWidget avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDcSmj5ZfksbYtP-atacXBqhndWaNDrU3SGSmkwmbJpfxhwPjHjBZbIFvdaiN4vTi325QpiVVcp5kxgkG6iSHpy-5DqQELjvS9RB_oG5d6LmRxAibFrltdEaliGTfGbUb5h7VjwpOROCPb_98DDlqsjfQe5LVnMP1_W2BFBynsrVbotxs9gnNeL0IKEqjfpD7yKK8Tv-ueYJima39l2nvUzB0_OxuB_L41Q2bl7vz1epKbBI2oElgWE7nwdDko7qcjsFzOf5-M0Pw" />
      </header>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatsWidget 
          label="Expected Today" 
          value={stats?.expected_today < 10 ? `0${stats?.expected_today}` : stats?.expected_today} 
          unit="Guests" 
          colorHex="#73ffe3"
          progressPercentage={stats?.expected_today ? Math.min((stats.expected_today / 20) * 100, 100) : 0}
        />
        <StatsWidget 
          label="In Premises" 
          value={stats?.in_premises < 10 ? `0${stats?.in_premises}` : stats?.in_premises} 
          unit="Active" 
          colorHex="#6e9bff"
          progressPercentage={stats?.in_premises ? Math.min((stats.in_premises / 10) * 100, 100) : 0}
        />
        <StatsWidget 
          label="Total Monthly" 
          value={stats?.total_monthly} 
          unit="Visits" 
          colorHex="#ff6b98"
          progressPercentage={100}
        />
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        
        {/* Left Col: Recent Visitors */}
        <section className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-headline font-black tracking-tight text-white">Recent Visitors</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {visitors.length === 0 ? (
               <div className="text-center py-10 text-[#adaaaa] italic border border-dashed border-white/5 rounded-3xl">
                 No recent visitors found.
               </div>
            ) : (
              visitors.map(visitor => (
                <div key={visitor.id} className="bg-[#131313] p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-6 group hover:bg-[#1a1919] transition-all border border-white/5 hover:border-white/10">
                  <div className={`w-14 h-14 rounded-2xl bg-[#0e0e0e] border border-white/5 flex items-center justify-center shrink-0 
                    ${visitor.status === 'CHECKED_OUT' ? 'text-[#adaaaa]' : visitor.status === 'IN_PREMISES' ? 'text-[#6e9bff]' : 'text-[#73ffe3]'}`}>
                    <span className="material-symbols-outlined text-2xl">
                      {visitor.status === 'CHECKED_OUT' ? 'directions_walk' : visitor.status === 'IN_PREMISES' ? 'meeting_room' : 'schedule'}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between sm:justify-start gap-4 mb-2 w-full">
                      <h4 className="text-lg font-bold text-white leading-none">{visitor.visitor_name}</h4>
                      <span className={`inline-flex items-center justify-center pt-[2px] px-4 h-[24px] rounded-full text-[10px] font-black uppercase tracking-wider
                        ${visitor.status === 'CHECKED_OUT' ? 'bg-[#262626] text-[#adaaaa]' : 
                          visitor.status === 'IN_PREMISES' ? 'bg-[#6e9bff]/10 text-[#6e9bff]' : 
                          'bg-[#73ffe3]/10 text-[#73ffe3]'}`}>
                        {visitor.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[#adaaaa] text-xs">
                      <span className="font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">call</span> {visitor.contact_number}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#484847]"></span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">badge</span> {visitor.reason}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#484847]"></span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">event</span> Expected: {formatDate(visitor.expected_start_date)} - {formatDate(visitor.expected_end_date)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Col: New Entry Pass Form */}
        <section className="lg:w-[400px] shrink-0">
          <div className="bg-[#1a1919]/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 sticky top-32 z-10">
            <h3 className="text-xl font-headline text-white font-black mb-2 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#73ffe3]">add_circle</span>
              New Entry Pass
            </h3>
            <p className="text-xs text-[#adaaaa] mb-6">An SMS notification will be sent to the visitor with the entry pass details.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Visitor Name</label>
                <input 
                  value={visitorName} 
                  onChange={e => setVisitorName(e.target.value)}
                  required
                  className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm text-white placeholder:text-[#adaaaa]/30 focus:outline-none focus:ring-1 focus:ring-[#73ffe3]/50 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.2)]" 
                  placeholder="e.g. John Doe" 
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Contact Number</label>
                <input 
                  value={contactNumber} 
                  onChange={e => setContactNumber(e.target.value)}
                  required
                  className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm text-white placeholder:text-[#adaaaa]/30 focus:outline-none focus:ring-1 focus:ring-[#73ffe3]/50 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.2)]" 
                  placeholder="+91 9876543210" 
                  type="tel"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Reason for Visit</label>
                <CustomDropdown 
                  value={reason}
                  onChange={setReason}
                  options={['Guest', 'Maintenance', 'Delivery', 'Other']}
                  className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 z-30">
                  <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Start Date</label>
                  <CustomDatePicker 
                    value={expectedStartDate}
                    onChange={setExpectedStartDate}
                    className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  />
                </div>
                <div className="space-y-2 z-30">
                  <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">Start Time</label>
                  <CustomTimePicker 
                    value={expectedStartTime}
                    onChange={setExpectedStartTime}
                    className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 z-20">
                  <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">End Date</label>
                  <CustomDatePicker 
                    value={expectedEndDate}
                    onChange={setExpectedEndDate}
                    className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  />
                </div>
                <div className="space-y-2 z-20">
                  <label className="block text-center text-[10px] font-bold uppercase tracking-widest text-[#adaaaa] ml-1">End Time</label>
                  <CustomTimePicker 
                    value={expectedEndTime}
                    onChange={setExpectedEndTime}
                    className="w-full bg-[#262626] border-none rounded-xl py-3 px-5 text-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className={`w-full py-4 rounded-xl text-[#006152] font-black font-headline text-sm tracking-widest uppercase transition-all mt-4 
                  ${isSubmitting ? 'bg-slate-400 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-[#73ffe3] to-[#00f5d4] hover:shadow-[0_0_30px_-5px_rgba(115,255,227,0.5)] active:scale-[0.99]'}
                `}
              >
                {isSubmitting ? 'Generating...' : 'Generate Pass'}
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};
