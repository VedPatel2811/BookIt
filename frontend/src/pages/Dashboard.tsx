import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

import { MaintenanceDuesCard } from '../components/dashboard/MaintenanceDuesCard';
import { VisitorPassList } from '../components/dashboard/VisitorPassList';
import { QuickActionsGrid } from '../components/dashboard/QuickActionsGrid';
import { TowerUpdatesSidebar } from '../components/dashboard/TowerUpdatesSidebar';
import { FeaturedAmenity } from '../components/dashboard/FeaturedAmenity';
import { UserProfileWidget } from '../components/ui/UserProfileWidget';
import { MyBookings } from '../components/dashboard/MyBookings';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pendingDues, dueDate, activeVisitors, towerUpdates, status } = useAppSelector(state => state.dashboard);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-[#73ffe3]/20 border-t-[#73ffe3] rounded-full animate-spin"></div>
        <p className="text-[#adaaaa] font-headline">Fetching your premium portfolio...</p>
      </div>
    );
  }

  // Use the mocked user name, or default if it's currently hard-mocked
  const displayName = user?.name;

  return (
    <>
      {/* Header / Greeting */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10">
        <div className="lg:mt-8">
          <p className="text-[#73ffe3] font-headline font-bold text-sm tracking-[0.2em] uppercase mb-2">Welcome Back</p>
          <h2 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-white">Hello, {displayName}</h2>
        </div>
        
        <UserProfileWidget avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDcSmj5ZfksbYtP-atacXBqhndWaNDrU3SGSmkwmbJpfxhwPjHjBZbIFvdaiN4vTi325QpiVVcp5kxgkG6iSHpy-5DqQELjvS9RB_oG5d6LmRxAibFrltdEaliGTfGbUb5h7VjwpOROCPb_98DDlqsjfQe5LVnMP1_W2BFBynsrVbotxs9gnNeL0IKEqjfpD7yKK8Tv-ueYJima39l2nvUzB0_OxuB_L41Q2bl7vz1epKbBI2oElgWE7nwdDko7qcjsFzOf5-M0Pw" />
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-0 lg:gap-8">
        <MaintenanceDuesCard pendingDues={pendingDues} dueDate={dueDate} />
        <VisitorPassList visitors={activeVisitors} />
        <QuickActionsGrid />
        <TowerUpdatesSidebar updates={towerUpdates} />
      </div>

      <FeaturedAmenity />
      <MyBookings />
    </>
  );
};
