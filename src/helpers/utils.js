import * as Constants from "./constants.js"

function getSourcesByBias(sources){

  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.bias]: x})));
  return dictionary
}

function getSourceTitleByURL(sources){
  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.link]: x.name})));
  return dictionary
}

function getClosestSources(n=1, value, country){
  const sourceByBias = getSourcesByBias(getSources(country))
  const keys = Object.keys(sourceByBias)
  const biasDistances = keys.map(x=>Math.abs(value-x))
  var sourcesByDistance = biasDistances.map((k, i) =>
    (
      [k,  sourceByBias[keys[i]]]
    ))
  sourcesByDistance.sort((a,b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0));
  sourcesByDistance = sourcesByDistance.map(x=>x[1].link)
  return sourcesByDistance.slice(0,n)
}

function getSources(country){
  if (country === "US"){
    return Constants.US_Sources
  }else if(country === "CH"){
    return Constants.CH_Sources
  }
}

function getTopics(country){
  if (country === "US"){
    return Constants.US_Topics
  }else if(country === "CH"){
    return Constants.CH_Topics
  }
}

function getRandomTopic(country){
  var topics = this.getTopics(country);
  var randomTopic = topics[Math.floor(Math.random() * topics.length)];
  return randomTopic
}

function LevenshteinDistance(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  console.log("comparing")
  console.log(a)
  console.log(b)
  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
      } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                          matrix[i-1][j] + 1)); // deletion
      }
      }
  }
  return matrix[b.length][a.length];
};

function JaroWrinker(s1, s2) {

  var m = 0;

  // Exit early if either are empty.
  if ( s1.length === 0 || s2.length === 0 ) {
      return 0;
  }

  // Exit early if they're an exact match.
  if ( s1 === s2 ) {
      return 1;
  }

  var range     = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1,
      s1Matches = new Array(s1.length),
      s2Matches = new Array(s2.length);

  for (var i = 0; i < s1.length; i++ ) {
      var low  = (i >= range) ? i - range : 0,
          high = (i + range <= s2.length) ? (i + range) : (s2.length - 1);

      for (var j = low; j <= high; j++ ) {
      if ( s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j] ) {
          ++m;
          s1Matches[i] = s2Matches[j] = true;
          break;
      }
      }
  }

  // Exit early if no matches were found.
  if ( m === 0 ) {
      return 0;
  }

  // Count the transpositions.
  var k = 0
  var n_trans = 0;

  for ( i = 0; i < s1.length; i++ ) {
      if ( s1Matches[i] === true ) {
      for ( j = k; j < s2.length; j++ ) {
          if ( s2Matches[j] === true ) {
          k = j + 1;
          break;
          }
      }

      if ( s1[i] !== s2[j] ) {
          ++n_trans;
      }
      }
  }

  var weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3,
      l      = 0,
      p      = 0.1;

  if ( weight > 0.7 ) {
      while ( s1[l] === s2[l] && l < 4 ) {
      ++l;
      }

      weight = weight + l * p * (1 - weight);
  }

  
  return weight;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export {getSourcesByBias, getSourceTitleByURL, getClosestSources, getSources, getTopics, getRandomTopic,
   LevenshteinDistance, JaroWrinker, shuffleArray}
