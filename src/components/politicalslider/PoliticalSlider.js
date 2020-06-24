import React from 'react';
import "./PoliticalSlider.css";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
  return `${value}°C`;
}

class PoliticalSlider extends React.Component{
  constructor(props) {
     super(props);
     this.state = {bias: 3, value:0};
     this.handleChange = this.handleChange.bind(this);
   }

   handleChange(e,value) {
     // = name => (e, value) =>
    console.log(e.target.id);
  //  this.setState({value: value[1]})
  };


    render() {
        return (

          <div class="slider-complete" >

          <div class="slider-title"> Political Spectrum </div>

          <div class="slider-wrapper">
            <div class="poltical-name">
              Left
            </div>


            <Slider
              value={[this.state.bias,this.state.value]}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={-10}
              max={10}
              valueLabelDisplay="auto"
              onChange={this.handleChange}
              style={{marginLeft:"8px", marginRight:"8px", width:"80%", flex:1}}
              valueLabelDisplay="on"
            />

            {/*<input type="range" min="-10" max="10" value={this.state.value} onChange={this.handleChange} class="slider" id="political-range"/>*/}
            <div class="poltical-name">
              Right
            </div>
          </div>
          </div>

        )
    }

}

export default PoliticalSlider;
