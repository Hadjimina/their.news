import React from 'react';
import "./PoliticalSlider.css";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const sliderMax = 3
const step = 0.025
const biasDivisor = 0.07


const marks = [
  {
    value: -2.5,
    label: "Most Extreme Left",
  },
  {
    value: -1.5,
    label: "Hyper-Partisan Left",
  },
  {
    value: -0.5,
    label: "Skews Left",
  },
  {
    value: 0,
    label:   "Neutral",
  },
  {
    value: 0.5,
    label:   "Skews Right",
  },
  {
    value: 1.5,
    label:   "Hyper-Partisan Right",
  },
  {
    value: 2.5,
    label:   "Most Extreme Righ",
  }
];

var PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    zIndex:1
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',

  },
  track: {
    height: 8,
    borderRadius: 4,
    zIndex:0,

  },
  rail: {
    height: 8,
    borderRadius: 4,
  },


})(Slider);

const colorGradient =
["#0100fe","#0200fd","#0300fc","#0400fb","#0500fa","#0600f9","#0700f8","#0800f7","#0900f6","#0b00f4","#0c00f3","#0d00f2","#0e00f1","#0f00f0","#1000ef","#1100ee","#1200ed","#1300ec","#1400eb","#1500ea","#1600e9","#1700e8","#1800e7","#1900e6","#1a00e5","#1b00e4","#1c00e3","#1e00e1","#1f00e0","#2000df","#2100de","#2200dd","#2300dc","#2400db","#2500da","#2600d9","#2700d8","#2800d7","#2900d6","#2a00d5","#2b00d4","#2c00d3","#2d00d2","#2e00d1","#2f00d0","#3000cf","#3200cd","#3300cc","#3400cb","#3500ca"
,"#3600c9","#3700c8","#3800c7","#3900c6","#3a00c5","#3b00c4","#3c00c3","#3d00c2","#3e00c1","#3f00c0","#4000bf","#4100be","#4200bd","#4300bc","#4400bb","#4600b9","#4700b8","#4800b7","#4900b6","#4a00b5","#4b00b4","#4c00b3","#4d00b2","#4e00b1","#4f00b0","#5000af","#5100ae","#5200ad","#5300ac","#5400ab","#5500aa","#5600a9","#5700a8","#5900a6","#5a00a5","#5b00a4","#5c00a3","#5d00a2","#5e00a1","#5f00a0","#60009f","#61009e","#62009d","#63009c","#64009b","#65009a","#660099","#670098","#680097","#690096"
,"#6a0095","#6b0094","#6d0092","#6e0091","#6f0090","#70008f","#71008e","#72008d","#73008c","#74008b","#75008a","#760089","#770088","#780087","#790086","#7a0085","#7b0084","#7c0083","#7d0082","#7e0081","#7f0080","#81007e","#82007d","#83007c","#84007b","#85007a","#860079","#870078","#880077","#890076","#8a0075","#8b0074","#8c0073","#8d0072","#8e0071","#8f0070","#90006f","#91006e","#92006d","#94006b","#95006a","#960069","#970068","#980067","#990066","#9a0065","#9b0064","#9c0063","#9d0062","#9e0061"
,"#9f0060","#a0005f","#a1005e","#a2005d","#a3005c","#a4005b","#a5005a","#a60059","#a80057","#a90056","#aa0055","#ab0054","#ac0053","#ad0052","#ae0051","#af0050","#b0004f","#b1004e","#b2004d","#b3004c","#b4004b","#b5004a","#b60049","#b70048","#b80047","#b90046","#bb0044","#bc0043","#bd0042","#be0041","#bf0040","#c0003f","#c1003e","#c2003d","#c3003c","#c4003b","#c5003a","#c60039","#c70038","#c80037","#c90036","#ca0035","#cb0034","#cc0033","#cd0032","#cf0030","#d0002f","#d1002e","#d2002d","#d3002c"
,"#d4002b","#d5002a","#d60029","#d70028","#d80027","#d90026","#da0025","#db0024","#dc0023","#dd0022","#de0021","#df0020","#e0001f","#e1001e","#e3001c","#e4001b","#e5001a","#e60019","#e70018","#e80017","#e90016","#ea0015","#eb0014","#ec0013","#ed0012","#ee0011","#ef0010","#f0000f","#f1000e","#f2000d","#f3000c","#f4000b","#f60009","#f70008","#f80007","#f90006","#fa0005","#fb0004","#fc0003","#fd0002","#fe0001"]



class PoliticalSlider extends React.Component{

  constructor(props) {
     super(props);

     this.state = {
       sliderVal:0,
       politicalBias:this.props.bias.reduce((a,b)=>{return a + b.bias;}, 0)/this.props.bias.length,
       color: colorGradient[Math.round(colorGradient.length/2)],
       newsRange:this.getNewsRange(0)
     };

   }

   getNewsRange(sliderVal){
      return [(sliderVal-0.25)/biasDivisor,(sliderVal+0.25)/biasDivisor]
   }

   handleChange(e,value) {
      //Color
      var colorIndex;
      if(value >= 0){
        colorIndex = this.state.sliderVal/step + 120
      }else {
        colorIndex = 120 + this.state.sliderVal/step
      }

      this.setState({sliderVal: value,
      color: colorGradient[colorIndex],newsRange:this.getNewsRange(value) })

  };




    render() {

        return (

          <div class="slider-complete" >

          <div class="slider-title"> Your Political Compass </div>

          <div class="slider-wrapper">

            <PrettoSlider
              value={this.state.sliderVal}
              valueLabelDisplay="off"
              aria-labelledby="discrete-slider-small-steps"
              defaultValue={0}
              min={-sliderMax}
              max={sliderMax}
              step={step}
              onChange={this.handleChange.bind(this)}
              marks={marks}
              track={false}
              valueLabelFormat ={"Shown Articles"}
              style={{color:this.state.color}}
              />

              <div class= "verticalLine" style={{marginLeft:this.state.politicalBias}}></div>
              <div class="politicalBiasLabel"> Your Bias </div>
            {/*<input type="range" min="-10" max="10" value={this.state.value} onChange={this.handleChange} class="slider" id="political-range"/>*/}
          </div>
          </div>

        )
    }

}

export default PoliticalSlider;
