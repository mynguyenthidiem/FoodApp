import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllRestaurants,
  getRestaurantById,
} from "../services/restaurantService";

// GET ALL RESTAURANTS

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async ({ pageNumber = 1, pageSize = 20 } = {}) => {
    return await getAllRestaurants(pageNumber, pageSize);
  },
);

// GET RESTAURANT DETAIL

export const fetchRestaurantById = createAsyncThunk(
  "restaurant/fetchRestaurantById",
  async (id) => {
    return await getRestaurantById(id);
  },
);

const initialState = {
  // restaurant list

  items: [],

  pageNumber: 1,

  totalPages: 1,

  totalCount: 0,

  // current restaurant

  restaurant: null,

  // loading

  status: "idle",

  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",

  initialState,

  reducers: {
    clearRestaurantDetail(state) {
      state.restaurant = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET ALL

      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload.items;

        state.pageNumber = action.payload.pageNumber;

        state.totalPages = action.payload.totalPages;

        state.totalCount = action.payload.totalCount;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })

      // GET DETAIL

      .addCase(fetchRestaurantById.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.restaurant = action.payload;
      })

      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      });
  },
});

export const { clearRestaurantDetail } = restaurantSlice.actions;

export default restaurantSlice.reducer;
