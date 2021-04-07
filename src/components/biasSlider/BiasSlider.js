import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { utils } from '../../helpers';
import './BiasSlider.css';

import * as Constants from "../../helpers/constants.js";
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const { Handle } = Slider;


const BiasSlider = forwardRef((props, ref) =>{
  const [value, setValue] = useState(42);
  const [marks, setMarks] = useState({})
  const [markLabels, setMarkLables] = useState({})  
  
  useEffect(()=>{
    //Update marks on first Search or if marks is empty and outletDots contain something 
    
    if(props.firstSearch || (Object.keys(marks).length === 0 && Object.keys(props.outletDots).length>0)){
      var newMarks = Object.values(props.outletDots).reduce((o, k, i) => ({...o, [k+42]: ""}), {})
        
      // merge closely together marks
      // WHAT HAPPENS FOR CHAINS?
      var keys = Object.keys(newMarks)
      var keysToRemove = []
      
      for (let i = 0; i < keys.length; i++) {
        var window = props.mobile ? Constants.Sources_window_mobile : Constants.Sources_window
        if(Math.abs(keys[i+1]-keys[i])< window){
          keysToRemove.push(keys[i])
        }
      }
      for( var key of keysToRemove){
        delete newMarks[key];
      }
    
      setMarks(newMarks)
      setMarkLables(Object.keys(props.outletDots))
      
  
    }
    
    //Set extreme Bias if flag is set

    
  },[props.firstSearch, props.outletDots])
  

  const updateSources = () => {

    props.sliderLoading(true)
    
    //var x = value ? value:v
    
    //var sources = utils.getClosestSources(i, value-42, props.country)
    var window = props.mobile ? Constants.Sources_window_mobile : Constants.Sources_window
    var sourcesObject = utils.getSourcesInWindow(value-42, props.country, window)
    var sources = sourcesObject.map(x=>x[1].link)

    props.updateSources(sources)
  }

  //useImperativeHandle used to call setExtremePosition from parent componenet
  useImperativeHandle(ref, () => ({
    getSliderPosition(){
      return value
    }
  }));

  useEffect(updateSources,[]);
  /* 
  const sliderLabels = props.mobile?(
    props.country === "US"?[" ", "Left", " ", " ",  "Right", " "]:["Links", " ", " ","Rechts"]):
   (props.country === "US"?["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]: ["Links", "Leicht Links", "Leicht Rechts",
   "Rechts"]) */

  const sliderLabels = props.mobile?[" ", "Left", " ", " ",  "Right", " "]:["Extreme Left", "Left", "Skews Left", "Skews Right","Right", "Extreme Right"]

  const trackStyle=props.mobile ? {backgroundColor:Constants.Light_grey, height: "0.8em", marginTop:"0.3em"}:
                          {backgroundColor:Constants.Light_grey, height: "0.5em", marginTop:"0.3em"}
  const dotStyle=props.mobile ? {backgroundColor:"white", borderColor:Constants.Light_grey, height:"1.5em",width:"1.5em", marginBottom:"-1em", marginLeft:"-0.75em"}:
                          {backgroundColor:"white", borderColor:Constants.Light_grey, height:"1.5em",width:"1.5em", marginBottom:"-1em", marginLeft:"-0.75em"}
  const handleStyle=props.mobile?{backgroundColor:"black", borderColor:"black", marginLeft:"0.375em", height:"2em", width:"2em"}: 
                          {backgroundColor:"black", borderColor:"black", marginLeft:"0.25em", height:"2em", width:"2em"}


  const handle = (pr) => {
    const { value, dragging, index, ...restProps } = pr;
    
    //we hide the tootltip on mobile
    return  props.mobile ? <Handle value={value} {...restProps} /> 
              : (<SliderTooltip
                  prefixCls="rc-slider-tooltip"
                  overlay={()=>{
                    var window = props.mobile ? Constants.Sources_window_mobile : Constants.Sources_window
                    var sources = utils.getSourcesInWindow(value-42,"US",window)
                              .filter(x=>markLabels.includes(x[1].link))
          
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
    <div style={{width:"120%", backgroundColor:"transparent", marginTop:"0.5em", marginBottom:"0.5em", marginLeft:"-10%"}}>
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
        trackStyle ={trackStyle}
        railStyle={trackStyle}
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
