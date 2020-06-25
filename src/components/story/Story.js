import React from 'react';
import "./Story.css";
import * as Constants from "../../utils/constants"

class Story extends React.Component{
  constructor(props) {
     super(props);
     this.state = {bias: 3, value:0, fontSize: Constants.TITLE_FONT_SIZES[this.props.size]};
   }


    render() {
        return (
          <div class="story-wrapper">

          {this.props.hideImage ? null :
            <div class="story-image">
              <img src={this.props.data.imageURL} />
            </div>
          }


            <div class="story-title" style={{fontSize:this.state.fontSize}}>
              {this.props.data.title}
              
            </div>

            <div class="story-desc" style={{fontSize:Constants.DESC_FONT_SIZE}}>
              {this.props.data.desc}
            </div>
          </div>
        )
    }

}

export default Story;
