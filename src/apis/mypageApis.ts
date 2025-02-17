import axiosInstance from './axiosInstance';
import { ProfileResponse } from '../types/mypage';

// 프로필 조회 API
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get('/mypage/profile');
  return response.data as ProfileResponse;
};
