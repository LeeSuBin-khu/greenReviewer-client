import React from "react";
import SearchInput from "./SearchInput";
import GNB from "../gnb/GNB";

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <GNB />
      </div>
      <SearchInput />
    </header>
  );
};

export default Header;
