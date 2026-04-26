import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFacilities } from '../store/slices/facilitiesSlice';
import {
  acquireSlotLock,
  releaseSlotLock,
  createBooking,
  clearBookingError,
  clearLastCreatedBooking,
  fetchSlotStatus,
} from '../store/slices/bookingsSlice';
import { getUpcomingDays, type CalendarDay } from '../utils/dateUtils';
import { DateSelector } from '../components/facilities/DateSelector';
import { TimeSlotGrid } from '../components/facilities/TimeSlotGrid';

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatSlotLabel(slot: string): string {
  const h = parseInt(slot.split(':')[0], 10);
  const m = slot.split(':')[1];
  if (h === 0) return `12:${m} AM`;
  if (h < 12) return `${h}:${m} AM`;
  if (h === 12) return `12:${m} PM`;
  return `${h - 12}:${m} PM`;
}

export const FacilityBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { facilities, loading } = useAppSelector((s) => s.facilities);
  const { bookingLoading, bookingError, lastCreatedBooking } = useAppSelector((s) => s.bookings) ?? { bookingLoading: false, bookingError: null, lastCreatedBooking: null };
  const facility = facilities.find((f) => f.id === id);

  const [days, setDays] = useState<CalendarDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookerName, setBookerName] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (facilities.length === 0) dispatch(fetchFacilities());
  }, [dispatch, facilities.length]);

  useEffect(() => {
    const upcoming = getUpcomingDays(7);
    setDays(upcoming);
    setSelectedDate(upcoming[0].date);
  }, []);

  // Show success modal when booking is created
  useEffect(() => {
    if (lastCreatedBooking) setShowSuccess(true);
  }, [lastCreatedBooking]);

  // Release lock when navigating away
  useEffect(() => {
    return () => {
      if (selectedSlot && selectedDate && id) {
        dispatch(releaseSlotLock({ facilityId: id, slotTime: selectedSlot, date: toDateStr(selectedDate) }));
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectSlot = useCallback(async (slot: string) => {
    if (!selectedDate || !id) return;
    const date = toDateStr(selectedDate);

    // Release previous lock if any
    if (selectedSlot && selectedSlot !== slot) {
      dispatch(releaseSlotLock({ facilityId: id, slotTime: selectedSlot, date }));
    }

    try {
      await dispatch(acquireSlotLock({ facilityId: id, slotTime: slot, date })).unwrap();
      setSelectedSlot(slot);
      dispatch(clearBookingError());
    } catch (err) {
      // Refresh slot status so the locked slot shows immediately
      dispatch(fetchSlotStatus({ facilityId: id, date }));
      setSelectedSlot(null);
    }
  }, [selectedDate, id, selectedSlot, dispatch]);

  const handleDateChange = (d: Date) => {
    // Release lock on old slot when date changes
    if (selectedSlot && selectedDate && id) {
      dispatch(releaseSlotLock({ facilityId: id, slotTime: selectedSlot, date: toDateStr(selectedDate) }));
    }
    setSelectedDate(d);
    setSelectedSlot(null);
  };

  const handleConfirm = async () => {
    if (!selectedSlot || !selectedDate || !facility) return;
    dispatch(createBooking({
      facility_id: Number(facility.id),
      booking_date: toDateStr(selectedDate),
      slot_time: selectedSlot,
      booker_name: bookerName.trim(),
      confirmation_email: confirmationEmail.trim(),
    }));
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    dispatch(clearLastCreatedBooking());
    setSelectedSlot(null);
    setBookerName('');
    setConfirmationEmail('');
    // Refresh slots so the newly booked slot shows as booked
    if (selectedDate && id) {
      dispatch(fetchSlotStatus({ facilityId: id, date: toDateStr(selectedDate) }));
    }
  };

  const canConfirm = !!selectedSlot && bookerName.trim().length > 0 && confirmationEmail.trim().length > 0;

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <span className="material-symbols-outlined animate-spin text-4xl text-[#73ffe3]">sync</span>
    </div>
  );

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

      {/* Success Modal */}
      {showSuccess && lastCreatedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1919] border border-[#73ffe3]/20 rounded-3xl p-8 max-w-md w-full shadow-[0_0_60px_rgba(115,255,227,0.15)] animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#73ffe3]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-[#73ffe3]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="text-2xl font-black text-white">Booking Confirmed!</h2>
              <p className="text-[#adaaaa] text-sm">
                Your slot at <span className="text-white font-bold">{lastCreatedBooking.facility_title}</span> on{' '}
                <span className="text-white font-bold">
                  {new Date(lastCreatedBooking.booking_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>{' '}
                at <span className="text-white font-bold">{formatSlotLabel(lastCreatedBooking.slot_time)}</span> is confirmed.
              </p>
              <p className="text-[#adaaaa] text-xs">
                A confirmation will be sent to <span className="text-[#73ffe3]">{lastCreatedBooking.confirmation_email}</span>
              </p>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-bold text-[#adaaaa] hover:text-white hover:border-white/30 transition-colors"
                >
                  Stay Here
                </button>
                <button
                  onClick={() => { handleCloseSuccess(); navigate('/facilities'); }}
                  className="flex-1 py-3 rounded-xl bg-[#73ffe3] text-[#006152] text-sm font-black hover:bg-[#00f5d4] transition-colors"
                >
                  All Facilities
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-[400px] lg:h-[614px] w-full overflow-hidden rounded-3xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-transparent z-10"></div>
        <img alt={facility.title} className="w-full h-full object-cover grayscale-[0.2]" src={facility.imageUrl} />

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

        {/* Left Column */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
          <DateSelector
            days={days}
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
          />

          <TimeSlotGrid
            activeDate={selectedDate}
            facility={facility}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />

          {/* Rules */}
          <div className="pt-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Booking Rules</h2>
            <div className="space-y-4">
              {[
                { icon: 'info', text: 'What is the cancellation policy?' },
                { icon: 'group', text: 'Max team size permitted?' },
                { icon: 'security', text: 'Are outside visitors allowed?' },
              ].map((rule) => (
                <div key={rule.text} className="bg-[#1a1919] rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:bg-[#201f1f] transition-colors shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#73ffe3]">{rule.icon}</span>
                    <span className="font-bold text-sm">{rule.text}</span>
                  </div>
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-white transition-colors">add</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="col-span-1 lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-[#1a1919]/40 backdrop-blur-[20px] rounded-2xl p-8 overflow-hidden relative shadow-[0_0_50px_rgba(115,255,227,0.1)] border-t border-l border-[#484847]/20">
              <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                <span className="material-symbols-outlined text-[120px]">receipt_long</span>
              </div>
              <h2 className="text-2xl font-black italic mb-8 border-b border-[#484847]/20 pb-4">BOOKING SUMMARY</h2>

              <div className="space-y-6 mb-6 relative z-10">
                {/* Facility */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#adaaaa]">Facility</p>
                    <p className="text-lg font-bold">{facility.title}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#73ffe3]">stadium</span>
                </div>

                {/* Date & Time */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#adaaaa]">Date & Time</p>
                    <p className={`text-lg font-bold ${!selectedSlot ? 'text-white/50' : ''}`}>
                      {selectedDate && selectedSlot
                        ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • ${formatSlotLabel(selectedSlot)}`
                        : 'Select a slot'}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#73ffe3]">schedule</span>
                </div>

                {/* Daily limit info */}
                <div className="bg-[#73ffe3]/5 border border-[#73ffe3]/10 rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#73ffe3] text-sm">info</span>
                  <p className="text-[11px] text-[#adaaaa]">
                    Max <span className="text-white font-bold">{facility.maxSessionsPerDay}</span> session(s) per day for this facility
                  </p>
                </div>

                {/* Booker Name */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#adaaaa] block mb-2">Your Name</label>
                  <input
                    type="text"
                    value={bookerName}
                    onChange={(e) => setBookerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#262626] border border-[#484847]/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#adaaaa]/40 outline-none focus:border-[#73ffe3]/50 transition-colors"
                  />
                </div>

                {/* Confirmation Email */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#adaaaa] block mb-2">Confirmation Email</label>
                  <input
                    type="email"
                    value={confirmationEmail}
                    onChange={(e) => setConfirmationEmail(e.target.value)}
                    placeholder="Enter email for confirmation"
                    className="w-full bg-[#262626] border border-[#484847]/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#adaaaa]/40 outline-none focus:border-[#73ffe3]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Error */}
              {bookingError && (
                <div className="mb-4 px-4 py-3 bg-[#ff716c]/10 border border-[#ff716c]/20 rounded-xl text-[#ff716c] text-xs">
                  {bookingError}
                </div>
              )}

              <button
                disabled={!canConfirm || bookingLoading}
                onClick={handleConfirm}
                className={`w-full py-5 rounded-xl font-black uppercase tracking-tighter text-lg transition-all ${
                  canConfirm && !bookingLoading
                    ? 'bg-[#73ffe3] hover:bg-[#00f5d4] text-[#006152] shadow-[0_0_20px_rgba(115,255,227,0.4)] active:scale-[0.98]'
                    : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                }`}
              >
                {bookingLoading
                  ? 'Confirming...'
                  : canConfirm
                  ? 'Confirm Booking'
                  : !selectedSlot
                  ? 'Select a Slot'
                  : 'Fill in Details'}
              </button>
              <p className="text-center text-[10px] text-[#adaaaa] mt-4 uppercase font-medium">Free cancellation up to 6 hours before slot</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};
