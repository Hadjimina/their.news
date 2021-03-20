import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers';
import './BiasSlider.css';

function BiasSlider(props) {
  const [value, setValue] = useState(Math.floor((Math.random() * 84))-42);

  const updateValue = (e) =>{
    setValue(e.target.value)
  }

  const updateSources = () => {
    var i = 5
    var sources = utils.getClosestSources(i, value, props.country)

    while (sources == null) {
      i+=1
      sources = utils.getClosestSources(i, value, props.country)
    }
   props.updateSources(sources)
  }

  const setExtremePosition=()=>{
    var window = Math.floor(Math.random() * 12)
    //Left or right?
    if(Math.random() < 0.5){
      //Left
      setValue(-42+window)
    }else{
      setValue(42-window)
    }
    updateSources()
  }

  useEffect(updateSources,[]);
  /* 
  const sliderLabels = props.mobile?(
    props.country === "US"?[" ", "Left", " ", " ",  "Right", " "]:["Links", " ", " ","Rechts"]):
   (props.country === "US"?["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]: ["Links", "Leicht Links", "Leicht Rechts",
   "Rechts"]) */

  const sliderLabels = props.mobile?[" ", "Left", " ", " ",  "Right", " "]:["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]


  return (
    <div style={{width:"100%", backgroundColor:"transparent", marginTop:"0.5em", marginBottom:"0.5em"}}>
      <div className ="labels">
        {sliderLabels.map((label, index)=><div key={index}>{label}</div>)}
      </div>
      <input type="range" min={-42} max={42} value={value}
        className="slider"
        onChange = {updateValue}
        onMouseUp = {updateSources}
        onTouchEnd = {updateSources}/>
      {/* DISABLED EXPLANATION */}
 {/*      <div style={{textAlign:"center", marginBottom:"0.5em"}}>
        {props.country === "CH"? "Diese Website funktioniert am besten mit  ":  "This website works best on "}
        <strong className="recommendation" onClick={()=>{props.updateCountry("US")}}> {props.country==="CH"? "amerikanischen ": "american "} </strong>
        {props.country === "CH"? "Nachrichten und mit":  "news and with"}
        <strong className="recommendation" onClick={()=>{setExtremePosition()}}> {props.country==="CH"? "extremen ": "extreme "} </strong>
        {props.country === "CH"? " politischen positionen":  " political positions"}
      </div> */}
    </div>
  );
}

export default BiasSlider;
