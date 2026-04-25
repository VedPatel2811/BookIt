import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../lib/api';
import { UserProfileWidget } from '../components/ui/UserProfileWidget';
interface Transaction {
  id: number;
  user_id?: number | null;
  title: string;
  vendor?: string | null;
  unit_name?: string | null;
  amount: number;
  status: string;
  transaction_type: string;
  date: string;
}

interface MaintenanceStats {
  pending_maintenance: number;
  total_society_collection: number;
  pending_units: number;
  total_units: number;
}

const mockChartData = [
  { name: 'Week 1', collection: 400000 },
  { name: 'Week 2', collection: 700000 },
  { name: 'Week 3', collection: 1100000 },
  { name: 'Week 4', collection: 1480000 },
];

export const Maintenance: React.FC = () => {
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await fetchAPI('/maintenance/stats');
        const transactionsData = await fetchAPI('/maintenance/transactions');
        setStats(statsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Failed to load maintenance data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-20 min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-[#73ffe3]/20 border-t-[#73ffe3] rounded-full animate-spin"></div>
        <p className="mt-6 text-[#adaaaa] font-body text-sm tracking-widest uppercase">Loading ledger...</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(2)}L`;
    }
    return `₹ ${value.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative pb-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10">
        <div className="lg:mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter mb-4 text-white">
            Maintenance
          </h1>
        </div>
        
        <UserProfileWidget avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDcSmj5ZfksbYtP-atacXBqhndWaNDrU3SGSmkwmbJpfxhwPjHjBZbIFvdaiN4vTi325QpiVVcp5kxgkG6iSHpy-5DqQELjvS9RB_oG5d6LmRxAibFrltdEaliGTfGbUb5h7VjwpOROCPb_98DDlqsjfQe5LVnMP1_W2BFBynsrVbotxs9gnNeL0IKEqjfpD7yKK8Tv-ueYJima39l2nvUzB0_OxuB_L41Q2bl7vz1epKbBI2oElgWE7nwdDko7qcjsFzOf5-M0Pw" />
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Status */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#1a1919]/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:border-[#73ffe3]/30 transition-all duration-500">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#73ffe3] opacity-[0.03] rounded-full blur-[80px] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none -mr-16 -mt-16"></div>
            
            <h2 className="text-[#adaaaa] text-sm uppercase tracking-[0.2em] font-bold mb-8">Your Maintenance Status</h2>
            
            <div className="mb-10">
              <span className="text-6xl font-black font-headline tracking-tighter text-[#73ffe3]">
                {formatCurrency(stats?.pending_maintenance || 0)}
              </span>
              <div className="flex items-center gap-2 mt-3 text-[#ff716c] bg-[#9f0519]/20 w-max px-3 py-1.5 rounded-lg border border-[#ff716c]/20">
                <span className="material-symbols-outlined text-[1rem]">info</span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Pending for {new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-gradient-to-br from-[#73ffe3] to-[#00f5d4] text-[#006152] py-5 rounded-[1.25rem] font-black font-headline text-lg hover:shadow-[0_0_30px_rgba(115,255,227,0.3)] transition-all active:scale-95 text-center flex justify-center items-center gap-2 overflow-hidden relative">
                <span className="relative z-10">Quick Pay via UPI/Bank</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5">
              <h3 className="text-sm font-bold text-white mb-4">Upload Proof of Transfer</h3>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-[#73ffe3]/40 hover:bg-[#73ffe3]/5 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-3xl text-[#adaaaa] mb-2">upload_file</span>
                <p className="text-sm text-white font-medium mb-1">Drop your receipt here</p>
                <p className="text-xs text-[#adaaaa]">Supports PDF, JPG, or PNG (Max 5MB)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Society Ledger */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Society Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a1919]/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden">
              <span className="material-symbols-outlined absolute top-8 right-8 text-6xl text-[#73ffe3] transition-colors duration-300">account_balance</span>
              <p className="text-[#adaaaa] text-sm uppercase tracking-[0.1em] font-bold mb-4">Total Society Collection</p>
              <h3 className="text-4xl text-white font-black font-headline tracking-tighter">
                {formatCurrency(stats?.total_society_collection || 0)}
              </h3>
            </div>
            
            <div className="bg-[#1a1919]/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden">
               <span className="material-symbols-outlined absolute top-8 right-8 text-6xl text-[#ff716c] transition-colors duration-300">group_off</span>
               <p className="text-[#adaaaa] text-sm uppercase tracking-[0.1em] font-bold mb-4">Pending Units</p>
               <h3 className="text-4xl text-[#ff716c] font-black font-headline tracking-tighter flex items-end gap-2">
                 {stats?.pending_units} <span className="text-lg text-[#adaaaa] font-medium mb-1">/ {stats?.total_units}</span>
               </h3>
               <p className="text-xs text-[#adaaaa] mt-2 bg-white/5 self-start px-2 py-1 rounded-md">
                 Overdue: {formatCurrency(245000)} outstanding
               </p>
            </div>
          </div>

          {/* Transactions Box */}
          <div className="bg-[#131313] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden">
             
             <div className="flex justify-between items-end mb-8 relative z-10">
               <div>
                  <h3 className="text-2xl font-black font-headline text-white tracking-tight mb-2">Recent Transactions</h3>
                  <p className="text-[#adaaaa] text-sm">Tracking all incoming payments and society expenditures</p>
               </div>
             </div>

             <div className="flex flex-col gap-6 relative z-10">
               {transactions.map((tx) => (
                 <div key={tx.id} className="group bg-[#1a1919] hover:bg-[#201f1f] rounded-[1.25rem] p-5 md:p-6 transition-colors border border-transparent hover:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${tx.transaction_type === "EXPENDITURE" ? "bg-white/5 text-white" : "bg-gradient-to-br from-[#73ffe3]/20 to-[#00f5d4]/5 text-[#73ffe3] border border-[#73ffe3]/20"}`}>
                          <span className="material-symbols-outlined text-[1.75rem]">
                            {tx.transaction_type === "EXPENDITURE" ? "construction" : "payments"}
                          </span>
                       </div>
                       <div>
                         <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                           {tx.title}
                           {tx.status === "COMPLETED" ? (
                             <span className="material-symbols-outlined text-[#73ffe3] text-sm bg-[#73ffe3]/10 rounded-full p-0.5">check</span>
                           ) : (
                             <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff716c] bg-[#ff716c]/10 px-2 py-0.5 rounded-lg border border-[#ff716c]/20">Pending</span>
                           )}
                         </h4>
                         <p className="text-sm text-[#adaaaa] mt-1.5 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[1rem]">tag</span>
                            {tx.unit_name ? `${tx.unit_name} • ` : ""} {tx.vendor ? `Vendor: ${tx.vendor}` : tx.transaction_type === "MAINTENANCE" ? "Maintenance" : "Expenditure"}
                         </p>
                       </div>
                    </div>

                    <div className="text-right md:ml-auto pl-[4.75rem] md:pl-0">
                       <p className={`text-xl font-black font-headline tracking-tighter ${tx.transaction_type === "EXPENDITURE" ? "text-white" : "text-[#73ffe3]"}`}>
                          {tx.transaction_type === "EXPENDITURE" ? "-" : "+"} {formatCurrency(tx.amount)}
                       </p>
                       <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{formatDate(tx.date)}</p>
                    </div>
                 </div>
               ))}
               
               {transactions.length === 0 && (
                 <div className="text-center py-10 text-[#adaaaa] italic border border-dashed border-white/5 rounded-2xl">
                   No transactions found.
                 </div>
               )}
             </div>
             
             {transactions.length > 0 && (
               <div className="mt-8 flex justify-center">
                 <button className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#73ffe3] transition-colors flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl">
                   Showing {transactions.length} Ledger Entries
                   <span className="material-symbols-outlined text-sm">arrow_downward</span>
                 </button>
               </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};
