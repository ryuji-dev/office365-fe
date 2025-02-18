import { User } from './auth';

export interface ProfileResponse {
  _id?: string;
  userId: string;
  email: string;
  profileImage: string;
  user: User;
}

export interface UploadResponse {
  url: string;
  user: User;
}

export interface ProfileState {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}
