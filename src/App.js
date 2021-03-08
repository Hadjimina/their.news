import React, { useState, useEffect, useRef } from "react";
import { BiasSlider, Story, SearchBox, Info } from "./components";
import { utils } from "./helpers";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import { Helmet } from "react-helmet";

import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import * as Credentials from "./credentials.js";
import * as Strings from "./strings.js"

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
  const [tempSearch, setTempSearch] = useState();
  const [requestFloodFlag, setRequestFloodFlag] = useState(false);
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
      setSearch(tempSearch);
    }
  };

  const changeSearch = (e) => {
    setTempSearch(e.target.value);
  };

  function setCountryAndSources(currentCountry) {
    setCountry(currentCountry);
    countrySelectorRef.current.updateSelected(currentCountry);
    let sourceAmount = currentCountry === "US" ? 4 : 2;
    setSources(utils.getClosestSources(sourceAmount, 0, currentCountry));
    var topics = utils.getTopics(currentCountry);
    var randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setTempSearch(randomTopic);
    setSearch(randomTopic);
  }

  //onetime only
  useEffect(() => {
    var currentCountry = null;
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
      });

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

  useEffect(() => {
    if (
      search &&
      search.replace(/\s/g, "") !== "" &&
      sources &&
      sources.length !== 0
    ) {
      getNews().then((data) => {
        if (!data.articles) {
          return;
        }
        
        setArticles(data.articles.slice(0,9));
        setSearchedFlag(true);
        var tempImagesToShow = [0];

        for (var t = 1; t < 4; t++) {
          if (Math.random() < (t === 1 ? 0.5 : 0.33)) {
            tempImagesToShow.push(t);
          }
        }
        setImagesToShow(tempImagesToShow);
      });
    }
  }, [sources, search, country]);

  async function getNews() {
    //Check that search value existst & is not empty
    var url = new URL("https://newscatcher.p.rapidapi.com/v1/search");
    var data = {
      media: "True",
      sort_by: "relevancy",
      page: "1",
      sources: sources.toString(),
    };

    // TODO: set "nothing found" error message

    data = {
      ...data,
      // "lang":"en",
      q: search,
    };

    url.search = new URLSearchParams(data).toString();
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
        "x-rapidapi-key": Credentials.api_key,
        useQueryString: true,
      },
    });

    setRequestFloodFlag(response.status == 429);
    return response.json();
  }

  const errorWrapper = {
    width: "100%",
    textAlign: "center",
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Their News: Escape your bubble</title>
        <meta
          name="description"
          content="Break out of your political bubble by reading news from the entire political spectrum"
        />
      </Helmet>
      <h1
        onClick={() => {
          window.location.reload(false);
        }}
        style={{ fontSize: "4rem", textAlign: "center", cursor: "pointer" }}
      >
        {Strings.TITLE}
      </h1>

      <Info
        mobile={mobile}
      />

      <div>
        <ReactFlagsSelect
          defaultCountry={country}
          ref={countrySelectorRef}
          countries={countries}
          onSelect={(countryCode) => {
            setCountryAndSources(countryCode);
          }}
        />
      </div>

      <hr className="darkHR"/>
      
      <div className="components">
        <h3 style={{ fontSize: "2rem", textAlign: "center" }}>
          {country === "US"
            ? "Choose a political bias for your news"
            : "Wählen Sie die Orientierung Ihrer Nachrichten"}
        </h3>
        <SearchBox
          updateSearch={updateSearch}
          changeSearch={changeSearch}
          tempSearch={tempSearch}
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
              style={
                !mobile ? {flex: index === 0 ? "2 0 62%" : 
                                index === 3 ? "1 0 31%" :
                                            "1 0 25%" } : 
                          {flex: "1 0 100%"}
              }
            >
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

        {requestFloodFlag && (
          <div style={errorWrapper}>
            <FontAwesomeIcon
              icon={faExclamation}
              style={{ marginBottom: "0.25em", fontSize: "10rem" }}
            />
            <h2>
              {" "}
              {country === "US?"
                ? "Too many requests"
                : "Zu viele Anfragen"}{" "}
            </h2>
            {country === "US?" ? (
              <p>
                {" "}
                Unfortuantely there have been to many requests to{" "}
                <strong>Their.news</strong> recently.
                <br />
                This should resolve itself automatically in approximately 30
                min.
              </p>
            ) : (
              <p>
                {" "}
                Leider gab es in letzter Zeit zu viele Anfragen an{" "}
                <strong>Their.news</strong>. <br />
                Dies sollte in ca 30 min automatisch behoben sein.
              </p>
            )}
          </div>
        )}

        {!requestFloodFlag &&
          searchedFlag &&
          !(articles && articles.length > 0) && (
            <div style={errorWrapper}>
              <FontAwesomeIcon
                icon={faQuestion}
                style={{ marginBottom: "0.25em", fontSize: "10rem" }}
              />
              <h2>
                {" "}
                {country === "US?"
                  ? "No results found"
                  : "Keine Ergebnisse gefunden"}{" "}
              </h2>
              {country === "US?" ? (
                <p>
                  {" "}
                  Unfortunately, no results were found for your search.
                  <br />
                  Make sure all the words are spelled correctly and try again.
                </p>
              ) : (
                <p>
                  {" "}
                  Leider wurden keine Ergebnisse zu Ihrer Suche gefunde.
                  <br />
                  Stellen Sie sicher, dass alle Wörter richtig geschrieben sind
                  und versuchen Sie es erneut.{" "}
                </p>
              )}
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
