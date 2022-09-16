import React, { useEffect, useState } from "react";
import { ProductState } from "../../store";
import { useNavigate } from "react-router-dom";

interface ICheckList {
  id: number;
  num: number;
}

const ProductCard = (props: ProductState): JSX.Element => {
  const [bgColor, setBgColor] = useState<String>();
  const navigate = useNavigate();

  useEffect(() => {
    let cnt = 0;
    props.checkList.map((list: ICheckList) => (cnt += list.num));
    if (props.reviewer > cnt * 2) {
      setBgColor("bg-green");
    } else if (props.reviewer < cnt * 2) {
      setBgColor("bg-pink");
    } else if (props.reviewer === cnt * 2 && props.reviewer) {
      setBgColor("bg-yellow");
    } else {
      setBgColor("bg-gray");
    }
  }, []);

  const clickHandler = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="product-list" onClick={() => clickHandler(props.id)}>
      <div className="product-list-img">
        <img src={props.picThumbnail} alt="err" />
      </div>
      <div className="product-list-ex">
        <div className="product-list-top">
          <div className="product-list-title">
            <div className="product-list-name">{props.name}</div>
            <div className={"product-list-color " + bgColor}></div>
          </div>
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
