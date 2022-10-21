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
  const totalProductList = useSelector(
    (state: Product) => state.product.product
  );

  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 15;
  const totalProductCnt = 225;

  //초기에 검색어 없이 상품 api 호출
  useEffect(() => {
    const getProductList = async () => {
      await axios
        .get("/product/list", {
          params: {
            q: "",
            page: currentPage,
            size: totalProductCnt,
          },
        })
        .then((res: AxiosResponse) => {
          dispatch(productActions.setProductList(res.data));
        })
        .catch((err: AxiosError) => console.log(err));
    };
    getProductList();
  }, []);

  return (
    <>
      {totalProductList && (
        <div className="">
          <div className="product flex-row content-center">
            {totalProductList
              .slice(
                (currentPage - 1) * postsPerPage,
                currentPage * postsPerPage
              )
              ?.map((list: ProductState) => (
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
            totalPosts={totalProductCnt}
            paginate={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
