function getSourcesByBias(sources){
  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.bias]: x})));
  return dictionary
}

function getSourceTitleByURL(sources){
  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.link]: x.name})));
  return dictionary
}


export {getSourcesByBias, getSourceTitleByURL}
