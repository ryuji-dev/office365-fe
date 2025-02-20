import axiosInstance from './axiosInstance';
import { DepartmentInfo } from '../types/visitor';

// 부서 정보 전송 API
export const postDepartmentInfo = async (
  data: DepartmentInfo
): Promise<void> => {
  await axiosInstance.post('/visitor/select-department', data);
};
