import axiosInstance from './axiosInstance';
import { ProfileResponse, UploadResponse } from '../types/mypage';

// 프로필 조회 API
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get('/mypage/profile');
  return response.data as ProfileResponse;
};

// 프로필 아바타 변경 API
export const updateProfileAvatar = async (
  formData: FormData
): Promise<UploadResponse> => {
  const response = await axiosInstance.post('/mypage/change-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data as UploadResponse;
};

// 비밀번호 변경 API
export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
  passwordConfirm: string
): Promise<void> => {
  await axiosInstance.post('/mypage/change-password', {
    currentPassword,
    newPassword,
    passwordConfirm,
  });
};
