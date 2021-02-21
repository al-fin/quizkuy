import React from 'react';
import { axiosInstance } from 'config/axiosInstance';
import ErrorDialog from 'error-handler/error-dialogs';
import useNotification from 'hooks/use-notification';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

function ErrorHandler({ children }) {
  const history = useHistory();
  const [error, setError] = React.useState({
    open: false,
    message: 'Server Error!',
  });
  const { sendError } = useNotification();

  React.useEffect(() => {
    axiosInstance.interceptors.response.use(
      function (response) {
        if (response?.success == false) {
          setError({
            open: true,
            message: response?.message,
          });
        } else {
          return response;
        }
      },
      function (error) {
        if (!error.response) {
          // NETWORK ERROR
          sendError('Periksa koneksi internet anda!');
        } else {
          switch (error?.response?.status) {
            case 401:
              switch (error?.response?.data?.error?.type) {
                case 'ROLE/PERMISSION DENIED':
                  history.push(`/dashboard`);
                  sendError('Akses ditolak!');
                  break;
                case 'INVALID_TOKEN':
                  history.push(`/login`);
                  sendError('Token tidak valid!');
                  localStorage.removeItem('profile');
                  Cookies.remove('token');
                  break;
                case 'SESSION_EXPIRED':
                  history.push(`/login`);
                  sendError('Session sudah expired!');
                  localStorage.removeItem('profile');
                  Cookies.remove('token');
                  break;
                default:
                  history.push(`/dashboard`);
                  sendError(error?.response?.data?.error?.type);
              }
              break;
            case 500:
              setError({
                open: true,
                message: 'Server Error!',
              });
              break;
            case 422:
              // eslint-disable-next-line no-case-declarations
              const errors = error?.response?.data?.error?.data;
              errors.forEach((err) => {
                sendError(err.message, { persist: true });
              });
              break;
            default:
              setError({
                open: true,
                message: error?.response?.data?.message,
              });
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  });
  return (
    <>
      {children}
      <ErrorDialog error={error} setError={setError} />
    </>
  );
}

export default ErrorHandler;
