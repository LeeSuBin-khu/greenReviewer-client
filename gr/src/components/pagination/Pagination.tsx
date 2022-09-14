import styled from "styled-components";

//pagination style
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

// props로 받아오는 데이터:
interface IPage {
  postsPerPage: number; // 한 페이지 당 데이터 수
  totalPosts: number; // 총 포스트의 수
  paginate: ( number: number ) => void; // 현재 페이지 바꾸는 함수
}

const Pagination = ( { postsPerPage, totalPosts, paginate }: IPage ) => {

    // page의 숫자를 담는 변수
    const pageList: number [] = [];

    for(let i: number = 0; i < Math.ceil( totalPosts / postsPerPage ); i++) pageList.push(i+1)

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