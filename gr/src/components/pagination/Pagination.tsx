import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  float: center;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: #195B3F;
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
    background-color: #195B3F;
  }
  &:focus::after {
    color: white;
    background-color: #195B3F;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #195B3F;
  }
`;

interface Page {
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
}

const Pagination = ({ postsPerPage, totalPosts, paginate }: Page) => {
    const pageList: number [] = [];
    for(let i: number = 0; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageList.push(i+1);
    }
    return (
        <div>
            <nav>
                <PageUl className="pagination">
                {pageList.map( number => 
                  <PageLi key={number} onClick={ () => paginate(number) }>
                    <PageSpan>
                      {number}
                    </PageSpan>
                  </PageLi>
                )}
                </PageUl>
            </nav>
        </div>
    );
}

export default Pagination;