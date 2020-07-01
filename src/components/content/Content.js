import React from 'react';
import "./Content.css";
import Story from "../story/Story"
import Parser from "rss-parser"
import * as Constants from "../../utils/constants"

class Content extends React.Component{

  constructor(props) {
     super(props);
     this.state = {
       currentTime : new Date().toLocaleString(),
       stories: []
     }

     this.getStories("")

   }

   async componentDidMount(){

     var storyArray = await this.getStories("")
     this.setState({stories:storyArray})

   }

   async getStories(keyword){
     let parser = new Parser();
     const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

     var storyArray = []
     var minScore = 0;

    await (async (evt, callback) => {
      var currentRss = Constants.RSS.nyt
       let feed = await parser.parseURL(CORS_PROXY + currentRss.feedLink);

       feed.items.forEach(item => {
         var story = {title: item[currentRss.title], desc: item[currentRss.desc], link:item[currentRss.link]}
         story.score = this.calculateScore(story, keyword);
         if(story.score > minScore){

           storyArray.push(story)
           if(storyArray.length >= 11){
             storyArray.sort((a, b) => a.score > b.score);
             storyArray.splice(storyArray.length-1, 1);
           }
         }

       });
     })();

     return(storyArray)

   }

   calculateScore(story, keyword){
     return Math.floor(Math.random() * 10);
   }


    render() {

      const HorizontalLine = <hr style={{width:"100%", marginLeft:"8px", marginRight:"8px", opacity:"10%"}}/>
      const VerticalLine = <hr style={{marginTop:"8px", marginBottom:"8px", opacity:"10%"}}/>


        return (this.state.stories.length === 0  ? <div class="lds-ripple"><div></div><div></div></div> :
            <div class="content-wrapper">


            <div class="content-row-0">
              <div class="content-row-0-main">
                {/*MAIN STORY HERE*/}
                <Story data={this.state.stories[0]} size={2} hideImage />
              </div>
              {VerticalLine }

              <div class="content-row-0-column">
                <div class="content-row-0-column-0">
                  {/*Secondary STORY HERE*/}
                  <Story data={this.state.stories[1]} size={1} hideImage/>
                </div>
                {HorizontalLine}
                <div class="content-row-0-column-1">
                  {/*Secondary STORY HERE*/}
                  <Story data={this.state.stories[2]} size={1} hideImage/>
                </div>
              </div>

            </div>
            {HorizontalLine}

            <div class="content-row-1">
              <div class="content-row-1-0">
                {/*Secondary STORY HERE*/}
                <Story data={this.state.stories[3]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-1-1">
                {/*Secondary STORY HERE*/}
                <Story data={this.state.stories[4]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-1-2">
                {/*Secondary STORY HERE*/}
                <Story data={this.state.stories[5]} size={1} hideImage/>
              </div>
            </div>
            {HorizontalLine}

            <div class="content-row-2">
              <div class="content-row-2-0">
                {/*Secondary STORY HERE*/}
                <Story data={this.state.stories[6]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-2-1">
                {/*Secondary STORY HERE*/}
                <Story data={this.state.stories[7]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-1-column">
                <div class="content-row-1-column-0">
                  {/*Tertiary STORY HERE*/}
                  <Story data={this.state.stories[8]} size={0} hideImage/>
                </div>
                {HorizontalLine}
                <div class="content-row-1-column-1">
                  {/*Tertiary STORY HERE*/}
                  <Story data={this.state.stories[9]} size={0} hideImage/>
                </div>
              </div>
            </div>

            </div>
        )
    }

}

export default Content;
