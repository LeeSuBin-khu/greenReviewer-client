import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IProductState, productActions, ProductState } from "../../store";
import Pagination from "../pagination/Pagination";
import Loading from "../layout/Loading";
import useScroll from "../../hooks/useScroll";

interface Product {
  product: IProductState;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const { ele, onScroll } = useScroll();

  const [loading, setLoading] = useState<boolean>(false);

  const totalProductList = useSelector(
    (state: Product) => state.product.product
  );

  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 15;
  const totalProductCnt = 225;

  //초기에 검색어 없이 상품 api 호출
  useEffect(() => {
    console.log("Hello");
    const getProductList = async () => {
      await axios
        .get("/product/list", {
          params: {
            q: "",
            page: currentPage,
            size: postsPerPage,
          },
        })
        .then((res: AxiosResponse) => {
          dispatch(productActions.setProductList(res.data));
          setLoading(true);
        })
        .catch((err: AxiosError) => console.log(err));
    };
    getProductList();
  }, [currentPage]);

  return (
    <>
      <div ref={ele} className="top"></div>
      {totalProductList && (
        <>
          {loading ? (
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
          ) : (
            <Loading />
          )}
          <div onClick={onScroll}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={totalProductCnt}
              paginate={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
