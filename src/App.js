import React, { useState, useEffect } from 'react';
import {BiasSlider, SearchBox, Story} from "./components"
import * as Constants from "./constants.js"
import * as Credentials from "./credentials.js"
import './App.css';

const rows = [0,2,4]
// <Story key={index} article={article}/>
function App() {
  const [sources, setSources] = useState(["cnn.com"]);
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState([]);

  const sourceUpdateHandler = (sourceFromSlider) => {
    console.log(sourceFromSlider);
    if(sourceFromSlider.join(',') !== sources.join(',')){
        setSources(sourceFromSlider)
    }
  }

  const searchUpdateHandler = (searchFromBox) => {
    if(searchFromBox !== search){
      setSearch(searchFromBox)
    }
  }

  // Only update if sources have changed
  useEffect(
    () => {
      getNews().then(data => {
        console.log(data.articles);
        setArticles(data.articles)
      });
    },[sources, search]
  );

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
    margin: "auto",
    paddingTop:"16px",
    maxWidth:"100%"
    };

  const darkHR ={
    width:"100%",
    backgroundColor:"#000000",
    height: "1px"
  }

  const lightHR = {
    width:"100%",
    backgroundColor:"#dfe1e5",
    height: "1px"
  }



  return (
      <div style={wrapper}>
        <h1 style={{fontSize:"5rem", width:"34.75rem",textAlign:"center"}}>
          Their News
        </h1>
        <hr style={darkHR}/>
        <div class="components">
          <h3 style={{fontSize: "2.5rem", textAlign:"center"}}>
            Your polictical compass
          </h3>
          <BiasSlider updateSources={sourceUpdateHandler}/>
          <SearchBox updateSearch={searchUpdateHandler}/>
        </div>
        <hr style={lightHR}/>

        <div id="parent">
          {articles.map((article, index) =>
            <div class="child">
              <Story key={index} article={article}/>
            </div>
          )}


        </div>
      </div>
    );

}



export default App;
