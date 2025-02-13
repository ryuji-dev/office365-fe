import axiosInstance from './axiosInstance';

interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  contact: string;
}

// 회원가입 API
export const signup = async (request: SignupRequest) => {
  const response = await axiosInstance.post('/signup', request);
  return response.data;
};
