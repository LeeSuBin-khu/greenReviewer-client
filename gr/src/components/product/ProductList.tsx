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

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IProductState, productActions, ProductState } from "../../store";
import Pagination from "../pagination/Pagination";

interface Product {
  product: IProductState;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: Product) => state.product.product);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 15;

  //초기에 검색어 없이 상품 api 호출
  useEffect(() => {
    const getProductList = async () => {
      await axios
        .get("/product/list", {
          params: {
            q: "",
            page: currentPage,
            size: 15,
          },
        })
        .then((res: AxiosResponse) => {
          dispatch(productActions.setProductList(res.data));
        })
        .catch((err: AxiosError) => console.log(err));
    };
    getProductList();
  }, [currentPage]);

  return (
    <>
      {productList && (
        <div className="">
          <div className="product flex-row content-center">
            {productList?.map((list: ProductState) => (
              <ProductCard
                id={list.id}
                name={list.name}
                vendor={list.vendor}
                price={list.price}
                picThumbnail={list.picThumbnail}
                reviewer={list.reviewer}
                checkList={list.checkList}
              />
            ))}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={225}
            paginate={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
