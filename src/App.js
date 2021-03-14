import React, { useState, useEffect, useRef } from "react";
import { BiasSlider, Story, SearchBox, Info, PopupMessage } from "./components";
import { utils } from "./helpers";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

/* import * as Credentials from "./credentials.js"; */
import * as Strings from "./helpers/strings.js"
import * as Constants from "./helpers/constants.js";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const mobileThreshold = 800;

function App() {
  const countries = ["US", "CH"];
  const countrySelectorRef = useRef();

  const [sources, setSources] = useState();
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState();
  const [mobile, setMobile] = useState(getWidth() < mobileThreshold);
  const [country, setCountry] = useState("US");
  const [searchText, setsearchText] = useState();

  const [imagesToShow, setImagesToShow] = useState([]);
  const [searchedFlag, setSearchedFlag] = useState(false);

  const sourceUpdateHandler = (sourceFromSlider) => {
    if (!sourceFromSlider || !sources) {
      return;
    }

    if (sourceFromSlider.join(",") !== sources.join(",")) {
      setSources(sourceFromSlider);
    }
  };

  const updateSearch = (e) => {
    if (e.key === "Enter") {
      setSearchedFlag(false)
      setSearch(searchText);
    }
  };

  const changeSearch = (e) => {
    setsearchText(e.target.value);
  };

  function setCountryAndSources(currentCountry) {
    setCountry(currentCountry);
    countrySelectorRef.current.updateSelected(currentCountry);
  }

  /* DISABLED LOCATION RECOGNITION */
  //onetime only
  useEffect(() => {
    /* var currentCountry = null;
    fetch("https://extreme-ip-lookup.com/json/")
      .then((res) => res.json())
      .then((response) => {
        currentCountry = response.countryCode;
      })
      .catch((data, status) => {
        //This is very bad...but works
        // if(data === "TypeError: Failed to fetch"){
        currentCountry = "US";
        // }
      })
      .finally(() => {
        if (countries.includes(currentCountry)) {
          setCountryAndSources(currentCountry);
        }
      }); */
    
    let sourceAmount =  4 ;
    setSources(utils.getClosestSources(sourceAmount, 0, country));
    var topics = utils.getTopics(country);
    var randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setsearchText(randomTopic);
    setSearch(randomTopic);

    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      console.log(getWidth())
      timeoutId = setTimeout(() => setMobile(getWidth() < mobileThreshold), 0);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {

    if (
      search &&
      search.replace(/\s/g, "") !== "" &&
      sources &&
      sources.length !== 0
    ) {
      getNews().then((data) => {
        setSearchedFlag(true)
        if (!data.articles) {
          setArticles([])
          return
        }
        
        setArticles(data.articles.slice(0,9));
        var tempImagesToShow = [0];

        for (var t = 2; t < 4; t++) {
          if (Math.random() < 0.66) {
            tempImagesToShow.push(t);
          }
        }
        setImagesToShow(tempImagesToShow);
      });
    }
  }, [sources, search, country]);

  async function getNews() {
    setSearchedFlag(false)
    //Check that search value existst & is not empty
    var url = new URL("https://newscatcher.p.rapidapi.com/v1/search");
    var data = {
      media: "True",
      sort_by: "relevancy",
      page: "1",
      sources: sources.toString(),
    };


    data = {
      ...data,
      "lang":"en",
      q: search,
    };

    url.search = new URLSearchParams(data).toString();
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
    });

    
    return response.json();
  }

  const getPopupMessage = (()=>{
    var ret
    if (searchedFlag && (!articles || articles.length <= 0)){
    /* Searched but did not find anything*/
        ret = (<PopupMessage 
                title= {Strings.NOTHING_FOUND_TITLE}
                body = {Strings.NOTHING_FOUND_BODY}
                icon = "question"
              />)
    }else if(!searchedFlag && (!articles || articles.length <= 0)) {
    /* Not yet searched. We are loading*/
        ret = (<PopupMessage 
          title = {Strings.LOADING_TITLE}
          body =  {Strings.LOADING_BODY}
          icon = {Constants.Loading_key}
        />)
    }
    return ret
       
  })



  return (
    <div className="wrapper">
      <h1
        onClick={() => {
          window.location.reload(false);
        }}
        style={{ fontSize: "4rem", textAlign: "center", cursor: "pointer" }}
      >
        {Strings.TITLE}
      </h1>
      
      <div className="block_container">
        <div id="bloc1">{Strings.POWERED_BY} </div>
        <div className="apiLogo" onClick={()=> window.open("https://newscatcherapi.com/", "_blank")}>{Strings.API_NAME}</div>
      </div>

      <Info
        mobile={mobile}
      />

      {/* Disabled country selection */}
      
      {/* <div>
        <ReactFlagsSelect
          defaultCountry={country}
          ref={countrySelectorRef}
          countries={countries}
          onSelect={(countryCode) => {
            setCountryAndSources(countryCode);
          }}
        />
      </div> */}

      <hr className="darkHR"/>
      
      <div className="components">
        <h3 style={{ fontSize: "2rem", textAlign: "center" }}>
          {Strings.CTA}
        </h3>
        <SearchBox
          updateSearch={updateSearch}
          changeSearch={changeSearch}
          searchText={searchText}
          setSearch={setSearch}
          updateSources={sourceUpdateHandler}
          country={country}
          updateCountry={setCountryAndSources}
        />
        <BiasSlider
          mobile={mobile}
          updateSources={sourceUpdateHandler}
          country={country}
          updateCountry={setCountryAndSources}
        />
      </div>
      <hr className="lightHR"/>

      <div id="parent">
        {articles &&
          articles.length > 0 &&
          articles.map((article, index) => (
            <div
              key={index}
              // on desktop different widths, mobile all 100%
              style={
                !mobile ? {flex: index === 0 ? "2 0 62%" : 
                                index === 3 ? "1 0 31%" :
                                            "1 0 25%" } : 
                          {flex: "1 0 100%"}
            }>
            
              <Story
                key={index}
                article={article}
                index={index}
                country={country}
                showImage={imagesToShow.includes(index)}
                minor={index !== 0}
                mobile={mobile}
              />
            </div>
          ))}

        {getPopupMessage()}
        
        
      </div>
    </div>
  );
}

export default App;
