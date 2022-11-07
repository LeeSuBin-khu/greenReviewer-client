/*
 * Copyright 2022 KHUGREEN (https://github.com/KHUGREEN)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  keyword: string; // 검색 키워드
  current: number; // 현재 페이지
}

const initialProductState: IProductState = {
  product: [],
  keyword: "",
  current: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProductList(state, action) {
      state.product = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setCurrent(state, action) {
      state.current = action.payload;
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
