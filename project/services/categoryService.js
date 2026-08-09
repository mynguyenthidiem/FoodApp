import api from '../api/client';

// GET ALL
export const getSystemCategories = async () => {
  const response = await api.get('/SystemCategories');

  return response.data;
};

// GET BY ID
export const getSystemCategoryById = async id => {
  const response = await api.get(`/SystemCategories/${id}`);

  return response.data;
};

// CREATE
export const createSystemCategory = async data => {
  const response = await api.post('/SystemCategories', data);

  return response.data;
};

// UPDATE
export const updateSystemCategory = async (id, data) => {
  const response = await api.put(`/SystemCategories/${id}`, data);

  return response.data;
};

// DELETE
export const deleteSystemCategory = async id => {
  const response = await api.delete(`/SystemCategories/${id}`);

  return response.data;
};
