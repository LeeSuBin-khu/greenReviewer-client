import { createSlice, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';


export interface ProductState {
  id: number;
  picThumbnail: string;
  name: string;
  vendor: string;
  price: number;
  reviewer?: number;
  checklists?: [];
  eco: string;
}

export interface IProductState {
  product: ProductState[];
  productId: number;
}

const initialProductState: IProductState = {
  product: [],
  productId: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProductList(state, action) {
      state.product = action.payload;
    },
    setProductId(state, action) {
      state.productId = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productId: productSlice.reducer,
  },
});

export const productActions = productSlice.actions;
export default store;