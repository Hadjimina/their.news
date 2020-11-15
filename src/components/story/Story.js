import React from 'react';
import './story.css';
import Moment from 'react-moment';
import 'moment-timezone';
import * as Constants from "../..//constants.js"
import { utils } from '../../helpers';

function SearchBox(props) {

  const openArticle=()=>{
    window.open(props.article.link, "_blank")
  }

 const date = Date.parse(props.article.published_date)/1000
 const siteTitleFromURL =  utils.getSourceTitleByURL(Constants.sources)
 const verticalBorderRight = [0, 2, 3]

 const clampStyleThree = {
     maxWidth: '100%',
     display: '-webkit-box',
     WebkitBoxOrient: 'vertical',
     WebkitLineClamp: 3,
     overflow: 'hidden',
     textOverflow: 'ellipsis',
   };

   const clampStyleTen = {
       maxWidth: '100%',
       display: '-webkit-box',
       WebkitBoxOrient: 'vertical',
       WebkitLineClamp: 10,
       overflow: 'hidden',
       textOverflow: 'ellipsis',
   };
// TODO: border length
  return (
    <div className="storyWrapper" style={!props.mobile && verticalBorderRight.includes(props.index)? {borderRight: "1px solid #dfe1e5"} :{}}>
      {(props.minor || props.mobile)  &&<h3 id="title" style={ props.mobile ? {} : clampStyleThree}> {props.article.title} </h3>}
      <div className="textImageWrapper" style={props.mobile ? {flexDirection:"column-reverse"}:{flexDirection:"row"} }onClick={openArticle}>

        <div className="text">
          {!props.minor && !props.mobile && <h3 id="title" style={ props.mobile ? {} : clampStyleThree}> {props.article.title} </h3>}
          <p id="article" style={ props.mobile ? {} : clampStyleTen}>{props.article.summary} </p>
        </div>

        {props.article.media != null   && props.showImage &&
        <div className="fill">
          <img src={props.article.media} style={{objectFit: "contain", maxWidth:"100%",maxHeight:"100%", marginBottom:"8px"}}alt="html cleaner"/>
        </div>}



      </div>

      <div className="sourceDateWrapper" onClick={openArticle}>
        <div className="details">
          <Moment unix fromNow>{date}</Moment>
        </div>

        <div className="details">
          {props.article.author && props.article.author.length+siteTitleFromURL[props.article.clean_url].length < 25 ? props.article.author +" / ":""}{siteTitleFromURL[props.article.clean_url]}
        </div>

      </div>
    </div>
  );
}

export default SearchBox;
