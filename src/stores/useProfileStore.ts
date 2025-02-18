import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProfileState } from '../types/mypage';

const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      profileImage: null,
      setProfileImage: (image) => {
        set({ profileImage: image });
      },
    }),
    {
      name: 'profile-storage',
    }
  )
);

export default useProfileStore;
