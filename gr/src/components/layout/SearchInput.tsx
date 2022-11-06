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

import React, { useRef } from "react";
import search from "../../assets/svg/search.svg";
import { useDispatch } from "react-redux";
import { productActions } from "../../store";
import { useNavigate } from "react-router-dom";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchHandler = async () => {
    dispatch(productActions.setKeyword(inputRef.current?.value));
    dispatch(productActions.setCurrent(1));
    navigate("/");
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
