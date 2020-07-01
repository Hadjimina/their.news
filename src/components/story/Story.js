import React from 'react';
import "./Story.css";
import * as Constants from "../../utils/constants"

class Story extends React.Component{
  constructor(props) {
     super(props);
     this.state = {bias: 3, value:0, fontSize: Constants.TITLE_FONT_SIZES[this.props.size], imageURL: ""};
   }

   async componentDidMount(){
    /*  fetch(this.props.data.link)
        .then((resp)=>{
          var a = resp.text();
          var list=[];
          for (var i=0,l=a.length;i<l;i++)
          {
              if (/\.(jpg|gif|png|jpeg)$/im.test(a[i].getAttribute('src')))
              {
                  list.push(a[i].getAttribute('src'));
              }
          }
          console.log(list);
        })
        .then((text)=>{
          console.log(text)
        })*/

     }





    render() {
        return (
          <div class="story-wrapper" onClick={()=>{window.open(this.props.data.link, "_blank")}}>

          {this.props.hideImage ? null :
            <div class="story-image">
              <img src={this.state.imageURL} />
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
