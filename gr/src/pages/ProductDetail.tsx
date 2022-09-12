import React from "react";

import Review from "../components/review/Review";
import Statistics from "../components/statistics/Main";

import '../assets/css/review.css';
import '../assets/css/statistics.css';

const ProductDetail = (): JSX.Element => {
    return (
        <div>
            <Statistics />
            <Review />
        </div>
    );
};

export default ProductDetail;