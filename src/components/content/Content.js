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
       searchKeyword:this.props.searchKeyword,
       sliderVal:this.props.sliderVal,
       stories:[]
     }
   }

   async componentDidMount(){
      //var sites = this.getSitesfromSliderValue(this.props.sliderVal)
      var sites = Object.keys(Constants.RSS)
      sites.map((site,index)=>{
          this.getStoryContent(site)
      })

   }

   getDisplayStories(sliderVal){
     //console.log("get display stories");
     //Full refresh
     var storiesToShow = []
     var sitesWithDistance = this.getSitesfromSliderValue(sliderVal)
     var minDistanceSite = null
     var minDistance = Number.MAX_VALUE

     //Check bias window
     for (var site of sitesWithDistance) {
       var distance = site[0]
       if(distance < minDistance){
         minDistance = distance
         minDistanceSite = site
       }

       //console.log(site[1] +" distance "+site[0]+" window "+Constants.BIAS_WINDOW_SIZE/Constants.ADFONTES_TO_PRETTO_FACTOR);
       if(distance <= Constants.BIAS_WINDOW_SIZE/Constants.ADFONTES_TO_PRETTO_FACTOR  ){

        var gotten = sessionStorage.getItem(site[1]+Constants.STORAGE_SITE_SUFFIX)
        if(gotten != null){
            storiesToShow = storiesToShow.concat(JSON.parse(gotten))
        }
       }
     }

     //Nothing in window so get closest
     if(storiesToShow.length === 0){
       console.log("NOTHING IN WINDOW");
       site = minDistanceSite
       gotten = sessionStorage.getItem(site[1]+Constants.STORAGE_SITE_SUFFIX)

       if(gotten != null){
           storiesToShow = storiesToShow.concat(JSON.parse(gotten))
       }else{
         return []
       }
     }
     storiesToShow = storiesToShow.sort((a, b) =>  b.score-a.score ).slice(0,10)

     return storiesToShow
   }

  async getStoryContent(site){
    var gotten = sessionStorage.getItem(site+Constants.STORAGE_SITE_SUFFIX)
    if(gotten){
      this.forceUpdate()
      return
    }

    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    var storyArray = []

    var currentRss = Constants.RSS[site].feed
    let feed = await parser.parseURL(CORS_PROXY + currentRss.feedLink);
    //console.log("SITE************* "+site);
    //  console.log(Helpers.getImagesFromString(JSON.stringify(feed.items)));

    for (var item of feed.items) {

        var story = {title: item[currentRss.title], desc: item[currentRss.desc], link:item[currentRss.link],
                      site:{name:Constants.RSS[site].about.name, link:Constants.RSS[site].about.link}}

        /*let response = await fetch(url, requestObject)

        var data = response.json()
        //console.log(data);
        */

        //Remove HTML
        var temp = document.createElement("div");
        temp.innerHTML = story.desc;
        story.desc = temp.textContent || temp.innerText;

        // score
        story.score = Math.floor(Math.random() * 100);
        story.score += "imageURL" in story ? 500 : 0


        if(Constants.SHOW_STORY_SCORE){
          story.title = story.score +" "+story.title
        }
        storyArray.push(story)
    }

    //Get all image links
    //
    // var storyLinks = storyArray.map((story, index) => { return {url:story.link}})
    //
    // const url = "http://localhost:8080/api"
    // const requestObject = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(storyLinks)
    // }
    //
    // await fetch(url,requestObject).then((resposne)=>resposne.json()).then((data)=>{
    //   if("return" in data && data["return"].length > 0){
    //
    //     for (var i = 0; i < data["return"].length; i++) {
    //       var current = data["return"][i]
    //       if(current != "error")
    //       {
    //         storyArray[i].imageURL = current;
    //       }
    //     }
    //   }
    // })

    sessionStorage.setItem(site+Constants.STORAGE_SITE_SUFFIX,JSON.stringify(storyArray))

    this.forceUpdate()
  }

  getSitesfromSliderValue(value){
     var RSSbyDistance = []

     Object.keys(Constants.RSS).map((site, index )=>{
       RSSbyDistance.push([Math.abs(Constants.RSS[site].about.bias-value/Constants.ADFONTES_TO_PRETTO_FACTOR), Object.keys(Constants.RSS)[index]])
     })
     //RSSbyDistance.sort((a,b)=>(a[0]>b[0])? 1:-1)

     return RSSbyDistance
   }

  render() {

      const HorizontalLine = <hr style={{width:"100%", marginLeft:"8px", marginRight:"8px", color:"black", opacity:"100%"}}/>
      const VerticalLine = <hr style={{marginTop:"0px", marginBottom:"0px", opacity:"100%", width:"4px",color:"black"}}/>

      const stories = this.getDisplayStories(this.props.sliderVal)

      return (stories.length === 0  ? <div class="lds-ripple"><div></div><div></div></div> :
            <div class="content-wrapper">


            <div class="content-row-0">
              <div class="content-row-0-main">
                {/*MAIN STORY HERE*/}
                { stories.length > 0 && <Story data={stories[0]} size={2}  />}
              </div>
              {stories.length > 1 && VerticalLine }

              <div class="content-row-0-column">
                <div class="content-row-0-column-0">
                  {/*Secondary STORY HERE*/}
                  { stories.length > 1 && <Story data={stories[1]} size={1} />}
                </div>
                {stories.length > 2 && HorizontalLine}
                <div class="content-row-0-column-1">
                  {/*Secondary STORY HERE*/}
                  { stories.length > 2 && <Story data={stories[2]} size={1} />}
                </div>
              </div>

            </div>
            {stories.length > 3 && HorizontalLine}

            <div class="content-row-1">
              <div class="content-row-1-0">
                {/*Secondary STORY HERE*/}
                { stories.length > 3 && <Story data={stories[3]} size={1} />}
              </div>
              {stories.length > 4 && VerticalLine }
              <div class="content-row-1-1">
                {/*Secondary STORY HERE*/}
                { stories.length > 4 && <Story data={stories[4]} size={1} />}
              </div>
              {stories.length > 5 && VerticalLine }
              <div class="content-row-1-2">
                {/*Secondary STORY HERE*/}
                { stories.length > 5 && <Story data={stories[5]} size={1} />}
              </div>
            </div>
            {stories.length > 6 && HorizontalLine}

            <div class="content-row-2">
              <div class="content-row-2-0">
                {/*Secondary STORY HERE*/}
                { stories.length > 6 && <Story data={stories[6]} size={1} />}
              </div>
              {stories.length > 7 && VerticalLine }
              <div class="content-row-2-1">
                {/*Secondary STORY HERE*/}
                { stories.length > 7 &&  <Story data={stories[7]} size={1} />}
              </div>
              {stories.length > 8 && VerticalLine }
              <div class="content-row-1-column">
                <div class="content-row-1-column-0">
                  {/*Tertiary STORY HERE*/}
                  { stories.length > 8 &&  <Story data={stories[8]} size={0} />}
                </div>
                {stories.length > 9 && HorizontalLine}
                <div class="content-row-1-column-1">
                  {/*Tertiary STORY HERE*/}
                  { stories.length > 9 && <Story data={stories[9]} size={0} />}
                </div>
              </div>
            </div>

            </div>
        )
    }

}

export default Content;
