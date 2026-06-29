import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthTypes } from '../types/auth.types';

interface AuthStoreState {
  user: AuthTypes | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthTypes) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),
      setToken: (token) =>
        set({
          token,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
