export const mockAPI = (data, timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
};
