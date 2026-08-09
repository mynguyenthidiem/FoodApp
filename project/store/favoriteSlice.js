import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { items: [] }, // lưu tạm foodId yêu thích, chưa đồng bộ backend
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((i) => i !== id);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;