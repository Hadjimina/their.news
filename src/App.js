import React from 'react';
import "./App.css";
import Header from "./components/header/Header"
import Content from "./components/content/Content"
import * as Constants from "./utils/constants"

class App extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       searchKeyword: ""
     }
   }

  handleChange(keyword){
    this.setState=({searchKeyword:keyword})
  }

  render(){
    var widthStyle={width: window.screen.width*Constants.PAGE_WIDTH_PERCENTAGE}
    return (
      <div class="App">

          <div class="Main" style={widthStyle}>

            <div class="Header">
              <Header onSearchChange={this.handleChange.bind(this)}/>
              <hr/>
            </div>

            <div class="Content">
              <Content searchKeyword={this.state.searchKeyword}/>
            </div>

          </div>

      </div>
    );
  }
}



export default App;
