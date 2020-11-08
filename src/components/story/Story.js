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

   console.log(props);
  const keyArray=[1,3,5]
  console.log(siteTitleFromURL);
  return (
    <div class="storyWrapper">
      <div class="textImageWrapper" onClick={openArticle}>
        <div class="text">
          <h3 id="title"> {props.article.title} </h3>
          <p id="article">{props.article.summary} </p>
        </div>

        {props.article.media != null  && props.key in keyArray &&
          <div class="fill">
            <img src={props.article.media} style={{objectFit: "contain", maxHeight:"100%"}}alt="html cleaner"/>
          </div>}

      </div>
      <div class="sourceDateWrapper" onClick={openArticle}>
        <div class="details">
          <Moment unix fromNow>{date}</Moment>
        </div>

        <div class="details">
          {props.article.author?props.article.author +" / ":""}{siteTitleFromURL[props.article.clean_url]}
        </div>

      </div>
    </div>
  );
}

export default SearchBox;
