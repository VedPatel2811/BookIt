import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAPI } from '../../lib/api';

export interface Booking {
  id: number;
  facility_id: number;
  facility_title: string;
  facility_image_url: string;
  user_id: number;
  booking_date: string;
  slot_time: string;
  booker_name: string;
  confirmation_email: string;
  status: string;
  created_at: string;
}

export interface SlotStatus {
  booked: string[];
  locked: string[];
}

interface BookingsState {
  myBookings: Booking[];
  myBookingsLoading: boolean;
  slotStatus: SlotStatus;
  slotStatusLoading: boolean;
  bookingLoading: boolean;
  bookingError: string | null;
  lastCreatedBooking: Booking | null;
}

const initialState: BookingsState = {
  myBookings: [],
  myBookingsLoading: false,
  slotStatus: { booked: [], locked: [] },
  slotStatusLoading: false,
  bookingLoading: false,
  bookingError: null,
  lastCreatedBooking: null,
};

export const fetchMyBookings = createAsyncThunk('bookings/fetchMy', async () => {
  return fetchAPI('/bookings/my') as Promise<Booking[]>;
});

export const fetchSlotStatus = createAsyncThunk(
  'bookings/fetchSlotStatus',
  async ({ facilityId, date }: { facilityId: string; date: string }) => {
    return fetchAPI(`/facilities/${facilityId}/slots?booking_date=${date}`) as Promise<SlotStatus>;
  },
);

export const acquireSlotLock = createAsyncThunk(
  'bookings/acquireLock',
  async ({ facilityId, slotTime, date }: { facilityId: string; slotTime: string; date: string }) => {
    await fetchAPI(`/facilities/${facilityId}/slots/${slotTime}/lock?booking_date=${date}`, { method: 'POST' });
    return slotTime;
  },
);

export const releaseSlotLock = createAsyncThunk(
  'bookings/releaseLock',
  async ({ facilityId, slotTime, date }: { facilityId: string; slotTime: string; date: string }) => {
    await fetchAPI(`/facilities/${facilityId}/slots/${slotTime}/lock?booking_date=${date}`, { method: 'DELETE' });
  },
);

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (payload: {
    facility_id: number;
    booking_date: string;
    slot_time: string;
    booker_name: string;
    confirmation_email: string;
  }, { rejectWithValue }) => {
    try {
      return await fetchAPI('/facilities/book', {
        method: 'POST',
        body: JSON.stringify(payload),
      }) as Booking;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingError: (state) => { state.bookingError = null; },
    clearLastCreatedBooking: (state) => { state.lastCreatedBooking = null; },
  },
  extraReducers: (builder) => {
    builder
      // My bookings
      .addCase(fetchMyBookings.pending, (state) => { state.myBookingsLoading = true; })
      .addCase(fetchMyBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.myBookingsLoading = false;
        state.myBookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state) => { state.myBookingsLoading = false; })

      // Slot status
      .addCase(fetchSlotStatus.pending, (state) => { state.slotStatusLoading = true; })
      .addCase(fetchSlotStatus.fulfilled, (state, action: PayloadAction<SlotStatus>) => {
        state.slotStatusLoading = false;
        state.slotStatus = action.payload;
      })
      .addCase(fetchSlotStatus.rejected, (state) => { state.slotStatusLoading = false; })

      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.bookingLoading = false;
        state.lastCreatedBooking = action.payload;
        state.myBookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = action.payload as string ?? 'Booking failed';
      });
  },
});

export const { clearBookingError, clearLastCreatedBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
