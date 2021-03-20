import React, { useState, useEffect, useRef } from "react";
import { BiasSlider, Story, SearchBox, Info, PopupMessage } from "./components";
import { utils } from "./helpers";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

/* import * as Credentials from "./credentials.js";  */
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
      setSearchedFlag(false)
      setSources(sourceFromSlider);
    }
  };

  const updateSearch = (e) => {
    if (e.key === "Enter") {
      setSearchedFlag(false)
      searchWrapper(searchText)
    }
  };

  const changeSearch = (e) => {
    if("target" in e){
      setsearchText(e.target.value);
    }
  };

  const searchWrapper = (value) => {
    if(value == search){
      /* Simulate search */
      /* TODO */ 
      /* console.log("timers")
      setSearchedFlag(false) */
      return
    } 
    console.log("setting")
    console.log(value)
    setSearchedFlag(false)
    setArticles([])
    setSearch(value)
  }

  function setCountryAndSources(currentCountry) {
    /* setCountry(currentCountry);
    countrySelectorRef.current.updateSelected(currentCountry); */
  }

  function setRandomSearch(country){
    
    var randomTopic = utils.getRandomTopic(country)
    setsearchText(randomTopic);
    searchWrapper(randomTopic);
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
    setRandomSearch(country)

    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setMobile(getWidth() < mobileThreshold), 0);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  function orderArticles(articles){
    /* swap article i=1 and i=4 b.c. i=1 more often has an image */
    var b = articles[1];
    articles[1] = articles[4];
    articles[4] = b;
    console.log("article amount "+articles.length)
    // Remove duplicates
    if (!Constants.Should_remove_duplicates){
      return articles.slice(0, Constants.Article_amount-1)
    }

    var indicesToRemove = []
    for (var i = 0; i < articles.length; i++){
      for (var j = 0; j < articles.length; j++){
          if(i == j || j in indicesToRemove){
            continue
          }
          // Set articles score
          var score = 0
          
          // +1 for search text in title
          if(articles[j].title.toLowerCase().includes(search.toLowerCase())){
            score += 1.0
          }
          articles[j]["score"] =  score
          
          // Check similarity
          //JaronWrinker is super computationally expensive
          var titleDistance = utils.JaroWrinker(articles[i].title, articles[j].title)
          var summaryDistance = utils.JaroWrinker(articles[i].summary, articles[j].summary)

          if(titleDistance > Constants.JaroWrinker_threshold || summaryDistance > Constants.JaroWrinker_threshold){
            indicesToRemove.push(j)
          }
          
      }
      
    }
    var oldLength = articles.length
    for( const index of indicesToRemove){
      articles.splice(index,1)
    }
    
    //console.log("Removed "+(oldLength-articles.length)+" items")

    
    // randomize outlets as good as possible
    /* var outletDict = {};
    // 1. create dictionary
    for(const article of articles){
      if(outletDict.hasOwnProperty(article.clean_url)){
        var v = outletDict[article.clean_url]
        v.push(article)
        outletDict[article.clean_url] = v
      }else{
        outletDict[article.clean_url] = [article]
      }
    }
    // 2. Sort based on score
    var pointerAndMaxDict = {}
    for(var k in outletDict){
      pointerAndMaxDict[k] = [0,outletDict[k].length]
      var list = outletDict[k]
      list.sort((a, b) => (a.score < b.score) ? 1 : -1)
      outletDict[k] = list
    }
    
    // 3. create new array
    // we show at max 10 items
    var final = []
    var temp = []
    var keys = Object.keys(outletDict)
    console.log(keys)
    for(var i = 0; i<10; i++){
      console.log("*******out******")
      console.log("final "+final.join())
      console.log("temp "+temp.join())

      var curKey = keys[i % keys.length]
      var curPointer = pointerAndMaxDict[curKey][0]
      var curMax = pointerAndMaxDict[curKey][1]
      console.log("curkey "+curKey)
    
      if(curPointer < curMax){
        temp.push(outletDict[k][curPointer])
        pointerAndMaxDict[curKey][0] = curPointer+1
      }

      if(temp.length == 4){
        utils.shuffleArray(temp)
        final.push(temp)
        temp = []
      }
    }

    console.log(final) */
    return articles.slice(0, Constants.Article_amount-1)
  }

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
        
        setArticles(orderArticles(data.articles));
        var tempImagesToShow = [0,2,3,4];
        /* Show images for 2nd row with probability of 66% in desktop mode*/
        
        if (Math.random() < 0.66) {
          
          tempImagesToShow.splice(tempImagesToShow.length-1,1)
        }
        console.log(tempImagesToShow.length)
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
        /* "x-rapidapi-key": Credentials.api_key, */
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
        {/* This should be clean up */}
        <SearchBox
          updateSearch={updateSearch}
          changeSearch={changeSearch}
          searchText={searchText}
          setSearch={searchWrapper}
          updateSources={sourceUpdateHandler}
          country={country}
          updateCountry={setCountryAndSources}
          setRandomSearch={setRandomSearch}
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
