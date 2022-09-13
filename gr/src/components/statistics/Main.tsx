import React from "react";

import Description from "./Description";
import Statistics from "./Statistics";

interface Id {
  productId : number
}

const Main = (props: Id) => {
  return (
    <div className="statistics-main">
      <div className="font-30 font-bold">Type</div>
      <div
        className="flex-row"
        style={{ justifyContent: "space-between", height: "549px" }}
      >
        <Description />
        <Statistics productId={props.productId} />
      </div>
    </div>
  );
};

export default Main;
