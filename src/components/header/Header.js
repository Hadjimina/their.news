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

  handleSliderChange(value){
    this.props.onSliderChange(value)
  }


    render() {
        return (
            <header>
              
              <Title/>
              <PoliticalSlider bias={this.props.bias} onSliderChange={this.handleSliderChange.bind(this)}/>
              {false ? <Searchbar onSearchChange={this.handleChange.bind(this)}/>: <div/>}
            </header>
        )
    }

}

export default Header;
