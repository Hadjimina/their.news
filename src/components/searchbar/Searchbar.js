import React from 'react';
import "./Searchbar.css";


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
          <div class="search-title"> Challenge my Opinion about </div>
            <div class="search-icon-wrap">
              <span class="search-icon"><span className="fa fa-search "/></span>
              <input type="text" class="search-with-icon" id="form-name" value={this.state.search} onChange={this.handleChange}  />
            </div>

          </div>

        )
    }

}

export default Searchbar;
