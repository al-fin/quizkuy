import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/kelas';

export const listKelas = async () => {
  const response = await axiosInstance.get(`${prefix}`);
  return response;
};

export const detailKelas = async (id = '') => {
  const response = await axiosInstance.get(`${prefix}/${id}`);
  return response;
};

export const createKelas = async (body) => {
  const response = await axiosInstance.post(`${prefix}`, body);
  return response;
};

export const editKelas = async (id = '', body) => {
  const response = await axiosInstance.post(`${prefix}/edit/${id}`, body);
  return response;
};

export const deleteKelas = async (id = '') => {
  const response = await axiosInstance.delete(`${prefix}/${id}`);
  return response;
};
