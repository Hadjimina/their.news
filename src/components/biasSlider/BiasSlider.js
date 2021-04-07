import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { utils } from '../../helpers';
import './BiasSlider.css';

import * as Constants from "../../helpers/constants.js";
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;


const BiasSlider = forwardRef((props, ref) =>{
  const [value, setValue] = useState(42);
  const [marks, setMarks] = useState({})  
  const [extrBiasFlag, setExtrBiasFlag] = useState(true)
  
  useEffect(()=>{
    //Update marks on first Search or if marks is empty and outletDots contain something 
    //(this bug happens on first ever search of page visit)
    if(props.firstSearch || (Object.keys(marks).length == 0 && Object.keys(props.outletDots).length>0)){
      var newMarks = Object.values(props.outletDots).reduce((o, k, i) => ({...o, [k+42]: ""}), {})
      
      setMarks(newMarks)
      
      if(extrBiasFlag && Object.keys(newMarks).length >0){
        var markValues = Object.keys(newMarks)
        markValues.sort(function(a, b){return a - b});
        var window = Math.floor(Math.random() * 3)
        if(0.5 > Math.random()){
          //Set slider to highest value
          setValue(markValues[markValues.length-1-window])
        }else{
          //Set slider to lowest value
          setValue(markValues[window])
        }
        setExtrBiasFlag(false)
      }
    }
    
    //Set extreme Bias if flag is set

    
  },[extrBiasFlag,  props.firstSearch, props.outletDots])
  

  const updateSources = () => {
    var i = 5
    //var sources = utils.getClosestSources(i, value-42, props.country)
    var sources = utils.getSourcesInWindow(value-42, props.country, Constants.Sources_window)
    if(false){
      console.log("4. Closes sources ("+sources.length+")")
      console.log(sources)
    }
    
    props.updateSources(sources)
  }

  //useImperativeHandle used to call setExtremePosition from parent componenet
  useImperativeHandle(ref, () => ({
    setExtremePosition(){
      setExtrBiasFlag(true)
      /* var window = Math.floor(Math.random() * 20)
      //Left or right?
      if(Math.random() < 0.5){
        //Left
        setValue(0+window)
      }else{
        setValue(84-window)
      }
      updateSources() */
    }
  }));

  useEffect(updateSources,[]);
  /* 
  const sliderLabels = props.mobile?(
    props.country === "US"?[" ", "Left", " ", " ",  "Right", " "]:["Links", " ", " ","Rechts"]):
   (props.country === "US"?["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]: ["Links", "Leicht Links", "Leicht Rechts",
   "Rechts"]) */

  const sliderLabels = props.mobile?[" ", "Left", " ", " ",  "Right", " "]:["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]

  //TODO resize this for mobile
  const trackStyle={backgroundColor:Constants.Light_grey, height: "0.25em", marginTop:"0.3em"}
  const dotStyle={backgroundColor:"white", borderColor:Constants.Light_grey, height:"1em",width:"1em", marginBottom:"-0.52em", marginLeft:"-0.25em"}
  const handleStyle={backgroundColor:"black", borderColor:"black", marginLeft:"0.25em", height:"1.5em", width:"1.5em"}


  const handle = (pr) => {
    const { value, dragging, index, ...restProps } = pr;
    
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={()=>{
          
          var outletDotsLinks = Object.keys(props.outletDots)
          var sources = utils.getSourcesInWindow(value-42,"US", Constants.Sources_window)
                            .filter(x=>outletDotsLinks.includes(x[1].link))
          var sourcesString = sources.map(x=>x[1].name)
          return sourcesString.join(", ")
        }}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };


  return (
    <div style={{width:"100%", backgroundColor:"transparent", marginTop:"0.5em", marginBottom:"0.5em"}}>
      {/*show props.outletDots on the slider with their label in the tooltip*/}
      <Slider 
        min={0} 
        max={84} 
        value={value} 
        handle={handle} 
        marks={marks}
        onChange={setValue} 
        onAfterChange={updateSources} 
        step={null}
        outletDots={props.outletDots}
        minimumTrackStyle={trackStyle}
        maximumTrackStyle={trackStyle}
        //dot style = inner of dots to the right of current value
        dotStyle={dotStyle}
        //avtive dot style = inner of dots to the left of current value
        activeDotStyle={dotStyle}
        handleStyle={[handleStyle]}
        />
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
