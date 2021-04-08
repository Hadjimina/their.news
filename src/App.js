import React, { useState, useEffect, useRef } from "react";
import { BiasSlider, Story, SearchBox, Info, PopupMessage,  } from "./components";
import { utils } from "./helpers";
import "./App.css";
import "react-flags-select/css/react-flags-select.css";

//import * as Credentials from "./credentials.js";  
import * as Strings from "./helpers/strings.js"
import * as Constants from "./helpers/constants.js";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;


function App() {
  //country is no longer used, but we leave it in if we need it in the future
  const [country, setCountry] = useState("US");
  const [sources, setSources] = useState(utils.getSourcesCleanURL(country));
  const [search, setSearch] = useState();
  const [articles, setArticles] = useState();
  const [mobile, setMobile] = useState(getWidth() < Constants.Mobile_threshold);

  const [searchText, setsearchText] = useState();
  const [imagesToShow, setImagesToShow] = useState([]);
  const [searchedFlag, setSearchedFlag] = useState(false);
  const [outletDots, setOutletDots] = useState({})
  const [firstSearch, setFirstSearch] = useState(true)
  const [sliderLoading, setSliderLoading] = useState(false)
  
  const childRef = useRef();  

  const sourceUpdateHandler = (sourceFromSlider) => {
    if (!sourceFromSlider || !sources) {
      return;
    }

    //Check if the news sources are different to the ones we already
    if (sourceFromSlider.join(",") !== sources.join(",")) {
      setSearchedFlag(false)
      setSources(sourceFromSlider); 
    }else{
      setSliderLoading(false)
    }
  };

  //Start search with new search word
  const updateSearch = (e) => {
    if (e.key === "Enter" && searchText !== search) {
    
      setSearchedFlag(false)
      searchWrapper(searchText)
    }
  };

  //Changes the search text
  const changeSearch = (e) => {
    if("target" in e){
      setsearchText(e.target.value);
    }
  };

  // Do some minor checks before we actually start search
  const searchWrapper = (value) => {
    if(value === search){
      return
    } 

    setSearchedFlag(false)
    setArticles([])
    setFirstSearch(true);
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
    setRandomSearch(country)

    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      console.log(getWidth())
      timeoutId = setTimeout(() => setMobile(getWidth() < Constants.Mobile_threshold), 0);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);


  function orderArticles(articles){
    var articlesToShow = []
    
    var articlesPerOutlet = {}
    for (var n = 0; n < articles.length; n++){
      
      var outlet = articles[n].clean_url
      
      if( outlet in articlesPerOutlet){
        var cur = articlesPerOutlet[outlet]
        cur.push([articles[n],n])
        articlesPerOutlet[outlet] = cur
      }else{
        articlesPerOutlet[outlet] = [[articles[n],n]]
      }
    }
    
    //RoundRobin for first article of each outlet
    var mergedArray = []
   
    var outletAmount = Object.keys(articlesPerOutlet).length

    for(var newsSite of Object.keys(articlesPerOutlet)){
      articlesToShow.push(articlesPerOutlet[newsSite][0][0])
      mergedArray = mergedArray.concat(articlesPerOutlet[newsSite].slice(1))
    }

    // this sort is probably unneccessary
    mergedArray.sort((a, b)=>{return a[1] - b[1]})
    
    //Fil rest up by article relevance until size Articles_to_show + Articles_backup
    var fillAmount = Math.max(Constants.Articles_to_show + Constants.Articles_backup - articlesToShow.length,0)
    articlesToShow = articlesToShow.concat(mergedArray.slice(0,fillAmount).map(x=>x[0]))

    

    // Remove duplicates
    if (!Constants.Should_remove_duplicates){
      return articlesToShow.slice(0, Constants.Articles_to_show-1)
    }

    
    var indicesToRemove = []
    for (var i = 0; i < articlesToShow.length; i++){
      for (var j = Constants.Should_remove_duplicates_from_first_article_of_outlet ? 0: outletAmount; j < articlesToShow.length; j++){
          if(i === j || j in indicesToRemove){
            continue
          }
          
          // Check similarity
          //JaronWrinker is super computationally expensive
          var titleDistance = utils.JaroWrinker(articlesToShow[i].title, articlesToShow[j].title)
          var summaryDistance = utils.JaroWrinker(articlesToShow[i].summary, articlesToShow[j].summary)

          if(titleDistance > Constants.JaroWrinker_threshold || summaryDistance > Constants.JaroWrinker_threshold){
            indicesToRemove.push(j)
          }          
      }
    }
    

    
    for( const index of indicesToRemove){
      if(!Constants.Should_remove_duplicates_from_first_article_of_outlet){
        if(index > outletAmount){ // we want to have min 1 article of each outlet, for the first article of each outlet we do not check duplicates
          articlesToShow.splice(index,1)
        }
      }else{
        articlesToShow.splice(index,1)
      }
      
    }

    setFirstSearch(false)
    setSliderLoading(false)
    return articlesToShow.slice(0, Constants.Articles_to_show-1)
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

        
       
        // 1. Set "outlet dots" in sliders
        // get clean urls
        var urlSet = new Set(data.articles.map(function (x){
          return x.clean_url
        }))
  
        var biasByUrl = utils.getBiasByCleanURL(utils.getSources(country))
        for (const url of Object.keys(biasByUrl)){
          if (!urlSet.has(url)){
            //Url not in current set so we remove it
            delete(biasByUrl[url])
          }
        }
        setOutletDots(biasByUrl)
        

        
        // 2.
        setArticles(orderArticles(data.articles));

        //3. Images to show
        var tempImagesToShow = [0,2,3,4];
        /* Show images for 2nd row with probability of 66% in desktop mode*/
        if (Math.random() < 0.66) {
          /* We remove some image */
          var max = tempImagesToShow.length
          var min = 1
          var toRemoveIndex = Math.floor(Math.random()*(max - min +1))+1
          tempImagesToShow.splice(toRemoveIndex-1,1)
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
      lang:"en",
    };


    data = {
      ...data,
      q: search,
      sources: firstSearch ? utils.getSourcesCleanURL(country) : sources.toString(),
      page_size: firstSearch ? Constants.Article_amount_fst : Constants.Article_amount_nth
    };



    url.search = new URLSearchParams(data).toString();
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
         "x-rapidapi-key": process.env.REACT_APP_API_KEY, 
        /*"x-rapidapi-key": Credentials.api_key,*/
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
    }else if(!searchedFlag && (!articles || articles.length <= 0) || sliderLoading) {
    /* Not yet searched or slider loading. We are loading*/
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
          mobile={mobile}
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
          ref={childRef}
          mobile={mobile}
          updateSources={sourceUpdateHandler}
          country={country}
          firstSearch={firstSearch}
          outletDots={outletDots}
          sliderLoading={(b)=>{
            setSliderLoading(b)}}
        />
      </div>
      <hr className="lightHR"/>

      <div id="parent">
        {!sliderLoading && articles &&
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
