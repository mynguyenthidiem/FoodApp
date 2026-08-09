import api from '../api/client';

// LOGIN
export const login = async ({ email, password }) => {
  const response = await api.post('/Auth/login', {
    email,
    password,
  });

  return response.data;
};

// REGISTER
export const register = async data => {
  const response = await api.post('/Auth/register', data);

  return response.data;
};

// GET PROFILE
export const getProfile = async () => {
  const response = await api.get('/Auth/profile');

  return response.data;
};

// GOOGLE LOGIN
export const googleLogin = async ({ idToken }) => {
  const response = await api.post('/Auth/google', {
    idToken,
  });

  return response.data;
};

// CHANGE PASSWORD
export const changePassword = async data => {
  const response = await api.put('/Auth/change-password', data);

  return response.data;
};