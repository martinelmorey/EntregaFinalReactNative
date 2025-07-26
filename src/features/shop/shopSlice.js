// shopSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categorySelected: "",
    subcategorySelected: "",
    parentCategorySlug: "",
    productSelected: {},
  },
  reducers: {
    setCategorieSelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    setSubCategorySelected: (state, action) => {
      state.subcategorySelected = action.payload;
    },
    setParentCategorySlug: (state, action) => {
      state.parentCategorySlug = action.payload;
    },
    setProductSelect: (state, action) => {
      state.productSelected = action.payload;
    },
    resetSelections: (state) => {
      state.categorySelected = "";
      state.subcategorySelected = "";
      state.parentCategorySlug = "";
    },
  },
});

export const {
  setCategorieSelected,
  setSubCategorySelected,
  setParentCategorySlug,
  setProductSelect,
  resetSelections,
} = shopSlice.actions;

export default shopSlice.reducer;
