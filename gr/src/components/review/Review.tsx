/*
 * Copyright 2022 KHUGREEN (https://github.com/KHUGREEN)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ReviewInput from "./ReviewInput";
import ReviewModal from "./ReviewModal";
import Pagination from "../pagination/Pagination";
import defaultProfile from "../../assets/svg/default_profile.svg";

interface Data {
  id: number;
  nickname: String;
  content: string;
  checkTypes: number[];
}

const Review = (props: {
  setReviewUpdate: Dispatch<SetStateAction<number>>;
}): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reviewNum, setReviewNum] = useState<number>(0);
  const [isAdd, setIsAdd] = useState<number>(0);

  const params = useParams();

  const typeList = useFetch("checklists");

  const postsPerPage = 10;

  useEffect(() => {
    const fetchApi = async () => {
      const response: AxiosResponse<any> = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/review/list/${params.id}?page=${currentPage - 1}&size=${postsPerPage}`
      );
      setReviewList(response.data);
    };
    fetchApi();
  }, [isAdd, currentPage]);

  useEffect(() => {
    const fetchApi = async () => {
      const response: AxiosResponse<any> = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/product/detail/${params.id}`
      );
      setReviewNum(response.data.reviewer);
      props.setReviewUpdate(response.data.reviewer);
    };
    fetchApi();
  }, [isAdd]);

  return (
    <>
      {reviewList && (
        <div className="review-wrapper">
          <div className="review-title font-30 font-bold">
            Review<span className="font-15">{reviewNum}건</span>
          </div>
          {params.id !== undefined &&
            reviewList.map((review, key) => (
              <div className="review-contents flex-col" key={key}>
                <div className="review-contents-wrapper flex-row">
                  <div className="review-image">
                    <img src={defaultProfile} />
                  </div>
                  <div className="flex-col">
                    <div className="review-name-review flex-col">
                      <div className="font-18">이름</div>
                      <div className="review-type-review flex-col">
                        <div className="review-type font-13 color-green">
                          {/* 그린워싱 유형 */}
                          {review.checkTypes.map((id, key) =>
                            typeList.map(
                              (type) =>
                                id === parseInt(type.id) && (
                                  <span key={key}>
                                    {key !== 0 && " | "}
                                    {type.name}
                                  </span>
                                )
                            )
                          )}
                        </div>
                        <div className="review-review font-15">
                          {review.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <ReviewInput modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <ReviewModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            productId={parseInt(params.id as string)}
            setIsAdd={setIsAdd}
          />
          {reviewList.length !== 0 &&
          <Pagination
            isAdd={isAdd}
            postsPerPage={postsPerPage}
            totalPosts={reviewNum}
            paginate={setCurrentPage}
          />}
        </div>
      )}
    </>
  );
};

export default Review;
