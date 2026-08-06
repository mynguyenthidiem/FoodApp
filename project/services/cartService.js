import api from './client';

// ==============================
// GET CART
// ==============================

export const getCart = async () => {
  const response = await api.get('/cart');

  return response.data;
};

// ==============================
// ADD TO CART
// ==============================

export const addToCart = async ({ foodId, quantity }) => {
  const response = await api.post('/cart', {
    foodId,
    quantity,
  });

  return response.data;
};

// ==============================
// UPDATE CART
// ==============================

export const updateCartItem = async ({ id, quantity }) => {
  const response = await api.put(`/cart/${id}`, {
    quantity,
  });

  return response.data;
};

// ==============================
// DELETE ITEM
// ==============================

export const removeCartItem = async id => {
  const response = await api.delete(`/cart/${id}`);

  return response.data;
};

// ==============================
// CLEAR CART
// ==============================

export const clearCart = async () => {
  const response = await api.delete('/cart/clear');

  return response.data;
};
