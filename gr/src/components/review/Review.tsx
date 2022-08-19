import React from "react";

import ReviewInput from "./ReviewInput";

import defaultProfile from "../../assets/svg/default_profile.svg";
import star5 from "../../assets/svg/star5.svg";

const Review = (): JSX.Element => {
    return (
        <>
        <div className="review flex-col">
            <div className="review-image-name flex-row">
                <div className="review-image"><img src={defaultProfile}/></div>
                <div className="flex-col">
                    <div className="review-name-review flex-col">
                        <div className="font-18">이름</div>
                        <div><img src={star5}/></div>
                        <div className="review-review-type flex-col">
                            <div className="review-type font-13 color-green">증거 불충분 | 부적절한 인증 라벨</div>
                            <div className="review-review font-15">증거가 부족한 것 같아요 ....</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <ReviewInput /> */}
        </>
    );
};

export default Review;