import React from 'react';
import "./App.css";
import Header from "./components/header/Header"
import Content from "./components/content/Content"
import BiasListElement from "./components/biasListElement/BiasListElement"
import * as Constants from "./utils/constants"
import Helpers from "./utils/helpers"
import Button from 'react-bootstrap/Button';



class App extends React.Component {
  constructor(props) {
    //Fresh news
    localStorage.clear();

     super(props);
     this.state = {
       selectedSites:[],
       biasSelected:false,
       sliderVal:0
     }

     //Setup sites to select
     var arr = []
     var sites = Object.keys(Constants.RSS)
     for (var site of sites) {
         arr.push(Constants.RSS[site].about)
     }
     this.newsSites = Helpers.fisherYates(arr);

   }

  siteSelection(id){
    var currentSelection = this.state.selectedSites
    var index = currentSelection.indexOf(this.newsSites[id])

    if(index >= 0){
      currentSelection.splice(index, 1);
    }else{
      currentSelection.unshift(this.newsSites[id])
    }

    if(currentSelection.length > 3){
      currentSelection.length = 3
    }

    this.setState({selectedSites:currentSelection})
  }

  handleSliderChange(value){
    this.setState({sliderVal: value})

  }

  render(){
    var widthStyle={width: window.screen.width*Constants.PAGE_WIDTH_PERCENTAGE}

    return (
      <div class="App">

          <div class="Main" style={widthStyle}>

            {!this.state.biasSelected &&
              <div class="biasWrapper">
                <div class="biasShrinker">
                <div class="biasTitle">Hi,</div>
                <div class="biasText">Before we can show you todays news from to
                other side of the political spectrum, we need to know which news sites you like the most.
                <br/><br/>
                <p>Please select your three most trusted news sources.</p>
                </div>
                <div class="biasList">
                  {this.newsSites.map((item,index) =>
                    <BiasListElement site={item} id={index} checked={this.state.selectedSites.indexOf(this.newsSites[index])>=0} onClick={this.siteSelection.bind(this)}/>
                  )}
                  <Button variant="secondary" disabled={this.state.selectedSites.length===0} onClick={()=>{this.setState({biasSelected:true})}}>Next</Button>
                </div>
                </div>
              </div>
            }

            {this.state.biasSelected  &&
            <div>
              <div class="Header">
                <Header onSliderChange={this.handleSliderChange.bind(this)} bias={this.state.selectedSites}/>
                <hr/>
              </div>

              <div class="Content">
                <Content sliderVal={this.state.sliderVal}/>
              </div>
            </div>}
          </div>
      </div>
    );
  }
}



export default App;
