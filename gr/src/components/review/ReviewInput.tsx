import React, { Dispatch, SetStateAction } from "react";

interface propsType {
    modalOpen : boolean;
    setModalOpen : Dispatch<SetStateAction<boolean>>;
}

const ReviewInput = (props: propsType): JSX.Element => {
    const { modalOpen, setModalOpen } = props;
    return (
        <div className="reviewInput">
            {/* <div className="reviewInput-type"><input placeholder="유형을 입력해주세요."/></div> */}
            <div className="reviewInput-review">
                {/* <input className="reviewInput-review-input" placeholder="리뷰를 입력해주세요."/> */}
                <button className="reviewInput-review-button" onClick={ () => setModalOpen(true) }>리뷰 작성</button>
            </div>
        </div>
    );
};

export default ReviewInput;