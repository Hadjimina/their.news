import React from 'react';
import "./App.css";
import Header from "./components/header/Header"
import Content from "./components/content/Content"
import * as Constants from "./utils/constants"

class App extends React.Component {
  render(){

    var widthStyle={width: window.screen.width*Constants.PAGE_WIDTH_PERCENTAGE}
    return (
      <div class="App">

          <div class="Main" style={widthStyle}>

            <div class="Header">
              <Header />
              <hr/>
            </div>

            <div class="Content">
              <Content />
            </div>

          </div>

      </div>
    );
  }
}



export default App;
