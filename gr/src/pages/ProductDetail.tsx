import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Review from "../components/review/Review";
import Statistics from "../components/statistics/Main";

import "../assets/css/review.css";
import "../assets/css/statistics.css";

interface IProductDetail {
  id: number;
  pic_url: string;
  name: string;
  vendor: string;
  price: number;
  deliveryFee: number;
  originalURL: string;
  detailpicUrl: [];
  reviewer: number;
  checkList: [];
}

const Detail: React.FC = () => {
  const params = useParams();
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [reviewUpdate, setReviewUpdate] = useState<number>(0);

  useEffect(() => {
    const getProductDetail = async () => {
      await axios.get(`/product/detail/${params.id}`).then((res) => {
        setProductDetail(res.data);
      });
    };
    getProductDetail();
    console.log(productDetail);
  }, []);

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-thumb">
          <img src={productDetail?.pic_url} alt="Loading..." />
        </div>
        <div>
          <div className="product-detail-name">
            <p>{productDetail?.name}</p>
          </div>
          <div className="product-detail-vendor">
            <p>{productDetail?.vendor}</p>
          </div>
          <div className="product-detail-review">
            <p>리뷰 수: {productDetail?.reviewer}</p>
          </div>
          <div className="product-detail-delivery">
            <p>배송비: {productDetail?.deliveryFee.toLocaleString()}원</p>
          </div>
          <div className="product-detail-price">
            <p>{productDetail?.price.toLocaleString()}원</p>
          </div>
          <div className="product-detail-btn">
            <a
              href={
                productDetail?.originalURL ? productDetail?.originalURL : ""
              }
              target="_blank"
            >
              <button className="product-detail-buybtn">구매하기</button>
            </a>
            <button className="product-detail-reviewbtn">리뷰확인</button>
          </div>
        </div>
      </div>
      <div className="text-center">
        {productDetail?.detailpicUrl.map((list) => (
          <div>
            <img src={list} alt="Loading..." />
          </div>
        ))}
      </div>
      <Statistics reviewUpdate={reviewUpdate} />
      <Review setReviewUpdate={setReviewUpdate} />
    </div>
  );
};

export default Detail;
