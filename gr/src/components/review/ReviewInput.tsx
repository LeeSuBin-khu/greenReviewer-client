import React, { Dispatch, SetStateAction } from "react";

interface propsType {
    modalOpen : boolean;
    setModalOpen : Dispatch<SetStateAction<boolean>>;
}

const ReviewInput = (props: propsType): JSX.Element => {
    const { modalOpen, setModalOpen } = props;
    return (
        <div className="reviewInput">
            <div className="reviewInput-review">
                <button className="reviewInput-review-button" onClick={ () => setModalOpen(true) }>리뷰 작성</button>
            </div>
        </div>
    );
};

export default ReviewInput;