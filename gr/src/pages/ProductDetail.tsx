import React, { useState } from "react";
import "../assets/css/review.css";
import "../assets/css/statistics.css";
import ProductView from "../components/product/ProductView";
import Review from "../components/review/Review";
import StatisticsMain from "../components/statistics/Main";

const Detail: React.FC = () => {
  const [reviewUpdate, setReviewUpdate] = useState<number>(0);
  return (
    <div className="product-detail-container">
      <ProductView />
      <StatisticsMain reviewUpdate={reviewUpdate} />
      <Review setReviewUpdate={setReviewUpdate} />
    </div>
  );
};

export default Detail;
