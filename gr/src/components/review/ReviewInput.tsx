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

import React, { Dispatch, SetStateAction } from "react";

interface propsType {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ReviewInput = (props: propsType): JSX.Element => {
  const { modalOpen, setModalOpen } = props;
  return (
    <div className="reviewInput">
      <div className="reviewInput-review">
        <button
          className="reviewInput-review-button"
          onClick={() => setModalOpen(true)}
        >
          리뷰 작성
        </button>
      </div>
    </div>
  );
};

export default ReviewInput;
