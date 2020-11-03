import React, { useState, useEffect } from 'react';
import {BiasSlider, SearchBox, Story} from "./components"
import * as Constants from "./constants.js"
import * as Credentials from "./credentials.js"

function App() {
  const [sources, setSources] = useState(["cnn.com"]);
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState([{author: null,
clean_url: "cnn.com",
country: "US",
language: "en",
link: "https://www.cnn.com/2020/11/01/europe/abortion-rights-poland-us-slovakia-intl/index.html",
media: "https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-super-tease.jpg",
media_content: "https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-super-169.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-large-11.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-vertical-large-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-video-synd-2.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-live-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-vertical-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-story-body.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-assign.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140434-poland-abortion-protest-1026-hp-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-super-169.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-large-11.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-vertical-large-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-video-synd-2.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-live-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-vertical-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-story-body.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-assign.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201026140731-slovakia-anti-abortion-protest-0922-hp-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-super-169.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-large-11.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-vertical-large-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-video-synd-2.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-live-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-vertical-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-story-body.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-assign.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073637-02-poland-protest-1030-hp-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-super-169.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-large-11.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-vertical-large-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-video-synd-2.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-live-video.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-vertical-gallery.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-story-body.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-t1-main.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-assign.jpg,https://cdn.cnn.com/cnnnext/dam/assets/201031073701-03-poland-protest-1030-hp-video.jpg",
published_date: "2020-11-01 09:07:27",
rank: "57",
rights: "Copyright (c) 2020 Turner Broadcasting System, Inc. All Rights Reserved.",
summary: "Some came from women who had just arrived at hospital to have abortions because of fetal defects -- only to be told to go home after Polands highest court on October 22 imposed a near-total ban on abortion. They are furious and sad and they don't know what to do, Wydrzynska told CNN. They cannot take pills because [their pregnancy is] above 20 weeks so it could be dangerous for them. The likelihood of a woman taking abortion pills needing a further procedure is far greater after 14 weeks, according to the UKs National Health Service.",
title: "In Europe and the US, abortion rights are under renewed threat",
topic: "news"}]);

  const sourceUpdateHandler = (sourceFromSlider) => {
    if(sourceFromSlider.join(',') !== sources.join(',')){
        setSources(sourceFromSlider)
    }
  }

  const searchUpdateHandler = (searchFromBox) => {
    if(searchFromBox !== search){
      setSearch(searchFromBox)
    }
  }

  //Only update if sources have changed
  // useEffect(
  //   () => {
  //     getNews().then(data => {
  //
  //       setArticles(data.articles)
  //     });
  //   },[sources, search]
  // );

  async function getNews() {
    var url = new URL("https://newscatcher.p.rapidapi.com/v1/search")
    var data = {
      "lang": "en",
      "media": "True",
      "sort_by": "relevancy",
      "page": "1",
      "sources": sources.toString()
    }

    //Check that search value existst & is not empty
    if(search && search.replace(/\s/g, "") !== ""){
      data = {
        ...data,
      	"q": search,
      }
    }else{
      data = {
        ...data,
        "q": Constants.featuredTopics[Math.floor(Math.random() * Constants.featuredTopics.length)],
      }
    }

    url.search = new URLSearchParams(data).toString();
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
      	"x-rapidapi-host": "newscatcher.p.rapidapi.com",
      	"x-rapidapi-key": Credentials.key,
      	"useQueryString": true
      }
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const wrapper = {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    width:"80rem",
    margin: "auto"
    };

  return (
      <div style={wrapper}>
        <h1>
          Perspective news
        </h1>
        <hr style={{
          width:"100%",
          backgroundColor:"#000000",
          height: "1px"
        }}/>

        <BiasSlider updateSources={sourceUpdateHandler}/>
        <SearchBox updateSearch={searchUpdateHandler}/>
        <div>
          {articles.map((article, index) => <Story key={index} article={article}/>)}
        </div>
      </div>
    );

}



export default App;
