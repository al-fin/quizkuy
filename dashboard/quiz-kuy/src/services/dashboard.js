import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/dashboard';

export const getDashboard = async () => {
  const response = await axiosInstance.get(`${prefix}`);
  return response;
};
