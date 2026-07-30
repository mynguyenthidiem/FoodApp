import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRestaurants } from "../api/restaurantApi";

export const fetchRestaurants = createAsyncThunk("restaurant/fetchAll", async () => {
  const res = await getAllRestaurants();
  return res.data; // { items, pageNumber, pageSize, totalCount, totalPages, ... }
});

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => { state.status = "loading"; })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.status = "succeeded";
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default restaurantSlice.reducer;