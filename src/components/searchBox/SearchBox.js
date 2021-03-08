import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers';
import './SearchBox.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBox(props) {

    return (
        <div className="SearchBoxWrapper">
            <FontAwesomeIcon
                className="searchIcon"
                onClick={() => {
                    props.setSearch(props.tempSearch);
                }}
                icon={faSearch}
            />
            <input
                type="text"
                value={props.tempSearch}
                className="SearchBoxInputStyle"
                onChange={(e)=>{
                    props.changeSearch(e)
                }}
                onBlur={(e)=>{
                    props.updateSearch(e)}
                }
                onKeyPress={(e)=>{
                    props.updateSearch(e)}
                }
            />
            <FontAwesomeIcon
                className="searchIcon"
                onClick={() => {
                    props.updateCountry(props.country)                
                }}
                icon={faRandom}
                style={{ fontSize: "1.3rem" }}
            />
        </div> 
    );
}

export default SearchBox;
