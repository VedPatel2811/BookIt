import React from 'react';

interface MaintenanceDuesCardProps {
  pendingDues: number;
  dueDate: string;
}

export const MaintenanceDuesCard: React.FC<MaintenanceDuesCardProps> = ({ pendingDues, dueDate }) => {
  return (
    <section className="col-span-12 lg:col-span-8 bg-[#131313] rounded-[2rem] overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#73ffe3]/10 via-transparent to-transparent opacity-50"></div>
      <div className="p-8 sm:p-10 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex-1">
          <span className="inline-block px-4 py-1 rounded-full bg-[#9f0519] text-[#ffa8a3] text-[10px] font-bold tracking-widest uppercase mb-4 shadow-lg shadow-red-900/20">Pending Dues</span>
          <h3 className="text-[#adaaaa] font-headline text-lg mb-2">Maintenance Balance</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline text-white">₹</span>
            <span className="text-5xl sm:text-6xl font-headline font-black tracking-tighter text-white">{pendingDues.toLocaleString()}</span>
          </div>
          <p className="text-[#adaaaa] text-sm mt-4 max-w-xs">Last date for payment is {dueDate} to avoid late fee penalties.</p>
        </div>
        <div className="w-full md:w-auto flex md:block justify-end">
          <button className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-[#73ffe3] text-[#006152] flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-500 shadow-[0_0_40px_rgba(115,255,227,0.4)]">
            <span className="material-symbols-outlined text-3xl sm:text-4xl font-bold">payments</span>
            <span className="font-headline font-extrabold text-lg sm:text-xl tracking-tight">Pay Now</span>
          </button>
        </div>
      </div>
      {/* Abstract visual element */}
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#73ffe3]/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};
