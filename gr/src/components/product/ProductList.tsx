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

  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 15;
  const totalProductCnt = 225;

  useEffect(() => {
    setLoading(true);
  }, [searchKeyword]);

  //초기에 검색어 없이 상품 api 호출
  useEffect(() => {
    const getProductList = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/product/list`, {
          params: {
            q: searchKeyword,
            page: currentPage,
            size: postsPerPage,
          },
        })
        .then((res: AxiosResponse) => {
          dispatch(productActions.setProductList(res.data));
          setLoading(false);
        })
        .catch((err: AxiosError) => console.log(err));
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
                  <div onClick={onScroll}>
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={totalProductCnt}
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
