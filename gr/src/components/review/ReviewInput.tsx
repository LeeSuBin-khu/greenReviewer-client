import React from "react";

const ReviewInput = (): JSX.Element => {
    return (
        <div className="reviewInput">
            <div className="reviewInput-type"><input placeholder="유형을 입력해주세요."/></div>
            <div className="reviewInput-score"><input placeholder="별점을 입력해주세요."/></div>
            <div className="reviewInput-review"><input placeholder="리뷰를 입력해주세요."/></div>
        </div>
    );
};

export default ReviewInput;