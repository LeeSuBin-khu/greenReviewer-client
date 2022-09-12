import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { useFetch } from "../../hooks/useFetch";

import ReviewInput from "./ReviewInput";
import ReviewModal from "./ReviewModal";
import Pagination from "../pagination/Pagination";

import defaultProfile from "../../assets/svg/default_profile.svg";
import star5 from "../../assets/svg/star5.svg";

interface Data {
    id: number;
    nickname: String;
    content: string;
    checkTypes: number [];
}

interface Id {
    productId: number;
}

const Review = ( props: Id ): JSX.Element => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [reviewList, setReviewList] = useState<Data []>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [reviewNum, setReviewNum] = useState<number>(0);
    const typeList = useFetch("checklists");
    const postsPerPage = 10;

    useEffect( () => {
        const fetchApi = async () => {
            const response: AxiosResponse<any> = await axios.get(`/review/list/${props.productId}?page=${currentPage-1}&size=${postsPerPage}`);
            setReviewList(response.data);
        }
        fetchApi();
    }, [reviewList])

    useEffect( () => {
        const fetchApi = async () => {
            const response: AxiosResponse<any> = await axios.get(`/product/detail/${props.productId}`);
            setReviewNum(response.data.reviewer);
        }
        fetchApi();
    }, [reviewList])

    return (
        <div style={{marginTop: '100px'}} className='review-wrapper'>
        <div className="font-30 font-bold">Review<span className="font-15" style={{ marginLeft: '10px', fontWeight: '400', color: '#2f3237'}}>{reviewNum}건</span></div>
        {reviewList.map( (review, key) => 
        <div className="review flex-col" key={key}>
            <div className="review-image-name flex-row">
                <div className="review-image"><img src={defaultProfile}/></div>
                <div className="flex-col">
                    <div className="review-name-review flex-col">
                        <div className="font-18">이름</div>
                        {/* <div><img src={star5}/></div> */}
                        <div className="review-review-type flex-col">
                            <div className="review-type font-13 color-green" key={key}>
                            {review.checkTypes.map( (id, key) => typeList.map( typeId => id === parseInt(typeId.id) && 
                                <span>{key !== 0 && ' | '}{typeId.name}</span>
                            ))}
                            </div>
                            <div className="review-review font-15">{review.content}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
            <ReviewInput modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <ReviewModal modalOpen={modalOpen} setModalOpen={setModalOpen} productId={props.productId}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={reviewList.length} paginate={setCurrentPage} />
        </div>
    );
};

export default Review;