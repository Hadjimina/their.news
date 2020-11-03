function getSourcesByBias(sources){
  let dictionary = Object.assign({}, ...sources.map((x) => ({[x.bias]: x})));
  return dictionary
}

export {getSourcesByBias}
