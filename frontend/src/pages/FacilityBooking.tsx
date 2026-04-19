import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFacilities } from '../store/slices/facilitiesSlice';
import { getUpcomingDays, type CalendarDay } from '../utils/dateUtils';
import { DateSelector } from '../components/facilities/DateSelector';
import { TimeSlotGrid } from '../components/facilities/TimeSlotGrid';

export const FacilityBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { facilities, loading } = useAppSelector((state) => state.facilities);
  const facility = facilities.find(f => f.id === id);

  const [days, setDays] = useState<CalendarDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Initialize data and dates
  useEffect(() => {
    if (facilities.length === 0) {
      dispatch(fetchFacilities());
    }
  }, [dispatch, facilities.length]);

  useEffect(() => {
    const upcoming = getUpcomingDays(7);
    setDays(upcoming);
    setSelectedDate(upcoming[0].date); // Auto-select today
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-[#73ffe3]">sync</span></div>;
  
  if (!facility && !loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <span className="material-symbols-outlined text-6xl text-[#ff716c]">search_off</span>
      <h2 className="text-2xl font-bold">Facility Not Found</h2>
      <button onClick={() => navigate('/facilities')} className="text-[#73ffe3] underline">Go back to Facilities</button>
    </div>
  );

  if (!facility) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen pb-32 lg:mt-8">
       {/* Hero Section */}
       <header className="relative h-[400px] lg:h-[614px] w-full overflow-hidden rounded-3xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-transparent z-10"></div>
          <img 
            alt={facility.title} 
            className="w-full h-full object-cover grayscale-[0.2]" 
            src={facility.imageUrl}
          />
          
          <button 
             onClick={() => navigate('/facilities')}
             className="absolute top-6 left-6 lg:top-10 lg:left-10 z-30 bg-[#1a1919]/60 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors border border-white/5"
          >
             <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>

          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              {facility.badge && (
                <span className="bg-[#73ffe3] text-[#006152] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{facility.badge}</span>
              )}
              <span className="text-[#73ffe3] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                4.9 (120+ Reviews)
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter text-white mb-4 uppercase">{facility.title}</h1>
            <p className="text-[#adaaaa] text-sm lg:text-lg max-w-lg leading-relaxed">{facility.description}</p>
          </div>
       </header>

       {/* Booking Interface */}
       <section className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:px-12 -mt-16 lg:-mt-24">
          
          {/* Left Column: Selection */}
          <div className="col-span-1 lg:col-span-8 space-y-8">
            <DateSelector 
               days={days} 
               selectedDate={selectedDate} 
               onSelectDate={(d) => {
                 setSelectedDate(d);
                 setSelectedSlot(null); // Reset slot when date changes
               }} 
            />
            
            <TimeSlotGrid
               activeDate={selectedDate}
               facility={facility}
               selectedSlot={selectedSlot}
               onSelectSlot={setSelectedSlot}
            />

            {/* Rules */}
            <div className="pt-6">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">
                Booking Rules
              </h2>
              <div className="space-y-4">
                <div className="bg-[#1a1919] rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:bg-[#201f1f] transition-colors shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#73ffe3]">info</span>
                    <span className="font-bold text-sm">What is the cancellation policy?</span>
                  </div>
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-white transition-colors">add</span>
                </div>
                
                <div className="bg-[#1a1919] rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:bg-[#201f1f] transition-colors shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#73ffe3]">group</span>
                    <span className="font-bold text-sm">Max team size permitted?</span>
                  </div>
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-white transition-colors">add</span>
                </div>
                
                <div className="bg-[#1a1919] rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:bg-[#201f1f] transition-colors shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#73ffe3]">security</span>
                    <span className="font-bold text-sm">Are outside visitors allowed?</span>
                  </div>
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-white transition-colors">add</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary Sticky */}
          <div className="col-span-1 lg:col-span-4">
             <div className="sticky top-24 space-y-6">
                <div className="bg-[#1a1919]/40 backdrop-blur-[20px] rounded-2xl p-8 overflow-hidden relative shadow-[0_0_50px_rgba(115,255,227,0.1)] border-t border-l border-[#484847]/20">
                   <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                     <span className="material-symbols-outlined text-[120px]">receipt_long</span>
                   </div>
                   <h2 className="text-2xl font-black italic mb-8 border-b border-[#484847]/20 pb-4">BOOKING SUMMARY</h2>
                   
                   <div className="space-y-6 mb-10 relative z-10">
                     <div className="flex justify-between items-start">
                       <div>
                         <p className="text-[10px] uppercase font-bold text-[#adaaaa]">Facility</p>
                         <p className="text-lg font-bold">{facility.title}</p>
                       </div>
                       <span className="material-symbols-outlined text-[#73ffe3]">stadium</span>
                     </div>

                     <div className="flex justify-between items-start">
                       <div>
                         <p className="text-[10px] uppercase font-bold text-[#adaaaa]">Date & Time</p>
                         <p className={`text-lg font-bold ${!selectedSlot ? 'text-white/50' : ''}`}>
                            {selectedDate && selectedSlot 
                              ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'})} • ${
                                  parseInt(selectedSlot.split(':')[0], 10) === 0 ? '12:00 AM' : 
                                  parseInt(selectedSlot.split(':')[0], 10) <= 12 ? selectedSlot + ' AM' : 
                                  (parseInt(selectedSlot.split(':')[0], 10) - 12) + ':00 PM'
                                }` 
                              : 'Select a slot'}
                         </p>
                       </div>
                       <span className="material-symbols-outlined text-[#73ffe3]">schedule</span>
                     </div>
                   </div>

                   <button 
                     disabled={!selectedSlot}
                     className={`w-full py-5 rounded-xl font-black uppercase tracking-tighter text-lg transition-all ${
                       selectedSlot 
                         ? 'bg-[#73ffe3] hover:bg-[#00f5d4] text-[#006152] shadow-[0_0_20px_rgba(115,255,227,0.4)] active:scale-[0.98]'
                         : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                     }`}
                   >
                     {selectedSlot ? 'Confirm Booking' : 'Select a Slot'}
                   </button>
                   <p className="text-center text-[10px] text-[#adaaaa] mt-4 uppercase font-medium">Free cancellation up to 6 hours before slot</p>
                </div>
             </div>
          </div>

       </section>
    </div>
  );
};
