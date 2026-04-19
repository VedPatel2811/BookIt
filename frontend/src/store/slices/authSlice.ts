import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Initial state checks for a token in localStorage to persist login
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');

const initialState: AuthState = {
  isAuthenticated: !!token,
  user: userStr ? JSON.parse(userStr) : null,
  token: token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Persist auth (In reality, we may use more robust mechanisms)
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
