import React, { useState, useEffect } from 'react';
import {BiasSlider, SearchBox, Story} from "./components"


function App() {
  const [sources, setSources] = useState(["cnn.com"]);
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState([]);

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
  useEffect(
    () => {
      console.log("GETTING");
      getNews().then(data => {
        console.log("News gotten");
        setArticles(data.articles)
      });
    },[sources, search]
  );

  async function getNews() {
    var url = "https://newscatcher.p.rapidapi.com/v1/"
    var data = {
      "lang": "en",
      "media": "True"
    }

    //Check that search value existst & is not empty
    if(search && search.replace(/\s/g, "") !== ""){
      url = new URL(url+"search")
      data = {
        ...data,
      	"sort_by": "relevancy",
      	"page": "1",
      	"q": search,
        "sources": sources.toString()
      }
    }else{
      data = {
        ...data,
        "country":"US"
      }
      url = new URL(url+"latest_headlines")
    }

    url.search = new URLSearchParams(data).toString();
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
      	"x-rapidapi-host": "newscatcher.p.rapidapi.com",
      	"x-rapidapi-key": "59014fc2c7msh3282451031a043bp1d470cjsne3072278335f",
      	"useQueryString": true
      }
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }



  return (
      <div class="App">
        <BiasSlider updateSources={sourceUpdateHandler}/>
        <SearchBox updateSearch={searchUpdateHandler}/>
        <div>
          {articles.map((article, index) => <Story key={index} article={article}/>)}
        </div>
      </div>
    );

}



export default App;
