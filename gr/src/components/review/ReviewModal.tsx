import { useRef, useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import axios from "axios";

import { setTypeId } from "../../utils/setTypeId";

interface propsType {
    modalOpen : boolean;
    setModalOpen : Dispatch<SetStateAction<boolean>>;
}

type ModalClose = ({ target }: MouseEvent) => void;
type ReviewInput = ({ target }: ChangeEvent) => void;
type TypeInput = ({ target }: ChangeEvent) => void;

const ReviewModal = (props: propsType): JSX.Element => {
    const [types, setTypes] = useState<number []>([]);
    const [review, setReview] = useState<string>("");
    const modalRef = useRef<HTMLDivElement>(null);
    const { modalOpen, setModalOpen } = props;

    const modalClose: ModalClose = ({ target }) => {
        if(modalOpen && (target as HTMLElement).className !== 'reviewInput-review-button' && !modalRef.current?.contains(target as Node)) setModalOpen(false);
    }

    useEffect( () => {
        document.addEventListener('click', modalClose);
        return () => {
            document.removeEventListener('click', modalClose);
          };
    }, [modalOpen] )

    const postClickHandler = () => {
        const response = axios.post(`${process.env.REACT_APP_SERVER_HOST}/review/write`, {
            "productId" : 1,
            "content" : review,
            "nickname" : "이름",
            "checkTypes" : types,
            "rate" : 4.0
        });
        //setModalOpen(false);
    }

    const reviewChangeHandler: ReviewInput = ({ target }) => {
        setReview((target as HTMLInputElement).value);
    }

    const typeChangeHandler: TypeInput = ({ target }) => {
        console.log((target as HTMLInputElement).value);
    }

    return (
        <>
        {modalOpen ? 
        <div className="reviewModal-bg">
            <div className="reviewModal" ref={modalRef}>
                <div>
                    <label><input type="checkbox" onChange={typeChangeHandler} value="증거 불충분"/>증거 불충분</label>
                    <label><input type="checkbox" value="애매모호한 주장"/>애매모호한 주장</label>
                    <label><input type="checkbox" value="거짓말"/>거짓말</label>
                    <label><input type="checkbox" value="부적절한 인증 라벨"/>부적절한 인증 라벨</label>
                </div>
                <div>
                    <input className="reviewInput-review-input" onChange={reviewChangeHandler} placeholder="리뷰를 입력해주세요."/>
                </div>
                <div>
                    <button onClick={postClickHandler}>작성</button>
                </div>
            </div>
        </div> : null
        }
        </>
    );
}

export default ReviewModal;