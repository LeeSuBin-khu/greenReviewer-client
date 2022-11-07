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
import Loading from "../layout/Loading";
import useScroll from "../../hooks/useScroll";

export interface Product {
  product: IProductState;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const { ele, onScroll } = useScroll();

  const [loading, setLoading] = useState<boolean>(true);

  const totalProductList = useSelector(
    (state: Product) => state.product.product
  );
  const searchKeyword = useSelector((state: Product) => state.product.keyword);

  const currentPage = useSelector((state: Product) => state.product.current);
  const setCurrentPage = (cur: number) => {
    dispatch(productActions.setCurrent(cur));
  };

  const [totalProduct, setTotalProduct] = useState<number>(1000);

  useEffect(() => {
    setLoading(true);
  }, [searchKeyword]);

  // 상품 총 개수 확인
  useEffect(() => {
    const getTotalProduct = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/product/size`, {
          params: {
            q: searchKeyword,
          },
        })
        .then(async (res: AxiosResponse) => {
          setTotalProduct(res.data.length);
        })
        .catch((err: AxiosError) => console.log(err));
    };
    getTotalProduct();
  }, [searchKeyword]);

  useEffect(() => {
    const getProductList = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/product/list`, {
          params: {
            q: searchKeyword,
            page: currentPage - 1,
            size: 10,
          },
        })
        .then((res: AxiosResponse) => {
          dispatch(productActions.setProductList(res.data));
          setLoading(false);
        });
    };
    getProductList();
  }, [currentPage, searchKeyword]);

  return (
    <>
      <div ref={ele} className="top"></div>
      {totalProductList && (
        <>
          {!loading ? (
            <>
              {totalProductList.length !== 0 ? (
                <>
                  <div className="product flex-row content-center">
                    {totalProductList?.map((list: ProductState, index) => (
                      <ProductCard
                        key={index}
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
                  <div>
                    <Pagination
                      onScroll={onScroll}
                      isAdd={-1}
                      postsPerPage={10}
                      totalPosts={totalProduct}
                      paginate={setCurrentPage}
                    />
                  </div>
                </>
              ) : (
                <div className="flex content-center no-data">
                  <p>상품이 존재하지 않습니다.</p>
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
