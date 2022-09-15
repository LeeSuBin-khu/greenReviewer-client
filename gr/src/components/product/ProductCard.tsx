import React from "react";
import { useNavigate } from "react-router-dom";

import { ProductState } from "../../store";

const ProductCard = (props: ProductState): JSX.Element => {
  const navigate = useNavigate();

  const clickHandler = (id: number) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  return (
    <div className="product-list" onClick={() => clickHandler(props.id)}>
      <div className="product-list-img">
        <img src={props.picThumbnail} alt="err" />
      </div>
      <div className="product-list-ex">
        <div className="product-list-top">
          <div className="product-list-name">{props.name}</div>
          <div className="product-list-vendor">{props.vendor}</div>
        </div>
        <div className="product-list-bottom">
          <div className="product-list-review">리뷰 수 : {props.reviewer}</div>
          <div className="product-list-price">
            {props.price.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
