import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getFoods,
  getFoodById,
  getFoodsByCategory,
} from "../services/foodService";

// ==============================
// GET ALL FOODS
// ==============================

export const fetchFoods = createAsyncThunk(
  "food/fetchFoods",
  async ({
    pageNumber = 1,
    pageSize = 20,
  } = {}) => {
    return await getFoods(
      pageNumber,
      pageSize
    );
  }
);

// ==============================
// GET FOOD DETAIL
// ==============================

export const fetchFoodById =
  createAsyncThunk(
    "food/fetchFoodById",
    async (id) => {
      return await getFoodById(id);
    }
  );

// ==============================
// GET RELATED FOODS
// ==============================

export const fetchFoodsByCategory =
  createAsyncThunk(
    "food/fetchFoodsByCategory",
    async ({
      categoryId,
      pageNumber = 1,
      pageSize = 20,
    }) => {
      return await getFoodsByCategory(
        categoryId,
        pageNumber,
        pageSize
      );
    }
  );

const initialState = {

  // Home

  items: [],

  pageNumber: 1,

  totalPages: 1,

  totalCount: 0,

  // Detail

  food: null,

  relatedFoods: [],

  // State

  status: "idle",

  error: null,
};

const foodSlice = createSlice({

  name: "food",

  initialState,

  reducers: {

    clearFoodDetail(state) {
      state.food = null;
      state.relatedFoods = [];
    },

  },

  extraReducers: (builder) => {

    builder

      // ==========================
      // GET ALL
      // ==========================

      .addCase(
        fetchFoods.pending,
        (state) => {
          state.status = "loading";
        }
      )

      .addCase(
        fetchFoods.fulfilled,
        (state, action) => {

          state.status = "succeeded";

          state.items =
            action.payload.items;

          state.pageNumber =
            action.payload.pageNumber;

          state.totalPages =
            action.payload.totalPages;

          state.totalCount =
            action.payload.totalCount;
        }
      )

      .addCase(
        fetchFoods.rejected,
        (state, action) => {

          state.status = "failed";

          state.error =
            action.error.message;
        }
      )

      // ==========================
      // GET DETAIL
      // ==========================

      .addCase(
        fetchFoodById.pending,
        (state) => {

          state.status = "loading";

          state.food = null;
        }
      )

      .addCase(
        fetchFoodById.fulfilled,
        (state, action) => {

          state.status = "succeeded";

          state.food = action.payload;
        }
      )

      .addCase(
        fetchFoodById.rejected,
        (state, action) => {

          state.status = "failed";

          state.error =
            action.error.message;
        }
      )

      // ==========================
      // RELATED FOODS
      // ==========================

      .addCase(
        fetchFoodsByCategory.pending,
        (state) => {

          state.relatedFoods = [];
        }
      )

      .addCase(
        fetchFoodsByCategory.fulfilled,
        (state, action) => {

          if (state.food) {

            state.relatedFoods =
              action.payload.items.filter(
                (item) =>
                  item.id !== state.food.id
              );

          } else {

            state.relatedFoods =
              action.payload.items;
          }
        }
      )

      .addCase(
        fetchFoodsByCategory.rejected,
        (state, action) => {

          state.error =
            action.error.message;
        }
      );
  },

});

export const {
  clearFoodDetail,
} = foodSlice.actions;

export default foodSlice.reducer;