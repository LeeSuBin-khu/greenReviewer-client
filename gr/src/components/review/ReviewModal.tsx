import { useRef, useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import axios from "axios";

import { useFetch } from "../../hooks/useFetch";

interface propsType {
    modalOpen : boolean;
    setModalOpen : Dispatch<SetStateAction<boolean>>;
    productId : number;
}

type ModalClose = ({ target }: MouseEvent) => void;
type ReviewInput = ({ target }: ChangeEvent) => void;
type TypeInput = ({ target }: ChangeEvent) => void;

const ReviewModal = (props: propsType): JSX.Element => {
    const [types, setTypes] = useState<number []>([]);
    const [review, setReview] = useState<string>("");
    const typeList = useFetch("checklists");
    const modalRef = useRef<HTMLDivElement>(null);
    const typeRef = useRef<HTMLInputElement []>([]);
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
        if(review !== "") {
            const response = axios.post(`/review/write`, {
                "productId" : props.productId,
                "content" : review,
                "nickname" : "이름",
                "checkTypes" : types
            });
            setModalOpen(false);
        } else {
            alert("리뷰를 입력해주세요.");
        }
    }

    const reviewChangeHandler: ReviewInput = ({ target }) => {
        setReview((target as HTMLInputElement).value);
    }

    const typeChangeHandler: TypeInput = () => {
        const tempList: number [] = [];
        typeRef.current.map( type => {
            type.checked && tempList.push(parseInt(type.value));
        })
        setTypes(tempList);
    }

    return (
        <>
        {modalOpen ? 
        <div className="reviewModal-bg font-18">
            <div className="reviewModal" ref={modalRef}>
                <div className="reviewModal-contents">
                    <div className="font-20 font-bold color-green" style={{ marginBottom: '20px' }}>
                        그린워싱 유형
                    </div>
                    {typeList.map( (type, key) => 
                    <div key={key}>
                        <label><input ref={ type => (typeRef.current[key] = type as HTMLInputElement) } type="checkbox" onChange={typeChangeHandler} value={type.id} />{type.name}</label>
                    </div>
                    )}
                    <div className="font-20 font-bold color-green" style={{ marginBottom: '20px', marginTop: '50px' }}>
                        리뷰
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input className="reviewInput-review-input" onChange={reviewChangeHandler} placeholder="리뷰를 입력해주세요."/>
                        <button className="color-green" onClick={postClickHandler} style={{ position: 'absolute', top: '15px', left: '250px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>작성</button>
                    </div>
                </div>
            </div>
        </div> : null
        }
        </>
    );
}

export default ReviewModal;