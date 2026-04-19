import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface VisitorPass {
  id: string;
  visitorName: string;
  type: string;
  entryTime: string;
  validTill: string;
  status: 'active' | 'expired';
}

export interface TowerUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'primary' | 'secondary' | 'tertiary';
}

export interface DashboardState {
  pendingDues: number;
  dueDate: string;
  activeVisitors: VisitorPass[];
  towerUpdates: TowerUpdate[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DashboardState = {
  pendingDues: 0,
  dueDate: '',
  activeVisitors: [],
  towerUpdates: [],
  status: 'idle',
  error: null,
};

// Mock async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Return mock sample data representing the backend response
    return {
      pendingDues: 12450,
      dueDate: 'Oct 15th',
      activeVisitors: [
        {
          id: '1',
          visitorName: 'Rahul Varma',
          type: 'Guest',
          entryTime: '14:20',
          validTill: '20:00',
          status: 'active' as const,
        }
      ],
      towerUpdates: [
        {
          id: '1',
          date: 'Today, 09:30 AM',
          title: 'Elevator Maintenance: Tower B',
          description: 'Elevators 3 & 4 will be under routine maintenance from 2PM to 4PM today.',
          type: 'primary' as const,
        },
        {
          id: '2',
          date: 'Yesterday',
          title: 'Pool Reopening',
          description: 'The main swimming pool is now open for residents after cleaning.',
          type: 'secondary' as const,
        },
        {
          id: '3',
          date: '05 Oct 2023',
          title: 'Annual General Meeting',
          description: 'Residents are invited to the clubhouse for the upcoming AGM discussion.',
          type: 'tertiary' as const,
        }
      ]
    };
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingDues = action.payload.pendingDues;
        state.dueDate = action.payload.dueDate;
        state.activeVisitors = action.payload.activeVisitors;
        state.towerUpdates = action.payload.towerUpdates;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load data';
      });
  },
});

export default dashboardSlice.reducer;
