import { User } from './auth';

export interface ProfileResponse {
  _id?: string;
  userId: string;
  email: string;
  profileImage: string;
  user: User;
}
