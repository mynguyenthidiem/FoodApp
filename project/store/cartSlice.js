import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCart,
  addToCart,
  updateCart,
  deleteCartItem,
  clearCart,
} from '../services/cartService';

// =====================================
// GET CART
// =====================================

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  return await getCart();
});

// =====================================
// ADD
// =====================================

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ foodId, quantity }, { dispatch }) => {
    await addToCart({
      foodId,
      quantity,
    });

    dispatch(fetchCart());
  },
);

// =====================================
// UPDATE
// =====================================

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, quantity }, { dispatch }) => {
    await updateCart({
      id,
      quantity,
    });

    dispatch(fetchCart());
  },
);

// =====================================
// DELETE
// =====================================

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id, { dispatch }) => {
    await deleteCartItem(id);

    dispatch(fetchCart());
  },
);

// =====================================
// CLEAR
// =====================================

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { dispatch }) => {
    await clearCart();

    dispatch(fetchCart());
  },
);

const initialState = {
  items: [],

  status: 'idle',

  error: null,
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      // ============================
      // FETCH
      // ============================

      .addCase(fetchCart.pending, state => {
        state.status = 'loading';
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.items = action.payload;

        state.error = null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })

      // ============================
      // ADD
      // ============================

      .addCase(addCartItem.pending, state => {
        state.status = 'loading';
      })

      .addCase(addCartItem.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(addCartItem.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })

      // ============================
      // UPDATE
      // ============================

      .addCase(updateCartItem.pending, state => {
        state.status = 'loading';
      })

      .addCase(updateCartItem.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })

      // ============================
      // DELETE
      // ============================

      .addCase(removeCartItem.pending, state => {
        state.status = 'loading';
      })

      .addCase(removeCartItem.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })

      // ============================
      // CLEAR
      // ============================

      .addCase(clearCartAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(clearCartAsync.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(clearCartAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
