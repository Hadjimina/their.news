import React, { useEffect, useState } from "react";
import "./Story.css";
import Moment from "react-moment";
import "moment-timezone";
import { utils } from "../../helpers";


function Story(props) {
  const openLink = (link) => {
    window.open(link, "_blank");
  };

  const [fade, setFade] = useState(false);

  const a = props.article.published_date.split(/[^0-9]/);
  const date = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) / 1000;
  const siteTitleFromURL = utils.getSourceTitleByURL(
    utils.getSources(props.country)
  );
  const verticalBorderRight = [0, 2, 3,5,6,7];

  useEffect(() => {
    setFade(true);
  }, [props.article.title]);

/* NOTE: THIS IS SOME OF THE UGLIEST CODE I HAVE EVER WRITTEN. PLEASE DONT JUDGE ME 😢😂 */

  const clampStyleSmall = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 6,
    WebkitBoxPack: "end",
    textOverflow: "ellipsis",
  };

  const clampStyleBig = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 12,
    WebkitBoxPack: "end",
    textOverflow: "ellipsis",
  };

  const clampStyleBigMobile = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 12,
    WebkitBoxPack: "end",
    textOverflow: "ellipsis",

  };

  const imageStyle = {
    objectFit: "contain",
    objectPosition: "top",
    height: props.index === 0? "100%":"8em",
    width:"100%",  
    
}

  return (
    <div
      className={fade ? "storyWrapper fade" : "storyWrapper"}
      onAnimationEnd={() => {
        if (props.article.media == null || !props.showImage) {
          setFade(false);
        }
      }}
      style={
        !props.mobile && verticalBorderRight.includes(props.index)
          ? { borderRight: "0.0625em solid #dfe1e5" }
          : {}
      }
      onClick={() => {
        openLink(props.article.link);
      }}
    >


     
      {/* Show title over entire article */}
      {/*always have space for exactly 3 linesin dexktop*/}
      <h3 id="title" style={props.index > 4 ?{fontSize:"1.2rem"}:{}, !props.mobile?{lineHeight:"2.3ex",height:"6.9ex"}:{}}>
        {props.article.title}
      </h3>
     
      <div
        className="textImageWrapper"
        style={
          props.mobile
            ? { flexDirection: "column-reverse" }
            : props.index > 0? {flexDirection: "column-reverse"}: { flexDirection: "row" }
        }
      >
        <div className="text" style={props.index === 0?{marginRight:"0.5em"}:{}}>
          {/* Show summary in all but last 4 entries */}
          {props.index < 5 &&
          /* show 14 lines if no image & 1<index<5 otw 10  */
            <p id="article" 
              style={props.mobile ? 
                        {clampStyleBigMobile} : 
                        1< props.index&& !props.showImage ? 
                          clampStyleBig: props.index < 2? clampStyleBig: clampStyleSmall}>
            {props.article.summary}
          </p>}
          
        </div>

        {props.article.media != null && props.showImage && (
          <div className="fill" style={{flex:1}}>
            <img
              src={props.article.media}
              style={imageStyle}
              alt="html cleaner"
              onLoad={() => {
                setFade(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="sourceDateWrapper">
        <div className="details">
          <Moment unix fromNow>
            {date}
          </Moment>
        </div>

        <div
          className="details newsoutlet"
          onClick={() => {
            openLink("http://" + props.article.clean_url);
          }}
        >
          
          {siteTitleFromURL[props.article.clean_url]}
          
        </div>
      </div>
    </div>
  );
}

export default Story;
