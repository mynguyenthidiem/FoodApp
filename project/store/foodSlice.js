import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFoods } from "../api/foodApi";

export const fetchFoods = createAsyncThunk("food/fetchAll", async () => {
  const res = await getAllFoods();
  return res.data; // { items, pageNumber, pageSize, totalCount, totalPages, ... }
});

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    pageNumber: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => { state.status = "loading"; })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.pageNumber = action.payload.pageNumber;
        state.totalPages = action.payload.totalPages;
        state.status = "succeeded";
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;