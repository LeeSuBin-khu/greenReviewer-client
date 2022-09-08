import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
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
            q: "파우치",
            page: 1,
            size: 10,
          },
        })
        .then((res) => {
          dispatch(productActions.setProductList(res.data));
        })
        .catch((err) => console.log(err));
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
            eco={list.eco}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
