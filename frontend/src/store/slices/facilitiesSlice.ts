import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAPI } from '../../lib/api';

export interface Facility {
  id: string;
  title: string;
  description: string;
  maxTimePerSession: string;
  maxSessionsPerDay: number;
  imageUrl: string;
  badge?: string;
  spanClasses: string;
}

export interface FacilitiesState {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
}

const initialState: FacilitiesState = {
  facilities: [],
  loading: false,
  error: null,
};

export const fetchFacilities = createAsyncThunk('facilities/fetchFacilities', async () => {
  const data = await fetchAPI('/facilities');
  // Normalize id to string to keep compatibility with existing components
  return data.map((f: Facility & { id: number }) => ({ ...f, id: String(f.id) }));
});

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action: PayloadAction<Facility[]>) => {
        state.loading = false;
        state.facilities = action.payload;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch facilities';
      });
  },
});

export default facilitiesSlice.reducer;
