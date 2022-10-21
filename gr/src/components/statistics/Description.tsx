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

import React from "react";

const Description = () => {
  return (
    <div className="font-15 Description">
      <div>
        <div className="font-20">
          <span className="font-bold color-green">그린워싱 유형</span>이란?
        </div>
        <div style={{ marginTop: "10px" }}>
          캐나다의 친환경 컨설팅 기업{" "}
          <span className="color-green">테라초이스</span>에서 발표한 그린워싱의
          유형입니다.
        </div>
        <div>
          그린리버에서는 총 7가지의 유형 중, 소비자가 직관적으로 판단할 수 있는{" "}
          <br />
          4가지를 선정하여 제시하고 있습니다.
        </div>
        <div
          className="font-18 color-green"
          style={{ marginTop: "40px", marginBottom: "5px" }}
        >
          증거 불충분
        </div>
        <div style={{ marginBottom: "20px" }}>
          친환경 제품임을 증명할 인증 라벨이나 성분 등의 증거가 <br />
          제대로 마련되지 않은 경우입니다.
        </div>
        <div className="font-18 color-green" style={{ marginBottom: "5px" }}>
          부적절한 인증 라벨
        </div>
        <div style={{ marginBottom: "20px" }}>
          공인된 인증 마크와 유사한 이미지를 부착하는 경우입니다.
        </div>
        <div className="font-18 color-green" style={{ marginBottom: "5px" }}>
          애매모호한 주장
        </div>
        <div style={{ marginBottom: "20px" }}>
          뜻을 이해하기 어렵거나 오해를 불러 일으킬 수 있는 문구를 사용하는
          경우입니다.
        </div>
        <div className="font-18 color-green" style={{ marginBottom: "5px" }}>
          거짓말
        </div>
        <div style={{ marginBottom: "20px" }}>
          인증마크나 문구를 도용하여 사실이 아닌 부분을 광고하는 경우입니다.
        </div>
      </div>
    </div>
  );
};

export default Description;
