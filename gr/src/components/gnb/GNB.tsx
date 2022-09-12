import React from "react";

import logo from "../../assets/img/logo.jpg";

import "../../assets/css/gnb.css";

const GNB = () => {
    return (
        <div className="gnb">
            <div><img src={logo} width='130px'/></div>
        </div>
    );
}

export default GNB;