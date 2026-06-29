import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth';

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, setToken, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      if (token && !user) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (err) {
          logout();
          setError('Authentication failed');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token, user, setUser, logout]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    logout,
  };
};
