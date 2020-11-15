import React, { useState, useEffect } from 'react';
import {BiasSlider, SearchBox, Story} from "./components"
import * as Constants from "./constants.js"
import './App.css';
import ReactGA from 'react-ga';


const rows = [0,2,4]
const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

// <Story key={index} article={article}/>
function App() {
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState([]);
  const [mobile, setMobile] = useState(getWidth()<800);

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


  useEffect(() => {
      let timeoutId = null;
      const resizeListener = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setMobile(getWidth()<800), 0);
      };
      // set resize listener
      window.addEventListener('resize', resizeListener);

      getNews().then(data => {
        console.log(data);
        setArticles(data.articles)
      });


      return () => {
        window.removeEventListener('resize', resizeListener);
      }
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
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      	"x-rapidapi-host": "newscatcher.p.rapidapi.com",
      	"x-rapidapi-key": process.env.REACT_APP_API_KEY,
      	"useQueryString": true
      }
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
    ReactGA.pageview('/');
  }
  initializeReactGA();

  const wrapper = {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    width:"80rem",
    margin: "auto",
    paddingTop:"16px",
    maxWidth:"100%",

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
        <h1 style={{fontSize:"5rem", textAlign:"center"}}>
          Their News
        </h1>
        <hr style={darkHR}/>
        <div className ="components">
          <h3 style={{fontSize: "2.5rem", textAlign:"center"}}>
            Your polictical compass
          </h3>
          <BiasSlider mobile={mobile} updateSources={sourceUpdateHandler}/>
          <SearchBox mobile={mobile} updateSearch={searchUpdateHandler}/>
        </div>
        <hr style={lightHR}/>

        <div id="parent">
          {articles.map((article, index) =>
            <div key={index} style={
              mobile ? {flex: index==0 ? "2 0 100%" : "1 0 100%"} : {flex: index==0 ? "2 0 62%" : "1 0 31%" }}>
              <Story key={index} article={article} index={index}
                  showImage={!(index == 1 || index == Math.floor(Math.random() * 3) + 2 )}
                  minor={index !=0}
                  mobile={mobile}/>
            </div>
          )}


        </div>
      </div>
    );

}



export default App;
