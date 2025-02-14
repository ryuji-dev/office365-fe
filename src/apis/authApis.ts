import axiosInstance from './axiosInstance';
import { SignupRequest, SignupResponse, LoginResponse } from '../types/auth';
import useAuthStore from '../stores/useAuthStore';

// 회원가입 API
export const signup = async (
  request: SignupRequest
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>('/signup', request);
  return response.data;
};

// 로그인 API
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/login', {
    email,
    password,
  });

  const userData = response.data;
  useAuthStore.setState({
    user: {
      email: userData.email,
      profileImage: userData.profileImage,
    },
  });

  return userData;
};
