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
import { ProductState } from "../../store";
import { useNavigate } from "react-router-dom";

interface ICheckList {
  id: number;
  num: number;
}

const ProductCard = (props: ProductState): JSX.Element => {
  const [bgColor, setBgColor] = useState<String>();
  const navigate = useNavigate();

  /* 친환경적, 그린워싱 위험도를 표현하기 위해 상품의 리뷰를 파악함
  리뷰의 개수의 절반 초과가 그린워싱 위험리뷰라면 빨간색으로 표현
  리뷰의 절반이 절반이 그린워싱 위험리뷰라면 노란색으로 표현
  리뷰의 절반 이상이 친환경적 리뷰라면 초록색으로 표현 */
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
