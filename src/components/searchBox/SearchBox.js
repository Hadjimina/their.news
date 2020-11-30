import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBox.css';

function SearchBox(props) {
  const [search, setSearch] = useState(props.initialValue);

  const changeSearch = (e) =>{
    setSearch(e.target.value)
  }

  const updateSearch = (e) => {
    if (e.key === 'Enter') {
      props.updateSearch(search)
    }
  }

  const inputStyle={
    backgroundColor: "transparent",
    width:"100%",
    height:"3.75em",
    fontSize:"1.5rem",
    border: "0.0625em solid #dfe1e5",
    color: "#222",
    padding: "0.625em 3.125em",
    display: "inline-block",
    borderRadius: "1.875em",
    outline: "none",
  }

  const wrapper={
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingBottom: "1em",
  }

  const input={


  }
  return (
    <div  style={wrapper}>
      <FontAwesomeIcon icon={faSearch} style={{marginRight:"-2.5em", color:"rgb(154, 160, 166)", fontSize:"1.5rem"}}/>
      <input type="text" style={{marginLeft:"3000px"}}
        value={search}
        style={inputStyle}
        onChange = {changeSearch}
        onBlur = {updateSearch}
        onKeyPress = {updateSearch}/>
    </div>
  );
}

export default SearchBox;
