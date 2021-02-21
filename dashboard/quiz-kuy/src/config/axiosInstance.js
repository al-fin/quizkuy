import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = Cookies.get('token');
  if (token !== null) {
    config.headers = Object.assign(
      {
        token: `${token}`,
      },
      config.headers
    );
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    console.log(error.response);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
