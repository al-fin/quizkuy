import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/guru';

export const listGuru = async () => {
  const response = await axiosInstance.get(`${prefix}`);
  return response;
};

export const detailGuru = async (id = '') => {
  const response = await axiosInstance.get(`${prefix}/${id}`);
  return response;
};

export const createGuru = async (body) => {
  const response = await axiosInstance.post(`${prefix}`, body);
  return response;
};

export const editGuru = async (id = '', body) => {
  const response = await axiosInstance.post(`${prefix}/edit/${id}`, body);
  return response;
};

export const deleteGuru = async (id = '') => {
  const response = await axiosInstance.delete(`${prefix}/${id}`);
  return response;
};

export const loginGuru = async (body) => {
  const response = await axiosInstance.post(`${prefix}/login`, body);
  return response;
};
