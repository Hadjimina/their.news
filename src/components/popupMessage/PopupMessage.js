import React from 'react';
import './PopupMessage.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PuffLoader from "react-spinners/PuffLoader";
import * as Constants from "../../helpers/constants.js";

function popupMessage(props) {
  
  return (
        <div className="wrapper">
          {props.icon === Constants.Loading_key ?
            <PuffLoader 
              size={80} />:
            <FontAwesomeIcon
              icon={props.icon}
              style={{ marginBottom: "0.25em", fontSize: "10rem" }}
            />
          }
        
          <h2 style={{textAlign:"center", marginTop:"0.5em"}}>
            {props.title}
          </h2>
          <p style={{textAlign:"center"}}>
            {props.body}
          </p>
        </div>
        
  );
}

export default popupMessage;
