import React, { useState, useEffect, useRef  } from 'react';
import {BiasSlider,  Story} from "./components"
import { utils } from './helpers';
import './App.css';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import {Helmet} from 'react-helmet'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
  const [country, setCountry] = useState("US")
  const [tempSearch, setTempSearch] = useState()
  const [requestFloodFlag, setRequestFloodFlag ] = useState(false)
  const [imagesToShow, setImagesToShow] = useState([])
  const [searchedFlag, setSearchedFlag] = useState(false)

  const sourceUpdateHandler = (sourceFromSlider) => {
    if(!sourceFromSlider || !sources){
      return
    }

    if(sourceFromSlider.join(',') !== sources.join(',')){
        setSources(sourceFromSlider)
    }
  }


  const updateSearch = (e) => {

    if (e.key === 'Enter') {
      setSearch(tempSearch)
    }
  }

  const changeSearch = (e) =>{

    setTempSearch(e.target.value)
  }



  function setCountryAndSources(currentCountry){
    setCountry(currentCountry)
    let sourceAmount = currentCountry === "US" ? 4: 2
    setSources(utils.getClosestSources(sourceAmount,0, currentCountry))
    var topics = utils.getTopics(currentCountry)
    var randomTopic = topics[Math.floor(Math.random() * topics.length)]
    setTempSearch(randomTopic)
    setSearch(randomTopic)
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
      if(search && search.replace(/\s/g, "") !== "" && sources && sources.length !== 0){
        getNews().then(data => {
          setArticles(data.articles)
          setSearchedFlag(true)
          var tempImagesToShow = [0]

          for (var i = 1; i < 4; i++) {
            if(Math.random() < ( i === 1 ? 0.5: 0.33)){
              tempImagesToShow.push(i)
            }
          }

          setImagesToShow(tempImagesToShow)
        });


      }
    },[sources, search, country]
  );

  async function getNews() {
    //Check that search value existst & is not empty
    var url = new URL("https://newscatcher.p.rapidapi.com/v1/search")
    var data = {

      "media": "True",
      "sort_by": "relevancy",
      "page": "1",
      "sources": sources.toString()
    }

    // TODO: set "nothing found" error message

    data = {
      ...data,
      // "lang":"en",
    	"q": search,
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


    setRequestFloodFlag(response.status === 429)

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

  const errorWrapper = {
    width:"100%",
    textAlign:"center"
  }

  const SearchBoxWrapper={
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:"0.75em",
    marginBottom: "1em",
    borderRadius: "1.9em",
    border: "0.0625em solid #dfe1e5",
    display: "inline-block",
  }

  const SearchBoxInputStyle={
    backgroundColor: "transparent",
    width:"80%",
    height:"2.75em",
    fontSize:"1.5rem",
    border: "0em",
    marginLeft:"0.25em",
    outline: "none",
  }

  const infoStyle={
    position:"absolute",
    width:"78rem",
    margin: "auto",
    maxWidth:"98%",
    textAlign:"right"
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

        <div style={infoStyle }>
          <a href="https://github.com/Hadjimina/perspectiveNews/blob/master/README.md" style={{color:"#212529"}}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ }}/> {mobile ? "":"Info"}
          </a>
        </div>

        <div>
          <ReactFlagsSelect
            defaultCountry={country}
            ref={countrySelectorRef}
            countries={countries}
            onSelect={(countryCode)=>{setCountryAndSources(countryCode)}}/>
        </div>



        <hr style={darkHR}/>
        <div className ="components">
          <h3 style={{fontSize: "2rem", textAlign:"center"}}>
            {country === "US" ? "Choose a political bias for your news":"Wählen Sie die Orientierung Ihrer Nachrichten"}
          </h3>
          <BiasSlider mobile={mobile} updateSources={sourceUpdateHandler} country={country}/>

          {/* SearchBox*/}
          <div  style={SearchBoxWrapper}>
            <FontAwesomeIcon icon={faSearch} style={{ color:"rgb(154, 160, 166)", fontSize:"1.5rem"}}/>
            <input type="text"
              value={tempSearch}
              style={SearchBoxInputStyle}
              onChange = {changeSearch}
              onBlur = {updateSearch}
              onKeyPress = {updateSearch}/>
          </div>
          {/* SearchBox*/}

        </div>
        <hr style={lightHR}/>

        <div id="parent">

          {articles && articles.length > 0 && articles.map((article, index) =>
            <div key={index} style={
              mobile ? {flex: index===0 ? "2 0 100%" : "1 0 100%"} : {flex: index===0 ? "2 0 62%" : "1 0 31%" }}>
              <Story key={index} article={article} index={index} country={country}
                  showImage={imagesToShow.includes(index)}
                  minor={index !==0}
                  mobile={mobile}/>
            </div>
          )}

          {requestFloodFlag &&
            <div style={errorWrapper}>
              <FontAwesomeIcon icon={faExclamation} style={{marginBottom:"0.25em", fontSize:"10rem"}}/>
              <h2> {country === "US?"? "Too many requests": "Zu viele Anfragen"} </h2>
              {country === "US?"?
                <p> Unfortuantely there have been to many requests to <strong>Their.news</strong> recently.<br/>
                  This should resolve itself automatically in approximately 30 min.</p>:
                <p> Leider gab es in letzter Zeit zu viele Anfragen an <strong>Their.news</strong>. <br/>
                  Dies sollte in ca 30 min automatisch behoben sein.</p>}
            </div>
          }

          {searchedFlag && !(articles && articles.length > 0) &&
            <div style={errorWrapper}>
              <FontAwesomeIcon icon={faQuestion} style={{marginBottom:"0.25em", fontSize:"10rem"}}/>
              <h2> {country === "US?"? "No results found": "Keine Ergebnisse gefunden"} </h2>
              {country === "US?"?
              <p> Unfortunately, no results were found for your search.<br/>
                Make sure all the words are spelled correctly and try again.</p>:
                <p> Leider wurden keine Ergebnisse zu Ihrer Suche gefunde.<br/>
                  Stellen Sie sicher, dass alle Wörter richtig geschrieben sind und versuchen Sie es erneut. </p>}
            </div>
          }



        </div>

      </div>
    );

}



export default App;
