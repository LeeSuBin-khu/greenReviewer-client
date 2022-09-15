import { createSlice, configureStore } from "@reduxjs/toolkit";

export interface ProductState {
  id: number;
  picThumbnail: string;
  name: string;
  vendor: string;
  price: number;
  reviewer: number;
  checkList: [];
}

export interface IProductState {
  product: ProductState[];
}

const initialProductState: IProductState = {
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProductList(state, action) {
      state.product = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

export const productActions = productSlice.actions;
export default store;
