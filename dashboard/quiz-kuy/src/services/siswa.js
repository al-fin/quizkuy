import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/siswa';

export const listSiswa = async ({ kelas_id = 1 }) => {
  const response = await axiosInstance.get(`${prefix}`, {
    params: {
      kelas_id: kelas_id,
    },
  });
  return response;
};

export const detailSiswa = async (id = '') => {
  const response = await axiosInstance.get(`${prefix}/${id}`);
  return response;
};

export const createSiswa = async (body) => {
  const response = await axiosInstance.post(`${prefix}`, body);
  return response;
};

export const editSiswa = async (id = '', body) => {
  const response = await axiosInstance.post(`${prefix}/edit/${id}`, body);
  return response;
};

export const updateStatusSiswa = async (id = '', body) => {
  const response = await axiosInstance.post(
    `${prefix}/update_status/${id}`,
    body
  );
  return response;
};

export const deleteSiswa = async (id = '') => {
  const response = await axiosInstance.delete(`${prefix}/${id}`);
  return response;
};

export const approveAllSiswa = async () => {
  const response = await axiosInstance.post(`${prefix}/approve_all`);
  return response;
};
