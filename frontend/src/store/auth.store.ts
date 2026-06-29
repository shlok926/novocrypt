import { create } from 'zustand';
import { authApi, setAuthToken } from '../lib/api';
import type { User } from '../types/api';

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  clearError: () => void;
  register: (input: { email: string; password: string; name?: string }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AUTH_TOKEN_KEY = 'qs_auth_token';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: false,
  initialized: false,
  error: null,

  async initialize() {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      set({ initialized: true });
      return;
    }

    try {
      setAuthToken(token);
      const user = await authApi.me();
      set({ token, user, initialized: true, error: null });
    } catch (_error) {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthToken(null);
      set({ token: null, user: null, initialized: true, error: 'Session expired. Please sign in again.' });
    }
  },

  clearError() {
    set({ error: null });
  },

  async register(input) {
    set({ loading: true, error: null });
    try {
      const data = await authApi.register(input);
      window.localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      setAuthToken(data.token);
      set({ token: data.token, user: data.user, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      set({ loading: false, error: message });
      throw error;
    }
  },

  async login(input) {
    set({ loading: true, error: null });
    try {
      const data = await authApi.login(input);
      window.localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      setAuthToken(data.token);
      set({ token: data.token, user: data.user, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ loading: false, error: message });
      throw error;
    }
  },

  logout() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
    set({ token: null, user: null, error: null });
  },
}));
