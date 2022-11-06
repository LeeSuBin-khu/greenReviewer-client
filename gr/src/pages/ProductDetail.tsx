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

import React, { useState } from "react";
import "../assets/css/review.css";
import "../assets/css/statistics.css";
import ProductView from "../components/product/ProductView";
import Review from "../components/review/Review";
import StatisticsMain from "../components/statistics/Main";
import { FiArrowUpCircle } from "react-icons/fi";

const Detail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewUpdate, setReviewUpdate] = useState<number>(0);
  return (
    <div className="product-detail-container">
      <a id="product-main"></a>
      <ProductView loading={loading} setLoading={setLoading} />
      {!loading && (
        <div style={{position: 'relative'}}>
          <StatisticsMain reviewUpdate={reviewUpdate} />
          <a id="review"></a>
          <Review setReviewUpdate={setReviewUpdate}/>
          <a href="#">
            <FiArrowUpCircle style={{ color: 'gray', opacity: '50%', position: 'absolute', marginTop: '200px', left: '50%' }} size={30}/>
          </a>
        </div>
      )}
    </div>
  );
};

export default Detail;
