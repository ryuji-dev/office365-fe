import axiosInstance from './axiosInstance';
import { SignupRequest, SignupResponse } from '../types/auth';

// 회원가입 API
export const signup = async (
  request: SignupRequest
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>('/signup', request);
  return response.data;
};
