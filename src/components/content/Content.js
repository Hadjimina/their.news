import React from 'react';
import "./Content.css";
import Story from "../story/Story"
import Parser from "rss-parser"
import * as Constants from "../../utils/constants"
import Helpers from "../../utils/helpers"

class Content extends React.Component{

  constructor(props) {
     super(props);
     this.state = {
       currentTime : new Date().toLocaleString(),
       searchKeyword:this.props.searchKeyword,
       stories: []
     }
   }

   async componentDidMount(){
     //Keyword search disabled
     var storyArray = await this.getStoriesContent("")
     this.setState({stories:storyArray})
   }


   async getStoriesContent(keyword){
     let parser = new Parser();
     const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

     var storyArray = []
     var minScore = 0;

    await (async (evt, callback) => {

      // Object.keys(Constants.RSS).forEach(async (rssKey, i) => {

        //var currentRss = Constants.RSS[rssKey]
        var currentRss = Constants.RSS.reuters.feed

        let feed = await parser.parseURL(CORS_PROXY + currentRss.feedLink);

        for(let item of feed.items)
        {
        //  console.log(Object.keys(item));
        /*  console.log(item);*/


          var story = {title: item[currentRss.title], desc: item[currentRss.desc], link:item[currentRss.link]}

          //console.log(story);


          //Reuters workaround
        //  if(currentRss == Constants.RSS.reuters || currentRss == Constants.RSS.dailyKos){
            var temp = document.createElement("div");
            temp.innerHTML = story.desc;
            story.desc = temp.textContent || temp.innerText;
          //}


          story.score = this.calculateScore(story, keyword);
          if(story.score >= minScore){

            storyArray.push(story)
            if(storyArray.length >= 11){
              storyArray.sort((a, b) => a.score < b.score);
              storyArray.splice(storyArray.length-1, 1);
            }
          }

      //  });
      }
     })();

     return(storyArray)

   }

   calculateScore(story, keyword){
     if(keyword == ""){
       return Math.floor(Math.random() * 10);
     }

     var titleOccurences = Helpers.occurrences(story.title.toLowerCase(), keyword.toLowerCase(),true)
     var descOccurences = Helpers.occurrences(story.desc.toLowerCase(), keyword.toLowerCase(),true)

     return titleOccurences*2+descOccurences;
   }


    render() {

      const HorizontalLine = <hr style={{width:"100%", marginLeft:"8px", marginRight:"8px", color:"black", opacity:"100%"}}/>
      const VerticalLine = <hr style={{marginTop:"8px", marginBottom:"8px", opacity:"100%", width:"1px",color:"black",}}/>


        return (this.state.stories.length === 0  ? <div class="lds-ripple"><div></div><div></div></div> :
            <div class="content-wrapper">


            <div class="content-row-0">
              <div class="content-row-0-main">
                {/*MAIN STORY HERE*/}
                { this.state.stories.length > 0 && <Story data={this.state.stories[0]} size={2} hideImage />}
              </div>
              {this.state.stories.length > 1 && VerticalLine }

              <div class="content-row-0-column">
                <div class="content-row-0-column-0">
                  {/*Secondary STORY HERE*/}
                  { this.state.stories.length > 1 && <Story data={this.state.stories[1]} size={1} hideImage/>}
                </div>
                {this.state.stories.length > 2 && HorizontalLine}
                <div class="content-row-0-column-1">
                  {/*Secondary STORY HERE*/}
                  { this.state.stories.length > 2 && <Story data={this.state.stories[2]} size={1} hideImage/>}
                </div>
              </div>

            </div>
            {this.state.stories.length > 3 && HorizontalLine}

            <div class="content-row-1">
              <div class="content-row-1-0">
                {/*Secondary STORY HERE*/}
                { this.state.stories.length > 3 && <Story data={this.state.stories[3]} size={1} hideImage/>}
              </div>
              {this.state.stories.length > 4 && VerticalLine }
              <div class="content-row-1-1">
                {/*Secondary STORY HERE*/}
                { this.state.stories.length > 4 && <Story data={this.state.stories[4]} size={1} hideImage/>}
              </div>
              {this.state.stories.length > 5 && VerticalLine }
              <div class="content-row-1-2">
                {/*Secondary STORY HERE*/}
                { this.state.stories.length > 5 && <Story data={this.state.stories[5]} size={1} hideImage/>}
              </div>
            </div>
            {this.state.stories.length > 6 && HorizontalLine}

            <div class="content-row-2">
              <div class="content-row-2-0">
                {/*Secondary STORY HERE*/}
                { this.state.stories.length > 6 && <Story data={this.state.stories[6]} size={1} hideImage/>}
              </div>
              {this.state.stories.length > 7 && VerticalLine }
              <div class="content-row-2-1">
                {/*Secondary STORY HERE*/}
                { this.state.stories.length > 7 &&  <Story data={this.state.stories[7]} size={1} hideImage/>}
              </div>
              {this.state.stories.length > 8 && VerticalLine }
              <div class="content-row-1-column">
                <div class="content-row-1-column-0">
                  {/*Tertiary STORY HERE*/}
                  { this.state.stories.length > 8 &&  <Story data={this.state.stories[8]} size={0} hideImage/>}
                </div>
                {this.state.stories.length > 9 && HorizontalLine}
                <div class="content-row-1-column-1">
                  {/*Tertiary STORY HERE*/}
                  { this.state.stories.length > 9 && <Story data={this.state.stories[9]} size={0} hideImage/>}
                </div>
              </div>
            </div>

            </div>
        )
    }

}

export default Content;
