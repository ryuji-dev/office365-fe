import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cookies } from 'react-cookie';
import { AuthState, User } from '../types/auth';

const cookies = new Cookies();
const initialAuthState = {
  isAuthenticated: !!cookies.get('token'),
  user: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialAuthState,
      login: (user: User) => set({ isAuthenticated: true, user }),
      socialLogin: (user: User) => set({ isAuthenticated: true, user }),
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
