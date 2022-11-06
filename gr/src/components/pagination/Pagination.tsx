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
import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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
  font-weight: 400;
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

const PageA = styled.a`
  text-decoration-line: none;
  &:visited {
    color: #195b3f;
  }
`;

// props로 받아오는 데이터:
interface IPage {
  isAdd: number;
  postsPerPage: number; // 한 페이지 당 데이터 수
  totalPosts: number; // 총 포스트의 수
  paginate: (number: number) => void; // 현재 페이지 바꾸는 함수
}

const Pagination = ({ isAdd, postsPerPage, totalPosts, paginate }: IPage) => {
  // page의 숫자를 담는 변수
  const pageList: number[][] = [];
  const [cur, setCur] = useState(1);
  const [curPoint, setCurPoint] = useState(0);

  let j: number = -1;
    for (let i: number = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
      if (i%postsPerPage === 0) {
        pageList.push([]);
        j++;
      }
      pageList[j].push(i + 1);
    }

  useEffect( () => {
    setCur(1);
    paginate(1);
  }, [isAdd])

  return (
    <div>
      <nav>
        <PageUl className="pagination" style={{ position: 'relative' }}>
            <AiOutlineLeft style={{ position: 'absolute', top: '1px', left: '200px', color: curPoint !== 0 ? 'gray' : 'rgb(0, 0, 0, 0.3)' }} onClick={ () => { if(curPoint !== 0) { setCurPoint( i => i-1 ); cur !== 1 && setCur( (curPoint+1)/postsPerPage ); paginate((curPoint+1)/postsPerPage); } } }/>
          {pageList.length !== 0 && pageList[curPoint].map((number) => (
            isAdd !== -1 ? <PageA href='#review'>
              <PageLi key={number} onClick={() => { paginate(number); setCur(number); } }>
                <PageSpan>{number !== cur ? number : <span style={{ fontWeight: '800'}}>{number}</span>}</PageSpan>
              </PageLi>
            </PageA> :
            <PageLi key={number} onClick={() => { paginate(number); setCur(number); } }>
              <PageSpan>{number !== cur ? number : <span style={{ fontWeight: '800'}}>{number}</span>}</PageSpan>
            </PageLi>
          ))}
            <AiOutlineRight style={{ position: 'absolute', top: '1px', right: '200px', color: curPoint !== pageList.length-1 ? 'gray' : 'rgb(0, 0, 0, 0.3)' }} onClick={ () => { if(curPoint !== pageList.length-1) { setCurPoint( i => i+1 ); setCur( postsPerPage*(curPoint+1)+1 ); paginate(postsPerPage*(curPoint+1)+1); } } }/>
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;
