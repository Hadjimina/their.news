import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers';
import './BiasSlider.css';

function BiasSlider(props) {
  const [value, setValue] = useState(props.initialValue);

  const updateValue = (e) =>{
    setValue(e.target.value)
  }

  const updateSources = () => {
    var i = 5
    console.log("valueee", value);
    var sources = utils.getClosestSources(i, value, props.country)

    while (sources == null) {
      i+=1
      sources = utils.getClosestSources(i, value, props.country)
    }
   props.updateSources(sources)
  }



  useEffect(updateSources,[]);

  const sliderLabels = props.mobile?[" ", "Left", " ", " ",
   "Right", " "]:["Extreme Left", "Left", "Skews Left", "Skews Right",
   "Right", "Extreme Right"]


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

    </div>
  );
}

export default BiasSlider;
