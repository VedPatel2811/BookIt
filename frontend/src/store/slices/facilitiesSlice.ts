import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Facility {
  id: string;
  title: string;
  description: string;
  maxTimePerSession: string;
  maxSessionsPerDay: number;
  imageUrl: string;
  badge?: string;
  spanClasses: string; // Tailoring to the asymmetric grid layout
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

// Mock data updated to track usage limits instead of pricing
const MOCK_FACILITIES: Facility[] = [
  {
    id: '1',
    title: 'Cricket Nets',
    description: 'Professional grade practice turfs with automated bowling machines and HD analysis cameras.',
    maxTimePerSession: '1 hour',
    maxSessionsPerDay: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAQwtsi3TLhJAoE6tyM6ZuASIUt--RRQWP61kLfq-LmwPDDRn-VetdmiCkrs-dY10_1amRGahHTlqBGWa60wNL2nA3gK18eud9uFYixFt9IuyBH_q9q1CkaXc7oz0JZsVTJaGqec6UnQ5-1Qr3ONDgr75zwG8tobwrbUBgxua6Emuptl2J54l6k_oDBZRb8qXyLM0zZokWuWgoTgsjlCwAFlBC6iOTNzNTz9kd03jbhslZYTQjXi33uKAj5msh7K4MqVaHMmjShg',
    badge: 'Verified',
    spanClasses: 'col-span-12 lg:col-span-7',
  },
  {
    id: '2',
    title: 'Elite Gymnasium',
    description: 'Equipped with the latest TechnoGym series and certified personal trainers on demand.',
    maxTimePerSession: '2 hours',
    maxSessionsPerDay: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9kAs4yJUJg2EYdVL-fwJF7hPF1SUxdZdWKAA3Fmlz1Bf4oS_GJr0WeueK8AVJ-Jy5ZudxwD3plI2efoB5V3oYVJdC8t-iHySwcUN-vLK431NlEM0UtR3Inx9XQVq0JbBIezGLhbn_zp-Ic861HsqCm6aoN_KJdr3axeSgfuSuxrRgqsM8PbRgjWwMKpKxiQcm1itO5b2gIQuE697ddpuWUNhqm1j7QGsPty0AgjgQbN4ex59KBVb9YA46HBd9TPADo2furSmOhw',
    spanClasses: 'col-span-12 lg:col-span-5',
  },
  {
    id: '3',
    title: 'Infinity Pool',
    description: 'Temperature controlled Olympic-sized pool with private cabanas.',
    maxTimePerSession: '90 mins',
    maxSessionsPerDay: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBQZhAgLPwyFSSYgF6UJ0dTj2jcoyi_WkbutzbaHu8fDliwYBvpZa0jbGfieBgVY23HOiEeLYhZmGlbGJTF9tcQCcRV84Jc4xrOvFu0BX8tqIc7KKyE2Xmw9GrFIbrEseobfznOY_Zvn4OgtXpr2dVqJ6e16a2iND4Z2UqkY40LJ2dRha5GB5nfLXB4Kz9h1PGMqutRy5ngPoMEmo2TpKeFSL4hw99F8pBppmSDnsNtyEa9FzT-gjjpSEQbEfbBMPbieLN_g4-xA',
    badge: 'Popular',
    spanClasses: 'col-span-12 lg:col-span-6',
  },
  {
    id: '4',
    title: 'Mini Theater',
    description: '16-seater 4K Dolby Atmos cinema for private screenings and sports events.',
    maxTimePerSession: '3 hours',
    maxSessionsPerDay: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNwJ34qsX0os7lEpDRnvpwKiMqzPchDPq3tu0LqBSrxiWruMQgQ-0JEjhD2NvfOYm7-TqKr148bvFlHC4TQ2MXZlpXF6IbCvYNXicxczAWdD-ZDO62YrPDij9UGVcbfrbrRKMKzR16x0fu50lh4OSYnY_af_pFKIkNOL8DzH8srB3bVPwkiWduhfYWCGp058RGj3v5eskv-bXl5RKxJgityeipqmGK_gt9WJzOSg65xbMySWp2RVBQLlSQuLN6L5fxLrpsIN7h7A',
    spanClasses: 'col-span-12 lg:col-span-6',
  }
];

export const fetchFacilities = createAsyncThunk(
  'facilities/fetchFacilities',
  async () => {
    // Simulate API delay
    return new Promise<Facility[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_FACILITIES);
      }, 600);
    });
  }
);

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
