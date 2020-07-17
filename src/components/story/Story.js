import React from 'react';
import "./Story.css";
import * as Constants from "../../utils/constants"

class Story extends React.Component{
  constructor(props) {
     super(props);
     this.state = {bias: 3, value:0, fontSize: Constants.TITLE_FONT_SIZES[this.props.size], imageURL:""};
     //imageURL



   }

   componentDidUpdate(prevProps) {

      /*  if( this.props.size > 0 && prevProps.data.link !== this.props.data.link){
          const url = "http://localhost:8080/api"
          const requestObject = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"url":this.props.data.link})
          }

            fetch(url,requestObject).then((resposne)=>resposne.json()).then((data)=>{
              if("return" in data &&
                (data["return"].includes(".jpg")||data["return"].includes(".png"))  &&
                (this.props.size > 1 ? true : !!(Math.random() >= 0.5))){
                console.log(data["return"]);
                this.setState({imageURL:data["return"]})
              }
            })
        }*/
      }



    render() {
        return (
          <div class="story-wrapper" onClick={()=>{window.open(this.props.data.link, "_blank")}}
                style={{flexDirection: this.state.imageURL !="" ?  "row":"column"}}>

          {this.state.imageURL =="" ? null:

              <img src={this.props.data.imageURL} class="story-image" alt={"dummy alt"} />

          }

          <div class="story-content-wrapper">
              <div class="story-title"
                style={{
                  fontSize:this.state.fontSize,
                  lineHeight: (20+this.props.size*4)+"px",
                  maxHeight: ((20+this.props.size*4)*2)+"px" }}>
                {this.props.data.title}

              </div>

              <div class="story-desc" style={{fontSize:Constants.DESC_FONT_SIZE}}>
                {this.props.data.desc}
              </div>

              <div class="story-site-tag">
                <a href={this.props.data.site.link} class="story-site-tag-href">{this.props.data.site.name}</a>
              </div>
            </div>
          </div>
        )
    }

}

export default Story;
