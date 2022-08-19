import React from "react";

import Review from "../components/review/Review";

import '../assets/css/review.css';

const ProductDetail = (): JSX.Element => {
    return (
        <div>
            <Review />
            <Review />
            <Review />
            <Review />
        </div>
    );
};

export default ProductDetail;