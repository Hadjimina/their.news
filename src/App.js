import React, { useState, useEffect, useRef } from 'react';
import {BiasSlider, SearchBox, Story} from "./components"
import * as Constants from "./constants.js"
import { utils } from './helpers';
import './App.css';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

const rows = [0,2,4]
const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

// <Story key={index} article={article}/>
function App() {
  const [sources, setSources] = useState(utils.getClosestSources(3,0));
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState(["srf.ch"]);
  const [mobile, setMobile] = useState(getWidth()<800);
  const [receivedFlag, setReceivedFlage] = useState(false)

  const initialValueSlider = Math.floor((Math.random() * 84))-42;
  const initialValueSearch = Constants.featuredTopics[Math.floor(Math.random() * Constants.featuredTopics.length)];
  const countries = ["US", "CH", "CY"]
  const countrySelectorRef = useRef();

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

  //onetime only
  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/')
     .then( res => res.json())
     .then(response => {
       var country = response.countryCode
       if (countries.includes(country)){
         countrySelectorRef.current.updateSelected(country)
       }
     })
     .catch((data, status) => {
       console.log('Request failed:', data);
     });

     let timeoutId = null;
     const resizeListener = () => {
       clearTimeout(timeoutId);
       timeoutId = setTimeout(() => setMobile(getWidth()<800), 0);
     };
     // set resize listener
     window.addEventListener('resize', resizeListener);


     return () => {
       window.removeEventListener('resize', resizeListener);
     }
   }, []);

  useEffect(() => {
      getNews().then(data => {
        setArticles(data.articles)
        setReceivedFlage(true)
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
        "q": initialValueSearch,
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

  const tooManyWrapper = {
    width:"100%",
    textAlign:"center"
  }

  const countrySelection = {
    
  }
  return (
      <div style={wrapper}>

        <h1 style={{fontSize:"5rem", textAlign:"center"}}>
          Their News
        </h1>
        <div style={countrySelection}>
          <ReactFlagsSelect
            defaultCountry={countries[Math.floor(Math.random() * countries.length)]}
           ref={countrySelectorRef}
           countries={countries} />
        </div>
        <hr style={darkHR}/>
        <div className ="components">
          <h3 style={{fontSize: "2.5rem", textAlign:"center"}}>
            Choose a political bias for your news
          </h3>
          <BiasSlider mobile={mobile} updateSources={sourceUpdateHandler} initialValue={initialValueSlider}/>
          <SearchBox mobile={mobile} updateSearch={searchUpdateHandler} initialValue={initialValueSearch}/>
        </div>
        <hr style={lightHR}/>

        <div id="parent">
          {articles && articles.length > 0&& articles.map((article, index) =>
            <div key={index} style={
              mobile ? {flex: index==0 ? "2 0 100%" : "1 0 100%"} : {flex: index==0 ? "2 0 62%" : "1 0 31%" }}>
              <Story key={index} article={article} index={index}
                  showImage={!(index == 1 || index == Math.floor(Math.random() * 3) + 2 )}
                  minor={index !=0}
                  mobile={mobile}/>
            </div>
          )}
          {!(articles && articles.length > 0)&& receivedFlag&&
            <div style={tooManyWrapper}>
              <FontAwesomeIcon icon={faExclamation} style={{marginBottom:"16px", fontSize:"10rem"}}/>
              <h2> Too many requests </h2>
              <p> Unfortuantely there have been to many requests to <strong>Their.news</strong> recently.<br/>
              This should be fixed in approximately 1 hour.</p>
            </div>}


        </div>

      </div>
    );

}



export default App;
