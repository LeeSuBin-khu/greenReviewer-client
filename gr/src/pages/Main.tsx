import React from "react";
import "../assets/css/setting.css";
import "../assets/css/product.css";
import "../assets/css/header.css";
import Header from "../components/layout/Header";
import ProductList from "../components/product/ProductList";

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <ProductList />
    </div>
  );
};

export default Main;
