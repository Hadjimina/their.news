import React from 'react';
import "./Content.css";
import Story from "../story/Story"
import Parser from "rss-parser"
import * as Constants from "../../utils/constants"
import Helpers from "../../utils/helpers"

class Content extends React.Component{

  constructor(props) {
     super(props);
     this.stories = []
     this.state = {
       currentTime : new Date().toLocaleString(),
       searchKeyword:this.props.searchKeyword,
       sliderVal:this.props.sliderVal,
     }
   }

  async componentDidUpdate(nextProps) {
     console.log("update");
     var sites = this.getSitesfromSliderValue(this.props.sliderVal)
     var storyArray = await Helpers.getStoriesContent("",sites)
     this.stories = storyArray
  }

   getSitesfromSliderValue(value){
     var sitesFromValue = {}
     var minIndex, minDistance;

     //get sites with +_0.5
     Object.keys(Constants.RSS).map((site, index)=>{
       var currentSite = Constants.RSS[site]
       var distance = Math.abs(currentSite.about.bias-value/Constants.ADFONTES_TO_PRETTO_FACTOR )

       //apply bias window
       if((value-Constants.BIAS_WINDOW_SIZE/2)/Constants.ADFONTES_TO_PRETTO_FACTOR <= currentSite.about.bias
            && currentSite.about.bias <= (value+Constants.BIAS_WINDOW_SIZE/2)/Constants.ADFONTES_TO_PRETTO_FACTOR){
         sitesFromValue[site] = currentSite

       }else if(minDistance == null || distance < minDistance){
         minIndex = index
         minDistance = distance
       }
     })

     //get min distance if no element in bias window
     if(Object.keys(sitesFromValue).length == 0){
       var minDistanceSite = Object.keys(Constants.RSS)[minIndex];
       sitesFromValue[minDistanceSite] = Constants.RSS[minDistanceSite]
     }

     return sitesFromValue
   }






    render() {

      const HorizontalLine = <hr style={{width:"100%", marginLeft:"8px", marginRight:"8px", color:"black", opacity:"100%"}}/>
      const VerticalLine = <hr style={{marginTop:"8px", marginBottom:"8px", opacity:"100%", width:"1px",color:"black",}}/>



        return (this.stories.length === 0  ? <div class="lds-ripple"><div></div><div></div></div> :
            <div class="content-wrapper">

            <div class="content-row-0">
              <div class="content-row-0-main">
                {/*MAIN STORY HERE*/}
                { this.stories.length > 0 && <Story data={this.stories[0]} size={2} hideImage />}
              </div>
              {this.stories.length > 1 && VerticalLine }

              <div class="content-row-0-column">
                <div class="content-row-0-column-0">
                  {/*Secondary STORY HERE*/}
                  { this.stories.length > 1 && <Story data={this.stories[1]} size={1} hideImage/>}
                </div>
                {this.stories.length > 2 && HorizontalLine}
                <div class="content-row-0-column-1">
                  {/*Secondary STORY HERE*/}
                  { this.stories.length > 2 && <Story data={this.stories[2]} size={1} hideImage/>}
                </div>
              </div>

            </div>
            {this.stories.length > 3 && HorizontalLine}

            <div class="content-row-1">
              <div class="content-row-1-0">
                {/*Secondary STORY HERE*/}
                { this.stories.length > 3 && <Story data={this.stories[3]} size={1} hideImage/>}
              </div>
              {this.stories.length > 4 && VerticalLine }
              <div class="content-row-1-1">
                {/*Secondary STORY HERE*/}
                { this.stories.length > 4 && <Story data={this.stories[4]} size={1} hideImage/>}
              </div>
              {this.stories.length > 5 && VerticalLine }
              <div class="content-row-1-2">
                {/*Secondary STORY HERE*/}
                { this.stories.length > 5 && <Story data={this.stories[5]} size={1} hideImage/>}
              </div>
            </div>
            {this.stories.length > 6 && HorizontalLine}

            <div class="content-row-2">
              <div class="content-row-2-0">
                {/*Secondary STORY HERE*/}
                { this.stories.length > 6 && <Story data={this.stories[6]} size={1} hideImage/>}
              </div>
              {this.stories.length > 7 && VerticalLine }
              <div class="content-row-2-1">
                {/*Secondary STORY HERE*/}
                { this.stories.length > 7 &&  <Story data={this.stories[7]} size={1} hideImage/>}
              </div>
              {this.stories.length > 8 && VerticalLine }
              <div class="content-row-1-column">
                <div class="content-row-1-column-0">
                  {/*Tertiary STORY HERE*/}
                  { this.stories.length > 8 &&  <Story data={this.stories[8]} size={0} hideImage/>}
                </div>
                {this.stories.length > 9 && HorizontalLine}
                <div class="content-row-1-column-1">
                  {/*Tertiary STORY HERE*/}
                  { this.stories.length > 9 && <Story data={this.stories[9]} size={0} hideImage/>}
                </div>
              </div>
            </div>

            </div>
        )
    }

}

export default Content;
