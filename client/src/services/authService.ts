import api from './api';

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (userData: any) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const googleAuth = async (userData: { email: string; username: string; googleId: string }) => {
  const response = await api.post('/auth/google', userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};