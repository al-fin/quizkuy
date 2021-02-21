import { axiosInstance } from 'config/axiosInstance';

const prefix = '/api/quiz';

export const listQuiz = async () => {
  const response = await axiosInstance.get(`${prefix}`);
  return response;
};

export const detailQuiz = async (id = '') => {
  const response = await axiosInstance.get(`${prefix}/${id}`);
  return response;
};

export const createQuiz = async (body) => {
  const response = await axiosInstance.post(`${prefix}`, body);
  return response;
};

export const editQuiz = async (id = '', body) => {
  const response = await axiosInstance.post(`${prefix}/edit/${id}`, body);
  return response;
};

export const deleteQuiz = async (id = '') => {
  const response = await axiosInstance.delete(`${prefix}/${id}`);
  return response;
};

export const changeStatusQuiz = async (id, status) => {
  const response = await axiosInstance.post(`${prefix}/change_status/${id}`, {
    status,
  });
  return response;
};

export const resetJawaban = async (body) => {
  const response = await axiosInstance.post(`${prefix}/reset_jawaban`, body);
  return response;
};

export const detailJawabanQuiz = async (quiz_id, siswa_id) => {
  const response = await axiosInstance.get(
    `${prefix}/detail_jawaban/${quiz_id}/${siswa_id}`
  );
  return response;
};

export const koreksiJawabanQuiz = async (body) => {
  const response = await axiosInstance.post(`${prefix}/koreksi`, body);
  return response;
};
