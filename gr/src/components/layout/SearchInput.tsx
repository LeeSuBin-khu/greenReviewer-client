import React, { useRef } from "react";
import search from "../../assets/svg/search.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productActions } from "../../store";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = async () => {
    await axios
      .get("/product/list", {
        params: {
          q: inputRef.current?.value,
          page: 1,
          size: 100,
        },
      })
      .then((res) => {
        dispatch(productActions.setProductList(res.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="header-input">
      <input
        className="search-input"
        placeholder="검색어를 입력해주세요."
        ref={inputRef}
      />
      <img src={search} alt="Search Icon Err" onClick={searchHandler} />
    </div>
  );
};

export default SearchInput;
