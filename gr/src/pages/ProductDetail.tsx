import React from "react";
import Header from "../components/layout/Header";
import "../assets/css/review.css";
import "../assets/css/statistics.css";
import ProductView from "../components/product/ProductView";

const Detail: React.FC = () => {
  return (
    <div className="product-detail-container">
      <ProductView />
    </div>
  );
};

export default Detail;
