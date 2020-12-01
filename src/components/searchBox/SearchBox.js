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
    width:"80%",
    height:"2.75em",
    fontSize:"1.5rem",
    border: "0em",
    marginLeft:"0.25em",
    outline: "none",
  }

  const wrapper={
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:"0.75em",
    marginBottom: "1em",
    borderRadius: "1.9em",
    border: "0.0625em solid #dfe1e5",
    display: "inline-block",
  }

  const input={


  }
  return (
    <div  style={wrapper}>
      <FontAwesomeIcon icon={faSearch} style={{ color:"rgb(154, 160, 166)", fontSize:"1.5rem"}}/>
      <input type="text"
        value={search}
        style={inputStyle}
        onChange = {changeSearch}
        onBlur = {updateSearch}
        onKeyPress = {updateSearch}/>
    </div>
  );
}

export default SearchBox;
