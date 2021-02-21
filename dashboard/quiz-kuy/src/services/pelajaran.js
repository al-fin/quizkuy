import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/pelajaran';

export const listPelajaran = async () => {
  const response = await axiosInstance.get(`${prefix}`);
  return response;
};

export const detailPelajaran = async (id = '') => {
  const response = await axiosInstance.get(`${prefix}/${id}`);
  return response;
};

export const createPelajaran = async (body) => {
  const response = await axiosInstance.post(`${prefix}`, body);
  return response;
};

export const editPelajaran = async (id = '', body) => {
  const response = await axiosInstance.post(`${prefix}/edit/${id}`, body);
  return response;
};

export const deletePelajaran = async (id = '') => {
  const response = await axiosInstance.delete(`${prefix}/${id}`);
  return response;
};
