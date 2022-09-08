import React, { useEffect, useState } from "react";
import { ProductState } from "../../store";
import { useNavigate } from "react-router-dom";

const ProductCard = (props: ProductState) => {
  const [ecoColor, setEcoColor] = useState<string>("");

  const navigate = useNavigate();

  const clickHandler = (id: number) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  return (
    <div className="product-card" onClick={() => clickHandler(props.id)}>
      <div className="product-card-img">
        <img src={props.picThumbnail} alt="err" />
      </div>
      <div className="product-card-ex">
        <div className="product-card-name">{props.name}</div>
        <div className="product-card-price">{props.price}원</div>
        <div className={"product-card-eco " + ecoColor}>{props.eco}</div>
      </div>
    </div>
  );
};

export default ProductCard;
