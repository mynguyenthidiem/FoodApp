import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  await new Promise((r) => setTimeout(r, 400)); // giả lập độ trễ mạng
  return [
    { id: 1, foodId: 101, foodName: "Classic Burger", price: 14.5, quantity: 2 },
    { id: 2, foodId: 102, foodName: "Double Cheese Burger", price: 18, quantity: 1 },
  ];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;