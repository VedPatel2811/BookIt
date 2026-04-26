import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchMyBookings } from '../../store/slices/bookingsSlice';

function formatSlotLabel(slot: string): string {
  const h = parseInt(slot.split(':')[0], 10);
  const m = slot.split(':')[1];
  if (h === 0) return `12:${m} AM`;
  if (h < 12) return `${h}:${m} AM`;
  if (h === 12) return `12:${m} PM`;
  return `${h - 12}:${m} PM`;
}

export const MyBookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { myBookings, myBookingsLoading } = useAppSelector((s) => s.bookings) ?? { myBookings: [], myBookingsLoading: false };

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <section className="col-span-12 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-headline font-bold text-xl text-white">My Bookings</h4>
        <button
          onClick={() => navigate('/facilities')}
          className="text-xs font-bold text-[#adaaaa] hover:text-[#73ffe3] transition-colors uppercase tracking-widest"
        >
          Book More
        </button>
      </div>

      {myBookingsLoading && (
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-28 bg-[#1a1919] rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {!myBookingsLoading && myBookings.length === 0 && (
        <div className="bg-[#1a1919]/40 border border-white/5 rounded-2xl p-8 flex flex-col items-center gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-[#adaaaa]/40">calendar_month</span>
          <p className="text-[#adaaaa] text-sm">No bookings yet.</p>
          <button
            onClick={() => navigate('/facilities')}
            className="text-[#73ffe3] text-xs underline"
          >
            Browse facilities
          </button>
        </div>
      )}

      {!myBookingsLoading && myBookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myBookings.map((booking) => {
            const bookingDate = new Date(booking.booking_date + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isUpcoming = bookingDate >= today;

            return (
              <div
                key={booking.id}
                className="bg-[#1a1919]/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex gap-0 group hover:border-[#73ffe3]/20 transition-colors"
              >
                <div className="w-20 shrink-0 relative overflow-hidden">
                  <img src={booking.facility_image_url} alt={booking.facility_title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1919]/60" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <p className="text-xs font-bold text-[#adaaaa] uppercase tracking-wider truncate">{booking.facility_title}</p>
                    <p className="text-white font-bold text-sm mt-1">
                      {bookingDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-[#73ffe3] text-xs font-bold">{formatSlotLabel(booking.slot_time)}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full w-fit mt-2 ${
                    isUpcoming ? 'bg-[#73ffe3]/10 text-[#73ffe3]' : 'bg-white/5 text-[#adaaaa]'
                  }`}>
                    {isUpcoming ? 'Upcoming' : 'Past'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
