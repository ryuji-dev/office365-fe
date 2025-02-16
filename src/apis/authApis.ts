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
    isAuthenticated: true,
    user: {
      _id: userData._id,
      email: userData.email,
      profileImage: userData.profileImage,
    },
  });

  return userData;
};

// 로그아웃 API
export const logout = async () => {
  const response = await axiosInstance.post('/logout');

  useAuthStore.setState({
    isAuthenticated: false,
    user: null,
  });

  return response.data;
};

// 소셜 로그인 API
export const socialLogin = async (
  provider: 'google' | 'naver' | 'kakao',
  token: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    `/${provider}/callback`,
    {
      token,
    }
  );

  return response.data;
};

// 소셜 로그아웃 API
export const socialLogout = async (provider: 'google' | 'naver' | 'kakao') => {
  const response = await axiosInstance.post(`/${provider}/logout`);
  return response.data;
};

// 구글 로그인 API
export const googleLogin = async (token: string): Promise<LoginResponse> => {
  return socialLogin('google', token);
};

// 구글 로그아웃 API
export const googleLogout = async () => {
  return socialLogout('google');
};

// 네이버 로그인 API
export const naverLogin = async (token: string): Promise<LoginResponse> => {
  return socialLogin('naver', token);
};

// 네이버 로그아웃 API
export const naverLogout = async () => {
  return socialLogout('naver');
};

// 카카오 로그인 API
export const kakaoLogin = async (token: string): Promise<LoginResponse> => {
  return socialLogin('kakao', token);
};

// 카카오 로그아웃 API
export const kakaoLogout = async () => {
  return socialLogout('kakao');
};
