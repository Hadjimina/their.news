import React, { useState, useEffect, useRef } from 'react';
import {BiasSlider, SearchBox, Story} from "./components"
import { utils } from './helpers';
import './App.css';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import {Helmet} from 'react-helmet'


const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

const mobileThreshold = 800;

function App() {
  const countries = ["US", "CH"]
  const countrySelectorRef = useRef();

  const [sources, setSources] = useState();
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState();
  const [mobile, setMobile] = useState(getWidth()<mobileThreshold);
  const [receivedFlag, setReceivedFlage] = useState(false)
  const [country, setCountry] = useState("US")

  const initialValueSlider = Math.floor((Math.random() * 84))-42;
  var topics = utils.getTopics(country)
  const initialValueSearch = topics[Math.floor(Math.random() * topics.length)];


  const sourceUpdateHandler = (sourceFromSlider) => {
    if(!sourceFromSlider || !sources){
      return
    }

    if(sourceFromSlider.join(',') !== sources.join(',')){
        setSources(sourceFromSlider)
    }
  }

  const searchUpdateHandler = (searchFromBox) => {
    if(searchFromBox !== search){
      setSearch(searchFromBox)
    }
  }

  function setCountryAndSources(currentCountry){
    setCountry(currentCountry)
    let sourceAmount = currentCountry == "US" ? 4: 2
    setSources(utils.getClosestSources(sourceAmount,0, currentCountry))

  }

  //onetime only
  useEffect(() => {
    var currentCountry = null;
    fetch('https://extreme-ip-lookup.com/json/')
     .then( res => res.json())
     .then(response => {
       currentCountry = response.countryCode
     })
     .catch((data, status) => {
       //This is very bad...but works
       // if(data === "TypeError: Failed to fetch"){
         currentCountry = "US"
       // }
     }).finally(()=>{
       if (countries.includes(currentCountry)){
         countrySelectorRef.current.updateSelected(currentCountry)
         setCountryAndSources(currentCountry)

       }
     });

     let timeoutId = null;
     const resizeListener = () => {
       clearTimeout(timeoutId);
       timeoutId = setTimeout(() => setMobile(getWidth()<mobileThreshold), 0);
     };
     // set resize listener
     window.addEventListener('resize', resizeListener);


     return () => {
       window.removeEventListener('resize', resizeListener);
     }
   }, []);

  useEffect(() => {

      if (!sources){
        return
      }

      getNews().then(data => {
        
        setArticles(data.articles)
        setReceivedFlage(true)

      });
    },[sources, search, country]
  );

// FIXME: search function is very odd & called multiple times
  async function getNews() {
    console.log("Getting news");
    console.log(sources);
    var url = new URL("https://newscatcher.p.rapidapi.com/v1/search")
    var data = {

      "media": "True",
      "sort_by": "relevancy",
      "page": "1",
      "sources": sources.toString()
    }

    // TODO: set "nothing found" error message

    //Check that search value existst & is not empty
    if(search && search.replace(/\s/g, "") !== ""){
      data = {
        ...data,
        // "lang":"en",
      	"q": search,
      }
    }else{


      data = {
        ...data,
        // "lang":"en",
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
    paddingTop:"1em",
    maxWidth:"100%",
    };

  const darkHR ={
    width:"100%",
    backgroundColor:"#000000",
    height: "0.0625em"
  }

  const lightHR = {
    width:"100%",
    backgroundColor:"#dfe1e5",
    height: "0.0625em"
  }

  const tooManyWrapper = {
    width:"100%",
    textAlign:"center"
  }

  const countrySelection = {

  }
  return (
      <div style={wrapper}>
        <Helmet>
          <title>Their News: Escape your bubble</title>
          <meta name="description" content="Break out of your political bubble by reading news from the entire political spectrum" />
        </Helmet>
        <h1 style={{fontSize:"4rem", textAlign:"center"}}>
          Their News
        </h1>

        <div style={countrySelection}>
          <ReactFlagsSelect
            defaultCountry={country}
            ref={countrySelectorRef}
            countries={countries}
            onSelect={(countryCode)=>{setCountryAndSources(countryCode)}}/>
        </div>

        <h3>🚧 Work in progress 🚧</h3>

        <hr style={darkHR}/>
        <div className ="components">
          <h3 style={{fontSize: "2rem", textAlign:"center"}}>
            {country === "US" ? "Choose a political bias for your news":"Wählen Sie die Orientierung Ihrer Nachrichten"}
          </h3>
          <BiasSlider mobile={mobile} updateSources={sourceUpdateHandler} initialValue={initialValueSlider} country={country}/>
          <SearchBox mobile={mobile} updateSearch={searchUpdateHandler} initialValue={initialValueSearch} country={country}/>
        </div>
        <hr style={lightHR}/>

        <div id="parent">

          {articles && articles.length > 0 && articles.map((article, index) =>
            <div key={index} style={
              mobile ? {flex: index===0 ? "2 0 100%" : "1 0 100%"} : {flex: index===0 ? "2 0 62%" : "1 0 31%" }}>
              <Story key={index} article={article} index={index} country={country}
                  showImage={!(index === 1 || index === Math.floor(Math.random() * 3) + 2 )}
                  minor={index !==0}
                  mobile={mobile}/>
            </div>
          )}
          {!(articles && articles.length > 0)&& receivedFlag &&
            <div style={tooManyWrapper}>
              <FontAwesomeIcon icon={faExclamation} style={{marginBottom:"0.25em", fontSize:"10rem"}}/>
              <h2> {country === "US?"? "Too many requests": "Zu viele Anfragen"} </h2>
              {country === "US?"?
                <p> Unfortuantely there have been to many requests to <strong>Their.news</strong> recently.<br/>
                  This should resolve itself automatically in approximately 1 hour.</p>:
                <p> Leider gab es in letzter Zeit zu viele Anfragen an <strong>Their.news</strong>. <br/>
                  Dies sollte sich in etwa einer Stunde automatisch auflösen.</p>}

            </div>}


        </div>

      </div>
    );

}



export default App;
