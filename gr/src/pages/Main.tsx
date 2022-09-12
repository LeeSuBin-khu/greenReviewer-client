import React from "react";
import "../assets/css/setting.css";
import "../assets/css/product.css";
import "../assets/css/header.css";
import ProductList from "../components/product/ProductList";

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <ProductList />
    </div>
  );
};

export default Main;
