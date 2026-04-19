import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { fetchAPI } from './api';

interface User {
  id: number;
  email: string;
  is_active: true;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (token: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const data = await fetchAPI('/auth/me');
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (token: string) => {
    localStorage.setItem('token', token);
    await fetchCurrentUser();
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Best effort background logout, ignore failures
    fetchAPI('/auth/logout', { method: 'POST' }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
