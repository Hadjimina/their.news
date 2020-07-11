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
  getImagesFromString(str){
    var m,urls = [],rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    //str = '<img src="http://site.org/one.jpg />\n <img src="http://site.org/two.jpg />',


    while ( m = rex.exec( str ) ) {
      urls.push( m[1] );
    }

    console.log( urls );
    return urls
  }
}
export default helpers;
