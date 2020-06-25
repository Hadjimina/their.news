import React from 'react';
import "./Searchbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";

class Searchbar extends React.Component{
  constructor(props) {
     super(props);
     this.state = {search: ''};
     this.handleChange = this.handleChange.bind(this);
   }

    handleChange(event) {
      this.setState({search: event.target.value});
      console.log("hello"+event.target.value);
    }

    render() {
        return (

          <div class="search-wrapper">
            <div class="input-icon-wrap">
              <span class="input-icon"><span className="fa fa-search "/></span>
              <input type="text" class="input-with-icon" id="form-name" value={this.state.search} onChange={this.handleChange}  />
            </div>

          </div>

        )
    }

}

export default Searchbar;
