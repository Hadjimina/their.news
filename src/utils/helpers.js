import Parser from "rss-parser"
import * as Constants from "../utils/constants"



const helpers = {
  /* occurrences(string, subString, allowOverlapping) {

      string += "";
      subString += "";
      if (subString.length <= 0) return (string.length + 1);

      var n = 0,
          pos = 0,
          step = allowOverlapping ? 1 : subString.length;

      while (true) {
          pos = string.indexOf(subString, pos);
          if (pos >= 0) {
              ++n;
              pos += step;
          } else break;
      }
      return n;
  },*/
  fisherYates( array ){
    var count = array.length, randomnumber, temp;
    while( count ){
      randomnumber = Math.random() * count-- | 0;
      temp = array[count];
      array[count] = array[randomnumber];
      array[randomnumber] = temp
    }
    return array
  },



  async OLDgetStoriesContent(keyword,sites, value){
    console.log("started");
    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    var minScore = 0;

    for (var site in sites) {
         if(localStorage.getItem(site+Constants.STORAGE_SITE_SUFFIX)){
           continue;
         }

         var storyArray = []
         console.log(site);

         var currentRss = sites[site].feed
         let feed = await parser.parseURL(CORS_PROXY + currentRss.feedLink);
         for (var item of feed.items) {


           var story = {title: item[currentRss.title], desc: item[currentRss.desc], link:item[currentRss.link],
                         site:{name:Constants.RSS[site].about.name, link:Constants.RSS[site].about.link}}
           console.log("   "+story.title);
           //Remove HTML
           var temp = document.createElement("div");
           temp.innerHTML = story.desc;
           story.desc = temp.textContent || temp.innerText;

           story.score = Math.floor(Math.random() * 1000);
           if(story.score >= minScore){

             storyArray.push(story)

             if(storyArray.length >= 11){
               storyArray.sort((a, b) => a.score < b.score);
               storyArray.splice(storyArray.length-1, 1);
             }

           }
       }
       localStorage.setItem(site+Constants.STORAGE_SITE_SUFFIX,storyArray)
    }
    console.log("Done");
  }
}
export default helpers;
