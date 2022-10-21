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

import styled from "styled-components";

//pagination style
const PageUl = styled.ul`
  float: center;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: #195b3f;
  padding: 1px;
  margin-top: 50px;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #195b3f;
  }
  &:focus::after {
    color: white;
    background-color: #195b3f;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #195b3f;
  }
`;

// props로 받아오는 데이터:
interface IPage {
  postsPerPage: number; // 한 페이지 당 데이터 수
  totalPosts: number; // 총 포스트의 수
  paginate: (number: number) => void; // 현재 페이지 바꾸는 함수
}

const Pagination = ({ postsPerPage, totalPosts, paginate }: IPage) => {
  // page의 숫자를 담는 변수
  const pageList: number[] = [];

  for (let i: number = 0; i < Math.ceil(totalPosts / postsPerPage); i++)
    pageList.push(i + 1);

  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageList.map((number) => (
            <PageLi key={number} onClick={() => paginate(number)}>
              <PageSpan>{number}</PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;
