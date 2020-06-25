import React from 'react';
import "./Content.css";
import Story from "../story/Story"

class Content extends React.Component{
  state = {
    currentTime : new Date().toLocaleString(),
  }

    render() {
      const stories = [
        {title: "Some title",
        desc:"In the South Bronx, the coronavirus had a devastating impact on an already vulnerable population. Residents of public housing didn’t wait for the city to help.",
        imageURL:"https://static01.nyt.com/images/2020/06/18/nyregion/00nycha-promo-hp-image/00nycha-promo-hp-image-threeByTwoMediumAt2X.jpg?quality=75&auto=webp&disable=upscale"},
        {title: "Some title",
        desc:"In the South Bronx, the coronavirus had a devastating impact on an already vulnerable population. Residents of public housing didn’t wait for the city to help.",
        imageURL:"https://static01.nyt.com/images/2020/06/18/nyregion/00nycha-promo-hp-image/00nycha-promo-hp-image-threeByTwoMediumAt2X.jpg?quality=75&auto=webp&disable=upscale"},
        {title: "Some title",
        desc:"In the South Bronx, the coronavirus had a devastating impact on an already vulnerable population. Residents of public housing didn’t wait for the city to help.",
        imageURL:"https://static01.nyt.com/images/2020/06/18/nyregion/00nycha-promo-hp-image/00nycha-promo-hp-image-threeByTwoMediumAt2X.jpg?quality=75&auto=webp&disable=upscale"},
        {title: "Some title",
        desc:"In the South Bronx, the coronavirus had a devastating impact on an already vulnerable population. Residents of public housing didn’t wait for the city to help.",
        imageURL:"https://static01.nyt.com/images/2020/06/18/nyregion/00nycha-promo-hp-image/00nycha-promo-hp-image-threeByTwoMediumAt2X.jpg?quality=75&auto=webp&disable=upscale"},
        {title: "Some title",
        desc:"In the South Bronx, the coronavirus had a devastating impact on an already vulnerable population. Residents of public housing didn’t wait for the city to help.",
        imageURL:"https://static01.nyt.com/images/2020/06/18/nyregion/00nycha-promo-hp-image/00nycha-promo-hp-image-threeByTwoMediumAt2X.jpg?quality=75&auto=webp&disable=upscale"},
        {title: "Some title",
        desc:"In the South Bronx, the coronavirus had a devastating impact on an already vulnerable population. Residents of public housing didn’t wait for the city to help.",
        imageURL:"https://static01.nyt.com/images/2020/06/18/nyregion/00nycha-promo-hp-image/00nycha-promo-hp-image-threeByTwoMediumAt2X.jpg?quality=75&auto=webp&disable=upscale"},
      ]

      const HorizontalLine = <hr style={{width:"100%", marginLeft:"8px", marginRight:"8px", opacity:"10%"}}/>
      const VerticalLine = <hr style={{marginTop:"8px", marginBottom:"8px", opacity:"10%"}}/>

        return (
            <div class="content-wrapper">
            {/*{stories.map(story => (
                <Story data={stories[0]} size={2}/>
            ))}*/}

            <div class="content-row-0">
              <div class="content-row-0-main">
                {/*MAIN STORY HERE*/}
                <Story data={stories[0]} size={2} hideImage />
              </div>
              {VerticalLine }

              <div class="content-row-0-column">
                <div class="content-row-0-column-0">
                  {/*Secondary STORY HERE*/}
                  <Story data={stories[0]} size={1} hideImage/>
                </div>
                {HorizontalLine}
                <div class="content-row-0-column-1">
                  {/*Secondary STORY HERE*/}
                  <Story data={stories[0]} size={1} hideImage/>
                </div>
              </div>

            </div>
            {HorizontalLine}

            <div class="content-row-1">
              <div class="content-row-1-0">
                {/*Secondary STORY HERE*/}
                <Story data={stories[0]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-1-1">
                {/*Secondary STORY HERE*/}
                <Story data={stories[0]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-1-2">
                {/*Secondary STORY HERE*/}
                <Story data={stories[0]} size={1} hideImage/>
              </div>
            </div>
            {HorizontalLine}

            <div class="content-row-2">
              <div class="content-row-2-0">
                {/*Secondary STORY HERE*/}
                <Story data={stories[0]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-2-1">
                {/*Secondary STORY HERE*/}
                <Story data={stories[0]} size={1} hideImage/>
              </div>
              {VerticalLine }
              <div class="content-row-1-column">
                <div class="content-row-1-column-0">
                  {/*Tertiary STORY HERE*/}
                  <Story data={stories[0]} size={0} hideImage/>
                </div>
                {HorizontalLine}
                <div class="content-row-1-column-1">
                  {/*Tertiary STORY HERE*/}
                  <Story data={stories[0]} size={0} hideImage/>
                </div>
              </div>
            </div>

            </div>
        )
    }

}

export default Content;
