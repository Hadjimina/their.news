import * as Constants from "../constants.js"

function getSourcesByBias(sources){
  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.bias]: x})));
  return dictionary
}

function getSourceTitleByURL(sources){
  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.link]: x.name})));
  return dictionary
}


function getClosestSources(n=1, value){
  const sourceByBias = getSourcesByBias(Constants.sources)
  const keys = Object.keys(sourceByBias)
//   console.log("value "+value);
//   console.log("keys");
// console.log(keys);
  const biasDistances = keys.map(x=>Math.abs(value-x))
//   console.log("distance");
// console.log(biasDistances);
  var sourcesByDistance = biasDistances.map((k, i) =>
    (
      [k,  sourceByBias[keys[i]]]
    ))
// console.log(sourcesByDistance);
  sourcesByDistance.sort((a,b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0));
  sourcesByDistance = sourcesByDistance.map(x=>x[1].link)
  return sourcesByDistance.slice(0,n)
}
export {getSourcesByBias, getSourceTitleByURL, getClosestSources}
