import axiosInstance from './axiosInstance';
import { VisitorInfo, VisitorData } from '../types/visitor';

// 방문자 정보 전송 API
export const postVisitorInfo = async (data: VisitorInfo): Promise<void> => {
  await axiosInstance.post('/visitor/registration', data);
};

// 전체 방문자 정보 조회 API
export const getVisitors = async (): Promise<VisitorData[]> => {
  const response = await axiosInstance.get<{ visitors: VisitorData[] }>(
    '/visitor/visitors'
  );
  return response.data.visitors;
};

// 특정 방문자 정보 조회 API
export const getVisitorById = async (_id: string): Promise<VisitorData> => {
  const response = await axiosInstance.get<{ visitor: VisitorData }>(
    `/visitor/visitors/${_id}`
  );
  return response.data.visitor;
};
