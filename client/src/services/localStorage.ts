export const setToken = (token: string) => {
  localStorage.setItem('tokenApp', token);
};

export const getToken = () => {
  return localStorage.getItem('tokenApp');
};