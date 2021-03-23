import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { utils } from '../../helpers';
import './BiasSlider.css';

import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};


const BiasSlider = forwardRef((props, ref) =>{
  const [value, setValue] = useState(Math.floor((Math.random() * 84))-42);  

  const updateValue = (e) =>{
    setValue(e)
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

  //useImperativeHandle used to call setExtremePosition from parent componenet
  useImperativeHandle(ref, () => ({
    setExtremePosition(){
      var window = Math.floor(Math.random() * 20)
      //Left or right?
      if(Math.random() < 0.5){
        //Left
        setValue(-42+window)
      }else{
        setValue(42-window)
      }
      updateSources()
    }

  }));

  useEffect(updateSources,[]);
  /* 
  const sliderLabels = props.mobile?(
    props.country === "US"?[" ", "Left", " ", " ",  "Right", " "]:["Links", " ", " ","Rechts"]):
   (props.country === "US"?["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]: ["Links", "Leicht Links", "Leicht Rechts",
   "Rechts"]) */

  const sliderLabels = props.mobile?[" ", "Left", " ", " ",  "Right", " "]:["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]


  return (
    <div style={{width:"100%", backgroundColor:"transparent", marginTop:"0.5em", marginBottom:"0.5em"}}>
      {/*show props.outletDots on the slider with their label in the tooltip*/}
      <Slider min={-42} max={42} value={value} handle={handle} onChange={updateValue} onAfterChange={updateSources} />
      <div className ="labels">
        {sliderLabels.map((label, index)=><div key={index}>{label}</div>)}
      </div>
      {/* <input type="range" min={-42} max={42} value={value}
        className="slider"
        onChange = {updateValue}
        onMouseUp = {updateSources}
        onTouchEnd = {updateSources}/> */}

      
      
      {/* DISABLED EXPLANATION */}
      {/*<div style={{textAlign:"center", marginBottom:"0.5em"}}>
        {props.country === "CH"? "Diese Website funktioniert am besten mit  ":  "This website works best on "}
        <strong className="recommendation" onClick={()=>{props.updateCountry("US")}}> {props.country==="CH"? "amerikanischen ": "american "} </strong>
        {props.country === "CH"? "Nachrichten und mit":  "news and with"}
        <strong className="recommendation" onClick={()=>{setExtremePosition()}}> {props.country==="CH"? "extremen ": "extreme "} </strong>
        {props.country === "CH"? " politischen positionen":  " political positions"}
      </div> */}
    </div>
  );
})

export default BiasSlider;
