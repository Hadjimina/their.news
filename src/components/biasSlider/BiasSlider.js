import React, { useState } from 'react';
import * as Constants from "../../constants.js"
import { utils } from '../../helpers';
import './BiasSlider.css';

function BiasSlider(props) {
  const [value, setValue] = useState(0);

  const updateValue = (e) =>{
    setValue(e.target.value)
  }

  const updateSources = () => {
    var i = 5
    var sources = getClosestSources(i)

    while (sources == null) {
      i+=1
      sources = getClosestSources(i)
    }
    props.updateSources(sources)
  }



  const getClosestSources = (n = 1) =>{
    const sourceByBias = utils.getSourcesByBias(Constants.sources)
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

  const sliderLabels = props.mobile?[" ", "Left", " ", " ",
   "Right", " "]:["Extreme Left", "Left", "Skews Left", "Skews Right",
   "Right", "Extreme Right"]

  updateSources();
  return (
    <div style={{width:"100%", backgroundColor:"white", marginTop:"8px", marginBottom:"8px"}}>
      <div className ="labels">
        {sliderLabels.map((label, index)=><div key={index}>{label}</div>)}
      </div>
      <input type="range" min={-42} max={42} value={value}
        className="slider"
        onChange = {updateValue}
        onMouseUp = {updateSources}
        onTouchEnd = {updateSources}/>
      {value}
    </div>
  );
}

export default BiasSlider;
