import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBox.css';

function SearchBox(props) {
  const [search, setSearch] = useState();

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
    height:"60px",
    fontSize:"1.5rem",
    border: "1px solid #dfe1e5",
    color: "#222",
    padding: "10px 50px",
    display: "inline-block",
    borderRadius: "30px",
    outline: "none",
  }

  return (
    <div  style={{width:"60%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <i class="las la-battery-three-quarters"></i>
      <FontAwesomeIcon icon={faSearch} style={{marginRight:"-40px", color:"rgb(154, 160, 166)", fontSize:"1.5rem"}}/>

      <input type="text"class="wrapper"
        style={inputStyle}
        onChange = {changeSearch}
        onFocusOut = {updateSearch}
        onKeyPress = {updateSearch}/>
    </div>
  );
}

export default SearchBox;
