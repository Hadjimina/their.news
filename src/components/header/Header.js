import React from 'react';
import "./Header.css";
import Searchbar from "../searchbar/Searchbar"
import Title from "../title/Title"
import PoliticalSlider from "../politicalslider/PoliticalSlider"

class Header extends React.Component{
  constructor(props) {
     super(props);
     this.state = {
       currentTime : new Date().toLocaleString(),
     }
  }

  handleChange(keyword){
    this.props.onSearchChange(keyword)
  }


    render() {
        return (
            <header>
              <Title/>
              <PoliticalSlider bias={this.props.bias}/>
              {false ? <Searchbar onSearchChange={this.handleChange.bind(this)}/>: <div/>}
            </header>
        )
    }

}

export default Header;
