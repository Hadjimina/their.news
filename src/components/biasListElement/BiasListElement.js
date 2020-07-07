import React from 'react';
import "./BiasListElement.css";


class BiasListElement extends React.Component{
/*  constructor(props) {
     super(props);

   }*/

   onClick(){
     this.props.onClick(this.props.id)
   }
//onClick={this.onClick.bind(this)}
    render() {
        return (
          <div class="BiasListElement-wrapper" onClick={this.onClick.bind(this)}>
            <div class="newsIcon"><img alt={this.props.site.name+" logo"}src={this.props.site.logo} height="30"/></div>
            <div class="newsName">{this.props.site.name}</div>
            <div class="newsRadio"><input type="radio"  onChange={()=>{}}checked={this.props.checked}/></div>

          </div>

        )
    }

}

export default BiasListElement;
