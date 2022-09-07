import React, { useEffect, useState } from "react";
import { IProducts } from "./ProductList";
import { useNavigate } from "react-router-dom";

const ProductCard = (props: IProducts) => {
  const [ecoColor, setEcoColor] = useState<string>("");

  const navigate = useNavigate();

  const clickHandler = (id: number) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    if (props.eco === "자료부족") setEcoColor("eco-0");
    else if (props.eco === "그린워싱 매우 위험") setEcoColor("eco-1");
    else if (props.eco === "그린워싱 위험") setEcoColor("eco-2");
    else if (props.eco === "친환경적") setEcoColor("eco-3");
    else if (props.eco === "매우 친환경적") setEcoColor("eco-4");
  }, []);

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
