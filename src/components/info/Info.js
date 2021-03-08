import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers';
import './Info.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Info(props) {

    return (

        <div className="infoStyle">
            <a
                href="https://github.com/Hadjimina/perspectiveNews/blob/master/README.md"
                style={{ color: "#212529" }}
            >
            <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
            />{" "}
            {props.mobile ? "" : "Info"}
            </a>
        </div>
        
    );
}

export default Info;
