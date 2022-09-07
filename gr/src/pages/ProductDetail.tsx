import React from "react";

import Review from "../components/review/Review";
import Statistics from "../components/statistics/statistics";

import '../assets/css/review.css';

const ProductDetail = (): JSX.Element => {
    return (
        <div>
            <Review />
            <Statistics />
        </div>
    );
};

export default ProductDetail;