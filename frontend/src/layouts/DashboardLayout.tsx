import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen font-body selection:bg-[#73ffe3] selection:text-[#006152] overflow-x-hidden">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      {/* Increased bottom padding specifically to account for the fixed bottom bar, ensuring sm:p-8 doesn't override it */}
      <main className="lg:ml-64 min-h-screen px-4 pt-4 pb-32 sm:px-8 sm:pt-8 sm:pb-40 lg:pt-0 lg:pb-12 relative">
        {/* Mobile Top Bar - Replaced hamburger menu with branding */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#73ffe3] font-headline tracking-tighter">BookIt</h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#73ffe3]/20" onClick={handleLogout}>
             <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcSmj5ZfksbYtP-atacXBqhndWaNDrU3SGSmkwmbJpfxhwPjHjBZbIFvdaiN4vTi325QpiVVcp5kxgkG6iSHpy-5DqQELjvS9RB_oG5d6LmRxAibFrltdEaliGTfGbUb5h7VjwpOROCPb_98DDlqsjfQe5LVnMP1_W2BFBynsrVbotxs9gnNeL0IKEqjfpD7yKK8Tv-ueYJima39l2nvUzB0_OxuB_L41Q2bl7vz1epKbBI2oElgWE7nwdDko7qcjsFzOf5-M0Pw"/>
          </div>
        </div>

        <Outlet />

        {/* Global Floating Action Button */}
        {/* Adjusted bottom position to sit above bottom nav bar on mobile */}
        <button className="fixed bottom-[110px] right-6 sm:bottom-[130px] lg:bottom-10 lg:right-10 w-16 h-16 rounded-2xl bg-[#73ffe3] text-[#006152] flex items-center justify-center shadow-[0_12px_40px_rgba(115,255,227,0.4)] hover:scale-110 active:scale-95 transition-all z-[50]">
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      </main>
    </div>
  );
};
