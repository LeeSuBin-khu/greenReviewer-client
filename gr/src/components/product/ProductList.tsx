import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IProductState, productActions, ProductState } from "../../store";

interface Product {
  product: IProductState;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: Product) => state.product.product);

  useEffect(() => {
    const getProductList = async () => {
      await axios
        .get("/product/list", {
          params: {
            q: "",
            page: 1,
            size: 10,
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
    <div className="">
      <div className="product flex-row content-center">
        {productList.map((list: ProductState) => (
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
    </div>
  );
};

export default ProductList;
