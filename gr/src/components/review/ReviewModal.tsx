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

import {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import axios, { AxiosResponse } from "axios";

import { useFetch } from "../../hooks/useFetch";

interface propsType {
    modalOpen : boolean;
    setModalOpen : Dispatch<SetStateAction<boolean>>;
    productId : number;
    setIsAdd : Dispatch<SetStateAction<number>>;
}

type ModalClose = ({ target }: MouseEvent) => void;
type ReviewInput = ({ target }: ChangeEvent) => void;
type TypeInput = ({ target }: ChangeEvent) => void;

const ReviewModal = (props: propsType): JSX.Element => {
  const [types, setTypes] = useState<number[]>([]);
  const [review, setReview] = useState<string>("");
  const typeList = useFetch("checklists");
  const modalRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLInputElement[]>([]);
  const { modalOpen, setModalOpen } = props;

  const modalClose: ModalClose = ({ target }) => {
    if (
      modalOpen &&
      (target as HTMLElement).className !== "reviewInput-review-button" &&
      !modalRef.current?.contains(target as Node)
    )
      setModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", modalClose);
    return () => {
      document.removeEventListener("click", modalClose);
    };
  }, [modalOpen]);

    const postClickHandler = async () => {
        if(review !== "") {
            const response: AxiosResponse<any> = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/review/write`, {
                "productId" : props.productId,
                "content" : review,
                "nickname" : "이름",
                "checkTypes" : types
            });
            setModalOpen(false);
            props.setIsAdd(response.data.id);
        } else {
            alert("리뷰를 입력해주세요.");
        }
    };

  const reviewChangeHandler: ReviewInput = ({ target }) => {
    setReview((target as HTMLInputElement).value);
  };

  const typeChangeHandler: TypeInput = () => {
    const tempList: number[] = [];
    typeRef.current.map( (type) => {
      type.checked && tempList.push(parseInt(type.value));
    });
    setTypes(tempList);
  };

  return (
    <>
      {modalOpen ? (
        <div className="reviewModal-bg font-18">
          <div className="reviewModal" ref={modalRef} style={{ position: "relative" }}>
            <div className="reviewModal-contents">
              <div
                className="font-20 font-bold color-green"
                style={{ marginBottom: "20px" }}
              >
                그린워싱 유형
              </div>
              {typeList.map((type, key) => (
                <div key={key}>
                  <label>
                    <input
                      ref={(type) =>
                        (typeRef.current[key] = type as HTMLInputElement)
                      }
                      type="checkbox"
                      onChange={typeChangeHandler}
                      value={type.id}
                    />
                    {type.name}
                  </label>
                </div>
              ))}
              <div
                className="font-20 font-bold color-green"
                style={{ marginBottom: "20px", marginTop: "50px" }}
              >
                리뷰
              </div>
              <div>
                <textarea
                  className="reviewInput-review-input"
                  onChange={reviewChangeHandler}
                  placeholder="리뷰를 입력해주세요."
                />
                <button
                  className="color-green"
                  onClick={postClickHandler}
                  style={{
                    position: "absolute",
                    top: "450px",
                    left: "calc( (100% - 60px)/2 )",
                    backgroundColor: "#195b3f",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "30px",
                    color: "white",
                    width: "60px",
                    height: "30px",
                  }}
                >
                  작성
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReviewModal;
