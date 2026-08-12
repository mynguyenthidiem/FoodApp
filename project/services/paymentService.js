import api from '../api/client';

// ============================================================
// CREATE PAYMENT
// POST /api/payments
// ============================================================

export const createPayment = async ({ orderId, method }) => {
  const response = await api.post('/payments', {
    orderId: Number(orderId),
    method,
  });

  return response.data;
};

// ============================================================
// GET PAYMENT BY ORDER
// GET /api/payments/order/{orderId}
// ============================================================

export const getPaymentByOrder = async orderId => {
  const response = await api.get(`/payments/order/${Number(orderId)}`);

  return response.data;
};

// ============================================================
// COMPLETE COD PAYMENT
// PUT /api/payments/{orderId}/complete
// ============================================================

export const completePayment = async (orderId, transactionId = null) => {
  const response = await api.put(`/payments/${Number(orderId)}/complete`, {
    transactionId,
  });

  return response.data;
};

// ============================================================
// FAIL PAYMENT
// PUT /api/payments/{orderId}/fail
// ============================================================

export const failPayment = async orderId => {
  const response = await api.put(`/payments/${Number(orderId)}/fail`);

  return response.data;
};
