import React from "react";

import logo from "../../assets/img/logo.jpg";

import SearchInput from "./SearchInput";

import "../../assets/css/header.css";

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-contents">
        <div className="header-logo">
          <img src={logo} width='130px' onClick={ () => window.location.assign("/") } style={{ cursor: 'pointer' }} />
        </div>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
