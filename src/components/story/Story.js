import React, { useEffect, useState } from "react";
import "./story.css";
import Moment from "react-moment";
import "moment-timezone";
import { utils } from "../../helpers";

function SearchBox(props) {
  const openLink = (link) => {
    window.open(link, "_blank");
  };

  const [fade, setFade] = useState(false);

  const a = props.article.published_date.split(/[^0-9]/);
  const date = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) / 1000;
  const siteTitleFromURL = utils.getSourceTitleByURL(
    utils.getSources(props.country)
  );
  const verticalBorderRight = [0, 2, 3];

  useEffect(() => {
    setFade(true);
  }, [props.article.summary]);

  const clampStyleThree = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
  };

  const clampStyleTen = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 10,
    WebkitBoxPack: "end",
    textOverflow: "ellipsis",
  };

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
      {(props.minor || props.mobile) && (
        <h3 id="title" style={props.mobile ? {} : clampStyleThree}>
          {" "}
          {props.article.title}{" "}
        </h3>
      )}
      <div
        className="textImageWrapper"
        style={
          props.mobile
            ? { flexDirection: "column-reverse" }
            : { flexDirection: "row" }
        }
      >
        <div className="text">
          {!props.minor && !props.mobile && (
            <h3 id="title" style={props.mobile ? {} : clampStyleThree}>
              {" "}
              {props.article.title}{" "}
            </h3>
          )}

          <p id="article" style={props.mobile ? {} : clampStyleTen}>
            {props.article.summary}
          </p>
        </div>

        {props.article.media != null && props.showImage && (
          <div className="fill">
            <img
              src={props.article.media}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                marginBottom: "0.5em",
              }}
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
          {props.article.author &&
          siteTitleFromURL[props.article.clean_url] &&
          props.article.author.length +
            siteTitleFromURL[props.article.clean_url].length <
            25
            ? props.article.author + " / "
            : ""}
          {siteTitleFromURL[props.article.clean_url]}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
