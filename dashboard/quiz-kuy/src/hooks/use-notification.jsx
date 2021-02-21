import { useSnackbar } from 'notistack';

const config = {
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  style: { transform: 'translateY(50px)' },
  preventDuplicate: true,
};

export default function useNotification() {
  const { enqueueSnackbar } = useSnackbar();

  const sendSuccess = (message, options) => {
    enqueueSnackbar(message, {
      ...config,
      variant: 'success',
      ...options,
    });
  };
  const sendError = (message, options) => {
    enqueueSnackbar(message, {
      ...config,
      variant: 'error',
      ...options,
    });
  };
  const sendInfo = (message, options) => {
    enqueueSnackbar(message, {
      ...config,
      variant: 'info',
      ...options,
    });
  };
  const sendWarning = (message, options) => {
    enqueueSnackbar(message, {
      ...config,
      variant: 'warning',
      ...options,
    });
  };
  return { sendSuccess, sendError, sendInfo, sendWarning };
}
