import React from "react";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <p>Green Reviewer</p>
      </div>
      <SearchInput />
    </header>
  );
};

export default Header;
