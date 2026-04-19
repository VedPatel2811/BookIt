import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFacilities } from '../store/slices/facilitiesSlice';
import { FacilityCard } from '../components/facilities/FacilityCard';
import { UserProfileWidget } from '../components/ui/UserProfileWidget';

export const Facilities: React.FC = () => {
  const dispatch = useAppDispatch();
  const { facilities, loading, error } = useAppSelector((state) => state.facilities);

  useEffect(() => {
    dispatch(fetchFacilities());
  }, [dispatch]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative lg:mt-8">
      {/* Search and Filters Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 w-full flex-1">
          <div className="relative w-full lg:max-w-md group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-[#73ffe3] transition-colors">search</span>
            <input className="w-full bg-[#262626]/50 border-none rounded-full py-3 lg:py-2.5 pl-12 pr-6 text-sm focus:ring-0 focus:bg-[#262626] transition-all placeholder:text-[#adaaaa]/40 text-white outline-none" placeholder="Search facilities, amenities..." type="text"/>
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button className="px-4 py-2 rounded-full bg-[#1a1919] border border-white/5 text-xs font-semibold text-[#adaaaa] hover:text-[#73ffe3] hover:bg-white/5 transition-all flex items-center gap-2 shrink-0">
              Availability: Today
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <button className="px-4 py-2 rounded-full bg-[#1a1919] border border-white/5 text-xs font-semibold text-[#adaaaa] hover:text-[#73ffe3] hover:bg-white/5 transition-all flex items-center gap-2 shrink-0">
              Filter: All
              <span className="material-symbols-outlined text-sm">filter_list</span>
            </button>
          </div>
        </div>

        <UserProfileWidget avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDcSmj5ZfksbYtP-atacXBqhndWaNDrU3SGSmkwmbJpfxhwPjHjBZbIFvdaiN4vTi325QpiVVcp5kxgkG6iSHpy-5DqQELjvS9RB_oG5d6LmRxAibFrltdEaliGTfGbUb5h7VjwpOROCPb_98DDlqsjfQe5LVnMP1_W2BFBynsrVbotxs9gnNeL0IKEqjfpD7yKK8Tv-ueYJima39l2nvUzB0_OxuB_L41Q2bl7vz1epKbBI2oElgWE7nwdDko7qcjsFzOf5-M0Pw" />
      </div>

      {/* Hero Title */}
      <div className="mb-8 lg:mb-12">
        <span className="text-[#73ffe3] font-semibold tracking-widest text-xs uppercase mb-2 block">Premium Amenities</span>
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white font-headline">Facility Gallery</h2>
        <p className="text-[#adaaaa] text-base lg:text-lg max-w-2xl leading-relaxed">Experience living at its finest. Book exclusive access to our world-class facilities and elevate your residential experience.</p>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="grid grid-cols-12 gap-6 lg:gap-8 animate-pulse">
           <div className="col-span-12 lg:col-span-7 h-[400px] lg:h-[500px] bg-[#1a1919] rounded-[2rem]"></div>
           <div className="col-span-12 lg:col-span-5 h-[400px] lg:h-[500px] bg-[#1a1919] rounded-[2rem]"></div>
        </div>
      )}
      {error && (
        <div className="p-6 bg-[#ff716c]/10 text-[#ff716c] rounded-2xl border border-[#ff716c]/20 text-center">
          <span className="material-symbols-outlined text-4xl mb-2">error</span>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchFacilities())} className="mt-4 px-4 py-2 bg-[#ff716c]/20 rounded-lg hover:bg-[#ff716c]/30 transition-colors">Try Again</button>
        </div>
      )}

      {/* Bento Framework */}
      {!loading && !error && facilities.length > 0 && (
         <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {facilities.map(facility => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
         </div>
      )}
    </div>
  );
};
