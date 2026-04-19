import React from 'react';

// Props are kept for backward compatibility if still passed by DashboardLayout, though we won't use them.
interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <>
      {/* DESKTOP SIDEBAR (Visible only on lg and above) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 z-[60] bg-[#131313]/80 backdrop-blur-2xl border-r border-white/5 flex-col py-8 shadow-2xl">
        <div className="px-8 mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-[#73ffe3] font-headline italic tracking-tighter">BookIt</h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Premium Living</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <a className="bg-gradient-to-r from-[#73ffe3]/10 to-transparent text-[#73ffe3] border-l-4 border-[#73ffe3] py-4 px-6 flex items-center gap-4 transition-all duration-200 hover:translate-x-1 font-headline text-sm font-medium" href="#">
            <span className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="text-slate-400 hover:text-white hover:bg-white/5 py-4 px-6 flex items-center gap-4 transition-all duration-200 hover:translate-x-1 font-headline text-sm font-medium" href="#">
            <span className="material-symbols-outlined shrink-0">sports_cricket</span>
            <span>Facilities</span>
          </a>
          <a className="text-slate-400 hover:text-white hover:bg-white/5 py-4 px-6 flex items-center gap-4 transition-all duration-200 hover:translate-x-1 font-headline text-sm font-medium" href="#">
            <span className="material-symbols-outlined shrink-0">build</span>
            <span>Maintenance</span>
          </a>
          <a className="text-slate-400 hover:text-white hover:bg-white/5 py-4 px-6 flex items-center gap-4 transition-all duration-200 hover:translate-x-1 font-headline text-sm font-medium" href="#">
            <span className="material-symbols-outlined shrink-0">report_problem</span>
            <span>Complaints</span>
          </a>
          <a className="text-slate-400 hover:text-white hover:bg-white/5 py-4 px-6 flex items-center gap-4 transition-all duration-200 hover:translate-x-1 font-headline text-sm font-medium" href="#">
            <span className="material-symbols-outlined shrink-0">person_add</span>
            <span>Visitors</span>
          </a>
          <a className="text-slate-400 hover:text-white hover:bg-white/5 py-4 px-6 flex items-center gap-4 transition-all duration-200 hover:translate-x-1 font-headline text-sm font-medium" href="#">
            <span className="material-symbols-outlined shrink-0">group</span>
            <span>Community</span>
          </a>
        </nav>

        <div className="px-6 mt-auto">
          <button className="w-full bg-[#73ffe3] text-[#006152] py-4 rounded-xl font-bold font-headline tracking-tight hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(115,255,227,0.3)]">
            Book Now
          </button>
        </div>
      </aside>

      {/* MOBILE & TABLET BOTTOM BAR (Visible only below lg) */}
      <nav className="flex lg:hidden fixed bottom-0 left-0 w-full h-20 sm:h-24 z-[60] bg-[#1a1919]/90 backdrop-blur-3xl border-t border-white/5 px-4 sm:px-12 justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pb-safe">
        <a href="#" className="flex flex-col items-center gap-1 text-[#73ffe3] group">
          <div className="w-12 h-8 rounded-full bg-[#73ffe3]/20 flex items-center justify-center transition-all group-active:scale-95">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          </div>
          <span className="text-[10px] font-headline font-bold uppercase tracking-widest mt-1">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-[#adaaaa] hover:text-white transition-colors group">
          <div className="w-12 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-white/5 group-active:scale-95">
            <span className="material-symbols-outlined">sports_cricket</span>
          </div>
          <span className="text-[10px] font-headline font-medium uppercase tracking-widest mt-1">Play</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-[#adaaaa] hover:text-white transition-colors group">
          <div className="w-12 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-white/5 group-active:scale-95">
            <span className="material-symbols-outlined">build</span>
          </div>
          <span className="text-[10px] font-headline font-medium uppercase tracking-widest mt-1">Fix</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-[#adaaaa] hover:text-white transition-colors group">
          <div className="w-12 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-white/5 group-active:scale-95">
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <span className="text-[10px] font-headline font-medium uppercase tracking-widest mt-1">Guests</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-[#adaaaa] hover:text-white transition-colors group">
          <div className="w-12 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-white/5 group-active:scale-95">
            <span className="material-symbols-outlined">group</span>
          </div>
          <span className="text-[10px] font-headline font-medium uppercase tracking-widest mt-1">Social</span>
        </a>
      </nav>
    </>
  );
};
