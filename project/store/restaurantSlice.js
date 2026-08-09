import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAllRestaurants,
  getRestaurantById,
} from '../services/restaurantService';

// ======================================
// GET ALL
// ======================================

export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async ({ pageNumber = 1, pageSize = 20 } = {}) => {
    return await getAllRestaurants(pageNumber, pageSize);
  },
);

// ======================================
// GET DETAIL
// ======================================

export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchRestaurantById',
  async id => {
    return await getRestaurantById(id);
  },
);

// ======================================
// INITIAL STATE
// ======================================

const initialState = {
  items: [],

  pageNumber: 1,
  totalPages: 1,
  totalCount: 0,

  restaurant: null,

  status: 'idle',
  error: null,
};

// ======================================
// SLICE
// ======================================

const restaurantSlice = createSlice({
  name: 'restaurant',

  initialState,

  reducers: {
    clearRestaurantDetail(state) {
      state.restaurant = null;
    },
  },

  extraReducers: builder => {
    builder

      // ==================================
      // GET ALL
      // ==================================

      .addCase(fetchRestaurants.pending, state => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.items = action.payload?.items ?? [];

        state.pageNumber = action.payload?.pageNumber ?? 1;

        state.totalPages = action.payload?.totalPages ?? 1;

        state.totalCount = action.payload?.totalCount ?? state.items.length;

        state.error = null;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })

      // ==================================
      // DETAIL
      // ==================================

      .addCase(fetchRestaurantById.pending, state => {
        state.status = 'loading';

        state.error = null;
      })

      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.restaurant = action.payload;

        state.error = null;
      })

      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      });
  },
});

export const { clearRestaurantDetail } = restaurantSlice.actions;

export default restaurantSlice.reducer;
