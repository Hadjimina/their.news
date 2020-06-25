import React from 'react';
import "./Header.css";
import Searchbar from "../searchbar/Searchbar"
import Title from "../title/Title"
import PoliticalSlider from "../politicalslider/PoliticalSlider"

import Clock from 'react-live-clock';

class Header extends React.Component{
  state = {
    currentTime : new Date().toLocaleString(),
  }

    render() {
        return (
            <header>
              <Title/>
              <PoliticalSlider/>
              <Searchbar/>
            </header>
        )
    }

}

export default Header;
