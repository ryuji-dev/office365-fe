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
