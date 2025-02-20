import axiosInstance from './axiosInstance';
import { DepartmentInfo, VisitorInfo } from '../types/visitor';

// 부서 정보 전송 API
export const postDepartmentInfo = async (
  data: DepartmentInfo
): Promise<void> => {
  await axiosInstance.post('/visitor/select-department', data);
};

// 방문자 정보 전송 API
export const postVisitorInfo = async (data: VisitorInfo): Promise<void> => {
  await axiosInstance.post('/visitor/registration', data);
};
