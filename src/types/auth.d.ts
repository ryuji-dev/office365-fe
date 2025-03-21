export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  contact: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  _id: string;
  email: string;
  user: User;
  profileImage: string;
}

export interface User {
  _id: string;
  email: string;
  profileImage: string;
  token?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  socialLogin: (user: User) => void;
  logout: () => void;
}
