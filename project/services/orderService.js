import api from "../api/client";

// ======================================
// GET MY ORDERS
// GET /api/orders
// ======================================

export const getOrders = async (
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get("/orders", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};

// ======================================
// GET ORDER DETAIL
// GET /api/orders/{id}
// ======================================

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};

// ======================================
// CREATE ORDER
// POST /api/orders
// ======================================

export const createOrder = async ({
  shippingAddress,
  paymentMethod,
  cartIds,
}) => {
  const response = await api.post("/orders", {
    shippingAddress,
    paymentMethod,
    cartIds,
  });

  return response.data;
};

// ======================================
// UPDATE ORDER
// PUT /api/orders/{id}
// ======================================

export const updateOrder = async ({
  id,
  shippingAddress,
  paymentMethod,
}) => {
  const response = await api.put(`/orders/${id}`, {
    shippingAddress,
    paymentMethod,
  });

  return response.data;
};

// ======================================
// CANCEL ORDER
// DELETE /api/orders/{id}
// ======================================

export const cancelOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);

  return response.data;
};