import React, { useState } from 'react';

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


  return (
    <div>
      <input type="text"
        onChange = {changeSearch}
        onFocusOut = {updateSearch}
        onKeyPress = {updateSearch}/>
    </div>
  );
}

export default SearchBox;
