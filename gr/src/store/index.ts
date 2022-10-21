import { createSlice, configureStore } from "@reduxjs/toolkit";

export interface ProductState {
  id: number; // 상품의 id
  picThumbnail: string; // 상품 썸네일의 id
  name: string; // 상품 이름
  vendor: string; // 상품 제작 회사
  price: number; // 상품 가격
  reviewer: number; // 상품의 리뷰 수
  checkList: []; // 리뷰에서의 그린워싱 위험도 -> 이를 바탕으로 색상 정함.
}

export interface IProductState {
  product: ProductState[]; // 상품 정보가 담긴 array
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
    productId: productSlice.reducer,
  },
});

export const productActions = productSlice.actions;
export default store;
