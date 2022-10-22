import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loading from "../layout/Loading";

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

interface IProps {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const ProductView = ({ loading, setLoading }: IProps): JSX.Element => {
  const params = useParams();
  const reviewRef = useRef<HTMLDivElement>(null);
  const [productDetail, setProductDetail] = useState<IProductDetail>();

  //상품 상세 정보 api 호출
  useEffect(() => {
    const getProductDetail = async () => {
      await axios.get(`${process.env.REACT_APP_SERVER_HOST}/product/detail/${params.id}`).then((res) => {
        setProductDetail(res.data);
        setLoading(false);
      });
    };
    getProductDetail();
  }, []);

  const reviewBtnClick = () => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
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
                <p>배송비: {productDetail?.deliveryFee?.toLocaleString()}원</p>
              </div>
              <div className="product-detail-price">
                <p>{productDetail?.price?.toLocaleString()}원</p>
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
                <button
                  className="product-detail-reviewbtn"
                  onClick={reviewBtnClick}
                >
                  리뷰확인
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            {productDetail?.detailpicUrl.map((list, index) => (
              <div key={index}>
                <img src={list} alt="Loading..." />
              </div>
            ))}
          </div>
          <div ref={reviewRef}></div>
        </>
      )}
    </>
  );
};

export default ProductView;
