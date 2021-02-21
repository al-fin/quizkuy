import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/bank_soal';

export const listBankSoal = async () => {
  const response = await axiosInstance.get(`${prefix}`);
  return response;
};

export const detailBankSoal = async (id = '') => {
  const response = await axiosInstance.get(`${prefix}/${id}`);
  return response;
};

export const createBankSoal = async (body) => {
  const response = await axiosInstance.post(`${prefix}`, body);
  return response;
};

export const editBankSoal = async (id = '', body) => {
  const response = await axiosInstance.post(`${prefix}/edit/${id}`, body);
  return response;
};

export const deleteBankSoal = async (id = '') => {
  const response = await axiosInstance.delete(`${prefix}/${id}`);
  return response;
};
