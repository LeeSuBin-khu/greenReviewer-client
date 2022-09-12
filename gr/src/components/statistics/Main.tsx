import React from "react";

import Description from "./Description";
import Statistics from "./Statistics";

const Main = () => {
    return (
        <div className="statistics-main">
            <div className='font-30 font-bold'>Type</div>
            <div className="flex-row" style={{ justifyContent: 'space-between', height: '549px' }}>
                <Description />
                <Statistics />
            </div>
        </div>
    );
}

export default Main;