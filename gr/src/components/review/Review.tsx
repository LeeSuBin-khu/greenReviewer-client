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
  }, [modalOpen, currentPage]);

  useEffect(() => {
    const fetchApi = async () => {
      const response: AxiosResponse<any> = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/product/detail/${params.id}`
      );
      setReviewNum(response.data.reviewer);
      props.setReviewUpdate(response.data.reviewer);
    };
    fetchApi();
  }, [modalOpen]);

  return (
    <>
    {reviewList &&
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
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={reviewNum}
        paginate={setCurrentPage}
      />
    </div>
}
</>
  );
};

export default Review;
