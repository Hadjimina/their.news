import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers';
import './Info.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Info(props) {

    return (

        <div className="infoStyle">
            <a
                href="https://github.com/Hadjimina/perspectiveNews/blob/master/README.md"
                style={{ color: "#212529" }}
            >
            <FontAwesomeIcon
                icon={"info-circle"}
                style={{ fontSize: "1.2rem", verticalAlign: "middle" }}
            />{" "}
            {/* Looks cleaner without "info" label */}
            {/* {props.mobile ? "" : "Info"} */}
            </a>
        </div>
        
    );
}

export default Info;
