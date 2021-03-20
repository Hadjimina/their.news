import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers';
import './SearchBox.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SearchBox(props) {

    return (
        <div className="SearchBoxWrapper">
            <FontAwesomeIcon
                className="searchIcon"
                style={props.mobile?{fontSize: "2rem"}:{fontSize: "1.5rem"}}    
                onClick={() => {
                    props.setSearch(props.searchText);
                }}
                icon="search"
            />
            <input
                type="text"
                value={props.searchText}
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
                style={props.mobile?{fontSize: "2rem"}:{fontSize: "1.5rem"}}
                onClick={() => {
                    props.setRandomSearch(props.country)          
                }}
                icon="random"
            />
        </div> 
    );
}

export default SearchBox;
