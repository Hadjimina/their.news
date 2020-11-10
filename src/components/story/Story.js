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

// TODO: border length
  return (
    <div class="storyWrapper" style={!props.mobile && verticalBorderRight.includes(props.index)? {borderRight: "1px solid #dfe1e5"} :{}}>
      {(props.minor || props.mobile)  &&<h3 id="title"> {props.article.title} </h3>}
      <div class="textImageWrapper" onClick={openArticle}>

        <div class="text">
          {!props.minor && !props.mobile && <h3 id="title"> {props.article.title} </h3>}
          <p id="article">{props.article.summary} </p>
        </div>

        {props.article.media != null   && props.showImage&&
        <div class="fill">
          <img src={props.article.media} style={{objectFit: "contain", maxWidth:"100%",maxHeight:"100%"}}alt="html cleaner"/>
        </div>}

        {props.article.media != null   && false&&
          <div class="fill">

          </div>}

      </div>

      <div class="sourceDateWrapper" onClick={openArticle}>
        <div class="details">
          <Moment unix fromNow>{date}</Moment>
        </div>

        <div class="details">
          {props.article.author && props.article.author.length+siteTitleFromURL[props.article.clean_url].length < 25 ? props.article.author +" / ":""}{siteTitleFromURL[props.article.clean_url]}
        </div>

      </div>
    </div>
  );
}

export default SearchBox;
